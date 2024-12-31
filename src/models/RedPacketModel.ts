import WalletType from "../type/WalletType";
import redis from "../config/redis";
import {Context} from "telegraf";
import RedisHandle from "../commons/redis/RedisHandle";
import ContextUtil from "../commons/ContextUtil";
import BotPaymentModel from "./BotPaymentModel";
import {queryRunner} from "../config/database";
import UserModel from "./UserModel";
import CommonEnumsIndex from "../type/CommonEnumsIndex";
import ComputeUtils from "../commons/ComputeUtils";
import PaymentType from "../type/PaymentType";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import MessageTipUtils from "../commons/message/MessageTipUtils";


/**
 * 红包模型以字符串存储在 botPayment 库中
 */
class RedPacketModel {

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
    public saveInit = (ctx: Context) => {
        this.process = 1
        redis.set(this.getRedisKey(ctx), JSON.stringify(this))
        return true
    }

    /**
     * 保存/更新 当前 redis 中金额类型数据
     */
    public saveWalletType = (ctx: Context, wallType: WalletType) => {
        this.walletType = wallType
        redis.set(this.getRedisKey(ctx), JSON.stringify(this))
    }

    /**
     * 设置当前的红包类型(均分还是随机)
     */
    public saveMiddleType = (ctx: Context, type: number) => {
        this.type = type
        redis.set(this.getRedisKey(ctx), JSON.stringify(this))
    }

    /**
     * 保存红包金额字段
     */
    public saveMoney = (ctx: Context, money: string) => {
        this.money = money
        redis.set(this.getRedisKey(ctx), JSON.stringify(this))
    }

    /**
     * 设置数据
     */
    public setModelData = (jsonStr: string) => {
        let json = JSON.parse(jsonStr)
        this.process = json['process'] ?? 0
        this.walletType = json['walletType'] ?? WalletType.USDT
        this.type = json['type'] ?? 0
        this.money = json['money'] ?? '0'
    }

    /**
     * 持久化存储
     *      删除 redis 中保存的红包数据、将数据存到 mysql 中去
     */
    public saveLocalData = async (ctx: Context) => {
        let userModel = await new UserModel().getUserModel(ctx)
        await queryRunner.startTransaction()
        try {
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
            payment.paymentTypeNumber = JSON.stringify(this)
            payment.paymentAmount = this.money
            payment.operateType = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType)
            payment.walletType = this.walletType
            payment.gameType = GameTypeEnum.MEPTY
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
    private hasKey = async (ctx: Context, isTips = false): Promise<boolean> => {
        let exists = await redis.exists(this.getRedisKey(ctx))
        console.log('获取到的结果', exists)
        if (exists == 1) {
            if (isTips) {
                await new MessageTipUtils().handleErr(ctx)
            }
            return true
        } else {
            if (isTips) {
                await new MessageTipUtils().handleErr(ctx)
            }
            return false
        }
    }
}

export default RedPacketModel
