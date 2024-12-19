import type {Context} from "telegraf";
import ButtonUtils from './../commons/button/ButtonUtils'
import GameBotHtml from './html/GameBotHtml'
import StartGameEnum from "../typeEnums/gameEnums/StartGameEnum";
import {Telegraf} from "telegraf";

const sendMessage = async (bot: Telegraf<Context>) => {
    // 发送带有分享按钮的消息
    try {
        await bot.telegram.replyWithHTML(new GameBotHtml().getBotStartHtml(), new ButtonUtils().createCallbackBtn([[
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


export default sendMessage
