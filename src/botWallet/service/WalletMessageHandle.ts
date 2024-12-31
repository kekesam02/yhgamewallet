import type {Context} from "telegraf";
import WalletCommand from "../const/WalletCommand";
import WalletHandleMethod from "./handle/WalletHandleMethod";
import redis from "../../config/redis";
import WalletUserCenterMethod from "./handle/WalletUserCenterMethod";
import {Telegraf} from "telegraf";

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
        console.log('传入的用户消息', ctx)
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
                WalletUserCenterMethod.addtxaddrtx(text, tgId, ctx)
                return;
            }
            // 提现
            if (currentop == 'tx') {
                WalletHandleMethod.startTxHandle(text, tgId, ctx, cbot)
                return;
            }

            // 红包金额
            if (currentop == 'hongbao_money') {
                WalletHandleMethod.startHongBaoHandle(text, tgId, ctx, currentop)
                return;
            }
            // 红包数量
            if (currentop == 'hongbao_length') {
                WalletHandleMethod.startHongBaoHandle(text, tgId, ctx, currentop)
                return;
            }
            // 闪兑
            if (currentop == 'shangdui') {
                WalletHandleMethod.startShangduiHandle(text, tgId, ctx)
                return;
            }
        }else{
            ctx.reply("会话已失效，请重新点击面板进行操作!")
            WalletHandleMethod.startCommandCallback(ctx).then()
        }

        // switch (true) {
        //     // 下面是指令相关的消息------------
        //     case WalletCommand.command.includes(text):
        //         console.log('查询到的指令信息--')
        //         WalletHandleMethod.startCommandCallback(ctx).then()
        //         break
        //     case WalletCommand.noteOrder.includes(text):
        //         console.log('查询注单信息')
        //         WalletHandleMethod.startCommandCallback(ctx).then()
        //         break
        //     default:
        //         console.log('未能识别消息')
        // }
    }
}


export default WalletMessageHandle
