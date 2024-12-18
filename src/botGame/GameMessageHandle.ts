import type {Context} from "telegraf";
import ButtonUtils from './../commons/button/ButtonUtils'
import GameBotHtml from './html/GameBotHtml'
import StartGameEnum from "../typeEnums/gameEnums/StartGameEnum";
import PC28Controller from "./gameController/PC28Controller";

/**
 * 娱乐机器人接收到的用户消息处理器
 */
class GameMessageHandle {

    public listenerMessage = (ctx: Context) => {
        console.log('传入的用户消息', ctx)
        switch (true) {
            case ctx.text === 'start'
                || ctx.text === '/start'
                || ctx.text === '开始游戏'
                || ctx.text === '开始':
                // 开始游戏
                this.startGame(ctx).then()
                break
            case ctx.text === '历史'
                || ctx.text ===  '1':
                new PC28Controller().getLotteryList(ctx).then()
                break
            default:
                console.log('未能识别消息')
        }
    }

    /**
     * 发送开始游戏消息
     */
    public startGame = async (ctx: Context) => {
        // 发送带有分享按钮的消息
        try {
            console.log('返回的数据', new GameBotHtml().getBotStartHtml())
            await ctx.replyWithHTML(new GameBotHtml().getBotStartHtml(), new ButtonUtils().createCallbackBtn([[
                {
                    text: '\uD83E\uDDE9Pc28',
                    query: StartGameEnum.LOW
                },
                {
                    text: '\uD83C\uDFAFPc28高倍',
                    query: StartGameEnum.HIGH
                },
                {
                    text: '\uD83C\uDFB2Pc定位球',
                    query: StartGameEnum.BALL
                }
            ]]))
        } catch (err) {

        }
    }
}


export default GameMessageHandle
