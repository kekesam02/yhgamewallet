import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * 如果充值成功通知用户、添加用户余额
 */
@Entity({
    name: 'bot_invite_user'
})
class BotInviteUserModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 邀请人
     */
    @Column({
        name: 'inviter_tg_id'
    })
    inviterTgId: string

    /**
     * 邀请人
     */
    @Column({
        name: 'inviter_user_id'
    })
    inviterUserId: number

    /**
     * 邀请人
     */
    @Column({
        name: 'inviter_username'
    })
    inviterUsername: string

    /**
     * 邀请人
     */
    @Column({
        name: 'inviter_nickname'
    })
    inviterNickname: string

    /**
     * 被邀请人
     */
    @Column({
        name: 'quilt_tg_id'
    })
    quiltTgId: string


    /**
     * 被邀请人
     */
    @Column({
        name: 'quilt_username'
    })
    quiltUsername: string

    /**
     * 被邀请人
     */
    @Column({
        name: 'quilt_nickname'
    })
    quiltNickname: string

    /**
     * 被邀请人
     */
    @Column({
        name: 'quilt_user_id',
        default:0
    })
    quiltUserId: number

    /**
     * 类型
     */
    @Column({
        name: 'type',
        default:0
    })
    linkType: number

    /**
     * 类型
     */
    @Column({
        name: 'del',
        default:0
    })
    del: number

    /**
     * 邀请时间
     */
    @Column({
        name: 'create_time'
    })
    createTime: string


    /* 邀请时间*/
    @Column({
        name: 'update_time'
    })
    updateTime: string
}
export default BotInviteUserModel
