import type {Context} from "telegraf";
import ButtonUtils from './../commons/button/ButtonUtils'
import GameBotHtml from './html/GameBotHtml'
import StartGameEnum from "../typeEnums/gameEnums/StartGameEnum";
import PC28Controller from "./gameController/PC28Controller";
import GameCommand from "./gameController/GameCommand";
import ContextUtil from "../commons/ContextUtil";

/**
 * 娱乐机器人接收到的用户消息处理器
 */
class GameMessageHandle {
    public listenerMessage = (ctx: Context) => {
        console.log('传入的用户消息', ctx)
        let text = ctx.text
        if (!text || text.length <= 0 || text == '') {
            return
        }
        switch (true) {
            case text === 'start'
                || text === '/start'
                || text === '开始游戏'
                || text === '开始':
                // 开始游戏
                this.startGame(ctx).then()
                break
            case text === '历史'
                || text ===  '1':
                new PC28Controller().getLotteryList(ctx).then()
                break

            // 下面是指令相关的消息------------
            case GameCommand.command.includes(text):
                console.log('查询到的指令信息--')
                new GameCommand().createCommand(ctx).then()
                break
            case GameCommand.noteOrder.includes(text):
                console.log('查询注单信息')
                new GameCommand().createNoteOrder(ctx)
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
