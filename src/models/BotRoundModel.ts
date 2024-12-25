import {BaseEntity, Between, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import moment from "moment";
import {Pc28LotteryJsonType} from "../type/gameEnums/LooteryJsonType";
import WinningTypeConfirm from "../botGame/const/WinningTypeConfirm";
import BotGameConfig from "../botGame/BotGameConfig";
import ComputeUtils from "../commons/ComputeUtils";


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
     * 获取开奖回合数据
     */
    public getRoundList = (
        startTime: string,
        endTime: string
    ) => {
        let start = moment(startTime)
        let end = moment(endTime)
        return BotRoundModel.createQueryBuilder()
            .where(Between(
                start.format('YYYY-MM-DD HH:mm:ss'),
                end.format('YYYY-MM-DD HH:mm:ss')
            ))
            .getMany()
    }

    /**
     * 保存开奖数据到数据库
     */
    public saveRound = (
        json: Pc28LotteryJsonType,
        gameType: GameTypeEnum,
        entertained: number
    ) => {
        let curr = json.data[0]
        let arr = json.data[0].open_code.split(',')
        let winnerType = new WinningTypeConfirm().getLotteryDescPC28DI(curr.open_code, gameType)
        console.log('获取到的开奖结果', winnerType.code)
        console.log('获取到的开奖结果', winnerType.form)
        let result = curr.open_code.split(',')
        let resultStr = ''
        let sum = new ComputeUtils(0)
        result.map((item, index) => {
            if (index == 0) {
                resultStr = item
            } else {
                resultStr = `${resultStr}+${item}`
            }
            sum.add(item)
        })
        resultStr = `${resultStr}=${sum}`
        this.roundId = Number(curr.expect)
        this.result = resultStr
        this.specialCode = winnerType.code.key.replaceAll(',', '')
        this.form = winnerType.form.key
        this.roundType = gameType
        this.fpTime = moment(curr.open_time).subtract(new BotGameConfig().FPTime, 'seconds').format('YYYY-MM-DD HH:mm:ss')
        this.kjTime = curr.open_time
        this.entertained = entertained
        this.numOne = Number(arr[0])
        this.numTwo = Number(arr[1])
        this.numThree = Number(arr[2])
        console.log('保存开奖信息到数据库')
        return BotRoundModel.save(this)
    }

    /**
     * 获取上次开奖结果
     */
    public getPrevResult = () => {

    }
}




export default BotRoundModel
