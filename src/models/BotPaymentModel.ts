import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import WalletType from "../typeEnums/WalletType";
import GameTypeEnum from "../typeEnums/gameEnums/GameTypeEnum";
import {Context} from "telegraf";
import ContextUtil from "../commons/ContextUtil";
import BotGameModel from "./BotGameModel";
import BotExchangeModel from "./BotExchangeModel";
import ComputeUtils from "../commons/ComputeUtils";
import TimeUtils from "../commons/TimeUtils";
import PaymentType from "../typeEnums/PaymentType";

/**
 * 用户流水表
 */
@Entity({
    name: 'bot_payment'
})
class BotPaymentModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户tgId
     */
    @Column({
        name: 'user_id'
    })
    tgId: string

    /**
     * 赔率 下注入 1 中奖金额 = 1 * 赔率
     */
    @Column({
        name: 'payment_type'
    })
    paymentType: PaymentType

    /**
     * 备注，提现的订单号
     */
    @Column({
        name: 'payment_method'
    })
    paymentMethod: number

    /**
     * 支付类型对应的号充值对应充值单号/上押对应上押号
     */
    @Column({
        name: 'payment_type_number'
    })
    paymentTypeNumber: string

    /**
     * 支付金额
     */
    @Column({
        name: 'payment_amount'
    })
    paymentAmount: string

    /**
     * 是增加还是减少
     *  1: 增加
     *  2: 减少
     */
    @Column({
        name: 'operate_type'
    })
    operateType: number

    /**
     * 是否删除
     *      0: 正常数据
     *      1: 数据已删除
     */
    @Column({
        name: 'del'
    })
    del: number

    /**
     * 钱包类型
     */
    @Column({
        name: 'wallet_type'
    })
    walletType: WalletType

    /**
     * 游戏类型
     */
    @Column({
        name: 'game_type'
    })
    gameType: GameTypeEnum

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
     * 获取用户流水分类列表
     *      周流水、日流水、总流水之类的
     */
    public getUserWaterClass = async (ctx: Context) => {
        // trx 当前汇率
        let TRXRate = await new BotExchangeModel().getTRXRate()
        let {gameType, resultList} = await new BotPaymentModel().getUserWater(ctx, [PaymentType.SZ])
        return this.tidyPaymentList(
            gameType,
            resultList,
            (waterData: ComputeUtils, item: BotPaymentModel) => {
                if (item.walletType === WalletType.TRX) {
                    return waterData.add(new ComputeUtils(item.paymentAmount).multiplied(TRXRate))
                }
                return waterData.add(new ComputeUtils(item.paymentAmount))
            }
        )
    }

    /**
     * 获取用户盈亏数据
     */
    public getUserProfitLoss = async (ctx: Context) => {
        // trx 当前汇率
        let TRXRate = await new BotExchangeModel().getTRXRate()
        let {gameType, resultList} = await new BotPaymentModel().getUserWater(ctx, [
            PaymentType.SZ,
            PaymentType.ZJ,
            PaymentType.FS
        ])
        return this.tidyPaymentList(
            gameType,
            resultList,
            (waterData: ComputeUtils, item: BotPaymentModel) => {
                if (item.walletType === WalletType.TRX) {
                    if (item.paymentType === PaymentType.SZ) {
                        return waterData.minus(new ComputeUtils(item.paymentAmount).multiplied(TRXRate))
                    }
                    return waterData.add(new ComputeUtils(item.paymentAmount).multiplied(TRXRate))
                }
                if (item.paymentType === PaymentType.SZ) {
                    return waterData.minus(new ComputeUtils(item.paymentAmount))
                }
                return waterData.add(new ComputeUtils(item.paymentAmount))
            }
        )
    }

    /**
     * 获取用户流水总数据列表
     */
    public getUserWater = async (
        ctx: Context,
        paymentTypeList: Array<PaymentType>
    ): Promise<{
        gameType: GameTypeEnum,
        resultList: Array<BotPaymentModel>
    }> => {
        let groupId = ContextUtil.getGroupId(ctx)
        let paymentTypeParams: any = {}
        let paymentTypeStr = paymentTypeList.length > 1? '(': ''
        paymentTypeList.forEach((item, index) => {
            paymentTypeParams[`paymentType${index}`] = item
            if (index > 0) {
                paymentTypeStr += ` or payment_type = :paymentType${index}`
            } else {
                paymentTypeStr += `payment_type = :paymentType${index}`
            }
        })
        paymentTypeStr += paymentTypeList.length > 1? ')': ''
        let gameModel = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :groupId', {
                groupId: groupId
            })
            .getOne()
        let result = await BotPaymentModel
            .createQueryBuilder()
            .where('user_id = :tgId', {
                tgId: ContextUtil.getUserId(ctx)
            })
            .andWhere('del = 0')
            .andWhere(paymentTypeStr, paymentTypeParams)
            .andWhere('(wallet_type = :walletType or wallet_type = :walletType2)', {
                walletType: WalletType.USDT,
                walletType2: WalletType.TRX,
            })
            .getMany()
        return {
            gameType: gameModel!.gameType,
            resultList: result
        }
    }

    /**
     * 根据时间段整理用户流水数据列表
     * @param gameType: 当前群组游戏类型
     * @param resultList: 查询到的数据
     * @param wrap: 列表数据回掉处理函数
     *      waterData: 当前的金额对象
     *      item: 当前循环的item
     */
    private tidyPaymentList = async (
        gameType: GameTypeEnum,
        resultList: Array<BotPaymentModel>,
        wrap: (waterData: ComputeUtils, item: BotPaymentModel) => ComputeUtils
    ) => {
        // 总流水
        let totalWater = new ComputeUtils(0)
        // 总支付列表
        let totalList: Array<BotPaymentModel> = []
        // 周流水
        let weekWater = new ComputeUtils(0)
        // 一周内支付数据列表
        let weekList: Array<BotPaymentModel> = []
        // 今日流水
        let dayWater = new ComputeUtils(0)
        // 今日支付数据列表
        let dayList: Array<BotPaymentModel> = []
        let timeUtils = new TimeUtils()
        resultList.forEach(item => {
            // 如果钱包类型是trx 的话需要去计算 trx 当前汇率
            if (item.walletType === WalletType.TRX) {
                if (new ComputeUtils(item.paymentAmount).comparedTo(0) > 0) {
                    totalWater = wrap(totalWater, item)
                    if (timeUtils.getIsWeek(item.createTime)) {
                        weekWater = wrap(weekWater, item)
                    }
                    if (timeUtils.getIsDay(item.createTime)) {
                        dayWater = wrap(weekWater, item)
                    }
                }
            } else {
                if (new ComputeUtils(item.paymentAmount).comparedTo(0) > 0) {
                    totalWater = wrap(totalWater, item)
                    if (timeUtils.getIsWeek(item.createTime)) {
                        weekWater = wrap(weekWater, item)
                    }
                    if (timeUtils.getIsDay(item.createTime)) {
                        dayWater = wrap(dayWater, item)
                    }
                }
            }
            totalList.push(item)
            if (timeUtils.getIsWeek(item.createTime)) {
                weekList.push(item)
            }
            if (timeUtils.getIsDay(item.createTime)) {
                dayList.push(item)
            }
        })
        return {
            gameType: gameType,
            totalWater: totalWater,
            totalList: totalList,
            weekWater: weekWater,
            weekList: weekList,
            dayWater: dayWater,
            dayList: dayList
        }
    }
}


export default BotPaymentModel
