import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


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
        name: 'game_state'
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
    @Column()
    del: number

    /**
     * 游戏类型
     */
    @Column({
        name: 'game_type'
    })
    gameType: number

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
        name: 'xz_num'
    })
    xzNum: number

    /**
     * 类型 1公群不能切换游戏，2私聊 3私群 2和3可以更改游戏
     */
    @Column({
        name: 's_type'
    })
    sType: number
}


export default BotGameModel
