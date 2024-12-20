import {UpdateType} from "telegraf/typings/telegram-types";
import {Context} from "telegraf";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";


/**
 * 钱包回调
 */
class WalletButtonCallbackHandle {
    public static listenerMessage = (ctx: Context) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        switch (callbackStr) {
            case StartWalletEnum.CHONGZHI:
                console.log("CHONGZHI")
                break
            case StartWalletEnum.TIXIAN:
                console.log("TIXIAN")
                break
            case StartWalletEnum.ZHUANZHANG:
                console.log("ZHUANZHANG")
                break
            case StartWalletEnum.SHOUKUANG:
                console.log("SHOUKUANG")
                break
            case StartWalletEnum.HONGBAO:
                console.log("HONGBAO")
                break
            case StartWalletEnum.SHANGDUI:
                console.log("SHANGDUI")
                break
            case StartWalletEnum.USERCENTER:
                console.log("USERCENTER")
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
