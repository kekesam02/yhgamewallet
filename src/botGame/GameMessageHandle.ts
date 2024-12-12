/**
 * 娱乐机器人接收用户消息处理器
 */
import type {Context} from "telegraf";
import ButtonUtils from './../commons/button/ButtonUtils'
import GameBotHtml from './html/GameBotHtml'


class GameMessageHandle {

    public handleMessage = (ctx: Context) => {
        console.log('传入的用户消息', ctx)
        switch (true) {
            case ctx.text === 'start'
                || ctx.text === '/start'
                || ctx.text === '开始游戏'
                || ctx.text === '开始':
                // 开始游戏
                this.startGame(ctx).then(r => console.log(r))
                break
            default:
                console.log('未能识别消息')
        }
    }

    /**
     * 发送开始游戏消息
     */
    public startGame = async (ctx: Context) => {
        // 创建内联键盘按钮
        const buttonUtils = new ButtonUtils()
        let resultBtn = buttonUtils.createInlineKeyBoard([
            {
                text: '\uD83C\uDFB2Pc定位球',
                query: '按钮查询的东西'
            },
            {
                text: '\uD83E\uDDE9Pc28',
                query: '按钮查询的东西'
            },
            {
                text: '\uD83C\uDFAFPc28高倍',
                query: '按钮查询的东西'
            }
        ])
        // 发送带有分享按钮的消息
        try {
            await ctx.reply(new GameBotHtml().getStartGame(), resultBtn)
        } catch (err) {

        }
    }
}


export default GameMessageHandle
