import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * 如果充值成功通知用户、添加用户余额
 */
@Entity({
    name: 'm_coin_recharge'
})
class MCoinRechargeModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户是否已经删除 0: 未删除  1: 已删除
     */
    @Column({
        name: 'addr'
    })
    addr: string

    /**
     * 充值类型：比如USDT
     */
    @Column({
        name: 'currency'
    })
    currency: string

    /**
     * 充值金额
     */
    @Column({
        name: 'amount',
        default: 0
    })
    amount: number

    /**
     * to充值地址
     */
    @Column({
        name: 'to_address'
    })
    toAddress: string

    /**
     * from充值地址
     */
    @Column({
        name: 'from_address'
    })
    fromAddress: string

    /**
     * 交易ID
     */
    @Column({
        name: 'txid'
    })
    txid: string

    /**
     * 是否gas
     */
    @Column({
        name: 'gas'
    })
    gas: string

    /**
     * 归集txid
     */
    @Column({
        name: 'guiji_txid'
    })
    guijiTxid: string

    /**
     * 状态：0未归集，1已归集，2已入账
     */
    @Column({
        name: 'status'
    })
    status: string

    /**
     * 归集时间
     */
    @Column({
        name: 'guiji_time'
    })
    guijiTime: string

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
     * 充值用户
     */
    @Column({
        name: 'user_id'
    })
    userId: string

    /**
     * 充值时间
     */
    @Column({
        name: 'create_time'
    })
    createTime: string
}
export default MCoinRechargeModel
