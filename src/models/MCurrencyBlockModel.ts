import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * 块高
 * 每次扫块的时候会更新 current_height
 */
@Entity({
    name: 'm_currency_block'
})
class MCurrencyBlockModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 币种名称，例如：BTC
     */
    @Column({
        name: 'currency'
    })
    currency: string

    /**
     * 快高
     */
    @Column({
        name: 'current_height',
        default: 0
    })
    currentHeight: number
}
export default MCurrencyBlockModel
