import {Context} from "telegraf";


/**
 * 消息发送类、整理发送消息方法
 */
class MessageUtils {

    private ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 发送弹窗消息
     * @param text: 弹窗文本
     * @param showAlert: 是否弹窗显示
     *      true: 弹窗显示
     *      false: 顶部悬浮显示
     */
    public sendPopMessage(text: string, showAlert = true) {
        return this.ctx.answerCbQuery(text, {
            show_alert: showAlert
        })
    }
}


export default MessageUtils
