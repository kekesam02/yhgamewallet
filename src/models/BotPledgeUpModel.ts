import {BaseEntity, Column, createConnection, Entity, getConnection, PrimaryGeneratedColumn} from "typeorm";
import WalletType from "../type/WalletType";
import ContextUtil from "../commons/ContextUtil";
import {Context} from "telegraf";
import BotRoundModel from "./BotRoundModel";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import GameEnumsIndex from "../type/gameEnums/GameEnumsIndex";
import UserModel from "./UserModel";
import MessageUtils from "../commons/message/MessageUtils";
import GameBotHtml from "../html/gameHtml/GameBotHtml";
import GameController from "../botGame/gameController/GameController";
import BotOddsModel from "./BotOddsModel";
import AESUtils from "../commons/AESUtils";
import OrderUtils from "../commons/OrderUtils";
import BotGameModel from "./BotGameModel";
import ComputeUtils from "../commons/ComputeUtils";


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
        gameTypeList: Array<GameTypeEnum> = new GameEnumsIndex().getGameTypeAll()
    ) => {
        let result = BotPledgeUpModel
            .createQueryBuilder()
            .where('user_id = :userId', {
                userId: ContextUtil.getUserId(ctx)
            })
            .whereGameType(gameTypeList)
            .take(total)
            .orderBy('create_time', 'DESC')
            .getMany()
        return result
    }

    /**
     * 用户上注
     * @param ctx
     * @param roundId: 游戏期数
     * @param money: 下注金额
     * @param group: 群组信息
     * @param content: 下注内容
     * @param gameData: 针对于数字下注 / 下注内容
     * @param odds: 赔率表
     */
    public createNewPledgeUp = async (
        ctx: Context,
        roundId: number,
        money: string,
        group: BotGameModel,
        content: string,
        gameData: string,
        odds: BotOddsModel
    ) => {
        return createConnection().then(async connection => {
            // 用户对象
            let userModel = await new UserModel().getUserModel(ctx)
            if (!await this.userBalanceJudge(ctx, userModel, money, roundId, content)) {
                // 用户余额不足
                return
            }
            if (money == '梭哈') {
                if (new ComputeUtils(userModel.CUSDT).comparedTo(1) >= 0) {
                    money = userModel.CUSDT
                } else if (new ComputeUtils(userModel.USDT).comparedTo(1) >= 0) {
                    money = userModel.USDT
                } else {
                    // 如果彩U和U都小于1、提示用户余额不足
                    if (!await this.userBalanceJudge(ctx, userModel, money, roundId, content)) {
                        // 用户余额不足
                        return
                    }
                }
            }
            let wallType = userModel.CUSDT >= money? WalletType.CUSDT: WalletType.USDT

            let upId = new OrderUtils().createPledgeUpModelId()
            this.tgId = AESUtils.decodeUserId(userModel.tgId)
            this.roundId = roundId
            this.amountMoney = money
            this.gameType = group.gameType
            this.bettingType = odds.id
            this.upId = upId
            this.walletType = wallType
            this.gameData = content
            this.content = content
            this.groupId = group.groupId
            this.isWinning = 0
            this.winningAmount = '0'
            this.userName = userModel.userName
            this.isSm = 2
            this.state = 0
            this.del = 0
            if (wallType == WalletType.USDT) {
                userModel.USDT = new ComputeUtils(userModel.USDT).minus(money).toString()
            } else {
                userModel.CUSDT = new ComputeUtils(userModel.CUSDT).minus(money).toString()
            }
            await userModel.updateUser()
            await BotPledgeUpModel.save(this)
            throw new Error('出错了')
        })
    }

    /**
     * 用户余额判断
     */
    private userBalanceJudge = async (
        ctx: Context,
        userModel: UserModel,
        money: string,
        roundId: number,
        content: string
    ) => {
        if (
            new ComputeUtils(userModel.USDT).comparedTo(1) >= 0 &&
            new ComputeUtils(userModel.CUSDT).comparedTo(1) >= 0
        ) {
            // 判断用户余额小于1提示用户余额不足
            await new MessageUtils().sendTextReply(
                ctx,
                new GameBotHtml().getBalanceNot(userModel, roundId, content),
                new GameController().createTopUpBtn().reply_markup.inline_keyboard
            )
            return false
        }
        if (money == '梭哈') {
            // 梭哈处理
            return true
        }
        if (
            new ComputeUtils(userModel.USDT).comparedTo(money) >= 0 &&
            new ComputeUtils(userModel.CUSDT).comparedTo(money) >= 0
        ) {
            // 判断用户余额小于1提示用户余额不足
            await new MessageUtils().sendTextReply(
                ctx,
                new GameBotHtml().getBalanceNot(userModel, roundId, content),
                new GameController().createTopUpBtn().reply_markup.inline_keyboard
            )
            return false
        }
        return true
    }
}



export default BotPledgeUpModel
