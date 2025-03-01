

/**
 * 支付类型
 */
enum PaymentType {

    /**
     * 空类型--用于搜索默认查询全部
     */
    EMPTY = 0,

    /**
     * 充值
     */
    CZ = 1,

    /**
     * 上注
     */
    SZ = 2,

    /**
     * 申请提现
     */
    TX_SQ = 3,

    /**
     * 反水
     */
    FS = 4,

    /**
     * 中奖
     */
    ZJ = 5,

    /**
     * 取消上注
     */
    SZ_QX = 6,

    /**
     * 彩金提现
     */
    CJTX = 7,

    /**
     * 提现打款记录
     */
    TX_DKJL = 8,

    /**
     * 提现退款记录
     */
    TK_DKJL = 88,

    /**
     * 彩金打款记录
     */
    CJ_DKJL = 9,

    /**
     * 用户转账
     */
    YHZZ = 10,


    /**
     * 用户收款
     */
    YHSK = 11,

    /**
     * 发送红包
     */
    FHB = 12,

    /**
     * 领红包
     */
    LHB = 13,

    /**
     * 转账退款
     */
    TKZZ  = 14,

    /**
     * 红包退款
     */
    TKHB = 15,

    /**
     * 首充返利
     */
    SCFL = 16,

    /**
     * 开业豪礼
     */
    KYHL = 17,

    /**
     * 救援金
     */
    JYJ = 18,

    /**
     * 闪兑
     */
    SD = 19,

    /**
     * 好友返利
     */
    HYFL = 101,

    /**
     * 好运彩金
     */
    HYCJ = 201
}


export default PaymentType

