import {Context, Telegraf} from "telegraf";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletHandleMethod from "./handle/WalletHandleMethod";
import WalletUserCenterMethod from "./handle/WalletUserCenterMethod";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";
import WalletRedPacket from "./handle/WalletRedPacket";
import WalletType from "../../type/WalletType";


/**
 * 钱包回调
 */
class WalletCallbackHandle {

    /**
     * 监听财务机器人
     * @param ctx
     * @param bot
     */
    public static cBotlistenerMessage = async (ctx: Context,ubot:Telegraf<Context>) => {
        console.log('cbot_callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId: string = ctx.callbackQuery?.from?.id + '' || "0"
        if(callbackStr.startsWith('bjydk')){
            // 标记打款
            WalletHandleMethod.startMarkTixian(tgId,callbackStr,ctx,ubot)
        } else if(callbackStr.startsWith('txycth')){
            // 异常驳回
            WalletHandleMethod.startRefuseTixian(tgId,callbackStr,ctx,ubot)
        }
    }

    public static listenerMessage = async (ctx: Context,cbot:Telegraf<Context>) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 计算器callback
        if (callbackStr.startsWith('num_') || callbackStr === 'delete' || callbackStr === 'clear') {
            WalletHandleMethod.startInputPassword(ctx)
        }else if(callbackStr.startsWith('qrjs')){
            WalletHandleMethod.startZhuanZhangUnLock(ctx)
        }else if(callbackStr.startsWith('quxiaozz')){
            WalletHandleMethod.cancelZhuanZhang(ctx)
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
                    WalletHandleMethod.startTiXian(ctx,cbot)
                    break
                // 转账
                case StartWalletEnum.ZHUANZHANG:
                    WalletHandleMethod.removeMessage(ctx)
                    WalletHandleMethod.startZhuanZhang(ctx,cbot)
                    break
                // 收款
                case StartWalletEnum.SHOUKUANG:
                    WalletHandleMethod.removeMessage(ctx)
                    WalletHandleMethod.startShouKuan(ctx,cbot)
                    break

                // 红包
                case StartWalletEnum.HONGBAO:
                    return WalletHandleMethod.startHongBao(ctx,cbot)
                // 点击添加红包按钮回调
                case StartWalletEnum.HONGBAO_ADD:
                    return new WalletRedPacket(ctx).selectWallType()
                // 点击选择红包金额类型回掉
                case StartWalletEnum.HONGBAO_WALLET_USDT:
                    return new WalletRedPacket(ctx).selectRedPacketType(WalletType.USDT)
                // 点击选择红包金额类型回掉
                case StartWalletEnum.HONGBAO_WALLET_TRX:
                    return new WalletRedPacket(ctx).selectRedPacketType(WalletType.TRX)
                // 点击选择红包类型触发(均分包)
                case StartWalletEnum.HONGBAO_TYPE_MIDDLE:
                    return new WalletRedPacket(ctx).inputMoney(0)
                // 点击选择红包类型触发(随机包)
                case StartWalletEnum.HONGBAO_TYPE_RENDOM:
                    return new WalletRedPacket(ctx).inputMoney(1)

                // 闪兑
                case StartWalletEnum.SHANGDUI:
                    return  WalletHandleMethod.startShanDui(ctx,cbot)
                case StartWalletEnum.USERCENTER:
                    WalletUserCenterMethod.startUserCenterCallback(ctx).then()
                    break
                // ===============================按钮组3：功能业务中的一些按钮===========================
                // 返回按钮
                case StartWalletEnum.BACKHOME:
                    WalletHandleMethod.startButtonBack(ctx)
                    break
                // 返回按钮
                case StartWalletEnum.CLOSE_COMPUTER:
                    WalletHandleMethod.removeMessage(ctx)
                    break
                // 修改密码按钮
                case StartWalletEnum.UPDATEPWDBTN:
                    WalletHandleMethod.startUpdatePwdCallback(ctx,cbot)
                    break

                case StartWalletEnum.HONGBAO_CANCEL_1:
                    // 红包返回按钮类型 1、回到点击红包按钮第一页
                    return  new WalletRedPacket(ctx).addRedPacket()
                case StartWalletEnum.HONGBAO_CANCEL_2:
                    // 红包返回按钮类型 2、回退到红包选择货币页面
                    return  new WalletRedPacket(ctx).addRedPacket()
                case StartWalletEnum.HONGBAO_CANCEL_3:
                    // 红包返回按钮类型 3、回退到红包类型页面(选择随机还是均分)
                    return  new WalletRedPacket(ctx).addRedPacket()
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
