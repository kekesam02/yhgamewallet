import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
import WalletType from "../type/WalletType";
import ContextUtil from "../commons/ContextUtil";
import {Context} from "telegraf";
import BotRoundModel from "./BotRoundModel";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import GameEnumsIndex from "../type/gameEnums/GameEnumsIndex";



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
    roundId: string

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
     *      1： 取消上注
     *      2： 正常上注
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
     * 查询上注记录携带游戏期数数据
     */
    // public getRoundHistory = async (
    //     ctx: Context,
    //     groupModel: BotGameModel,
    //     total: number
    // ) => {
    //     console.log('开始查询游戏数据')
    //     try {
    //         let query = BotPledgeUpModel
    //             .createQueryBuilder('bot_pledge_up')
    //             // .leftJoinAndSelect(
    //             //     'bot_pledge_up.roundModel',
    //             //     'roundModel'
    //             // )
    //             .where('user_id = :userId', {
    //                 // userId: ContextUtil.getUserId(ctx)
    //                 userId: 'c0Vzdi99QV9jtqfQ1cmzzw=='
    //             })
    //             .take(total)
    //             .orderBy('bot_pledge_up.create_time', 'DESC')
    //         let result = await query.getMany()
    //         let startTime = moment(result[result.length - 1].createTime).subtract('1', 'days')
    //         let oddsList = await new BotRoundModel().getRoundList(startTime, moment().format('YYYY-MM-DD hh:mm:ss'))
    //         console.log('开奖数据')
    //         result.forEach(item => {
    //             let odds = oddsList.find(item2 => {
    //                 return item.roundId == item2.id
    //             })
    //             if (odds) {
    //                 item.roundModel = odds
    //             }
    //         })
    //         return result
    //     } catch (err) {
    //         console.log('报错了', err)
    //         return []
    //     }
    // }
}



export default BotPledgeUpModel
