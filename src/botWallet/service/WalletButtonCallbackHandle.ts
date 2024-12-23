import {Context} from "telegraf";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletHandleMethod from "../handle/WalletHandleMethod";
import WalletUserCenterHandleMethod from "../handle/WalletUserCenterHandleMethod";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";

/**
 * 钱包回调
 */
class WalletButtonCallbackHandle {
    public static listenerMessage = async (ctx: Context) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        switch (callbackStr) {
            // ===========================按钮组1：用户中心===========================
            // 我的账单
            case WalletUserCenterEnum.BACCOUNT:
                WalletHandleMethod.startButtonBack(ctx)
            // 提币历史
            case WalletUserCenterEnum.TBLS:
                WalletHandleMethod.startButtonBack(ctx)
            // 彩金转化
            case WalletUserCenterEnum.CTRXZH:
                WalletHandleMethod.startButtonBack(ctx)
            // 领取邀请返利
            case WalletUserCenterEnum.YQFL:
                WalletHandleMethod.startButtonBack(ctx)
            // 首充返利
            case WalletUserCenterEnum.SCFL:
                WalletHandleMethod.startButtonBack(ctx)
            // 小额免密
            case WalletUserCenterEnum.XEMM:
                WalletHandleMethod.startButtonBack(ctx)
            // 邀请好友
            case WalletUserCenterEnum.YQHY:
                WalletHandleMethod.startButtonBack(ctx)
            // 设置提现地址
            case WalletUserCenterEnum.SZTXDZ:
                WalletHandleMethod.startButtonBack(ctx)
            // 主菜单
            case WalletUserCenterEnum.HOME:
                WalletHandleMethod.startButtonBack(ctx)

            // ===============================按钮组2：用户充值、提现===========================
            // 充值
            case StartWalletEnum.CHONGZHI:
                WalletHandleMethod.startChongZhi(ctx)
                break
            // 提现
            case StartWalletEnum.TIXIAN:
                console.log("TIXIAN")
                break
            // 转账
            case StartWalletEnum.ZHUANZHANG:
                console.log("ZHUANZHANG")
                break
            // 收款
            case StartWalletEnum.SHOUKUANG:
                console.log("SHOUKUANG")
                break
            // 红包
            case StartWalletEnum.HONGBAO:
                console.log("HONGBAO")
                break
            // 闪兑
            case StartWalletEnum.SHANGDUI:
                console.log("SHANGDUI")
                break
            // 个人中心
            case StartWalletEnum.USERCENTER:
                WalletUserCenterHandleMethod.startUserCenterCallback(ctx).then()
                break
        }
    }




    /**
     * 开始定位球游戏
     */
    public static startBall = () => {
        console.log('开始定位球游戏')
    }
}




export default WalletButtonCallbackHandle
