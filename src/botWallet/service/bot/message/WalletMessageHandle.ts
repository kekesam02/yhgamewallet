import type {Context} from "telegraf";
import WalletHandleMethod from "../../handle/WalletHandleMethod";
import redis from "../../../../config/redis";
import WalletUserCenterMethod from "../../handle/usercenter/WalletUserCenterMethod";
import {Telegraf} from "telegraf";
import WalletHandleHongBaoMethod from "../../handle/hongbao/WalletHandleHongBaoMethod";
import WalletHandleTixianMethod from "../../handle/tixian/WalletHandleTixianMethod";
import WalletHandleShangduiMethod from "../../handle/shangdui/WalletHandleShangduiMethod";
import WalletTixianAddressMethod from "../../handle/usercenter/tixianaddress/WalletTixianAddressMethod";
import WalletLimitMethod from "../../handle/usercenter/walletlimit/WalletLimitMethod";

/**
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletMessageHandle {
    public listenerMessage = async (ctx: Context,cbot:Telegraf<Context>) => {
        let text = ctx.text
        if (!text || text.length <= 0 || text == '') {
            return
        }
        text = text.trim()
        // 设置提现地址
        var tgId: number = ctx.message?.from?.id || 0
        const currentop: string = await redis.get("currentop" + tgId) || ""
        if (currentop) {
            // 收款
            if (currentop == 'addtxaddr') {
                WalletTixianAddressMethod.addtxaddrtx(text, tgId, ctx)
                return;
            }
            // 提现
            if (currentop == 'tx') {
                WalletHandleTixianMethod.startTxHandle(text, tgId, ctx, cbot)
                return;
            }
            // 红包金额
            if (currentop == 'hongbaoMoney') {
                WalletHandleHongBaoMethod.startHongBaoHandle(text, tgId, ctx, currentop)
                return;
            }
            // 红包数量
            if (currentop == 'hongbaoLength') {
                WalletHandleHongBaoMethod.startHongBaoHandle(text, tgId, ctx, currentop)
                return;
            }
            // 红包备注文字
            if (currentop == 'hongbaoRemark' || currentop.split('_')[0] == 'hongbaoRemark') {
                WalletHandleHongBaoMethod.startHongBaoHandle(text, tgId, ctx, currentop)
                return;
            }
            // 领取红包的流水金额
            if (currentop == 'hongbaoWaterMoney_' || currentop.split('_')[0] == 'hongbaoWaterMoney') {
                WalletHandleHongBaoMethod.startHongBaoHandle(text, tgId, ctx, currentop)
                return;
            }
            // 闪兑
            if (currentop == 'shangdui') {
                WalletHandleShangduiMethod.startShangduiHandle(text, tgId, ctx)
                return;
            }
            // 小额免密
            if (currentop == 'xemm') {
                WalletLimitMethod.updateUserLimiter(text, tgId, ctx)
                return;
            }
        }else{
            ctx.reply("会话已失效，请重新点击面板进行操作!")
            WalletHandleMethod.startCommandCallback(ctx).then()
        }
    }
}


export default WalletMessageHandle
