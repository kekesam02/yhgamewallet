// @ts-nocheck
import WalletType from "../type/WalletType";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Context} from "telegraf";
import redis from "../config/redis";
import MessageTipUtils from "../commons/message/MessageTipUtils";
import UserModel from "./UserModel";
import ComputeUtils from "../commons/compute/ComputeUtils";
import {queryRunner} from "../config/database";
import OrderUtils from "../commons/OrderUtils";
import ContextUtil from "../commons/ContextUtil";
import BotPaymentModel from "./BotPaymentModel";
import PaymentType from "../type/PaymentType";
import CommonEnumsIndex from "../type/CommonEnumsIndex";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import RedisHandle from "../commons/redis/RedisHandle";
import MessageUtils from "../commons/message/MessageUtils";
import WalletRedPacket from "../botWallet/service/handle/dashbord/hongbao/WalletRedPacket";
import RandomUtils from "../commons/compute/RandomUtils";
import {RedPackConditionJsonType} from "../type/WalletType/RedPackType";
import TimeUtils from "../commons/date/TimeUtils";
import ButtonUtils from "../commons/button/ButtonUtils";
import ButtonCommonMap from "../commons/button/ButtonCommonMap";
import GameController from "../botGame/gameController/GameController";


/**
 * 红包模型以字符串存储在 botPayment 库中
 */
@Entity({
    name: 'bot_hb'
})
class BotHb extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户tgId
     */
    @Column({
        name: 'tg_id',
        default:''
    })
    tgId: string

    /**
     * 红包金额
     */
    @Column({
        name: 'hb_je'
    })
    money: string

    /**
     * 红包已领取金额
     */
    @Column({
        name: 'lq_je',
        default: ''
    })
    lqMoney: string

    /**
     * 货币类型
     */
    @Column({
        name: 'hblx',
        default: 0
    })
    walletType: WalletType

    /**
     * 当前要领取的红包下标、每一个用户领完之后加1
     */
    @Column({
        name: 'je_index',
        default: 0
    })
    jeIndex: number

    /**
     * 红包分化json 用于随机包
     */
    @Column({
        name: 'je_json',
        default: ''
    })
    jeJson: string

    /**
     * 红包状态
     *      0: 进行中
     *      1: 已结束(默认24小时结束)
     */
    @Column({
        name: 'status',
        default: 1
    })
    status: number

    /**
     * 红包状态
     *      0: 进行中
     *      1: 已结束
     */
    @Column({
        name: 'del',
        default: 0
    })
    del: number

    /**
     * 已领取数量
     */
    @Column({
        name: 'lq_num',
        default: 0
    })
    receiveNum: number

    /**
     * 红包数量
     */
    @Column({
        name: 'hb_num'
    })
    num: number

    /**
     * 红包备注
     */
    @Column({
        name: 'preparation',
        default: ''
    })
    remark: string

    /**
     * 领取红包验证码
     */
    @Column({
        name: 'conditonsyzm',
        default: 0
    })
    conditonsyzm: number

    /**
     * 领取红包条件对应的参数
     *      用于流水红包 近七天流水  近30天流水 本月流水 总流水 还有选择流水的金额 usdt金额 trx金额
     */
    @Column({
        name: 'conditions_json',
        default: ''
    })
    conditionsJson: string

    /**
     * 红包类型
     *      0: 均分包
     *      1: 随机包
     */
    @Column({
        name: 'hb_type',
        default: '0'
    })
    hbType: number

    /**
     * 会员红包
     */
    @Column({
        name: 'conditonshy',
        default: 0
    })
    conditonshy: number

    /**
     * 流水红包
     */
    @Column({
        name: 'conditonsls',
        default: 0
    })
    conditonsls: number

    /**
     * 当前红包id
     */
    @Column({
        name: 'hb_id'
    })
    hbId: string

    /**
     * 验证码对应的json
     */
    @Column({
        name: 'conditonsyzm_json',
        default: ''
    })
    conditonsyzmJson: string

    @Column({
        name: 'verify_user',
        default: ''
    })
    verifyUser: string

    @Column({
        name: 'verify_btn',
        default: ''
    })
    verifyBtn: string

    /**
     * 指定用户领取红包
     *      当指定用户之后红包数量肯定为1的
     *      一次领取所有红包
     */
    @Column({
        name: 'specify_user'
    })
    specifyUser: string

    /**
     * 创建时间
     */
    @Column({
        name: 'create_time'
    })
    createTime: string

    /**
     * 更新时间
     */
    @Column({
        name: 'update_time'
    })
    updateTime: string

    /**
     * 获取红包对象
     */
    public getBotHb = (hbId: string) => {
        return BotHb.createQueryBuilder()
            .where('hb_id = :hbId', {
                hbId: hbId
            })
            .getOne()
    }

    /**
     * 根据当前用户id 可用红包列表
     */
    public getBotHbList = (tgId: string) => {
        let timeUtils = new TimeUtils().getDayTime(this.createTime)
        return BotHb.createQueryBuilder()
            .where('tg_id = :tgId', {
                tgId: tgId
            })
            .whereTime(timeUtils.startTime, timeUtils.endTime)
            .getMany()
    }

    /**
     * 更新红包对象、用户生成红包后、或者修改红包备注之类的
     */
    public setBotHb = async () => {
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.save(this as BotHb)
            await queryRunner.commitTransaction()
        } catch (err) {
            await queryRunner.rollbackTransaction()
            throw Error('出错了')
        }
    }

    /**
     * 持久化存储
     *      删除 redis 中保存的红包数据、将数据存到 mysql 中去
     */
    public saveLocalData = async (ctx: Context, newBotHb?: BotHb): Promise<BotHb | null> => {
        let userModel = await new UserModel().getUserModel(ctx)
        let redisData = newBotHb? newBotHb: await this.getRedisData(ctx)
        if (!redisData) {
            return null
        }
        if (new ComputeUtils(userModel.USDT).comparedTo(redisData.money) < 0) {
            await new MessageUtils().sendTextReply(ctx, '⚠️温馨提示：操作失败，余额不足！', new ButtonUtils().createCallbackBtn([
                [
                    GameController.recharge
                ]
            ]).reply_markup.inline_keyboard)
            return null
        }
        await queryRunner.startTransaction()
        try {
            let hbId = new OrderUtils().createHbModelId()
            let botHb = new BotHb()
            botHb.tgId = ContextUtil.getUserId(ctx)
            botHb.money = redisData.money
            botHb.walletType = redisData.walletType
            botHb.status = 1
            botHb.num = redisData.num
            botHb.hbId = hbId
            botHb.receiveNum = 0
            botHb.hbType = redisData.hbType
            botHb.jeIndex = 0
            botHb.specifyUser = redisData.specifyUser ?? null
            botHb.createJson()

            let payment = new BotPaymentModel()
            let paymentType = PaymentType.FHB
            payment.tgId = userModel.tgId
            payment.username = userModel.userName
            payment.nickname = userModel.nickName
            payment.paymentType = paymentType
            payment.paymentTypeName = new CommonEnumsIndex().getPaymentTypeStr(paymentType)
            payment.balanceBefore = userModel.getBalance(this.walletType)
            payment.balanceAfter = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType) == 1
                ? new ComputeUtils(userModel.getBalance(this.walletType)).add(this.money).toString()
                : new ComputeUtils(userModel.getBalance(this.walletType)).minus(this.money).toString()
            payment.paymentTypeNumber = hbId
            payment.paymentAmount = this.money
            payment.operateType = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType)
            payment.walletType = this.walletType
            payment.gameType = GameTypeEnum.MEPTY

            let user = await queryRunner.manager.findOne(UserModel, {
                where: {
                    tgId: ContextUtil.getUserId(ctx)
                }
            }) as UserModel
            user.updateUserMoney(this.walletType, this.money, false)

            await queryRunner.manager.save(user)
            await queryRunner.manager.save(botHb)
            await queryRunner.manager.save(payment)
            await queryRunner.commitTransaction()
            // 删除redis 数据
            redis.del(this.getRedisKey(ctx))
            return botHb
        } catch (err) {
            console.log('红包回滚了', err)
            await queryRunner.rollbackTransaction()
            return null
        }
    }

    /**
     * 用户领取红包触发
     */
    public receiveHb = async (ctx: Context) => {
        await queryRunner.startTransaction()
        try {
            let oldPayment = await queryRunner.manager.findOne(BotPaymentModel, {
                where: {
                    paymentTypeNumber: this.hbId,
                    tgId: ContextUtil.getUserId(ctx),
                    paymentType: PaymentType.LHB
                }
            }) as BotPaymentModel
            if (oldPayment) {
                await new MessageUtils().sendPopMessage(ctx, '已经领过啦')
                return false
            }

            // 获取到当前领取红包的用户
            let user = await queryRunner.manager.findOne(UserModel, {
                where: {
                    tgId: ContextUtil.getUserId(ctx)
                }
            }) as UserModel
            // 领取次数加一
            this.receiveNum++

            let newPayment = new BotPaymentModel()
            let paymentType = PaymentType.LHB
            newPayment.tgId = user.tgId
            newPayment.username = user.userName
            newPayment.nickname = user.nickName
            newPayment.paymentType = paymentType
            newPayment.paymentTypeName = new CommonEnumsIndex().getPaymentTypeStr(paymentType)
            newPayment.balanceBefore = user.getBalance(this.walletType)
            newPayment.balanceAfter = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType) == 1
                ? new ComputeUtils(user.getBalance(this.walletType)).add(this.getReceiveMoney()).toString()
                : new ComputeUtils(user.getBalance(this.walletType)).minus(this.getReceiveMoney()).toString()
            newPayment.paymentTypeNumber = this.hbId
            newPayment.paymentAmount = this.getReceiveMoney()
            newPayment.operateType = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType)
            newPayment.walletType = this.walletType
            newPayment.gameType = GameTypeEnum.MEPTY

            user.updateUserMoney(this.walletType, this.getReceiveMoney())
            this.lqMoney = new ComputeUtils(this.lqMoney).add(this.getReceiveMoney()).toString()
            this.jeIndex++
            // 将红包设置为结束状态
            if (new ComputeUtils(this.lqMoney).comparedTo(this.money) >= 0) {
                this.del = 1
                this.status = 1
            }

            await queryRunner.manager.save(user)
            await queryRunner.manager.save(newPayment)
            await queryRunner.manager.save(this as BotHb)
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            console.log('消息回滚了', err)
            await queryRunner.rollbackTransaction()
            return false
        }
    }


    // 一些常用的计算方法

    /**
     * 生成验证码验证的json数据
     */
    public createVerifyCodeData = () => {
        let a = new RandomUtils().getRandomInt(1, 9)
        let b = new RandomUtils().getRandomInt(1, 9)
        let sum = a + b
        this.conditonsyzmJson = `${a},${b},${sum}`
    }

    /**
     * 获取红包验证码数字
     */
    public getVerifyCodeData = () => {
        let json = this.conditonsyzmJson.split(',')
        return {
            a: json[0],
            b: json[1],
            sum: json[2]
        }
    }

    /**
     * 设置用户已经点击验证码验证过了
     */
    public setUserVerify = (tgId: string) => {
        if (!this.verifyUser || this.verifyUser == '') {
            this.verifyUser = tgId
            return
        }
        if (this.verifyUser.indexOf(tgId) < 0) {
            this.verifyUser = `${this.verifyUser},${tgId}`
        }
    }

    /**
     * 判断当前用户是否已经完成验证码的验证
     */
    public getUserIsVerify = (ctx: Context) => {
        let tgId = ContextUtil.getUserId(ctx)
        if (this.conditonsyzm == 0) {
            // 不需要进行验证码验证
            return true
        }
        if (!this.verifyUser || this.verifyUser == '') {
            return false
        }
        let arr = this.verifyUser.split(',')
        // 用户已经验证成功了可以正常领取红包
        return arr.indexOf(tgId) > -1;
    }

    /**
     * 获取验证码红包随机生成的验证码列表
     */
    public getVerifyBtnList = (): Array<string> => {
        if (!this.verifyBtn || this.verifyBtn == '') {
            return []
        }
        let arr: string[] = this.verifyBtn.split(',')
        if (arr.length < 1) {
            return []
        }
        return arr
    }

    /**
     * 根据红包金额和红包类型生成分化json
     */
    public createJson = () => {
        if (this.hbType == 0) {
            // 均分包处理
            this.jeJson = new RandomUtils().averageAllocate(Number(this.money), this.num).toString()
            console.log('均分包结果', this.jeJson)
        } else {
            // 随机包处理
            this.jeJson = new RandomUtils().randomAllocate(Number(this.money), this.num).toString()
            console.log('随机包结果', this.jeJson)
        }
    }

    /**
     * 获取当前要领取的红包金额
     */
    public getReceiveMoney = () => {
        let arr = this.jeJson.split(',')
        return arr[this.jeIndex]
    }

    /**
     * 设置红包流水的领取条件
     */
    public setWaterJson = (json: RedPackConditionJsonType) => {
        this.conditionsJson = JSON.stringify(json)
    }

    /**
     * 获取红包流水的领取条件
     */
    public getConditionJson = (): RedPackConditionJsonType | null => {
        try {
            if (this.conditonsls == 1) {
                let result: RedPackConditionJsonType = {
                    time: 0,
                    money: ''
                }
                let json = JSON.parse(this.conditionsJson)
                result.time = json['time']
                result.money = json['money']
                return result
            }
        } catch (err) {
            return null
        }
        return null
    }


    // ---------------------- 下面的是在 redis 中临时存储数据的一些方法
    /**
     * 当前发送红包进度
     *      1、进入添加红包页面
     *      2、已完成金额选择
     *      3、设置当前的红包类型(均分还是随机)
     */
    process: number

    /**
     * 初始化数据、设置发送红包进度为 1
     * @param ctx
     */
    public init = async (ctx: Context) => {
        let botHb = new BotHb()
        botHb.process = 1
        await redis.set(this.getRedisKey(ctx), JSON.stringify(botHb))
        return false
    }

    /**
     * 设置发送红包的金额类型
     *      设置发送红包进度为2
     */
    public saveWalletType = async (ctx: Context, wallType: WalletType) => {
        let botHb = await this.getRedisData(ctx)
        if (!botHb || botHb.process != 1) {
            await this.errHandle(ctx)
            return false
        }

        botHb.process = 2
        botHb.walletType = wallType
        await redis.set(this.getRedisKey(ctx), JSON.stringify(botHb))
        return true
    }

    /**
     * 设置当前的红包类型(均分还是随机)
     *      设置发送红包进度为3
     */
    public saveMiddleType = async (ctx: Context, type: number | null) => {
        let tgId: number = ctx.callbackQuery?.from.id ?? 0
        let botHb = await this.getRedisData(ctx)
        if (!botHb) {
            await this.errHandle(ctx)
            return false
        }
        if (botHb.process != 2 || type == null) {
            await this.errHandle(ctx)
            return false
        }
        botHb.process = 3
        botHb.hbType = type
        await redis.set(this.getRedisKey(ctx), JSON.stringify(botHb))
        await redis.del('currentop' + tgId)
        await redis.set('currentop' + tgId, 'hongbaoMoney')
        let redisData = await redis.get('currentop' + tgId)
        return true
    }

    /**
     * 保存红包金额字段
     *      设置当前发送红包进度为4
     */
    public saveMoney = async (ctx: Context, money: string) => {
        let botHb = await this.getRedisData(ctx)
        let tgId: number = ctx.message?.from.id ?? 0

        // 金额输入错误重新发送金额输入
        if (money.isMoney()) {
            await redis.set('currentop' + tgId, 'hongbaoMoney')
            await new MessageTipUtils().moneyRuleErr(ctx, '红包')
            return false
        }
        // redis 中数据不存在 | 进度不同步回退
        if (!botHb || botHb.process != 3) {
            return this.errHandle(ctx)
        }

        // 用来判断发送金额是否符合
        let userModel = new UserModel().getUserModel(ctx)
        if (new ComputeUtils(money).comparedTo(1) < 0) {
            await new MessageTipUtils().minMoneyTips(ctx)
            return false
        }
        if (new ComputeUtils((await userModel).getBalance(botHb.walletType)).comparedTo(money) < 0) {
            redis.set('currentop' + tgId, 'hongbaoMoney')
            await new MessageTipUtils().balanceNotErr(ctx)
            return false
        }

        await redis.set('currentop' + tgId, 'hongbaoLength')
        botHb.money = money
        botHb.process = 4
        redis.set(this.getRedisKey(ctx), JSON.stringify(botHb))
        return true
    }

    /**
     * 保存红包数量字段
     *      设置当前发送红包进度为5
     */
    public saveLength = async (ctx: Context, length: string) => {
        let tgId: number = ctx.message?.from.id ?? 0
        let botHb = await this.getRedisData(ctx)
        //  数量输入错误重新发送金额输入
        if (!length.isMoney()) {
            redis.set('currentop' + tgId, 'hongbaoLength')
            await new MessageTipUtils().lengthRuleErr(ctx, '红包')
            return false
        }

        // redis 中数据不存在 | 进度不同步回退
        if (!botHb || botHb.process != 4) {
            return this.errHandle(ctx)
        }

        // 判断红包数量是否超出
        if (new ComputeUtils(length).comparedTo(999) > 0) {
            redis.set('currentop' + tgId, 'hongbaoLength')
            await new MessageTipUtils().maxLengthTip(ctx)
            return false
        }

        redis.set('currentop' + tgId, 'hongbaoLength')
        botHb.num = Number(length)
        botHb.process = 5
        redis.set(this.getRedisKey(ctx), JSON.stringify(botHb))
        return true
    }

    /**
     * 开始支付
     */
    public startPay = async (ctx: Context, userModel: UserModel) => {
        let botHb = await this.getRedisData(ctx)
        let tgId: number = ctx.callbackQuery?.from.id ?? 0

        // redis 中数据不存在 | 进度不同步回退
        if (!botHb || botHb.process != 5) {
            return this.errHandle(ctx)
        }
        // 判断用户余额是否充足
        if (new ComputeUtils(userModel.getBalance(botHb.walletType)).comparedTo(1) < 0) {
            await new MessageTipUtils().minMoneyTips(ctx)
            return false
        }
        if (new ComputeUtils((await userModel).getBalance(botHb.walletType)).comparedTo(botHb.walletType) < 0) {
            redis.set('currentop' + tgId, 'hongbaoMoney')
            await new MessageTipUtils().balanceNotErr(ctx)
            return false
        }

        // 判断红包数量是否过多
        if (new ComputeUtils(botHb.num).comparedTo(999) > 0) {
            await new MessageTipUtils().maxLengthTip(ctx)
            return false
        }
        return true
    }

    /**
     * 设置数据
     */
    public setModelData = (jsonStr: string) => {
        let json = JSON.parse(jsonStr)
        this.process = json['process'] ?? 0
        this.walletType = json['walletType'] ?? WalletType.USDT
        this.hbType = json['hbType'] ?? 0
        this.money = json['money'] ?? '0'
        this.num = json['num'] ?? 0
    }


    /**
     * 获取redis key
     * @param ctx
     */
    private getRedisKey = (ctx: Context) => {
        return RedisHandle.RedPacketRedisKey + ContextUtil.getUserId(ctx)
    }

    /**
     * 判断 redis 数据是否存在
     * @param ctx
     * @param isTips 是否自动提示数据不存在
     * @return true: 存在
     */
    public getRedisData = async (ctx: Context, isTips = false): Promise<BotHb | null> => {
        let exists = await redis.exists(this.getRedisKey(ctx))
        if (exists == 1) {
            let json = await redis.get(this.getRedisKey(ctx))
            if (!json) {
                return null
            }
            this.setModelData(json)
            return this
        }
        return null
    }

    /**
     * 操作失败统一处理
     */
    public errHandle = async (ctx: Context) =>{
        await new MessageTipUtils().handleErr(ctx)
        await new MessageUtils().removeMessage(ctx)
        await new WalletRedPacket(ctx).addRedPacket()
    }
}

export default BotHb
