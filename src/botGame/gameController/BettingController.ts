/**
 * 娱乐机器人下注控制器
 */
import BotOddsStorage from "../../storage/BotOddsStorage";
import {Context} from "telegraf";
import BotGameModel from "../../models/BotGameModel";
import BettingCommand28 from "../const/BettingCommand28";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import UserModel from "../../models/UserModel";
import MessageUtils from "../../commons/message/MessageUtils";
import GameBotHtml from "../../html/gameHtml/GameBotHtml";
import GameController from "./GameController";


class BettingController {

    // 当前传入的下注相关指令
    private text: string = ''
    private readonly ctx: Context

    constructor(ctx: Context, text: string) {
        this.text = text
        this.ctx = ctx
    }

    /**
     * 监听下注指令
     */
    public listenerBettingCommand = async () => {
        // 群组对象
        let group = await new BotGameModel().getCurrGroup(this.ctx)
        // 获取赔率信息
        let oddsList = await BotOddsStorage.getOddsListGame(group.gameType)
        switch (group.gameType) {
            case GameTypeEnum.PC28DI:
                // 进行pc28游戏指令处理
                new BettingCommand28(this.ctx, group, oddsList).listenerCommand()
                break
            case GameTypeEnum.PC28GAO:
                // 进行pc28游戏指令处理
                new BettingCommand28(this.ctx, group, oddsList).listenerCommand()
                break
        }
    }

    /**
     * 判断是否是梭哈
     */
    public allIn = async () => {

    }

}



export default BettingController
