import PaymentType from "./PaymentType";


/**
 * 支付类型
 */
class PaymentTypeEnum {

    /**
     * 充值
     */
    static CZ = {name:"充值",value:PaymentType.CZ};

    /**
     * 上注
     */
    static SZ = {name:"上注",value:PaymentType.SZ};

    /**
     * 申请提现
     */
    static TX_SQ = {name:"申请提现",value:PaymentType.TX_SQ};

    /**
     * 反水
     */
    static FS = {name:"反水",value:PaymentType.FS};

    /**
     * 中奖
     */
    static ZJ = {name:"中奖",value:PaymentType.ZJ};

    /**
     * 取消上注
     */
    static SZ_QX = {name:"取消上注",value:PaymentType.SZ_QX};

    /**
     * 彩金提现
     */
    static CJTX = {name:"彩金提现",value:PaymentType.CJTX};

    /**
     * 提现打款记录
     */
    static TX_DKJL = {name:"提现打款",value:PaymentType.TX_DKJL};
    /**
     * 提现退款记录
     */
    static TK_DKJL = {name:"提现退款",value:PaymentType.TK_DKJL};

    /**
     * 彩金打款记录
     */
    static CJ_DKJL = {name:"彩金打款",value:PaymentType.CJ_DKJL};

    /**
     * 用户转账
     */
    static YHZZ = {name:"用户转账",value:PaymentType.YHZZ};


    /**
     * 用户收款
     */
    static YHSK = {name:"用户收款",value:PaymentType.YHSK};

    /**
     * 发送红包
     */
    static FHB = {name:"发送红包",value:PaymentType.FHB};

    /**
     * 领红包
     */
    static LHB = {name:"领红包",value:PaymentType.LHB};

    /**
     * 转账退款
     */
    static TKZZ  = {name:"转账退款",value:PaymentType.TKZZ};

    /**
     * 红包退款
     */
    static TKHB = {name:"红包退款",value:PaymentType.TKHB};

    /**
     * 首充返利
     */
    static SCFL = {name:"首充返利",value:PaymentType.SCFL};

    /**
     * 开业豪礼
     */
    static KYHL = {name:"开业豪礼",value:PaymentType.KYHL};

    /**
     * 救援金
     */
    static JYJ = {name:"救援金",value:PaymentType.JYJ};

    /**
     * 好友返利
     */
    static HYFL = {name:"好友返利",value:PaymentType.HYFL};

    /**
     * 闪兑
     */
    static SD = {name:"闪兑",value:PaymentType.SD};

    /**
     * 好运彩金
     */
    static HYCJ = {name:"好运彩金",value:PaymentType.HYCJ};
}


export default PaymentTypeEnum

