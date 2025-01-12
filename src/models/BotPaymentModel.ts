// @ts-nocheck
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import WalletType from "../type/WalletType";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import {Context} from "telegraf";
import ContextUtil from "../commons/ContextUtil";
import BotGameModel from "./BotGameModel";
import BotExchangeModel from "./BotExchangeModel";
import ComputeUtils from "../commons/compute/ComputeUtils";
import TimeUtils from "../commons/date/TimeUtils";
import PaymentType from "../type/PaymentType";
import UserModel from "./UserModel";
import CommonEnumsIndex from "../type/CommonEnumsIndex";
import OrderUtils from "../commons/OrderUtils";
import {DefectListType} from "../type/BotGameType/BotGameType";
import GameDefectHtml from "../html/gameHtml/GameDefectHtml";
import MessageUtils from "../commons/message/MessageUtils";
import {queryRunner} from "../config/database";
import AESUtils from "../commons/AESUtils";
import DateFormatUtils from "../commons/date/DateFormatUtils";
import botGameModel from "./BotGameModel";

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
        default: ''
    })
    tgId: string

    /**
     * 用户
     */
    @Column({
        name: 'uid'
    })
    uid: number

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
     * 备注，提现的订单号 / 红包金额类型
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
        name: 'payment_type_number',
        default:''
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
     * 实际金额
     */
    @Column({
        name: 'payment_real_amount'
    })
    paymentRealAmount: string

    /**
     * 是增加还是减少
     *  1: 增加
     *  0: 减少
     */
    @Column({
        name: 'operate_type',
        default:0
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
     * 订单状态 -- 转账，收款使用
     *      0: 初始状态 --转账
     *      1: 已转账 / 已收款 -- 转账
     *      0: 初始状态 --收款
     *      1: 发起收款 / 成功收款 -- 转账
     * ---------- 提现
     *     0 申请中
     *     1 已完成
     *     2 被拒绝
     * ---------- 上注
     *     0: 生成上注订单(此时上注订单可以取消)
     *     1: 正式完成上注(锁死订单不可更改)
     */
    @Column({
        name: 'status',
        default: 0
    })
    status: number

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
     * 申请时间
     */
    @Column({
        name: 'apply_time'
    })
    applyTime: string


    /**
     * 财务审核和拒绝时间
     */
    @Column({
        name: 'pass_time'
    })
    passTime: string

    /**
     * 审核人
     */
    @Column({
        name: 'pass_tgid'
    })
    passTgid: string


    /**
     * 审核人
     */
    @Column({
        name: 'pass_username'
    })
    passUsername: string

    /**
     * 审核昵称
     */
    @Column({
        name: 'pass_nickname'
    })
    passNickname: string

    /**
     * 聊天窗口
     */
    @Column({
        name: 'chat_id'
    })
    chatId: string

    /**
     * 备注
     */
    @Column({
        name: 'description',
        default:''
    })
    description: string

    /**
     * 分布式锁的互斥性处理
     * 防止：修改订单收款的冲突
     */
    @Column({
        name: 'version',
        default:1
    })
    version: number

    /**
     * 用于领取邀请返利
     * 0 未领取 1已领取
     */
    @Column({
        name: 'fanli',
        default:0
    })
    fanli: number

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
        linkAddr: string
    ) => {
        // 收款时间
        this.tgId = userModel.tgId
        this.username = userModel.userName
        this.nickname = userModel.nickName
        this.uid = userModel.id
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
        this.applyTime = DateFormatUtils.CurrentDateFormatString()
        this.del = 0
        this.status = 0
        return this
    }

    /**
     * 获取用户流水分类列表
     *      周流水、日流水、月流水、总流水之类的
     */
    public getUserWaterClass = async (ctx: Context, gameTypeList: Array<GameTypeEnum> = new CommonEnumsIndex().getAllGameType()) => {
        // trx 当前汇率
        let TRXRate = await new BotExchangeModel().getTRXRate()
        let {gameType, resultList} = await new BotPaymentModel().getUserWater(ctx, [
            PaymentType.SZ
        ], gameTypeList)
        return this.tidyPaymentList(
            gameType ?? GameTypeEnum.PC28DI,
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
    public getUserProfitLoss = async (ctx: Context, gameTypeList: Array<GameTypeEnum> = new CommonEnumsIndex().getAllGameType()) => {
        // trx 当前汇率
        let TRXRate = await new BotExchangeModel().getTRXRate()
        let {gameType, resultList} = await new BotPaymentModel().getUserWater(ctx, [
            PaymentType.SZ,
            PaymentType.ZJ,
            PaymentType.FS
        ], gameTypeList)
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
     * 根据 paymentNumber 获取红包订单
     * @param paymentNumber
     */
    public getPaymentByHB = async (paymentNumber: string) => {
        return await BotPaymentModel
            .createQueryBuilder()
            .where('payment_type_number = :paymentNumber', {
                paymentNumber: paymentNumber
            })
            .getMany()
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
            GameTypeEnum.TOUZI,
            GameTypeEnum.PC28DI,
            GameTypeEnum.PC28GAO,
            GameTypeEnum.TOUZIFS,
            GameTypeEnum.PC28DIFS,
            GameTypeEnum.PC28GAOFS,
            GameTypeEnum.TOUZIJS,
            GameTypeEnum.PCDWQ,
            GameTypeEnum.PCDWQFS
        ],
        pageSize: number = 0
    ): Promise<{
        gameType?: GameTypeEnum,
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
            .andWhere('status = 1')
            .andWhere('(wallet_type = :walletType or wallet_type = :walletType2 or wallet_type = :walletType3 or wallet_type = :walletType4)', {
                walletType: WalletType.USDT,
                walletType2: WalletType.TRX,
                walletType3: WalletType.CUSDT,
                walletType4: WalletType.CTRX,
            })
            .orderBy('create_time', 'DESC')
        if (pageSize > 0) {
            query.take(pageSize)
        }
        let result = await query.getMany()
        return {
            gameType: gameModel?.gameType,
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
        let near = await this.getUserDefect(ctx, groupModel)
        // 需要反水的订单
        let paymentList = await BotPaymentModel
            .createQueryBuilder()
            .where('user_id = :tgId', {
                tgId: ContextUtil.getUserId(ctx)
            })
            .andWhere('payment_type = :paymentType', {
                paymentType: PaymentType.SZ
            })
            .whereWalletType([WalletType.USDT])
            .whereGameType([groupModel.gameType])
            .andWhere('del = 0')
            .andWhere('status = 1')
            .whereTime(
                near ? near.createTime : '',
                ''
            )
            .getMany()

        // 没有需要反水的订单
        if (paymentList.length <= 0) {
            return this.sendFSTOGroup(ctx, [], near)
        }

        // 需要反水的数据列表
        let needList = this.defectResultHandle(paymentList, userModel, groupModel)
        let saveList = []

        // 没有需要反水的订单
        if (paymentList.length <= 0) {
            return this.sendFSTOGroup(ctx, [], near)
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
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.save(saveList)
            await queryRunner.manager.save(userModel)
            let html = new GameDefectHtml().createDefectHtml(needList, near ? near.createTime : '')
            await new MessageUtils().sendTextReply(ctx, html)
            await queryRunner.commitTransaction()
        } catch (err) {
            await queryRunner.rollbackTransaction()
        }
    }

    /**
     * 获取用户当前下注列表数据
     * @param roundId
     * @param gameType
     */
    public getPaymentModelList = (
        {
            roundId
        }: {
            roundId: string
        },
        gameType: Array<GameTypeEnum> = new CommonEnumsIndex().getAllGameType()
    ) => {
        return BotPaymentModel
            .createQueryBuilder()
            .where('payment_type_number = :paymentTypeNumber', {
                paymentTypeNumber: roundId
            })
            .whereGameType(gameType)
            .andWhere('del = 0')
            .getMany()
    }


    /**
     * 获取用户账单信息
     * @param tgId 用户tgId
     * @param wtype 1 USDT 2 TRX
     * @param ptype 操作类型
     * @param pageNo
     * @param pageSize
     */
    public static findPaymentByTgIdPage = async (tgId: number, wtype: WalletType, ptype: PaymentType, pageNo: number, pageSize: number) => {
        const aesTgId = AESUtils.encodeUserId(tgId.toString())
        var selectQueryBuilder = BotPaymentModel.createQueryBuilder()
            .where('user_id = :tgId and del = 0', {
                tgId: aesTgId
            });

        var countSelectQueryBuilder = BotPaymentModel.createQueryBuilder()
            .where('user_id = :tgId and del = 0', {
                tgId: aesTgId
            });

        // 钱包类型 1usdt 2 trx
        if (wtype > 0) {
            selectQueryBuilder.andWhere('wallet_type = :wtype', {'wtype': wtype})
            countSelectQueryBuilder.andWhere('wallet_type = :wtype', {'wtype': wtype})
        }

        if(ptype > 0 ){
            selectQueryBuilder.andWhere('payment_type = :ptype', {'ptype': ptype})
            countSelectQueryBuilder.andWhere('payment_type = :ptype', {'ptype': ptype})
        }
        // 求总数
        const {total} = await countSelectQueryBuilder.select("count(1)", "total").getRawOne()
        // 总记录数
        const dataList = await selectQueryBuilder
            .orderBy('create_time', 'DESC')
            .skip((pageNo - 1) * pageSize)
            .take(pageSize)
            .getMany()
        // 分页数
        let pages = 0;
        if (total % pageSize == 0){
            pages = Math.floor(total / pageSize)
        }else{
            pages = Math.floor(total / pageSize) + 1
        }
        return {
            pageNo:pageNo,
            pageSize:pageSize,
            pages:pages,
            total: total,
            records: dataList
        }
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
        // 近30天流水
        let day30Water = new ComputeUtils(0)
        // 近30天 数据列表
        let day30List: Array<BotPaymentModel> = []
        // 月流水
        let monthWater = new ComputeUtils(0)
        // 月 数据列表
        let monthList: Array<BotPaymentModel> = []
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
                    if (timeUtils.getIsMonth(item.createTime)) {
                        monthWater = wrap(monthWater, item)
                    }
                    if (timeUtils.getIsDay30(item.createTime)) {
                        day30Water = wrap(day30Water, item)
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
                    if (timeUtils.getIsMonth(item.createTime)) {
                        monthWater = wrap(monthWater, item)
                    }
                    if (timeUtils.getIsDay30(item.createTime)) {
                        day30Water = wrap(day30Water, item)
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
            if (timeUtils.getIsMonth(item.createTime)) {
                monthList.push(item)
            }
            if (timeUtils.getIsDay30(item.createTime)) {
                day30List.push(item)
            }
        })
        return {
            gameType: gameType,
            totalWater: totalWater,
            totalList: totalList,
            day30Water: day30Water,
            day30List: day30List,
            monthWater: monthWater,
            monthList: monthList,
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
        let html = new GameDefectHtml().createDefectHtml(needList, near ? near.createTime : '')
        await new MessageUtils().sendTextReply(ctx, html)
    }

    /**
     * 获取用户最近一次的反水数据
     */
    public getUserDefect = async (ctx, groupModel: botGameModel): Promise<BotPaymentModel | null> => {
        return BotPaymentModel
            .createQueryBuilder()
            .where('user_id = :tgId', {
                tgId: ContextUtil.getUserId(ctx)
            })
            .andWhere('payment_type = :paymentType', {
                paymentType: PaymentType.FS
            })
            .whereGameType([groupModel.gameType])
            .orderBy('create_time', 'DESC')
            .getOne()
    }


    /**
     * 获取需要反水的数据列表
     */
    private defectResultHandle = (paymentList: Array<BotPaymentModel>, user: UserModel, groupModel: BotGameModel): DefectListType => {
        let result = [
            {wallType: WalletType.USDT, waterMoney: '0', backMoney: '0'},
            {wallType: WalletType.CUSDT, waterMoney: '0', backMoney: '0'},
            {wallType: WalletType.TRX, waterMoney: '0', backMoney: '0'},
            {wallType: WalletType.CTRX, waterMoney: '0', backMoney: '0'},
            {wallType: WalletType.JIFEN, waterMoney: '0', backMoney: '0'},
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
                item.backMoney = new ComputeUtils(item.waterMoney).multiplied(0.0025).toString()
                if (groupModel.gameType == GameTypeEnum.PC28GAO) {
                    item.backMoney = new ComputeUtils(item.waterMoney).multiplied(0.003).toString()
                }
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

    /**
     * 修改用户超24小时的转账
     * @param tgId
     */
    public static updateMoreThan24Hour = async(tgId:number)=>{
        if(tgId <= 0)return
        try {
            const aesTgId = AESUtils.encodeUserId(tgId.toString())
            // 修改超时的订单状态
            const botyPayments = await BotPaymentModel.createQueryBuilder().where("user_id=:tgId and payment_type = 10 and status = 0 and create_time < (NOW() - INTERVAL 24 HOUR)", {tgId: aesTgId}).getMany()
            if (botyPayments && botyPayments.length > 0 ) {
                for (let i = 0; i < botyPayments.length; i++) {
                    await queryRunner.startTransaction()
                    const botPayment = botyPayments[i]
                    // 操作时间
                    var applyTime = DateFormatUtils.CurrentDateFormatString()
                    // 1：查询收款人是否注册
                    let botUser: UserModel | null = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: botPayment.tgId}).getOne()
                    const userUsdt = botUser?.USDT || "0"
                    const backUserUsdt = parseFloat(botPayment.paymentAmount) + parseFloat(userUsdt)
                    // 修改订单信息
                    await queryRunner.manager.update(BotPaymentModel, {
                        id: botPayment.id,
                        version:botPayment.version
                    }, {
                        status: 2,//超时退回
                        balanceBefore: userUsdt,//退回之余额
                        balanceAfter: backUserUsdt.toString(),//退回之后余额
                        description: "超时自动退回",
                        passTime: applyTime,
                        passTgid: '1',
                        passUsername: "机器人退回",
                        passNickname: "机器人退回",
                        version:()=>{
                            return 'version + 1'
                        }
                    })
                    // 把退回的余额加回去
                    await queryRunner.manager.update(UserModel, {
                        id: botUser?.id
                    }, {
                        USDT: backUserUsdt.toString()
                    })

                    await queryRunner.commitTransaction()
                }
            }
        }catch (e){
            await queryRunner.rollbackTransaction()
        }
    }

    /**
     * 统计各类型订单的总金额
     * @param tgId
     * @param paymentType
     * @param walletType
     */
    public static chax = async (tgId:number,paymentType:PaymentType,walletType:WalletType)=>{
       const list2 = await BotPaymentModel.createQueryBuilder()
            .where("user_id = :tgId and payment_type = :ptype and wallet_type = :wtype and del = 0",{
                tgId:AESUtils.encodeUserId(tgId+''),
                ptype:paymentType,
                wtype:walletType
            }).getMany()
        var totalAmount = 0
        if(list2 && list2.length > 0) {
            for (let i = 0; i < list2.length; i++) {
                totalAmount += parseFloat(list2[i].paymentAmount)
            }
        }

        return totalAmount
    }
}


export default BotPaymentModel
