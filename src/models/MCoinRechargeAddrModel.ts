import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity({
    name: 'm_coin_recharge_addr'
})
class MCoinRechargeAddrModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 货币，如BTC
     */
    @Column({
        name: 'currency',
        default: 0
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
     * 创建时间
     */
    @Column({
        name: 'create_time'
    })
    createTime: string
}
export default MCoinRechargeAddrModel
