import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import {Context} from "telegraf";
import ContextUtil from "../commons/ContextUtil";


@Entity({
    name: 'bot_game'
})
class BotGameModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 游戏状态
     *      0: 未开始
     *      1: 正在游戏
     */
    @Column({
        name: 'game_state',
        default: 1
    })
    gameState: number

    /**
     * 开启游戏的用户tgId
     */
    @Column({
        name: 'bot_user_id'
    })
    botUserId: string

    /**
     * 是否删除
     *      0: 未删除
     *      1: 已经删除
     */
    @Column({
        default: 0
    })
    del: number

    /**
     * 游戏类型
     */
    @Column({
        name: 'game_type'
    })
    gameType: GameTypeEnum

    /**
     * 正在进行游戏的群组id
     */
    @Column({
        name: 'group_id'
    })
    groupId: string

    /**
     * 下注期数
     */
    @Column({
        name: 'xz_num',
        default: 0
    })
    xzNum: number

    /**
     * 类型 1公群不能切换游戏，2私聊 3私群 2和3可以更改游戏
     */
    @Column({
        name: 's_type',
        default: 0
    })
    sType: number

    /**
     * 获取当前游戏群组
     */
    public getCurrGroup = async (ctx: Context): Promise<BotGameModel> => {
        let groupId = ContextUtil.getGroupId(ctx)
        let groupModel = await BotGameModel.createQueryBuilder()
            .where('group_id = :groupId', {
                groupId: groupId
            })
            .getOne()
        return groupModel!
    }

    /**
     * 创建新的游戏记录
     */
    public createNewGame = (ctx: Context, gameType: GameTypeEnum = GameTypeEnum.PC28DI): Promise<BotGameModel> => {
        let groupId = ContextUtil.getGroupId(ctx)
        let userId = ContextUtil.getUserId(ctx)
        this.gameState = 1
        this.botUserId = userId
        this.gameType = gameType
        this.groupId =  groupId
        return BotGameModel.save(this)
    }
}


export default BotGameModel
