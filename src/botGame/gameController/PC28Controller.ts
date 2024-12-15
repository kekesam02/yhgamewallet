import BotGameModel from "../../models/BotGameModel"
import {Context, Telegraf} from "telegraf"
import ContextUtil from "../../commons/ContextUtil"
import GameTypeEnum from "./../../typeEnums/gameEnums/GameTypeEnum"
import GameEnumsClass from "../../typeEnums/gameEnums/GameEnumsClass";
import StartGameEnum from "../../typeEnums/gameEnums/StartGameEnum";
import ButtonUtils from "../../commons/button/ButtonUtils";
import GameBotHtml from "../html/GameBotHtml";
import BotRoundModel from "../../models/BotRoundModel";
import GameBotImage from "../html/GameBotImage";

const schedule = require('node-schedule')

type PC28LotteryType = {

}

/**
 * PC28游戏实现(类/控制器)
 */
class PC28Controller {

    /**
     * 添加游戏到用户群组
     *      bot_game(当前正在进行游戏的群组) 数据库
     */
    public joinPC28Low = async (ctx: Context) => {
        let groupId = ContextUtil.getGroupId(ctx)
        let userId = ContextUtil.getUserId(ctx)
        // 查询当前群组是否已经加入游戏
        let result = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :group_id', {
                group_id: groupId
            })
            .getMany()
        if (!result.length) {
            let newBotGame = new BotGameModel()
            newBotGame.gameState = 1
            newBotGame.botUserId = userId
            newBotGame.gameType = GameTypeEnum.PC28DI
            newBotGame.groupId =  groupId
            await BotGameModel.save(newBotGame)
        } else {
            if (result[0]) {
                if (result[0].gameState == 0) {
                    result[0].gameState = 1
                    await BotGameModel
                        .createQueryBuilder()
                        .update(result[0])
                        .where('id = :id', {
                            id: result[0].id
                        })
                        .execute()
                }
            }
        }
        await this.sendJoinGameMessage(ctx)
    }

    /**
     * 发送加入游戏消息、群组添加游戏后发送消息
     */
    public sendJoinGameMessage = (ctx: Context) => {
        return ctx.replyWithHTML(
            new GameBotHtml().getGameModelHtml(StartGameEnum.LOW),
            new ButtonUtils().createCallbackBtn([
                {
                    text: '一号PC2.0公馆',
                    url: 'https://t.me/+3EhvhC0t8ApmMGY1'
                }
            ])
        )
    }

    /**
     * 获取 pc28 开奖历史
     */
    public getLotteryHistory = async (ctx: Context) => {
        let groupId = ContextUtil.getGroupId(ctx)
        let gameModel = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :group_id', {
                group_id: groupId
            })
            .getOne()
        let gameType = gameModel?.gameType
        console.log('查询的游戏类型', gameType)
        let historyList = await BotRoundModel
            .createQueryBuilder()
            .where('round_type = :round_type', {
                round_type: gameType
            })
            .take(20)
            .orderBy('create_time', 'DESC')
            .getMany()
        let botImage = await new GameBotImage().createPC28Img(historyList)
        await ctx.replyWithPhoto(botImage)

    }


    /**
     * 计时器开始PC28游戏
     */
    public startPCLow = async (bot: Telegraf<Context>) => {
        console.log('开始pc28游戏')
        let result = await BotGameModel
            .createQueryBuilder()
            .where('game_type = :game_type', {
                game_type: GameTypeEnum.PC28DI
            })
            .getMany()
        // result.forEach(item => {
        //     bot.context.replyWithHTML()
        // })
        console.log('查询到的正在进行游戏的群组', result)
    }

    /**
     * 获取pc28开奖结果、并处理开奖结果
     */
    public getLottery = async () => {
        let json = await this.mockLottery()
    }









    /**
     * 模拟获取中奖数据
     */
    public mockLottery = () => {
        return Promise.resolve({
            "rows": 5,
            "t": "jisu28",
            "message": "试用接口第一位开奖号码随机错乱,如需查看完整号码，请访www.openjiang.com购买付费接口!",
            "data": [
                {
                    "expect": "73674886",
                    "open_code": "9,7,3",
                    "open_time": "2024-12-13 22:13:00",
                    "next_expect": "73674887",
                    "next_time": "2024-12-13 22:14:15"
                },
                {
                    "expect": "73674885",
                    "open_code": "1,5,7",
                    "open_time": "2024-12-13 22:11:45",
                    "next_expect": "73674886",
                    "next_time": "2024-12-13 22:13:00"
                },
                {
                    "expect": "73674884",
                    "open_code": "6,2,3",
                    "open_time": "2024-12-13 22:10:30",
                    "next_expect": "73674885",
                    "next_time": "2024-12-13 22:11:45"
                },
                {
                    "expect": "73674883",
                    "open_code": "1,2,3",
                    "open_time": "2024-12-13 22:09:15",
                    "next_expect": "73674884",
                    "next_time": "2024-12-13 22:10:30"
                },
                {
                    "expect": "73674882",
                    "open_code": "2,7,1",
                    "open_time": "2024-12-13 22:08:00",
                    "next_expect": "73674883",
                    "next_time": "2024-12-13 22:09:15"
                }
            ]
        })
    }
}



export default PC28Controller
