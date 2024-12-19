import {Context} from "telegraf";


/**
 * 发送消息到客户端类
 */
class SendMessage {
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
    public sendMessage(text: string, showAlert = true) {
        return this.ctx.send(text, {
            show_alert: showAlert
        })
    }
}
