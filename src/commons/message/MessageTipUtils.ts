import {Context} from "telegraf";

/**
 * 常用的一些 message 提示
 */
class MessageTipUtils {

    /**
     * 操作成功
     */
    public handleSuccess = (ctx: Context) => {
        return ctx.replyWithHTML("✅ 操作成功!!!")
    }

    /**
     * 操作失败提示
     * @param ctx
     * @param endStr
     */
    public handleErr = (ctx: Context, endStr: string = '') => {
        return ctx.replyWithHTML(`⚠️ 操作失败${endStr}`)
    }

    /**
     * 超时提示
     */
    public timeOut = (ctx: Context) => {
        return ctx.reply('亲，操作慢点，休息一会在操作!')
    }
}



export default MessageTipUtils
