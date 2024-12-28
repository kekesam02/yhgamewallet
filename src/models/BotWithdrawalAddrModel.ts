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
     * 货币对应地址
     */
    @Column({
        name: 'tg_id'
    })
    tgId: string


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
