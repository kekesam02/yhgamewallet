import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({
    name: 'bot_odds'
})
class BotOddsModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 赔率 下注入 1 中奖金额 = 1 * 赔率
     */
    @Column()
    odds: number

    /**
     * 赔偿描述文字
     *      比如： 顺子 / 豹子 / 对子 / 小单
     */
    @Column()
    name: string

    /**
     * 游戏类型
     */
    @Column({
        name: 'game_type'
    })
    gameType: number

    /**
     * 别名
     */
    @Column()
    alias: string

    /**
     * 最下下注金额
     */
    @Column({
        name: 'zd'
    })
    minMoney: number

    /**
     * 最大下注金额
     */
    @Column({
        name: 'zg'
    })
    maxMoney: number
}


export default BotOddsModel
