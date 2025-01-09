/**
 * 钱包调度器
 */
import BotHb from "../../models/BotHb";
import moment from "moment";
import schedule from "node-schedule";
import {queryRunner} from "../../config/database";
import BotPaymentModel from "../../models/BotPaymentModel";
import PaymentType from "../../type/PaymentType";
import CommonEnumsIndex from "../../type/CommonEnumsIndex";
import ComputeUtils from "../compute/ComputeUtils";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import botHb from "../../models/BotHb";
import UserModel from "../../models/UserModel";
import {addLock} from "../../config/redislock";
import {Context, Telegraf} from "telegraf";
import ScheduleHandle from "./ScheduleHandle";
import AESUtils from "../AESUtils";


class WalletScheduleHandle {

    /**
     * 初始化方法和属性
     */
    public static init = async (bot: Telegraf<Context>) => {
         try {
             this.initReaPackSchedule(bot).then()
         } catch (err) {
             console.log('红包退款执行错误', err)
         }
    }

    public static redPacketMap = new Map()

    /**
     * 初始化红包调度器
     */
    public static initReaPackSchedule = async (bot: Telegraf<Context>) => {
        let botHbList = await BotHb
            .createQueryBuilder()
            .where('del = 0')
            .where('status = 0')
            .getMany()

        botHbList.forEach(item => {
            // 红包过期时间
            let endDate = moment(item.createTime).add(24, 'hours').format('YYYY-MM-DD HH:mm:ss')
            // let endDate = moment(item.createTime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss')
            if (moment(endDate).isBefore()) {
                endDate = moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
            }
            let job = schedule.scheduleJob(new Date(endDate), async () => {
                await this.startRefund()
                job.cancel()
            })
        })
    }

    /**
     * 开始执行红包退款操作
     */
    public static startRefund = async () => {
        await queryRunner.startTransaction()
        let botHbList = await queryRunner.manager.find(BotHb, {
            where: {
                status: 0,
                del: 0
            }
        })
        await queryRunner.commitTransaction()
        // 需要更新的红包数据列表
        let updateBotHbList: Array<BotHb> = []
        // 需要新增的订单列表
        let addPaymentList: Array<BotPaymentModel> = []
        // 需要修改的用户金额列表
        let updateUserList: Array<UserModel> = []
        // 锁列表
        let lockKeys: Array<string> = []
        botHbList.forEach(item => {
            lockKeys.push(item.hbId)
        })

        await addLock(lockKeys, async () => {
            await queryRunner.startTransaction()
            try {
                for (let i = 0; i < botHbList.length; i++) {
                    let item = botHbList[i]
                    if (moment(item.createTime).add('30', 'seconds').isBefore()) {
                        item.status = 1
                        item.del = 1

                        let tgId = item.tgId
                        let userModel = await new UserModel().getUserModelById(tgId)
                        if (!userModel) {
                            continue
                        }
                        let payment = new BotPaymentModel()
                        let paymentType = PaymentType.TKHB
                        payment.tgId = tgId
                        payment.username = userModel.userName
                        payment.nickname = userModel.nickName
                        payment.paymentType = paymentType
                        payment.paymentTypeName = new CommonEnumsIndex().getPaymentTypeStr(paymentType)
                        payment.balanceBefore = userModel.getBalance(item.walletType)
                        payment.balanceAfter = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType) == 1
                            ? new ComputeUtils(userModel.getBalance(item.walletType)).add(item.money).toString()
                            : new ComputeUtils(userModel.getBalance(item.walletType)).minus(item.money).toString()
                        payment.paymentTypeNumber = item.hbId
                        payment.paymentAmount = item.money
                        payment.operateType = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType)
                        payment.walletType = item.walletType
                        payment.gameType = GameTypeEnum.MEPTY

                        userModel.updateUserMoney(item.walletType, item.money)

                        updateBotHbList.push(item)
                        updateUserList.push(userModel)
                        addPaymentList.push(payment)
                    }
                }
                await queryRunner.manager.save(updateBotHbList)
                await queryRunner.manager.save(addPaymentList)
                await queryRunner.manager.save(updateUserList)
                await queryRunner.commitTransaction()

                updateBotHbList.forEach(item => {
                    ScheduleHandle.bot.telegram.sendMessage(AESUtils.decodeUserId(item.tgId), `🧧红包过期退款 ${item.money} ${new CommonEnumsIndex().getWalletTypeStr(item.walletType)}`)
                })
            } catch (err) {
                await queryRunner.rollbackTransaction()
            }
        }, async () => {

        })
    }

}



export default WalletScheduleHandle
