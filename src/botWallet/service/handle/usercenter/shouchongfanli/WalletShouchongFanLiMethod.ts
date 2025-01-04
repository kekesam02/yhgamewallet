import type {Context} from "telegraf";
import redis from "../../../../../config/redis";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletShouchongFanLiMethod {
    /**
     * 首充返利
     * 代号：scfl_btn
     * @param ctx
     */
    public static startScfl = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 设置操作
        await redis.set("currentop" + tgId, "shouchongfanli", 'EX', 60 * 60)

    }
}


export default WalletShouchongFanLiMethod
