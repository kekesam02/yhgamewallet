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
     * 发送消息
     * @param text: 弹窗文本
     */
    public sendMessage(text: string) {
        return this.ctx.sendMessage(text)
    }
}
