import GameTypeEnum from "./gameEnums/GameTypeEnum";
import WalletType from "./WalletType";
import PaymentType from "./PaymentType";


/**
 * 获取公共的类型描述文字之类的
 */
class CommonEnumsIndex {

    /**
     * 获取所有的游戏类型
     */
    public getAllGameType = () => {
        return [
            GameTypeEnum.TOUZI ,
            GameTypeEnum.PC28DI ,
            GameTypeEnum.PC28GAO ,
            GameTypeEnum.TOUZIFS ,
            GameTypeEnum.PC28DIFS ,
            GameTypeEnum.PC28GAOFS ,
            GameTypeEnum.TOUZIJS ,
            GameTypeEnum.PCDWQ ,
            GameTypeEnum.PCDWQFS
        ]
    }

    /**
     * 获取钱包类型描述文字
     */
    public getWalletTypeStr = (walletType: WalletType): string => {
        switch (walletType) {
            case WalletType.USDT:
                return 'usdt'
            case WalletType.CUSDT:
                return '彩U'
            case WalletType.TRX:
                return 'TRX'
            case WalletType.CTRX:
                return '彩T'
            case WalletType.JIFEN:
                return '积分'
            default:
                return 'usdt'
        }
    }

    /**
     * 获取订单类型描述文字
     */
    public getPaymentTypeStr = (paymentType: PaymentType): string => {
        switch (paymentType) {
            case PaymentType.CZ:
                return '充值'
            case PaymentType.SZ:
                return '上注'
            case PaymentType.TX_SQ:
                return '申请提现'
            case PaymentType.FS:
                return '反水'
            case PaymentType.ZJ:
                return '中奖'
            case PaymentType.SZ_QX:
                return '取消上注'
            case PaymentType.CJTX:
                return '彩金提现'
            case PaymentType.TX_DKJL:
                return '提现打款'
            case PaymentType.TK_DKJL:
                return '提现退款'
            case PaymentType.CJ_DKJL:
                return '彩金打款'
            case PaymentType.YHZZ:
                return '用户转账'
            case PaymentType.YHSK:
                return '用户收款'
            case PaymentType.FHB:
                return '发送红包'
            case PaymentType.LHB:
                return '领红包'
            case PaymentType.TKZZ:
                return '转账退款'
            case PaymentType.TKHB:
                return '红包退款'
            case PaymentType.SCFL:
                return '首充返利'
            case PaymentType.KYHL:
                return '开业豪礼'
            case PaymentType.JYJ:
                return '救援金'
            case PaymentType.HYFL:
                return '好友返利'
            case PaymentType.HYCJ:
                return '好运彩金'
            case PaymentType.EMPTY:
                return '空处理'
            default:
                return '空处理'
        }
    }

    /**
     * 判断当前订单金额增加还是减少
     *  1: 增加
     *  0: 减少
     */
    public getPaymentAddOrReduce = (paymentType: PaymentType): number => {
        switch (paymentType) {
            case PaymentType.CZ:
                return 1
            case PaymentType.SZ:
                return 0
            case PaymentType.TX_SQ:
                return 0
            case PaymentType.FS:
                return 1
            case PaymentType.ZJ:
                return 1
            case PaymentType.SZ_QX:
                return 1
            case PaymentType.CJTX:
                return 0
            case PaymentType.TX_DKJL:
                return 0
            case PaymentType.TK_DKJL:
                return 0
            case PaymentType.CJ_DKJL:
                return 0
            case PaymentType.YHZZ:
                return 0
            case PaymentType.YHSK:
                return 1
            case PaymentType.FHB:
                return 0
            case PaymentType.LHB:
                return 1
            case PaymentType.TKZZ:
                return 1
            case PaymentType.TKHB:
                return 1
            case PaymentType.SCFL:
                return 1
            case PaymentType.KYHL:
                return 1
            case PaymentType.JYJ:
                return 1
            case PaymentType.HYFL:
                return 1
            case PaymentType.HYCJ:
                return 1
            case PaymentType.EMPTY:
                return 0
            default:
                return 0
        }
    }
}



export default CommonEnumsIndex
