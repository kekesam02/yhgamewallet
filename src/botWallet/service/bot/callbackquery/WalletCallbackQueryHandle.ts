import {Context, Telegraf} from "telegraf";
import StartWalletEnum from "../../../../type/walletEnums/StartWalletEnum";
import WalletHandleMethod from "../../handle/dashbord/WalletHandleMethod";
import WalletUserCenterMethod from "../../handle/usercenter/WalletUserCenterMethod";
import WalletUserCenterEnum from "../../../../type/walletEnums/WalletUserCenterEnum";
import WalletRedPacket from "../../handle/dashbord/hongbao/WalletRedPacket";
import WalletType from "../../../../type/WalletType";
import WalletHandleShouKuanMethod from "../../handle/dashbord/shoukuan/WalletHandleShouKuanMethod";
import WalletHandleZhuanzhangMethod from "../../handle/dashbord/zhuanzhaung/WalletHandleZhuanzhangMethod";
import WalletHandleTixianMethod from "../../handle/dashbord/tixian/WalletHandleTixianMethod";
import WalletHandleChongzhiMethod from "../../handle/dashbord/chongzhi/WalletHandleChongzhiMethod";
import WalletHandleHongBaoMethod from "../../handle/dashbord/hongbao/WalletHandleHongBaoMethod";
import WalletHandleShangduiMethod from "../../handle/dashbord/shangdui/WalletHandleShangduiMethod";
import WalletMyAccountMethod from "../../handle/usercenter/myaccount/WalletMyAccountMethod";
import WalletTiBiHistoryMethod from "../../handle/usercenter/tibihistory/WalletTiBiHistoryMethod";
import WalletCaiJinZhuanhuaMethod from "../../handle/usercenter/caijinzhuanhua/WalletCaiJinZhuanhuaMethod";
import WalletYaoqingFanLiMethod from "../../handle/usercenter/yaoqingfanli/WalletYaoqingFanLiMethod";
import WalletShouchongFanLiMethod from "../../handle/usercenter/shouchongfanli/WalletShouchongFanLiMethod";
import WalletYaoqingHaoyouMethod from "../../handle/usercenter/yaoqinghaoyou/WalletYaoqingHaoyouMethod";
import WalletTixianAddressMethod from "../../handle/usercenter/tixiandizhi/WalletTixianAddressMethod";
import WalletXiaoeMianmiMethod from "../../handle/usercenter/xiaoemianmi/WalletXiaoeMianmiMethod";
import BotPaymentModel from "../../../../models/BotPaymentModel";
import BotHb from "../../../../models/BotHb";
import MessageUtils from "../../../../commons/message/MessageUtils";


/**
 * 钱包回调
 */
class WalletCallbackQueryHandle {

    /**
     * 监听财务机器人
     * @param ctx
     * @param bot
     */
    public static cBotlistenerMessage = async (ctx: Context,ubot:Telegraf<Context>) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId: string = ctx.callbackQuery?.from?.id + '' || "0"
        if(callbackStr.startsWith('bjydk')){
            // 标记打款
            WalletHandleTixianMethod.startMarkTixian(tgId,callbackStr,ctx,ubot)
        } else if(callbackStr.startsWith('txycth')){
            // 异常驳回
            WalletHandleTixianMethod.startRefuseTixian(tgId,callbackStr,ctx,ubot)
        } else if (callbackStr.startsWith("tyzh_")){// 领取邀请返利
            WalletCaiJinZhuanhuaMethod.startTongYiZhuanhua(ctx,callbackStr,ubot)
        }
    }

    public static listenerMessage = async (ctx: Context,bot:Telegraf<Context>,cbot:Telegraf<Context>) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId = ctx.callbackQuery?.from?.id || 0
        // 处理超24小时的转账
        await BotPaymentModel.updateMoreThan24Hour(tgId)
        if (callbackStr.startsWith('num_') || callbackStr === 'delete' || callbackStr === 'clear') {// 计算器callback
            WalletHandleMethod.startInputPassword(ctx)
        }else if(callbackStr.startsWith('qrjs')){// 确认提现
            WalletHandleZhuanzhangMethod.startZhuanZhangUnLock(ctx)
        }else if(callbackStr.startsWith('quxiaozz')){//取消提现
            WalletHandleZhuanzhangMethod.cancelZhuanZhang(ctx)
        }else if(callbackStr.startsWith('shoukuanzk')){//转账的收款
            WalletHandleZhuanzhangMethod.startZhuanzhangSK(ctx)
        }else if(callbackStr.startsWith('vpb_')){ // 转账确认密码解锁
            WalletHandleZhuanzhangMethod.startValidatorPwdCallback(ctx,callbackStr)
        }else if(callbackStr.startsWith('skqrzf')){ // 收款-确认支付
            WalletHandleShouKuanMethod.startPayCallback(ctx,bot,callbackStr)
        }else if(callbackStr.startsWith('skqxzf')){ // 收款-取消支付
            WalletHandleShouKuanMethod.startCancelPayCallback(ctx,bot,callbackStr)
        } else if(callbackStr.startsWith('smNoPasswordChange')){ // 修改免密额度
           WalletXiaoeMianmiMethod.startUpdateUserLimiter(ctx)
        }else if (callbackStr.startsWith("update_txaddr_btn")){// 修改提现地址
            WalletTixianAddressMethod.updateTxAddress(ctx)
        }else if (callbackStr.startsWith("myaccount_")){// 我的账单搜索和分页
            WalletMyAccountMethod.searchFilterAccount(ctx,callbackStr)
        }else if (callbackStr.startsWith("tbls_")){// 我的账单搜索和分页
            WalletTiBiHistoryMethod.searchFilterTb(ctx,callbackStr)
        } else if (callbackStr.startsWith("lqyqhyfl")){// 领取邀请返利
            WalletYaoqingFanLiMethod.startLingquFanli(ctx)
        }  else{
            switch (callbackStr) {
                // ===========================按钮组1：用户中心===========================
                // 我的账单
                case WalletUserCenterEnum.BACCOUNT:
                    WalletMyAccountMethod.startBAccount(ctx,callbackStr)
                    break
                // 提币历史
                case WalletUserCenterEnum.TBLS:
                    WalletTiBiHistoryMethod.startTbls(ctx,callbackStr)
                    break
                // 彩金转化
                case WalletUserCenterEnum.CTRXZH:
                    WalletCaiJinZhuanhuaMethod.startCtrxzh(ctx,callbackStr,cbot)
                    break
                // 领取邀请返利
                case WalletUserCenterEnum.YQFL:
                    WalletYaoqingFanLiMethod.startYqfl(ctx)
                    break
                // 首充返利
                case WalletUserCenterEnum.SCFL:
                    WalletShouchongFanLiMethod.startScfl(ctx)
                    break
                // 小额免密
                case WalletUserCenterEnum.XEMM:
                    WalletXiaoeMianmiMethod.startXemm(ctx)
                    break
                // 邀请好友
                case WalletUserCenterEnum.YQHY:
                    WalletYaoqingHaoyouMethod.startYqhy(ctx)
                    break
                // 设置提现地址
                case WalletUserCenterEnum.SZTXDZ:
                    WalletTixianAddressMethod.startTxdz(ctx)
                    break
                // 主菜单
                case WalletUserCenterEnum.HOME:
                    WalletHandleMethod.startButtonBack(ctx)
                    break
                // ===============================按钮组2：用户充值、提现===========================
                // 充值
                case StartWalletEnum.CHONGZHI:
                    WalletHandleChongzhiMethod.startChongZhi(ctx)
                    break
                // 提现
                case StartWalletEnum.TIXIAN:
                    WalletHandleTixianMethod.startTiXian(ctx,cbot)
                    break
                // 转账
                case StartWalletEnum.ZHUANZHANG:
                    WalletHandleZhuanzhangMethod.startZhuanZhang(ctx,cbot)
                    break
                // 收款
                case StartWalletEnum.SHOUKUANG:
                    WalletHandleShouKuanMethod.startShouKuan(ctx,cbot)
                    break
                // 红包
                case StartWalletEnum.HONGBAO:
                    return WalletHandleHongBaoMethod.startHongBao(ctx,cbot, StartWalletEnum.HONGBAO_LIST_ALL)
                case StartWalletEnum.HONGBAO_LIST_ALL + callbackStr.replaceAll(StartWalletEnum.HONGBAO_LIST_ALL, ''):
                    return WalletHandleHongBaoMethod.startHongBao(
                        ctx,
                        cbot,
                        StartWalletEnum.HONGBAO_LIST_ALL,
                        callbackStr.replaceAll(StartWalletEnum.HONGBAO_LIST_ALL, '')
                    )
                case StartWalletEnum.HONGBAO_LIST_PROGRESS + callbackStr.replaceAll(StartWalletEnum.HONGBAO_LIST_PROGRESS, ''):
                    return WalletHandleHongBaoMethod.startHongBao(
                        ctx,
                        cbot,
                        StartWalletEnum.HONGBAO_LIST_PROGRESS,
                        callbackStr.replaceAll(StartWalletEnum.HONGBAO_LIST_PROGRESS, '')
                    )
                case StartWalletEnum.HONGBAO_LIST_END + callbackStr.replaceAll(StartWalletEnum.HONGBAO_LIST_END, ''):
                    return WalletHandleHongBaoMethod.startHongBao(
                        ctx,
                        cbot,
                        StartWalletEnum.HONGBAO_LIST_END,
                        callbackStr.replaceAll(StartWalletEnum.HONGBAO_LIST_END, '')
                    )
                // 点击添加红包按钮回调
                case StartWalletEnum.HONGBAO_ADD:
                    return new WalletRedPacket(ctx).selectWallType()
                // 查看已发送红包详情触发
                case StartWalletEnum.HONGBAO_INFO + callbackStr.replaceAll(StartWalletEnum.HONGBAO_INFO, ''):
                    return new WalletRedPacket(ctx).lookRedPacketInfo(callbackStr.replaceAll(StartWalletEnum.HONGBAO_INFO, ''))
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
                // 点击红包 - 确认支付触发
                case StartWalletEnum.HONGBAO_TYPE_PAY:
                    return new WalletRedPacket(ctx).startPay()
                // 点击红包 - 设置备注触发
                case StartWalletEnum.HONGBAO_TYPE_REMARK + callbackStr.replaceAll(StartWalletEnum.HONGBAO_TYPE_REMARK, ''):
                    return new WalletRedPacket(ctx).sendRemarkIpt(callbackStr.replaceAll(StartWalletEnum.HONGBAO_TYPE_REMARK, ''))
                // 点击红包 - 设置领取条件触发
                case StartWalletEnum.HONGBAO_TYPE_CONDITION + callbackStr.replaceAll(StartWalletEnum.HONGBAO_TYPE_CONDITION, ''):
                    return new WalletRedPacket(ctx).setGainCondition(callbackStr.replaceAll(StartWalletEnum.HONGBAO_TYPE_CONDITION, ''))
                // 点击领取红包按钮触发
                case StartWalletEnum.HONGBAO_RECEIVE + callbackStr.replaceAll(StartWalletEnum.HONGBAO_RECEIVE, ''):
                    return new WalletRedPacket(ctx).receiveCallback(callbackStr.replaceAll(StartWalletEnum.HONGBAO_RECEIVE, ''))
                // 红包 - 开启/关闭会员红包功能
                case StartWalletEnum.HONGBAO_VIP_ + callbackStr.replaceAll(StartWalletEnum.HONGBAO_VIP_, ''):
                    return new WalletRedPacket(ctx).setVipVeri(callbackStr.replaceAll(StartWalletEnum.HONGBAO_VIP_, ''))
                // 红包 - 点击验证码数字触发
                case StartWalletEnum.HONGBAO_VERIFY_BTN + callbackStr.replaceAll(StartWalletEnum.HONGBAO_VERIFY_BTN, ''):
                    return new WalletRedPacket(ctx).verifyCode(callbackStr.replaceAll(StartWalletEnum.HONGBAO_VERIFY_BTN, ''))
                // 红包 - 开启/关闭 验证码验证功能
                case StartWalletEnum.HONGBAO_VERIFY + callbackStr.replaceAll(StartWalletEnum.HONGBAO_VERIFY, ''):
                    return new WalletRedPacket(ctx).setCodeVeri(callbackStr.replaceAll(StartWalletEnum.HONGBAO_VERIFY, ''))
                // 红包 - 开启/关闭 流水验证功能
                case StartWalletEnum.HONGBAO_WATER + callbackStr.replaceAll(StartWalletEnum.HONGBAO_WATER, ''):
                    return new WalletRedPacket(ctx).startWaterVeri(callbackStr.replaceAll(StartWalletEnum.HONGBAO_WATER, ''))
                // 红包 - 选择流水时间触发
                case StartWalletEnum.HONGBAO_WATER_TIME + callbackStr.replaceAll(StartWalletEnum.HONGBAO_WATER_TIME, ''):
                    return new WalletRedPacket(ctx).selectWaterTime(callbackStr.replaceAll(StartWalletEnum.HONGBAO_WATER_TIME, ''))
                // 闪兑
                case StartWalletEnum.SHANGDUI:
                    return  WalletHandleShangduiMethod.startShanDui(ctx,cbot, StartWalletEnum.SHANGDUI)
                case StartWalletEnum.SHANGDUI_TRX_USDT:
                    return  WalletHandleShangduiMethod.startShanDui(ctx,cbot, StartWalletEnum.SHANGDUI_TRX_USDT)
                case StartWalletEnum.SHANGDUI_USDT_TRX:
                    return  WalletHandleShangduiMethod.startShanDui(ctx,cbot, StartWalletEnum.SHANGDUI_USDT_TRX)
                case StartWalletEnum.USERCENTER:
                    WalletUserCenterMethod.startUserCenterCallback(ctx).then()
                    break
                // ===============================按钮组3：功能业务中的一些按钮===========================
                // 返回按钮
                case StartWalletEnum.BACKHOME:
                    WalletHandleMethod.startButtonBack(ctx)
                    break
                case StartWalletEnum.CLOSE_MESSAGE:
                    // 删除本条消息
                    await new MessageUtils().removeMessage(ctx)
                    break
                // 返回按钮
                case StartWalletEnum.CLOSE_COMPUTER:
                    WalletHandleMethod.startButtonBack(ctx)
                    break
                // 保存密码和验证密码
                case StartWalletEnum.UPDATEPWDBTN:
                    WalletHandleMethod.startUpdatePwdCallback(ctx,cbot)
                    break
                case StartWalletEnum.HONGBAO_CANCEL_1:
                    // 红包返回按钮类型 1、回到点击红包按钮第一页
                    return  new WalletRedPacket(ctx).addRedPacket(StartWalletEnum.HONGBAO_LIST_ALL, '0')
                case StartWalletEnum.HONGBAO_CANCEL_2:
                    // 红包返回按钮类型 2、回退到红包选择货币页面
                    return  new WalletRedPacket(ctx).selectWallType()
                case StartWalletEnum.HONGBAO_CANCEL_3:
                    // 红包返回按钮类型 3、回退到红包类型页面(选择随机还是均分)
                    let data = await new BotHb().getRedisData(ctx)
                    return  new WalletRedPacket(ctx).selectRedPacketType(data?.walletType ?? WalletType.USDT)
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

export default WalletCallbackQueryHandle
