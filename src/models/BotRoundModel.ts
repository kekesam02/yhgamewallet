import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import GameTypeEnum from "../typeEnums/gameEnums/GameTypeEnum";


@Entity({
    name: 'bot_round'
})
class BotRoundModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 游戏回合数 / 第几期
     */
    @Column({
        name: 'round_id'
    })
    roundId: number

    /**
     * 开奖结果
     */
    @Column()
    result: string

    /**
     * 特码：  大双、小双之类的
     */
    @Column({
        name: 'special_code'
    })
    specialCode: string

    /**
     * 形态: 对子、顺子、杂子
     */
    @Column()
    form: string

    /**
     * 游戏类型 参考： GameTypeEnum
     */
    @Column({
        name: 'round_type'
    })
    roundType: number

    /**
     * 封盘时间
     */
    @Column({
        name: 'fp_time'
    })
    fpTime: string

    /**
     * 开奖时间
     */
    @Column({
        name: 'kj_time'
    })
    kjTime: string

    /**
     * 是否获取到开奖结果
     *      0: 未能获取到开奖结果
     *      1: 正常获取到开奖结果
     */
    @Column()
    entertained: number

    /**
     * 开奖的第一个结果
     */
    @Column({
        name: 'num_one'
    })
    numOne: number

    /**
     * 开奖的第二个结果
     */
    @Column({
        name: 'num_two'
    })
    numTwo: number

    /**
     * 开奖的第三个结果
     */
    @Column({
        name: 'num_three'
    })
    numThree: number
}




export default BotRoundModel
