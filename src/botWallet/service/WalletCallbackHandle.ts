import {Context} from "telegraf";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletHandleMethod from "./handle/WalletHandleMethod";
import WalletUserCenterMethod from "./handle/WalletUserCenterMethod";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";


/**
 * 钱包回调
 */
class WalletCallbackHandle {
    public static listenerMessage = async (ctx: Context) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        console.log("========>callbackStr",callbackStr)
        // 计算器callback
        if (callbackStr.startsWith('num_') || callbackStr === 'delete' || callbackStr === 'clear') {
            WalletHandleMethod.startInputPassword(ctx)
        } else {
            switch (callbackStr) {
                // ===========================按钮组1：用户中心===========================
                // 我的账单
                case WalletUserCenterEnum.BACCOUNT:
                    WalletUserCenterMethod.startBAccount(ctx)
                    break
                // 提币历史
                case WalletUserCenterEnum.TBLS:
                    WalletUserCenterMethod.startTbls(ctx)
                    break
                // 彩金转化
                case WalletUserCenterEnum.CTRXZH:
                    WalletUserCenterMethod.startCtrxzh(ctx)
                    break
                // 领取邀请返利
                case WalletUserCenterEnum.YQFL:
                    WalletUserCenterMethod.startYqfl(ctx)
                    break
                // 首充返利
                case WalletUserCenterEnum.SCFL:
                    WalletUserCenterMethod.startScfl(ctx)
                    break
                // 小额免密
                case WalletUserCenterEnum.XEMM:
                    WalletUserCenterMethod.startXemm(ctx)
                    break
                // 邀请好友
                case WalletUserCenterEnum.YQHY:
                    WalletUserCenterMethod.startYqhy(ctx)
                    break
                // 设置提现地址
                case WalletUserCenterEnum.SZTXDZ:
                    WalletUserCenterMethod.startTxdz(ctx)
                    break
                // 主菜单
                case WalletUserCenterEnum.HOME:
                    WalletHandleMethod.startButtonBack(ctx)
                    break
                // ===============================按钮组2：用户充值、提现===========================
                // 充值
                case StartWalletEnum.CHONGZHI:
                    WalletHandleMethod.startChongZhi(ctx)
                    break
                // 提现
                case StartWalletEnum.TIXIAN:
                    WalletHandleMethod.startTiXian(ctx)
                    break
                // 转账
                case StartWalletEnum.ZHUANZHANG:
                    WalletHandleMethod.startZhuanZhang(ctx)
                    break
                // 收款
                case StartWalletEnum.SHOUKUANG:
                    WalletHandleMethod.startShouKuan(ctx)
                    break
                // 红包
                case StartWalletEnum.HONGBAO:
                    WalletHandleMethod.startHongBao(ctx)
                    break
                // 闪兑
                case StartWalletEnum.SHANGDUI:
                    WalletHandleMethod.startShanDui(ctx)
                    break
                // 个人中心
                case StartWalletEnum.USERCENTER:
                    WalletUserCenterMethod.startUserCenterCallback(ctx).then()
                    break
                // ===============================按钮组3：功能业务中的一些按钮===========================
                // 返回按钮
                case StartWalletEnum.BACKHOME:
                    WalletHandleMethod.startButtonBack(ctx)
                    break
                // 修改密码按钮
                case StartWalletEnum.UPDATEPWDBTN:
                    WalletHandleMethod.startUpdatePwdCallback(ctx)
                    break
            }
        }
    }


    /**
     * 开始定位球游戏
     */
    public static startBall = () => {
        console.log('开始定位球游戏')
    }
}

export default WalletCallbackHandle
