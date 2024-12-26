// @ts-nocheck
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import WalletType from "../type/WalletType";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import {Context} from "telegraf";
import ContextUtil from "../commons/ContextUtil";
import BotGameModel from "./BotGameModel";
import BotExchangeModel from "./BotExchangeModel";
import ComputeUtils from "../commons/ComputeUtils";
import TimeUtils from "../commons/date/TimeUtils";
import PaymentType from "../type/PaymentType";
import UserModel from "./UserModel";
import userModel from "./UserModel";
import CommonEnumsIndex from "../type/CommonEnumsIndex";
import OrderUtils from "../commons/OrderUtils";
import {DefectListType} from "../type/BotGameType/BotGameType";
import GameDefectHtml from "../html/gameHtml/GameDefectHtml";
import MessageUtils from "../commons/message/MessageUtils";
import BotPledgeUpModel from "./BotPledgeUpModel";
import database, {queryRunner} from "../config/database";
import ScheduleHandle from "../commons/ScheduleHandle";

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
        name: 'user_id',
        default:''
    })
    tgId: string

    /**
     * 用户
     */
    @Column({
        name: 'uid'
    })
    userId: number

    /**
     * 用户名称
     */
    @Column({
        name: 'username'
    })
    username: string

    /**
     * 用户昵称
     */
    @Column({
        name: 'nickname'
    })
    nickname: string

    /**
     * 订单类型
     */
    @Column({
        name: 'payment_type'
    })
    paymentType: PaymentType

    /**
     * 支付类型的名称
     */
    @Column({
        name: 'payment_type_name'
    })
    paymentTypeName: string

    /**
     * 充值之前
     */
    @Column({
        name: 'balance_before'
    })
    balanceBefore: string

    /**
     * 充值之后
     */
    @Column({
        name: 'balance_after'
    })
    balanceAfter: string

    /**
     * 备注，提现的订单号
     */
    @Column({
        name: 'payment_method',
        default: null
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
     *  0: 减少
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
        name: 'del',
        default: 0
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
     * 保存用户订单对象
     * @param userModel 用户
     * @param gameType 游戏类型
     * @param paymentType  订单类型
     * @param wallType 金额类型
     * @param money 金额
     * @param linkAddr 充值之类的链接地址 / 订单id
     */
    public createPaymentModel = (
        userModel: UserModel,
        gameType: GameTypeEnum,
        paymentType: PaymentType,
        wallType: WalletType,
        money: string,
        linkAddr: string = ScheduleHandle.pc28Config.roundId ?? new OrderUtils().createPaymentModelId()
    ) =>{
        this.tgId = userModel.tgId
        this.username = userModel.userName
        this.nickname = userModel.nickName
        this.paymentType = paymentType
        this.paymentTypeName = new CommonEnumsIndex().getPaymentTypeStr(paymentType)
        this.balanceBefore = userModel.getBalance(wallType)
        this.balanceAfter = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType) == 1
            ? new ComputeUtils(userModel.getBalance(wallType)).add(money).toString()
            : new ComputeUtils(userModel.getBalance(wallType)).minus(money).toString()
        this.paymentTypeNumber = linkAddr
        this.paymentAmount = money
        this.operateType = new CommonEnumsIndex().getPaymentAddOrReduce(paymentType)
        this.walletType = wallType
        this.gameType = gameType
        return this
    }

    /**
     * 获取用户流水分类列表
     *      周流水、日流水、总流水之类的
     */
    public getUserWaterClass = async (ctx: Context) => {
        // trx 当前汇率
        let TRXRate = await new BotExchangeModel().getTRXRate()
        let {gameType, resultList} = await new BotPaymentModel().getUserWater(ctx, [
            PaymentType.SZ
        ])
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
     * @param ctx
     * @param paymentTypeList: 支付类型
     * @param gameTypeList: 查询的游戏类型
     * @param pageSize: 查询的数据条数
     *      0: 查询所有数据
     *      1: 查询指定条数数据
     */
    public getUserWater = async (
        ctx: Context,
        paymentTypeList: Array<PaymentType>,
        gameTypeList: Array<GameTypeEnum> = [
            GameTypeEnum.TOUZI ,
            GameTypeEnum.PC28DI ,
            GameTypeEnum.PC28GAO ,
            GameTypeEnum.TOUZIFS ,
            GameTypeEnum.PC28DIFS ,
            GameTypeEnum.PC28GAOFS ,
            GameTypeEnum.TOUZIJS ,
            GameTypeEnum.PCDWQ ,
            GameTypeEnum.PCDWQFS
        ],
        pageSize: number = 0
    ): Promise<{
        gameType: GameTypeEnum,
        resultList: Array<BotPaymentModel>
    }> => {
        let groupId = ContextUtil.getGroupId(ctx)

        // 查询当前群组信息
        let gameModel = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :groupId', {
                groupId: groupId
            })
            .getOne()

        // 查询订单表
        let query = BotPaymentModel
            .createQueryBuilder()
            .where('user_id = :tgId', {
                tgId: ContextUtil.getUserId(ctx)
            })
            .whereGameType(gameTypeList)
            .wherePaymentType(paymentTypeList)
            .andWhere('del = 0')
            .andWhere('(wallet_type = :walletType or wallet_type = :walletType2)', {
                walletType: WalletType.USDT,
                walletType2: WalletType.TRX,
            })
            .orderBy('create_time', 'DESC')
        if (pageSize > 0) {
            query.take(pageSize)
        }
        let result = await query.getMany()
        return {
            gameType: gameModel!.gameType,
            resultList: result
        }
    }

    /**
     * 用户反水
     * @param ctx
     * @param groupModel
     * @param userModel
     */
    public startDefect = async (ctx, groupModel: BotGameModel, userModel: UserModel) => {
        // 最近的一次反水记录
        let near = await this.getUserDefect(ctx)
        // 需要反水的订单
        let paymentList = await BotPaymentModel
            .createQueryBuilder()
            .where('user_id = :tgId', {
                tgId: ContextUtil.getUserId(ctx)
            })
            .andWhere('payment_type = :paymentType', {
                paymentType: PaymentType.SZ
            })
            .andWhere('del = 0')
            .whereTime(
                near? near.createTime: '',
                ''
            )
            .getMany()

        // 没有需要反水的订单
        if (paymentList.length <= 0) {
            return  this.sendFSTOGroup(ctx, [], near)
        }

        // 需要反水的数据列表
        let needList = this.defectResultHandle(paymentList, userModel)
        let saveList = []

        // 没有需要反水的订单
        if (paymentList.length <= 0) {
            return  this.sendFSTOGroup(ctx, [], near)
        }

        needList.forEach(item => {
            saveList.push(new BotPaymentModel().createPaymentModel(
                userModel,
                groupModel.gameType,
                PaymentType.FS,
                item.wallType,
                item.backMoney
            ))
        })
        await queryRunner.startTransaction('REPEATABLE READ')
        try {
            await queryRunner.manager.save(saveList)
            await queryRunner.manager.save(userModel)
            let html = new GameDefectHtml().createDefectHtml(needList, near? near.createTime: '')
            await new MessageUtils().sendTextReply(ctx, html)
            await queryRunner.commitTransaction()
        } catch (err) {
            await queryRunner.rollbackTransaction()
        }
    }

    /**
     * 获取用户当前下注列表数据
     * @param roundId
     */
    public getPaymentModelList = ({
        roundId
    }: {
        roundId: string
    }) => {
        return BotPaymentModel
            .createQueryBuilder()
            .where('payment_type_number = :paymentTypeNumber', {
                paymentTypeNumber: roundId
            })
            .andWhere('del = 0')
            .getMany()
    }




    // ------------- 下面主要上当前对象的一些私有方法

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

    /**
     * 发送反水消息到群组
     */
    private sendFSTOGroup = async (ctx, needList: DefectListType, near: BotPaymentModel | null) => {
        let html = new GameDefectHtml().createDefectHtml(needList, near? near.createTime: '')
        await new MessageUtils().sendTextReply(ctx, html)
    }

    /**
     * 获取用户最近一次的反水数据
     */
    public getUserDefect = async (ctx): Promise<BotPaymentModel | null> => {
        return BotPaymentModel
            .createQueryBuilder()
            .where('user_id = :tgId', {
                tgId: ContextUtil.getUserId(ctx)
            })
            .andWhere('payment_type = :paymentType', {
                paymentType: PaymentType.FS
            })
            .orderBy('create_time', 'DESC')
            .getOne()
    }


    /**
     * 获取需要反水的数据列表
     */
    private defectResultHandle = (paymentList: Array<BotPaymentModel>, user: UserModel): DefectListType => {
        let result = [
            { wallType: WalletType.USDT, waterMoney: '0', backMoney: '0' },
            { wallType: WalletType.CUSDT, waterMoney: '0', backMoney: '0'  },
            { wallType: WalletType.TRX, waterMoney: '0', backMoney: '0'  },
            { wallType: WalletType.CTRX, waterMoney: '0', backMoney: '0'  },
            { wallType: WalletType.JIFEN, waterMoney: '0', backMoney: '0'  },
        ]
        paymentList.forEach(item => {
            switch (item.walletType) {
                case WalletType.USDT:
                    result[0].waterMoney = new ComputeUtils(result[0].waterMoney).add(item.paymentAmount).toString()
                    break
                case WalletType.CUSDT:
                    result[1].waterMoney = new ComputeUtils(result[1].waterMoney).add(item.paymentAmount).toString()
                    break
                case WalletType.TRX:
                    result[2].waterMoney = new ComputeUtils(result[2].waterMoney).add(item.paymentAmount).toString()
                    break
                case WalletType.CTRX:
                    result[3].waterMoney = new ComputeUtils(result[3].waterMoney).add(item.paymentAmount).toString()
                    break
                case WalletType.JIFEN:
                    result[4].waterMoney = new ComputeUtils(result[4].waterMoney).add(item.paymentAmount).toString()
                    break
            }
        })
        // 过滤出需要反水的数据列表
        result = result.filter(item => {
            if (item.waterMoney >= 100) {
                item.backMoney = new ComputeUtils(item.waterMoney).multiplied(0.002).toString()
                switch (item.wallType) {
                    case WalletType.USDT:
                        user.USDT = new ComputeUtils(user.USDT).add(item.backMoney).getValue()
                        break
                    case WalletType.TRX:
                        user.TRX = new ComputeUtils(user.TRX).add(item.backMoney).getValue()
                        break
                    case WalletType.JIFEN:
                        user.KK = new ComputeUtils(user.KK).add(item.backMoney).getValue()
                        break
                    case WalletType.CUSDT:
                        user.CUSDT = new ComputeUtils(user.CUSDT).add(item.backMoney).getValue()
                        break
                    case WalletType.CTRX:
                        user.CTRX = new ComputeUtils(user.CTRX).add(item.backMoney).getValue()
                        break

                }
                return true
            }
        })
        return result
    }

}


export default BotPaymentModel
