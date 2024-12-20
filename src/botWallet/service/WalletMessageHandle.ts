import type {Context} from "telegraf";
import ButtonUtils from '../../commons/button/ButtonUtils'
import WalletBotHtml from '../html/WalletBotHtml'
import StartWalletEnum from "../enums/StartWalletEnum";
import WalletCommand from "../const/WalletCommand";
import ContextUtil from "../../commons/ContextUtil";

/**
 * 娱乐机器人接收到的用户消息处理器
 */
class WalletMessageHandle {
    public listenerMessage = (ctx: Context) => {
        console.log('传入的用户消息', ctx)
        let text = ctx.text
        if (!text || text.length <= 0 || text == '') {
            return
        }
        switch (true) {
            // 下面是指令相关的消息------------
            case WalletCommand.command.includes(text):
                console.log('查询到的指令信息--')
                this.startCommand(ctx).then()
                break
            case WalletCommand.noteOrder.includes(text):
                console.log('查询注单信息')
                this.startCommand(ctx).then()
                break
            default:
                console.log('未能识别消息')
        }
    }

    /**
     * /start指令的提示
     */
    public startCommand = async (ctx: Context) => {
        // 发送带有分享按钮的消息
        var html = new WalletBotHtml().getBotStartHtml({
            vip:1,
            tgId:"545454",
            nikaName:"feige",
            usdt:1,
            trx:1,
            cusdt:1,
            ctrx:1,
            addr:"http://www.xxx.com"
        })
        try {
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn([[
                {
                    text: '💰️ 充值',
                    query: StartWalletEnum.CHONGZHI
                },
                {
                    text: '💸 体现',
                    query: StartWalletEnum.TIXIAN
                },
                {
                    text: '↪️ 转账',
                    query: StartWalletEnum.ZHUANZHANG
                },
                {
                    text: '↩️ 收款',
                    query: StartWalletEnum.SHOUKUANG
                },
                {
                    text: '🧧 红包',
                    query: StartWalletEnum.HONGBAO
                },
                {
                    text: '🥯 闪兑',
                    query: StartWalletEnum.SHANGDUI
                },
                {
                    text: '🍝 个人中心',
                    query: StartWalletEnum.USERCENTER
                }
            ]]))
        } catch (err) {

        }
    }
}


export default WalletMessageHandle
