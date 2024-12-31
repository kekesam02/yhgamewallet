import BotPaymentModel from "../../../models/BotPaymentModel";
import WalletType from "../../../type/WalletType";
import {Context} from "telegraf";
import redis from "../../../config/redis";
import UserModel from "../../../models/UserModel";
import ComputeUtils from "../../../commons/ComputeUtils";
import MessageTipUtils from "../../../commons/message/MessageTipUtils";
import {queryRunner} from "../../../config/database";
import PaymentType from "../../../type/PaymentType";
import CommonEnumsIndex from "../../../type/CommonEnumsIndex";
import GameTypeEnum from "../../../type/gameEnums/GameTypeEnum";
import ContextUtil from "../../../commons/ContextUtil";
import RedisHandle from "../../../commons/redis/RedisHandle";
import MessageUtils from "../../../commons/message/MessageUtils";
import WalletRedPacket from "./WalletRedPacket";
import BotHb from "../../../models/BotHb";
import OrderUtils from "../../../commons/OrderUtils";


/**
 * 红包模型以字符串存储在 botPayment 库中
 */
class WalletRedPacketRedis {
    /**
     * 当前发送红包进度
     */
    process: number

    /**
     * 红包金额类型
     */
    walletType: WalletType

    /**
     * 红包类型
     *      0: 随机包
     *      1: 均分包
     */
    type: number

    /**
     * 红包金额
     */
    money: string

    /**
     * 红包数量
     */
    length: number

    constructor(
        process: number = 0,
        walletType: WalletType = WalletType.USDT,
        type: number = 0,
        money: string = '0'
    ) {
        this.process = process
        this.walletType = walletType
        this.type = type
        this.money = money
    }

    /**
     * 保存当前默认数据到 redis 中、设置进度为1
     * @param ctx
     */
    public saveInit = async (ctx: Context) => {
        let redPacket = await this.getRedisData(ctx)
        if (redPacket) {
            redPacket.process = 1
            redis.set(this.getRedisKey(ctx), JSON.stringify(redPacket))
            return true
        }
        await this.errHandle(ctx)
        return false
    }

    /**
     * 保存/更新 当前 redis 中金额类型数据
     */
    public saveWalletType = async (ctx: Context, wallType: WalletType) => {
        let redPacket = await this.getRedisData(ctx)
        if (redPacket) {
            if (redPacket.process != 1) {
                await this.errHandle(ctx)
                return false
            }
            redPacket.process = 2
            redPacket.walletType = wallType
            redis.set(this.getRedisKey(ctx), JSON.stringify(redPacket))
            return true
        }
        await this.errHandle(ctx)
        return false
    }

    /**
     * 设置当前的红包类型(均分还是随机)
     */
    public saveMiddleType = async (ctx: Context, type:any) => {
        this.type = type | 0
        let tgId: number = ctx.message?.from?.id || 0
        redis.set('currentop' + tgId, 'hongbao_money')
        let redPacket = await this.getRedisData(ctx)
        if (redPacket) {
            if (redPacket.process != 2 || type == null) {
                await this.errHandle(ctx)
                return false
            }
            redPacket.process = 3
            redPacket.type = type
            redis.set(this.getRedisKey(ctx), JSON.stringify(redPacket))
            return true
        }
        await this.errHandle(ctx)
        return false
    }

    /**
     * 保存红包金额字段
     */
    public saveMoney = async (ctx: Context, money: string) => {
        redis.set(this.getRedisKey(ctx), JSON.stringify(this))
        let redPacket = await this.getRedisData(ctx)

        // 金额输入错误重新发送金额输入
        if (isNaN(Number(money))) {
            let tgId: number = ctx.message?.from?.id || 0
            redis.set('currentop' + tgId, 'hongbao_money')
            await new MessageTipUtils().moneyRuleErr(ctx, '红包')
            return false
        }

        // redis 中数据不存在 | 进度不同步回退
        if (!redPacket || redPacket.process != 3) {
            return this.errHandle(ctx)
        }

        // 用来判断发送金额是否符合
        let userModel = new UserModel().getUserModel(ctx)
        if (new ComputeUtils(money).comparedTo(1) < 0) {
            await new MessageTipUtils().minMoneyTips(ctx)
            return false
        }
        let tgId: number = ctx.message?.from?.id || 0
        if (new ComputeUtils((await userModel).getBalance(redPacket.walletType)).comparedTo(money) < 0) {
            redis.set('currentop' + tgId, 'hongbao_money')
            await new MessageTipUtils().balanceNotErr(ctx)
            return false
        }

        redPacket.money = money
        redPacket.process = 4
        redis.set(this.getRedisKey(ctx), JSON.stringify(redPacket))
        return true
    }

    /**
     * 保存红包数量字段
     */
    public saveLength = async (ctx: Context, length: number) => {
        redis.set(this.getRedisKey(ctx), JSON.stringify(this))
        let redPacket = await this.getRedisData(ctx)

        //  数量输入错误重新发送金额输入
        if (isNaN(Number(length))) {
            let tgId: number = ctx.message?.from?.id || 0
            redis.set('currentop' + tgId, 'hongbao_length')
            await new MessageTipUtils().lengthRuleErr(ctx, '红包')
            return false
        }

        // redis 中数据不存在 | 进度不同步回退
        if (!redPacket || redPacket.process != 4) {
            return this.errHandle(ctx)
        }

        // 判断红包数量是否超出
        if (new ComputeUtils(length).comparedTo(999) > 0) {
            await new MessageTipUtils().maxLengthTip(ctx)
            return false
        }

        redPacket.length = length
        redPacket.process = 5
        redis.set(this.getRedisKey(ctx), JSON.stringify(redPacket))
        return true
    }

    /**
     * 开始支付
     */
    public startPay = async (ctx: Context, userModel:UserModel) => {
        let redPacket = await this.getRedisData(ctx)

        // redis 中数据不存在 | 进度不同步回退
        if (!redPacket || redPacket.process != 3) {
            return this.errHandle(ctx)
        }

        if (new ComputeUtils(userModel.getBalance(redPacket.walletType)).comparedTo(1) < 0) {
            await new MessageTipUtils().minMoneyTips(ctx)
            return false
        }
        let tgId: number = ctx.message?.from?.id || 0
        if (new ComputeUtils((await userModel).getBalance(redPacket.walletType)).comparedTo(redPacket.walletType) < 0) {
            redis.set('currentop' + tgId, 'hongbao_money')
            await new MessageTipUtils().balanceNotErr(ctx)
            return false
        }

        // 判断红包数量是否过多
        if (redPacket?.length > 999) {
            await new MessageTipUtils().maxLengthTip(ctx)
            return false
        }


    }

    /**
     * 设置数据
     */
    public setModelData = (jsonStr: string ) => {
        let json = JSON.parse(jsonStr)
        this.process = json['process'] ?? 0
        this.walletType = json['walletType'] ?? WalletType.USDT
        this.type = json['type'] ?? 0
        this.money = json['money'] ?? '0'
        return this
    }

    /**
     * 持久化存储
     *      删除 redis 中保存的红包数据、将数据存到 mysql 中去
     */
    public saveLocalData = async (ctx: Context) => {
        let userModel = await new UserModel().getUserModel(ctx)
        let redisData = await this.getRedisData(ctx)
        if (!redisData) {
            return false
        }
        await queryRunner.startTransaction()
        try {
            let hbId = new OrderUtils().createHbModelId()
            let botHb = new BotHb()
            botHb.tgId = ContextUtil.getUserId(ctx)
            botHb.money = redisData.money
            botHb.walletType = redisData.walletType
            botHb.status = 1
            botHb.num = redisData.length
            botHb.hbId = hbId
            await queryRunner.manager.save(botHb)

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
            await queryRunner.manager.save(payment)
            await queryRunner.commitTransaction()
            // 删除redis 数据
            redis.del(this.getRedisKey(ctx))
        } catch (err) {
            await queryRunner.rollbackTransaction()
        }
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
    public getRedisData = async (ctx: Context, isTips = false): Promise<WalletRedPacketRedis | null> => {
        let exists = await redis.exists(this.getRedisKey(ctx))
        console.log('获取到的结果', exists)
        if (exists == 1) {
            let json = await redis.get(this.getRedisKey(ctx)) ?? ''
            return new WalletRedPacketRedis().setModelData(json)
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

export default WalletRedPacketRedis
