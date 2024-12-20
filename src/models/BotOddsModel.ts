// @ts-nocheck
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";


/**
 * 赔率表
 */
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
    odds: string

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

    /**
     * 根据游戏类型获取赔率表列表数据
     */
    public getOddsList = (gameTypeList: Array<GameTypeEnum>) => {
        console.log('什么东西', gameTypeList)
        return BotOddsModel
            .createQueryBuilder()
            .whereGameType(gameTypeList)
            .getMany()
    }
}


export default BotOddsModel
