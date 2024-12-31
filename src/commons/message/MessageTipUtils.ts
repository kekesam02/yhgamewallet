import {Context} from "telegraf";
import ButtonCommonMap from "../button/ButtonCommonMap";
import buttonUtils from "../button/ButtonUtils";
import WalletController from "../../botWallet/controller/WalletController";
import ButtonUtils from "../button/ButtonUtils";

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

    /**
     * 金额格式错误
     */
    public moneyRuleErr = (ctx: Context, typeText: string = '') => {
        return ctx.reply(`⚠请重新输入输入正确的${typeText}金额`)
    }

    /**
     * 数量格式错误
     */
    public lengthRuleErr = (ctx: Context, typeText: string = '') => {
        return ctx.reply(`⚠请重新输入输入正确的${typeText}数量`)
    }

    /**
     * 余额不足
     */
    public balanceNotErr = (ctx: Context) => {
        var markUp:any = {
            reply_markup: {
                selective: false,
                inline_keyboard: new ButtonUtils().createCallbackBtn([WalletController.HomeBtns[0]])
            }
        }
        return ctx.replyWithHTML(`⚠️温馨提示：操作失败，余额不足！`, markUp)
    }

    /**
     * 最少输入金额提示
     */
    public minMoneyTips = (ctx: Context, descTitle: string = '红包', minNum = 1) => {
        var markUp:any={
            reply_markup: {
                selective: false,
                inline_keyboard: new ButtonUtils().createCallbackBtn([WalletController.HomeBtns[0]])
            }
        }
        return ctx.replyWithHTML(`⚠️温馨提示：${descTitle}最小金额为${minNum}！`, markUp)
    }

    /**
     * 最大数量提示
     */
    public maxLengthTip = (ctx: Context, descTitle: string = '红包', maxLength = 999) => {
        var markUp:any = {
            reply_markup: {
                selective: false,
                inline_keyboard: new ButtonUtils().createCallbackBtn([WalletController.HomeBtns[0]])
            }
        }
        return ctx.replyWithHTML(`⚠️温馨提示：${descTitle}最大数量为${maxLength}！`,markUp)
    }
}



export default MessageTipUtils
