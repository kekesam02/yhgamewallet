import ButtonUtils from "../../commons/button/ButtonUtils";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";
import WalletRedPacketInner from "../service/handle/hongbao/WalletRedPacketInner";
import WalletConfig from "../WalletConfig";
import {getConfig} from "../../config/config";
import BotHb from "../../models/BotHb";
import walletController from "./WalletController";

/**
 * 用户中心
 * 主要控制一些公共方法按钮之类的东西
 */
class WalletUserCenterController {

    /**
     * 返回首页
     */
    public static BackHome = {
        text: '↩️ 返回',
        query: 'backhome'
    }

    /**
     * 返回个人中心
     */
    public static BackUserHome = {
        text: '🏘️ 个人中心',
        query: StartWalletEnum.USERCENTER,
    }

    /**
     * 小额免密设置
     */
    public static createXiaoerMianMiBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text:"💰️ 调整额度",
                    query:"smNoPasswordChange"
                }
            ],
            [
                this.BackUserHome
            ]
        ])
    }

    /**
     * 更改提现地址
     */
    public static createUpdateTxAddrBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                this.BackUserHome,
                {
                    text: '✏️ 修改提现地址',
                    query: 'update_txaddr_btn'
                }
            ]
        ])
    }


    /**
     * 我的账单
     */
    public static createUserAccountListBtn = (pageNo:number,ptype:number) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text:'⬅️',
                    query:"myaccount_prev_"+(pageNo-1)+"_"+ptype
                },
                {
                    text:'➡️',
                    query:"myaccount_next_"+(pageNo+1)+"_"+ptype
                }
            ],
            [
                {
                    text: ptype==0?'\uD83D\uDFE2 全部':'全部',
                    query:"myaccount_all_0_0"
                },
                {
                    text: ptype==1? '\uD83D\uDFE2 USDT':"USDT",
                    query:"myaccount_usdt_0_1"
                },
                {
                    text: ptype==2? '\uD83D\uDFE2 TRX':"TRX",
                    query:"myaccount_trx_0_2"
                }
            ],
            [
                {
                    text: '🏘️ 主菜单',
                    query: WalletUserCenterEnum.HOME,
                },
                this.BackUserHome
            ]
        ])
    }

    /**
     * 返回个人中心
     */
    public static createUserCenterBackBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                this.BackUserHome
            ]
        ])
    }

    /**
     * 创建空按钮
     */
    public static createEmptyBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            []
        ])
    }

}

export default WalletUserCenterController
