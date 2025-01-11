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

    /**
     * 需要退款的红包数据列表
     */
    public static quitRedPackList: Array<{
        // 红包到期时间
        endTime: string
        // 红包对象列表
        botHb: BotHb
    }> = []

    /**
     * 初始化红包调度器
     */
    public static initReaPackSchedule = async (bot: Telegraf<Context>) => {
        // let botHbList = await BotHb
        //     .createQueryBuilder()
        //     .where('del = 0')
        //     .where('status = 0')
        //     .orderBy('create_time', 'ASC')
        //     .getMany()
        await queryRunner.startTransaction()
        try {
            let botHbList = await queryRunner.manager.find(BotHb, {
                where: {
                    del: 0,
                    status: 0
                },
                order: {
                    createTime: 'ASC'
                }
            }) as Array<BotHb>
            await queryRunner.commitTransaction()

            botHbList.forEach(item => {
                // 红包过期时间
                let endDate = moment(item.createTime).add(24, 'hours').format('YYYY-MM-DD HH:mm:ss')
                // let endDate = moment(item.createTime).add(30, 'seconds').format('YYYY-MM-DD HH:mm:ss')
                this.quitRedPackList.push({
                    endTime: endDate,
                    botHb: item
                })
            })

            this.quitRedPackList.forEach(item => {
                let time = moment(item.endTime).isBefore(new Date())
                    ? moment().add(5, 'seconds').format('YYYY-MM-DD HH:mm:ss')
                    : item.endTime

                let job = schedule.scheduleJob(
                    time,
                    async () => {
                        await this.startRefund()
                        job.cancel()
                    }
                )
                ScheduleHandle.currJobMap.set(`walletHb${item.botHb.hbId}`, job)
            })
        } catch (err) {
            await queryRunner.rollbackTransaction()
        }
    }

    /**
     * 开始执行红包退款操作
     */
    public static startRefund = async () => {
        // 需要退款的红包列表
        let list: Array<BotHb> = []
        let firstData = WalletScheduleHandle.quitRedPackList[0]
        WalletScheduleHandle.quitRedPackList.forEach(item => {
            if (
                item.endTime == firstData.endTime
                || moment(item.endTime).isBefore(new Date())
            ) {
                list.push(item.botHb)
            }
        })
        console.log('要更新的数据列表', list)

        for (let i = 0; i < list.length; i++) {
            let botHb = list[i]
            botHb.status = 1
            botHb.del = 1

            let tgId = botHb.tgId
            await addLock([tgId, botHb.hbId],async () => {
                try {
                    await queryRunner.startTransaction()
                    let userModel = await new UserModel().getUserModelById(tgId)
                    if (!userModel) {
                        return
                    }
                    let payment = new BotPaymentModel()
                    let paymentType = PaymentType.TKHB
                    let money = new ComputeUtils(botHb.money).minus(botHb.lqMoney ?? 0).getValue()
                    payment.tgId = tgId
                    payment.username = userModel.userName
                    payment.nickname = userModel.nickName
                    payment.paymentType = paymentType
                    payment.paymentTypeName = new CommonEnumsIndex().getPaymentTypeStr(paymentType)
                    payment.balanceBefore = userModel.getBalance(botHb.walletType)
                    payment.balanceAfter = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType) == 1
                        ? new ComputeUtils(userModel.getBalance(botHb.walletType)).add(money).toString()
                        : new ComputeUtils(userModel.getBalance(botHb.walletType)).minus(money).toString()
                    payment.paymentTypeNumber = botHb.hbId
                    payment.paymentAmount = money
                    payment.operateType = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType)
                    payment.walletType = botHb.walletType
                    payment.gameType = GameTypeEnum.MEPTY

                    userModel.updateUserMoney(botHb.walletType, money)

                    await queryRunner.manager.save(botHb)
                    await queryRunner.manager.save(userModel)
                    await queryRunner.manager.save(payment)
                    await queryRunner.commitTransaction()
                    await ScheduleHandle.bot.telegram.sendMessage(AESUtils.decodeUserId(tgId), `🧧红包过期退款 ${money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}`)

                    // 重置下标
                    if (WalletScheduleHandle.quitRedPackList.length > 0) {
                        console.log('当前退款数据', WalletScheduleHandle.quitRedPackList[0])
                        WalletScheduleHandle.quitRedPackList.shift()
                    }
                } catch (err) {
                    await queryRunner.rollbackTransaction()
                }
            }, async () => {})
        }
    }

}



export default WalletScheduleHandle
