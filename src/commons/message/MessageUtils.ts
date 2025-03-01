import {Context, Telegraf} from "telegraf";
import type {
    ForceReply,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove
} from 'telegraf/src/core/types/typegram'

/**
 * 消息发送类、整理发送消息方法
 */
class MessageUtils {

    /**
     * 发送文本消息到群组
     */
    public botSendText = (
        bot: Telegraf<Context>,
        groupId: string,
        text: string,
        reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply = {
            inline_keyboard: []
        }
    ) => {
        return bot.telegram.sendMessage(groupId,
            text,
            {
                parse_mode: 'HTML',
                reply_markup: reply_markup
            }
        )
    }

    /**
     * 发送文本消息到机器人对话
     */
    public botSendTextToBot = (
        bot: Context,
        text: string,
        reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply = {
            inline_keyboard: []
        }
    ) => {
        return bot.sendMessage(text, {
            parse_mode: 'HTML',
            reply_markup: reply_markup
        })
    }

    /**
     * 发送文本、带回复用户的那条消息
     * @param ctx
     * @param text
     * @param list: 按钮列表
     */
    public sendTextReply = (ctx:Context ,text: string, list: InlineKeyboardButton[][] = []) => {
        let chatId = `${ctx?.chat?.id}`
        let messageId = ctx?.message?.message_id ?? 0
        return ctx.replyWithHTML(text, {
            parse_mode: 'HTML',
            protect_content: true,
            link_preview_options: {
                is_disabled: true
            },
            reply_parameters: {
                chat_id: chatId,
                message_id: messageId
            },
            reply_markup: {
                selective: false,
                inline_keyboard: list
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

    /**
     * 发送消息到群组
     *      格式为: 顶部图片 + 文本 + 底部按钮消息
     * @param ctx
     * @param html  发送的html
     * @param replyMarkup 按钮对象
     * @param image 图片
     */
    public sendPhotoHtmlCtxBtn(
        ctx: Context,
        html: string,
        replyMarkup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply,
        image: Buffer
    ) {
        return ctx.sendPhoto(
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

    /**
     * 编辑消息
     * @param ctx
     * @param html
     * @param replyMarkup
     */
    public async editedMessage(
        ctx: Context,
        html: string,
        replyMarkup: InlineKeyboardMarkup
    ) {
        try {
            await ctx.editMessageText(html, {
                reply_markup: replyMarkup
            })
        } catch (err) {
            console.log('编辑消息出错了', err)
        }
    }

    /**
     * 删除当前消息
     */
    public removeMessage = async (ctx: Context) =>{
        try {
            await ctx.deleteMessage()
            return true
        } catch (err) {
            console.log('删除消息出错了', err)
            return false
        }
    }
}


export default MessageUtils
