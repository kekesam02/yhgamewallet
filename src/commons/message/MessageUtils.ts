import {Context, Telegraf} from "telegraf";
import {ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove} from "@telegraf/types/markup";
import GameBotHtml from "../../html/gameHtml/GameBotHtml";
import htmlUtils from "../HtmlUtils";
import GameController from "../../botGame/gameController/GameController";


/**
 * 消息发送类、整理发送消息方法
 */
class MessageUtils {

    /**
     * 发送文本、带回复用户的那条消息
     */
    public sendTextReply = (ctx:Context ,text: string) => {
        let chatId = `${ctx?.chat?.id}`
        let messageId = ctx?.message?.message_id ?? 0
        return ctx.replyWithHTML(text, {
            parse_mode: 'HTML',
            protect_content: true,
            reply_parameters: {
                chat_id: chatId,
                message_id: messageId
            },
            reply_markup: {
                force_reply: true,
                selective: true,
            }
        })
    }

    /**
     * 发送弹窗消息
     * @param ctx
     * @param text: 弹窗文本
     * @param showAlert: 是否弹窗显示
     *      true: 弹窗显示
     *      false: 顶部悬浮显示
     */
    public sendPopMessage(ctx: Context, text: string, showAlert = true) {
        return ctx.answerCbQuery(text, {
            show_alert: showAlert
        })
    }

    /**
     * 发送消息到群组
     *      格式为: 顶部图片 + 文本 + 底部按钮消息
     * @param bot: 机器人对象
     * @param groupId 群组id
     * @param html  发送的html
     * @param replyMarkup 按钮对象
     * @param image 图片
     */
    public sendPhotoHtmlBtn(
        bot: Telegraf<Context>,
        groupId: string,
        html: string,
        replyMarkup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply,
        image: Buffer
    ) {
        return bot.telegram.sendPhoto(
            groupId,
            {
                source: image,
                filename: '1.png'
            },
            {
                caption: html,
                parse_mode: 'HTML',
                reply_markup: replyMarkup
            }
        )
    }
}


export default MessageUtils
