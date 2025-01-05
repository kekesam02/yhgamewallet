import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import ExchangeEnum from "../type/WalletType/ExchangeEnum";


/**
 * 闪兑
 */
@Entity({
    name: 'bot_sd'
})
class BotSD {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'tg_id'
    })
    tg_id: string

    @Column({
        name: 'exchange_type'
    })
    exchangeType: ExchangeEnum

    @Column({
        name: 'to_after_money'
    })
    toAfterMoney: string

    @Column({
        name: 'to_before_money'
    })
    toBeforeMoney: string

    @Column({
        name: 'from_before_money'
    })
    fromBeforeMoney: string

    @Column({
        name: 'from_after_money'
    })
    fromAfterMoney: string

    @Column({
        name: 'create_time'
    })
    createTime: string

    @Column({
        name: 'update_time'
    })
    updateTime: string

}


export default BotSD
