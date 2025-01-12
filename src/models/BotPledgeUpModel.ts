// @ts-nocheck
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import WalletType from "../type/WalletType";
import ContextUtil from "../commons/ContextUtil";
import {Context} from "telegraf";
import BotRoundModel from "./BotRoundModel";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import GameEnumsIndex from "../type/gameEnums/GameEnumsIndex";
import UserModel from "./UserModel";
import MessageUtils from "../commons/message/MessageUtils";
import GameBotHtml from "../html/gameHtml/GameBotHtml";
import GameController from "../botWallet/controller/GameController";
import BotOddsModel from "./BotOddsModel";
import OrderUtils from "../commons/OrderUtils";
import BotGameModel from "./BotGameModel";
import ComputeUtils from "../commons/compute/ComputeUtils";
import {queryRunner} from "../config/database";
import BotPaymentModel from "./BotPaymentModel";
import PaymentType from "../type/PaymentType";
import AESUtils from "../commons/AESUtils";
import CommonEnumsIndex from "../type/CommonEnumsIndex";


/**
 * 上押表
 */
@Entity({
    name: 'bot_pledge_up',
})
class BotPledgeUpModel extends BaseEntity {
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
     * 回合id/游戏期数
     */
    @Column({
        name: 'round_id'
    })
    roundId: number

    /**
     * 用户上押金额
     */
    @Column({
        name: 'amount_money'
    })
    amountMoney: string

    /**
     * 游戏类型
     */
    @Column({
        name: 'game_type'
    })
    gameType: number

    /**
     * 下注类型
     */
    @Column({
        name: 'betting_type'
    })
    bettingType: number

    /**
     * 上押id
     */
    @Column({
        name: 'up_id'
    })
    upId: number

    /**
     * 钱包类型
     */
    @Column({
        name: 'wallet_type'
    })
    walletType: WalletType

    /**
     * 针对于数字下注 / 下注内容
     */
    @Column({
        name: 'game_data'
    })
    gameData: string

    /**
     * 下注内容
     */
    @Column({
        name: 'content'
    })
    content: string

    /**
     * 群组id
     */
    @Column({
        name: 'group_id'
    })
    groupId: string

    /**
     * 是否中奖
     *      1: 中奖
     */
    @Column({
        name: 'is_winning_lottery'
    })
    isWinning: number

    /**
     * 中奖金额
     */
    @Column({
        name: 'winning_amount'
    })
    winningAmount: string

    /**
     * 用户tg名称
     */
    @Column({
        name: 'tg_user_name'
    })
    userName: string

    /**
     * 是否私密
     *      1: 私密
     *      2: 公开
     */
    @Column({
        name: 'is_sm'
    })
    isSm: number

    /**
     * 是否取消上注（好像和是否删除一样）
     *      -1： 取消上注
     *      0： 正常上注
     *      1: 完成上注(停止上注了不能在取消订单了)
     */
    @Column({
        name: 'state'
    })
    state: number

    /**
     * 是否删除 1： 删除
     */
    @Column({
        name: 'del',
        default: 0
    })
    del: number

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

    // 数据库外键有问题
    // @OneToOne(
    //     () => BotRoundModel,
    //     roundModel => roundModel.id
    // )
    // @JoinColumn()
    roundModel?: BotRoundModel

    /**
     * 查询上注记录
     * @param: 查询条数
     */
    public getHistory = (
        ctx: Context,
        total: number,
        gameTypeList: Array<GameTypeEnum> = new GameEnumsIndex().getGameTypeAll(),
        wallTypeList: Array<WalletType> = new GameEnumsIndex().getWallTypeAll()
    ) => {
        let result = BotPledgeUpModel
            .createQueryBuilder()
            .where('user_id = :userId', {
                userId: ContextUtil.getUserId(ctx)
            })
            .whereGameType(gameTypeList)
            .whereWalletType(wallTypeList)
            .andWhere('del = 0')
            .take(total)
            .orderBy('create_time', 'DESC')
            .getMany()
        return result
    }

    /**
     * 根据当前期数所有下注的用户
     * @param roundId: 当前游戏期数
     * @param tgId: 用户id
     * @param gameTypeList
     * @param state 订单状态 0 还未锁死下注订单
     */
    public getUserList = async (
        roundId: string,
        tgId: string | null = null,
        gameTypeList: Array<GameTypeEnum> = new CommonEnumsIndex().getAllGameType(),
        state: string = '0'
    ): Promise<Array<BotPledgeUpModel>> => {
        let query = BotPledgeUpModel
            .createQueryBuilder()
            .where('round_id = :roundId', {
                roundId: roundId
            })
            .whereGameType(gameTypeList)
        if (tgId) {
            query.andWhere('user_id = :tgId', {
                tgId: tgId
            })
        }
        return await query.andWhere('state = :state', {
                state: state
            })
            .andWhere('del = 0')
            .getMany()
    }

    /**
     * 用户上注
     * @param ctx
     * @param roundId: 游戏期数
     * @param group: 群组信息
     * @param pledgeUpInfo: 下注信息对象
     */
    public createNewPledgeUp = async (
        ctx: Context,
        group: BotGameModel,
        pledgeUpInfo: PledgeUpInfoType
    ) => {
        await queryRunner.startTransaction()

        try {
            let userModelList = await queryRunner.manager.find(UserModel, {
                where: {
                    tgId: AESUtils.encodeUserId(ctx?.from?.id.toString())
                }
            }) as Array<UserModel>
            if (userModelList.length < 0) {
                return
            }
            let userModel = userModelList[0]
            if (!await this.userBalanceJudge(ctx, userModel, pledgeUpInfo.totalMoney, pledgeUpInfo.roundId, pledgeUpInfo)) {
                // 用户余额不足
                return
            }
            let updateResult = await this.getUpdatePledgeUpList(ctx, pledgeUpInfo, userModel, group)
            userModel = updateResult.userModel
            let updatePledgeUpList = updateResult.pledgeUpList
            let paymentModelList = updateResult.paymentModelList

            await queryRunner.manager.save(userModel as UserModel)
            let wallType = updatePledgeUpList[0].walletType
            await queryRunner.manager.save(updatePledgeUpList)
            await queryRunner.manager.save(paymentModelList)
            let html = new GameBotHtml().getBettingHtml(userModel, pledgeUpInfo, wallType)
            await new MessageUtils().sendTextReply(ctx, html)
            await queryRunner.commitTransaction()
        } catch (err) {
            console.log('出现错误了进行回滚', err)
            await queryRunner.rollbackTransaction()
        }
    }

    /**
     * 用户用户下注信息(只能更新上注金额、中奖金额、上注状态之类的、其他的更新可能会导致数据对不上)
     */
    public updatePledgeUpList = (list: Array<BotPledgeUpModel>) => {
        return BotPledgeUpModel.save(list)
    }

    /**
     * 取消上注(取消用户本期所有的下注内容)
     */
    public cancelPledgeUp = async (ctx: Context, groupModel: BotGameModel, roundId: string) => {
        let userModel = await new UserModel().getUserModel(ctx)
        let pledgeModelList = await this.getUserList(
            `${ScheduleHandle.pc28Config.roundId}`,
            userModel.tgId,
            [groupModel.gameType],
            '0'
        )
        pledgeModelList.forEach(item => {
            item.state = -1
            item.del = 1
            userModel.updateUserMoney(item.walletType, item.amountMoney)
        })
        let paymentList = await new BotPaymentModel().getPaymentModelList({
            roundId
        }, [groupModel.gameType])
        paymentList.forEach(item => {
            item.del = 1
        })
        await queryRunner.startTransaction()
        try{
            console.log('开始取消下注')
            await queryRunner.manager.save(pledgeModelList)
            await queryRunner.manager.save(userModel)
            await queryRunner.manager.save(paymentList)
            await queryRunner.commitTransaction()
        } catch (err) {
            console.log('出现错误了进行回滚', err)
            await queryRunner.rollbackTransaction()
        }
        return {
            userModel,
            pledgeModelList
        }
    }


    // -------------- 下面是一些基础的方法

    /**
     * 获取需要更新的数据列表
     * @param ctx
     * @param pledgeUpInfo: 下注信息列表
     * @param userModel: 用户对象
     * @param group 群组
     */
    private getUpdatePledgeUpList = async (
        ctx: Context,
        pledgeUpInfo: PledgeUpInfoType,
        userModel: UserModel,
        group: BotGameModel
    ): Promise<{
        userModel: UserModel;
        pledgeUpList: BotPledgeUpModel[],
        // 用户订单对象更新
        paymentModelList: BotPaymentModel[]
    }> => {
        let totalMoney = '0'
        let wallType = WalletType.USDT
        // 需要更新的订单对象
        let paymentModelList: BotPaymentModel[] = []
        if (pledgeUpInfo.list[0].command == '梭哈') {
            if (new ComputeUtils(userModel.CUSDT).comparedTo(1) >= 0) {
                totalMoney = userModel.CUSDT
                userModel.CUSDT = '0'
                wallType = WalletType.CUSDT
            } else if (new ComputeUtils(userModel.USDT).comparedTo(1) >= 0) {
                totalMoney = userModel.USDT
                userModel.USDT = '0'
            } else {
                // 如果彩U和U都小于1、提示用户余额不足
                if (!await this.userBalanceJudge(ctx, userModel, totalMoney, pledgeUpInfo.roundId, pledgeUpInfo)) {
                    // 用户余额不足
                    return
                }
            }
            let upId = new OrderUtils().createPledgeUpModelId()
            let pledgeUp = new BotPledgeUpModel()
            pledgeUp.tgId = userModel.tgId
            pledgeUp.roundId = pledgeUpInfo.roundId
            pledgeUp.amountMoney = totalMoney
            pledgeUp.gameType = group.gameType
            pledgeUp.bettingType = pledgeUpInfo.list[0].odds.id
            pledgeUp.upId = upId
            pledgeUp.walletType = wallType
            pledgeUp.gameData = pledgeUpInfo.list[0].content
            pledgeUp.content = pledgeUpInfo.list[0].content
            pledgeUp.groupId = group.groupId
            pledgeUp.isWinning = 0
            pledgeUp.winningAmount = '0'
            pledgeUp.userName = userModel.userName
            pledgeUp.isSm = group.groupId.indexOf('-') > -1? 2: 1
            pledgeUp.state = 0
            pledgeUp.del = 0
            pledgeUpInfo.totalMoney = totalMoney

            let paymentModel = new BotPaymentModel().createPaymentModel(
                userModel,
                group.gameType,
                PaymentType.SZ,
                wallType,
                totalMoney
            )
            return {
                userModel: userModel,
                pledgeUpList: [
                    pledgeUp
                ],
                paymentModelList: [paymentModel]
            }
        }
        // 返回的更新数据列表
        let pledgeUpList: Array<BotPledgeUpModel> = []
        for (let i = 0; i < pledgeUpInfo.list.length; i++) {
            console.log('私密状态', group.groupId.indexOf('-') > -1? 2: 1)
            let item = pledgeUpInfo.list[i]
            // 当前下注钱包类型
            wallType = new ComputeUtils(userModel.CUSDT).comparedTo(item.money) >= 0? WalletType.CUSDT: WalletType.USDT
            let money = item.money
            let pledgeUp = new BotPledgeUpModel()
            pledgeUp.tgId = userModel.tgId
            pledgeUp.roundId = pledgeUpInfo.roundId
            pledgeUp.amountMoney = item.money
            pledgeUp.gameType = group.gameType
            pledgeUp.bettingType = item.odds.id
            pledgeUp.upId = new OrderUtils().createPledgeUpModelId()
            pledgeUp.walletType = wallType
            pledgeUp.gameData = item.content
            pledgeUp.content = item.content
            pledgeUp.groupId = group.groupId
            pledgeUp.isWinning = 0
            pledgeUp.winningAmount = '0'
            pledgeUp.userName = userModel.userName
            pledgeUp.isSm = group.groupId.indexOf('-') > -1? 2: 1
            pledgeUp.state = 0
            pledgeUp.del = 0
            pledgeUpList.push(pledgeUp)

            let paymentModel = new BotPaymentModel().createPaymentModel(
                userModel,
                group.gameType,
                PaymentType.SZ,
                wallType,
                item.money
            )
            if (wallType == WalletType.USDT) {
                userModel.USDT = new ComputeUtils(userModel.USDT).minus(money).toString()
            } else {
                userModel.CUSDT = new ComputeUtils(userModel.CUSDT).minus(money).toString()
            }
            paymentModelList.push(paymentModel)
        }
        return {
            userModel: userModel,
            pledgeUpList: pledgeUpList,
            paymentModelList : paymentModelList
        }
    }


    /**
     * 用户余额判断
     */
    private userBalanceJudge = async (
        ctx: Context,
        userModel: UserModel,
        money: string,
        roundId: number,
        pledgeUpInfo: PledgeUpInfoType
    ) => {
        if (
            new ComputeUtils(userModel.USDT).comparedTo(1) < 0 &&
            new ComputeUtils(userModel.CUSDT).comparedTo(1) < 0
        ) {
            // 判断用户余额小于1提示用户余额不足
            await new MessageUtils().sendTextReply(
                ctx,
                new GameBotHtml().getBalanceNot(userModel, roundId, pledgeUpInfo),
                new GameController().createTopUpBtn().reply_markup.inline_keyboard
            )
            return false
        }
        if (money == '梭哈') {
            // 梭哈处理
            return true
        }

        if (
            new ComputeUtils(userModel.CUSDT).comparedTo(0) > 0 &&
            new ComputeUtils(userModel.CUSDT).comparedTo(money) < 0
        ) {
            // 判断用户余额小于1提示用户余额不足
            await new MessageUtils().sendTextReply(
                ctx,
                new GameBotHtml().getBalanceNot(userModel, roundId, pledgeUpInfo),
                new GameController().createTopUpBtn().reply_markup.inline_keyboard
            )
            return false
        }

        // USDT下注金额不够
        if(new ComputeUtils(userModel.USDT).comparedTo(money) < 0) {
            await new MessageUtils().sendTextReply(
                ctx,
                new GameBotHtml().getBalanceNot(userModel, roundId, pledgeUpInfo),
                new GameController().createTopUpBtn().reply_markup.inline_keyboard
            )
            return false
        }
        return true
    }
}

/**
 * 下注参数类型
 */
export type PledgeUpInfoType = {
    // 当前下注总金额
    totalMoney: string,

    // 期数
    roundId: number,

    // 整理后的数据列表
    list: Array<{

        // 下注金额
        money: string,

        // 下注内容
        content: string,

        // 下注指令(单、双、顺子之类的)
        command: string

        // 赔率对象
        odds: BotOddsModel
    }>
}


export default BotPledgeUpModel
