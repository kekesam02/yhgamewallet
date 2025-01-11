import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * 开业活动、开业豪礼、首充返利这些信息
 */
@Entity({
    name: 'bot_kyhuodong'
})
class BotKyHuodongModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户tgId
     */
    @Column({
        name: 'tg_id',
        default:''
    })
    tgId: string

    /**
     * 用户Id
     */
    @Column({
        name: 'user_id',
        default:0
    })
    userId: number

    /**
     * 用户名称
     */
    @Column({
        name: 'username',
        default:''
    })
    username: string

    /**
     * 用户昵称
     */
    @Column({
        name: 'nickname',
        default:''
    })
    nickname: string

    /**
     * 彩金总额/首充对应返利标准/邀请返利累加
     */
    @Column({
        name: 'cjje'
    })
    cjje: string

    /**
     * 分发天数
     */
    @Column({
        name: 'ffday',
        default: ''
    })
    ffday: string

    /**
     * 彩金挡位/首充对应返利比例/邀请人返利货币 usdt/trx
     */
    @Column({
        name: 'cjdw',
        default: 0
    })
    cjdw: number

    /**
     * 已经发放次数/邀请是否领取返利 0默认1领取了
     */
    @Column({
        name: 'fafcs',
        default: 0
    })
    fafcs: number

    /**
     * 活动类型 1为开业充值，2为每日首充返利 3.邀请返利
     */
    @Column({
        name: 'hdtype',
        default: 0
    })
    hdtype: number

    /**
     * 删除状态 0未删除 1删除
     */
    @Column({
        name: 'del',
        default: 0
    })
    del: number

    /**
     * 开始时间
     */
    @Column({
        name: 'ks_time',
        default: ''
    })
    ksTime: string

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
}

export default BotKyHuodongModel
