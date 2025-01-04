import type {Context} from "telegraf";
import redis from "../../../../../config/redis";
import {addLockByTgId} from "../../../../../config/redislock";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletCaiJinTransferMethod {

    /**
     * 彩金转化
     * 代号：ctrxzh_btn
     * @param ctx
     */
    public static startCtrxzh = async (ctx: Context) => {
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        await addLockByTgId(['caijinzhuanghua_lock_'+tgId],async ()=>{
            // 设置操作
            await redis.set("currentop" + tgId, "caijinzhuanghua", 'EX', 60 * 60)

            // BotWallet.java
            // String cjzh = callbackQueryData.replaceAll("cjzh", "");
            // botServiceWallet.sendQiehuanHb(cjzh, tgId, userName, firstName, callbackQueryId, this);
        },async ()=>{
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }
}


export default WalletCaiJinTransferMethod
