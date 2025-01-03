import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity({
    name: 'bot_withdrawal_addr'
})
class BotWithdrawalAddrModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 货币，如BTC
     */
    @Column({
        name: 'del',
        default: 0
    })
    del: number


    /**
     * 拥有者
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
     * 拥有者
     */
    @Column({
        name: 'nickname'
    })
    nickname: string

    /**
     * 用户名
     */
    @Column({
        name: 'username'
    })
    username: string


    /**
     * 货币对应地址
     */
    @Column({
        name: 'addr'
    })
    addr: string

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
export default BotWithdrawalAddrModel
