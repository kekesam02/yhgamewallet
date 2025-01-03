import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * 如果充值成功通知用户、添加用户余额
 */
@Entity({
    name: 'bot_invite_link'
})
class BotInviteLinkModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 机器人ID
     */
    @Column({
        name: 'tg_id'
    })
    tgId: string

    /**
     * 用户ID
     */
    @Column({
        name: 'user_id'
    })
    userId: number

    /**
     * 昵称
     */
    @Column({
        name: 'nickname'
    })
    nickname: string

    /**
     * 姓名
     */
    @Column({
        name: 'username'
    })
    username: string


    /**
     * 邀请链接
     */
    @Column({
        name: 'link'
    })
    link: string

    /**
     * 窗口ID
     */
    @Column({
        name: 'chat_id'
    })
    chatId: string

    /**
     * 删除状态
     */
    @Column({
        name: 'del',
        default:0
    })
    del: number

    /**
     * 生成时间
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
}
export default BotInviteLinkModel
