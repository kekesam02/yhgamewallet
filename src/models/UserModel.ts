import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Context} from "telegraf";
import AESUtils from "../commons/AESUtils";
import WalletType from "../type/WalletType";
import ComputeUtils from "../commons/ComputeUtils";


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

    /**
     * 更新用户金额信息
     * @param user
     */
    public updateUser = async (): Promise<UserModel> => {
        return UserModel.save(this)
    }

    /**
     * 获取用户信息
     * @param ctx
     */
    public getUserModel = async (ctx: Context): Promise<UserModel> => {
        let userId = AESUtils.encodeUserId(ctx?.from?.id.toString())
        let user = await UserModel
            .createQueryBuilder()
            .where('tg_id = :tgId', {
                tgId: userId
            })
            .getOne()
        if (!user) {
            user = await new UserModel().createNewUser(ctx)
        }
        return user
    }

    /**
     * 获取用户信息根据 tgId
     * @param tgId
     */
    public getUserModelById = async (tgId: string): Promise<UserModel | null> => {
        let user = UserModel
            .createQueryBuilder()
            .where('tg_id = :tgId', {
                tgId: tgId
            })
            .getOne()
        return user!
    }

    /**
     * 更新用户金额信息、指定金额类型
     * @param wallType 钱包类型
     * @param money 金额数量
     * @param isAdd
     *      true 增加金额
     *      false减少金额
     */
    public updateUserMoney = (
        wallType: WalletType,
        money: string,
        isAdd: boolean = true
    ): string => {
        switch (wallType) {
            case WalletType.USDT:
                this.USDT = isAdd
                    ? new ComputeUtils(this.USDT).add(money).toString()
                    : new ComputeUtils(this.USDT).minus(money).toString()
                return this.USDT
            case WalletType.CUSDT:
                this.CUSDT = isAdd
                    ? new ComputeUtils(this.CUSDT).add(money).toString()
                    : new ComputeUtils(this.CUSDT).minus(money).toString()
                return this.CUSDT
            case WalletType.TRX:
                this.TRX = isAdd
                    ? new ComputeUtils(this.TRX).add(money).toString()
                    : new ComputeUtils(this.TRX).minus(money).toString()
                return this.TRX
            case WalletType.CTRX:
                this.CTRX = isAdd
                    ? new ComputeUtils(this.CTRX).add(money).toString()
                    : new ComputeUtils(this.CTRX).minus(money).toString()
                return this.CTRX
            case WalletType.JIFEN:
                this.KK = isAdd
                    ? new ComputeUtils(this.KK).add(money).toString()
                    : new ComputeUtils(this.KK).minus(money).toString()
                // 暂时没有积分功能
                return this.KK
        }
    }

    /**
     * 获取用户余额、指定金额类型
     */
    public getBalance = (wallType: WalletType): string => {
        switch (wallType) {
            case WalletType.USDT:
                return this.USDT
            case WalletType.CUSDT:
                return this.CUSDT
            case WalletType.TRX:
                return this.TRX
            case WalletType.CTRX:
                return this.CTRX
            case WalletType.JIFEN:
                // 暂时没有积分功能
                return this.KK
        }
    }
}


export default UserModel
