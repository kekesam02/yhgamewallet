import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Context} from "telegraf";
import AESUtils from "../commons/AESUtils";


/**
 * 用户对象 bot_user
 */
@Entity({
    name: 'bot_user'
})
class UserModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'tg_id'
    })
    tgId: string

    @Column({
        name: 'usdt',
        default: '0'
    })
    USDT: string

    @Column({
        name: 'trx',
        default: '0'
    })
    TRX: string

    /**
     * 暂时没有用到(忘记干啥的了、好像是没用)
     */
    @Column({
        name: 'kk',
        default: '0'
    })
    KK: string

    @Column({
        name: 'create_time'
    })
    createTime: string

    @Column({
        name: 'update_time'
    })
    updateTime: string

    /**
     * 用户是否已经删除 0: 未删除  1: 已删除
     */
    @Column({
        name: 'del',
        default: 0
    })
    del: number

    /**
     * 充值地址
     */
    @Column({
        name: 'recharge_link',
        default: ''
    })
    rechargeLink: string

    @Column({
        name: 'user_name'
    })
    userName: string

    /**
     * 用户备注字段
     */
    @Column({
        name: 'notes',
        default: '无'
    })
    notes: string

    /**
     * vip 等级
     */
    @Column({
        name: 'vip',
        default: '0'
    })
    vip: number

    /**
     * 免密额度(转账、发红包时候不需要输入密码确认的额度)
     */
    @Column({
        name: 'withdrawal_limit',
        default: '100'
    })
    withdrawalLimit: string

    /**
     * 支付密码(转账、发红包等等操作输入的密码)
     */
    @Column({
        name: 'payment_password',
        default: ''
    })
    paymentPassword: string

    /**
     * 用户别名
     */
    @Column({
        name: 'nick_name'
    })
    nickName: string

    /**
     * 推广链接
     */
    @Column({
        name: 'promotion_link'
    })
    promotionLink: string

    /**
     * 警告次数
     */
    @Column({
        name: 'warn_num',
        default: 0
    })
    warnNum: number

    /**
     * 是否是活动用户
     *      0: 普通用户
     *      1: 活动用户
     */
    @Column({
        name: 'activity',
        default: 0
    })
    activity: number

    /**
     * 是否为风控用户
     *      0: 正常用户
     *      1: 风控用户
     */
    @Column({
        name: 'risk_management',
        default: 0
    })
    riskManagement: number

    /**
     * 当前货币(好像也没用)
     *      默认为USDT
     */
    @Column({
        name: 'currency_type',
        default: 0
    })
    currencyType: number

    /**
     * 彩U
     */
    @Column({
        name: 'cusdt',
        default: '0'
    })
    CUSDT: string

    /**
     * 彩金
     */
    @Column({
        name: 'ctrx',
        default: '0'
    })
    CTRX: string

    /**
     * 彩金设置的倍率（具体查看 cusdt_bl 彩U）
     */
    @Column({
        name: 'ctrx_bl',
        default: '3'
    })
    ctrxBl: string

    /**
     * 发放的彩金
     */
    @Column({
        name: 'send_ctrx',
        default: '0'
    })
    send_ctrx: string

    /**
     * 彩U设置的倍率
     *      比如：发送100彩金、设置倍率(cusdt_bl)为3、用户需要达到300流水才能将剩下的彩金提现
     *          用户当天流水金额 > send_cusdt(发放的彩U) * cusdt_bl(彩U倍率)    的时候才能将剩下的彩金提现
     */
    @Column({
        name: 'cusdt_bl',
        default: '3'
    })
    cusdtBl: string

    /**
     * 发放的彩U
     */
    @Column({
        name: 'send_cusdt',
        default: '0'
    })
    sendCusdt: string

    /**
     * 暂时不知道干什么的
     */
    @Column({
        name: 'speak',
        default: 0
    })
    speak: number

    /**
     * 积分是否发放
     *      0: 未发放
     *      1: 已方法
     */
    @Column({
        name: 'is_points',
        default: 0
    })
    isPoints: number

    /**
     * 邀请人的奖励比例、默认是 0.2%
     */
    @Column({
        name: 'yq_num',
        default: '0.002'
    })
    yqNum: string

    // 下面的暂时没用
    // @Column({
    //     name: 'choubashu_time'
    // })
    // choubashuTime: string
    // @Column({
    //     name: 'choubashu_num'
    // })
    // choubashu_num: string

    /**
     * 新建用户
     */
    public createNewUser = async (ctx: Context): Promise<UserModel> => {
        this.promotionLink = ''
        this.tgId = AESUtils.encodeUserId(ctx?.from?.id.toString())
        this.userName = ctx?.from?.username ?? ''
        this.nickName = `${ctx?.from?.first_name}${ctx?.from?.last_name}`
        return UserModel.save(this)
    }
}


export default UserModel
