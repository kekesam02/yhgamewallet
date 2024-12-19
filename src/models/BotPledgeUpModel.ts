import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import WalletType from "../typeEnums/WalletType";
import ContextUtil from "../commons/ContextUtil";
import {Context} from "telegraf";


/**
 * 上押表
 */
@Entity({
    name: 'bot_pledge_up'
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
     * 查询上注记录
     * @param: 查询条数
     */
    public getHistory = (ctx: Context, total: number,) => {
        return BotPledgeUpModel
            .createQueryBuilder()
            .where('user_id = :userId', {
                userId: ContextUtil.getUserId(ctx)
            })
            .take(total)
            .orderBy('create_time', 'DESC')
            .getMany()
    }
}



export default BotPledgeUpModel
