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
import {Pc28LotteryJsonType} from "../../gameTypes/LooteryJsonType";
import OddsController from "./OddsController";
import ImageUtils from "../../commons/Image/ImageUtils";
import GameController from "./GameController";

const schedule = require('node-schedule')

type PC28LotteryType = {

}

/**
 * PC28游戏实现(类/控制器)
 */
class PC28Controller {

    /**
     * 获取当前加入 pc28 游戏的群组
     */
    private getJoinGameGroup = (): Promise<Array<BotGameModel>> => {
        return BotGameModel
            .createQueryBuilder()
            .where('game_state = :game_state', {
                game_state: 1
            })
            .andWhere('(game_type = :game_type or game_type = :game_type2)', {
                game_type: GameTypeEnum.PC28DI,
                game_type2: GameTypeEnum.PC28GAO
            })
            .getMany()
    }

    /**
     * 添加游戏到用户群组
     *      bot_game(当前正在进行游戏的群组) 数据库
     */
    public joinPC28Low = async (ctx: Context) => {
        // 查询当前群组是否已经加入游戏
        let result = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :group_id', {
                group_id: ContextUtil.getGroupId(ctx)
            })
            .getMany()
        if (!result.length) {
            await new BotGameModel().createNewGame(ctx)
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
            new ButtonUtils().createCallbackBtn([[
                {
                    text: '一号PC2.0公馆',
                    url: 'https://t.me/+3EhvhC0t8ApmMGY1'
                }
            ]])
        )
    }

    /**
     * 获取 pc28 开奖记录
     */
    public getLotteryList = async (ctx: Context) => {
        let groupId = ContextUtil.getGroupId(ctx)
        let gameModel = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :group_id', {
                group_id: groupId
            })
            .getOne()
        let gameType = gameModel?.gameType
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
        let result = await this.getJoinGameGroup()
        let json = await this.mockLottery()
        // 查询游戏赔率表
        let oddsMap = await new OddsController().getOddsMap()
        let startImage = await new ImageUtils().readImageFile('./../../../static/images/start.png')
        let replyMarkup = new GameController().createCommonBtnList().reply_markup
        // console.log('发送的内容', new GameBotHtml().getStartGameHtml(json, item.gameType, oddsMap))
        // 遍历群组列表、并发送游戏信息到群组
        result.forEach((item) => {
            console.log('发送的用户id--->', item.botUserId, item.id)
            console.log('发送的群组id--->', item.groupId)
            bot.telegram.sendPhoto(
                item.groupId,
                {
                    source: startImage,
                    filename: '1.png'
                },
                {
                    caption: new GameBotHtml().getStartGameHtml(json, item.gameType, oddsMap),
                    parse_mode: 'HTML',
                    reply_markup: replyMarkup
                }
            ).then(val => {
                console.log('发送消息结果2', val)
            }).catch(err => {
                console.log('发送消息失败', err)
            })
        })
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
    public mockLottery = (): Promise<Pc28LotteryJsonType> => {
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
