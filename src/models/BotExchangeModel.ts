import {Column, PrimaryGeneratedColumn, Entity, BaseEntity} from "typeorm";


/**
 * 今日汇率、用于闪兑换
 */
@Entity({
    name: 'bot_exchange'
})
class BotExchangeModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'del'
    })
    del: number

    @Column({
        name: 'exchange_type'
    })
    exchange_type: string

    /**
     * TRX 兑换 USDT 汇率
     */
    @Column({
        name: 'proportion'
    })
    proportion: string

    /**
     * 获取 TRX 转 USDT 汇率
     */
    public getTRXRate = async (): Promise<string> => {
        let result = await BotExchangeModel
            .createQueryBuilder()
            .where('exchange_type = :exchangeType', {
                exchangeType: 1
            })
            .getOne()
        return result?.proportion ?? ''
    }
}


export default BotExchangeModel
