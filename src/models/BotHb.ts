import WalletType from "../type/WalletType";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


/**
 * 红包模型以字符串存储在 botPayment 库中
 */
@Entity({
    name: 'bot_hb'
})
class BotHb extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户tgId
     */
    @Column({
        name: 'user_id',
        default:''
    })
    tgId: string

    /**
     * 红包金额
     */
    @Column({
        name: 'hb_je'
    })
    money: string

    /**
     * 货币类型
     */
    @Column({
        name: 'hblx',
        default: 0
    })
    walletType: WalletType

    /**
     * 红包分化json 用于随机包
     */
    @Column({
        name: 'je_json',
        default: ''
    })
    je_json: string

    /**
     * 红包状态
     *      0: 进行中
     *      1: 已结束(默认24小时结束)
     */
    @Column({
        name: 'status',
        default: 1
    })
    status: number

    /**
     * 红包数量
     */
    @Column({
        name: 'hb_num'
    })
    num: number

    /**
     * 红包备注
     */
    @Column({
        name: 'preparation',
        default: ''
    })
    preparation: string

    /**
     * 领取红包验证码
     */
    @Column({
        name: 'conditonsyzm',
        default: ''
    })
    conditonsyzm: number

    /**
     * 领取红包条件对应的参数
     *      用于流水红包 近七天流水  近30天流水 本月流水 总流水 还有选择流水的金额 usdt金额 trx金额
     */
    @Column({
        name: 'conditions_json',
        default: ''
    })
    conditions_json: string

    /**
     * 红包类型
     *      0: 均分包
     *      1: 随机包
     */
    @Column({
        name: 'hb_type',
        default: 0
    })
    hb_type: number

    /**
     * 会员红包
     */
    @Column({
        name: 'conditonshy',
        default: 0
    })
    conditonshy: number

    /**
     * 流水红包
     */
    @Column({
        name: 'conditonsls',
        default: 0
    })
    conditonsls: number

    /**
     * 当前红包id
     */
    @Column({
        name: 'hb_id'
    })
    hbId: string

    /**
     * 验证码对应的json
     */
    @Column({
        name: 'conditonsyzm_json',
        default: ''
    })
    conditonsyzm_json: string
}

export default BotHb
