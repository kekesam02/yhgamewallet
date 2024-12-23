import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * 扫块就是扫的这里面的地址、查U机器人
 */
@Entity({
    name: 'm_coin_recharge_addr_pool'
})
class MCoinRechargeAddrPoolModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 货币，如BTC
     */
    @Column({
        name: 'currency'
    })
    currency: string

    /**
     * 货币对应地址
     */
    @Column({
        name: 'address'
    })
    address: string

    /**
     * 私钥地址
     */
    @Column({
        name: 'private_key'
    })
    privateKey: string

    /**
     * 用户名
     */
    @Column({
        name: 'username'
    })
    username: string

    /**
     * 昵称
     */
    @Column({
        name: 'nickname'
    })
    nickname: string

    /**
     * 用户TGID
     */
    @Column({
        name: 'tg_id'
    })
    tgId: string

    /**
     * 充值用户
     */
    @Column({
        name: 'user_id',
        default: 0
    })
    userId: number

    @Column({
        name: 'create_time'
    })
    createTime: string
}
export default MCoinRechargeAddrPoolModel
