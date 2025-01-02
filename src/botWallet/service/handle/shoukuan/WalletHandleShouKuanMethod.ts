import type {Context, Telegraf} from "telegraf";
import WalletController from "../../../controller/WalletController";
import redis from "../../../../config/redis";
import {addLockByTgId} from "../../../../config/redislock";
import walletHandleMethod from "../WalletHandleMethod";
import ButtonInnerQueryUtils from "../../../../commons/button/ButtonInnerQueryUtils";


/**
 * 公共方法处理
 * npm install @img/sharp-darwin-arm64 @img/sharp-libvips-darwin-arm64 @img/sharp-libvips-linux-x64 @img/sharp-libvips-linuxmusl-x64 @img/sharp-linux-x64 @img/sharp-linuxmusl-x64 --force
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletHandleShouKuanMethod {
    
    /**
     * 收款
     * 代号：shoukuan_btn
     * @param ctx
     */
    public static startShouKuan = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "shoukuan", 'EX', 60 * 60)
        // 3：判断是否登录
        const flag: boolean = await walletHandleMethod.isLogin(tgId, ctx)
        // 4: 如果没有登录就输入密码登录
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await walletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }
        // 发送消息
        const html = "\uD83D\uDC47 点击下方按钮选择付款人";
        return ctx.replyWithHTML(html, WalletController.createShouKuanSwitchBtn("-1"))
    }

    // 收款具体逻辑
    public static startShouKuanHandle = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['shoukuan_lock_' + tgId + ''], async () => {
            const fusername = ctx.inlineQuery?.from.username
            const id = ctx.inlineQuery?.from.id
            // 1：密码确认
            const flag: boolean = await walletHandleMethod.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await walletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
                return
            }
            var money = query.replaceAll('-','')
            // 创建一个可分享的结果
            await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: "你正发起收款操作，收款金额" + money + "USDT",
                description: "",
                input_message_content: {
                    message_text: "\uD83D\uDCB0【@"+fusername+"】向你发起收款，收款金额：【"+money+"】USDT",
                    parse_mode: "HTML"
                },
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: '\uD83D\uDCB8立即支付',
                            callback_data: "shoukuan" +id+','+ query + "," + tgId
                        }]
                    ]
                }
            }))
        }, async () => {
            await ctx.answerCbQuery('亲，操作慢点，休息一会在操作!')
        })
    }

}


export default WalletHandleShouKuanMethod
