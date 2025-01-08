import BotGameModel from "../../models/BotGameModel"
import {Context, Telegraf} from "telegraf"
import ContextUtil from "../../commons/ContextUtil"
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum"
import StartGameEnum from "../../type/gameEnums/StartGameEnum";
import ButtonUtils from "../../commons/button/ButtonUtils";
import GameBotHtml from "../../html/gameHtml/GameBotHtml";
import BotRoundModel from "../../models/BotRoundModel";
import GameBotImage from "../../html/gameHtml/GameBotImage";
import {Pc28LotteryJsonType} from "../../type/gameEnums/LooteryJsonType";
import OddsController from "./OddsController";
import ImageUtils from "../../commons/Image/ImageUtils";
import GameController from "./GameController";
import MessageUtils from "../../commons/message/MessageUtils";
import request from "../../commons/request/request";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import WinningTypeConfirm from "../const/WinningTypeConfirm";
import BotOddsStorage from "../../storage/BotOddsStorage";
import StringUtils from "../../commons/StringUtils";
import ComputeUtils from "../../commons/compute/ComputeUtils";
import GameCommandHtml from "../../html/gameHtml/GameCommandHtml";
import UserModel from "../../models/UserModel";
import {queryRunner} from "../../config/database";
import {addLockByTgId} from "../../config/redislock";
import ScheduleHandle from "../../commons/schedule/ScheduleHandle";
import LotteryRequest from "../lotterRequest";
import AESUtils from "../../commons/AESUtils";
import GameScheduleHandle from "../../commons/schedule/GameScheduleHandle";

type PC28LotteryType = {

}

/**
 * PC28游戏实现(类/控制器)
 */
class PC28Controller {

    /**
     * 获取当前加入 pc28 游戏的群组
     */
    private getJoinGameGroup = async (): Promise<Array<BotGameModel>> => {
        let result = await BotGameModel
            .createQueryBuilder()
            .where('game_state = :game_state', {
                game_state: 1
            })
            .andWhere('(game_type = :game_type or game_type = :game_type2)', {
                game_type: GameTypeEnum.PC28DI,
                game_type2: GameTypeEnum.PC28GAO
            })
            .getMany()
        result = result.filter(item => {
            if (item.gameState == 1 && item.del == 0) {
                return true
            }
        })
        console.log('当前加入游戏的群组', result)
        return result
    }

    /**
     * 添加游戏到用户群组
     *      bot_game(当前正在进行游戏的群组) 数据库
     */
    public joinPC28Low = async (ctx: Context, gameType: GameTypeEnum) => {
        // 查询当前群组是否已经加入游戏
        let result = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :group_id', {
                group_id: ContextUtil.getGroupId(ctx)
            })
            .getMany()
        if (!result.length) {
            await new BotGameModel().createNewGame(ctx, gameType)
        } else {
            if (result[0]) {
                if (result[0].gameState == 0) {
                    result[0].gameType = gameType
                    result[0].gameState = 1
                    await BotGameModel.save(result[0])
                } else {
                    if (result[0].gameType == gameType) {
                        return
                    }
                    // 更换游戏
                    result[0].gameType = gameType
                    result[0].gameState = 1
                    await BotGameModel.save(result[0])
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
     * 获取 pc28 开奖记录(用户发送到群组到消息)
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
     * 获取 pc28 开奖记录(机器人主动发送消息给群组)
     */
    public getLotteryListBot = async (bot: Telegraf<Context>) => {
        let result = await this.getJoinGameGroup()
        for (let i = 0; i < result.length; i++) {
            let item = result[i]
            let gameType = item?.gameType
            let historyList = await BotRoundModel
                .createQueryBuilder()
                .where('round_type = :round_type', {
                    round_type: gameType
                })
                .take(20)
                .orderBy('create_time', 'DESC')
                .getMany()
            let botImage = await new GameBotImage().createPC28Img(historyList)
            await bot.telegram.sendPhoto(
                item.groupId.indexOf('-') < -1? AESUtils.decodeUserId(item.botUserId): item.groupId,
                botImage
            )
        }
    }

    /**
     * 发送开奖结果字符串到群组
     * @param bot
     * @param lotteryJson: 开奖结果
     * @param pledgeUpMap: 上押表map整理后的数据
     */
    public getLotteryTextBot = async (
        bot: Telegraf<Context>,
        lotteryJson: Pc28LotteryJsonType,
        pledgeUpMap: Map<GameTypeEnum, Array<BotPledgeUpModel>>
    ) => {
        // 当前开奖期数
        let roundId = lotteryJson.data[0].expect
        // 当前开奖号码
        let number = lotteryJson.data[0].open_code

        let groupList = await this.getJoinGameGroup()
        for (let i = 0; i < groupList.length; i++) {
            let item = groupList[i]
            // 当前群组的私密用户列表
            let currPrivateUser = []
            // 公开下注的用户列表
            let publicList = []
            let winningList = await this.getUserIsWinning(pledgeUpMap, lotteryJson, item.gameType)
            // 需要更新的用户列表
            let updateUserList: Array<UserModel> = []
            let tgIdList: Array<string> = []
            let userMap: Map<string, UserModel> = new Map()
            for (let i = 0; i < winningList.length; i++) {
                let item2 = winningList[i]
                if (item2.tgId) {
                    let user: UserModel
                    if (userMap.has(item2.tgId)) {
                        user = userMap.get(item2.tgId)!
                    } else {
                        let user_ = await new UserModel().getUserModelById(item2.tgId)
                        if (!user_) {
                            continue
                        }
                        user = user_
                        userMap.set(item2.tgId, user)
                    }
                    user.updateUserMoney(item2.walletType, item2.winningAmount)
                }
                if (winningList[i].isSm == 2) {
                    publicList.push(winningList[i])
                } else if (winningList[i].isSm == 1) {
                    if (winningList[i].groupId == item.groupId) {
                        currPrivateUser.push(winningList[i])
                    }
                }
            }
            userMap.forEach((value, key, map) => {
                updateUserList.push(value)
                tgIdList.push(value.tgId)
            })

            await addLockByTgId(tgIdList, async () => {
                try {
                    await queryRunner.startTransaction()
                    await queryRunner.manager.save(winningList)
                    await queryRunner.manager.save(updateUserList)
                    await queryRunner.commitTransaction()
                } catch (err) {
                    console.log('出现错误了进行回滚', err)
                    await queryRunner.rollbackTransaction()
                }
            },async()=>{
            })

            if (item.groupId.indexOf('-') < 0) {
                // 私聊发送消息
                let html = new GameBotHtml().getLotteryTextHtml(
                    lotteryJson,
                    roundId,
                    number,
                    item.gameType,
                    currPrivateUser
                )
                await new MessageUtils().botSendText(
                    bot,
                    item.groupId.indexOf('-') < 0? AESUtils.decodeUserId(item.botUserId): item.groupId,
                    html
                )
            } else {
                // 公开的发送开奖信息
                let html = new GameBotHtml().getLotteryTextHtml(
                    lotteryJson,
                    roundId,
                    number,
                    item.gameType,
                    publicList
                )
                await new MessageUtils().botSendText(
                    bot,
                    item.groupId.indexOf('-') < 0? AESUtils.decodeUserId(item.botUserId): item.groupId,
                    html
                )
            }
        }
    }

    /**
     * 获取pc28开始下注信息、并发送到已经加入游戏的群组中
     */
    public startPCLow = async (
        bot: Telegraf<Context>,
        lotteryJson?: Pc28LotteryJsonType
    ) => {
        let result = await this.getJoinGameGroup()
        let json = lotteryJson? lotteryJson: await this.getLotteryJson()
        // 查询游戏赔率表
        let oddsMap = await new OddsController().getOddsMap()
        let startImage = await new ImageUtils().readImageFile('./../../../static/images/start.png')
        let replyMarkup = new GameController().createCommonBtnList().reply_markup
        // 遍历群组列表、并发送游戏信息到群组
        result.forEach((item) => {
            let html = new GameBotHtml().getStartGameHtml(json, item.gameType, oddsMap)
            if (item.groupId.indexOf('-') < -1) {
                new MessageUtils().sendPhotoHtmlBtn(bot, AESUtils.decodeUserId(item.botUserId), html, replyMarkup, startImage)
            } else {
                new MessageUtils().sendPhotoHtmlBtn(bot, item.groupId, html, replyMarkup, startImage)
            }
        })
    }

    /**
     * 发送封盘提醒到群组
     */
    public sendCloseTopTips = async (
        bot: Telegraf<Context>,
        {
            roundId
        }: {
            // 游戏期数
            roundId: string
        }
    ) => {
        let result = await this.getJoinGameGroup()
        // 遍历群组列表、并发送游戏信息到群组
        result.forEach((item) => {
            let html = new GameBotHtml().getCloseTips(roundId)
            new MessageUtils().botSendText(
                bot,
                item.groupId.indexOf('-') < -1? AESUtils.decodeUserId(item.botUserId): item.groupId,
                html,
                new GameController().createCommonBtnList().reply_markup
            )
        })
    }

    /**
     *  发送停止上注信息到群组
     *  @param bot
     *  @param {}
     */
    public sendStopTop = async (
        bot: Telegraf<Context>,
        {
            roundId,
            openTime
        }: {
            // 游戏期数
            roundId: string,
            // 开奖时间
            openTime: string
        }
    ) => {
        let result = await this.getJoinGameGroup()
        let stopImage = await new ImageUtils().readImageFile('./../../../static/images/stop.png')
        let replyMarkup = new GameController().createCommonBtnList().reply_markup
        let pledgeUpList28Di = await BotPledgeUpModel
            .createQueryBuilder()
            .where('round_id = :roundId', {
                roundId: roundId
            })
            .andWhere('state = 0')
            .andWhere('del = 0')
            .andWhere('game_type = :gameType', {
                gameType: GameTypeEnum.PC28DI
            })
            .getMany()
        let pledgeUpList28Gao = await BotPledgeUpModel
            .createQueryBuilder()
            .where('round_id = :roundId', {
                roundId: roundId
            })
            .andWhere('state = 0')
            .andWhere('del = 0')
            .andWhere('game_type = :gameType', {
                gameType: GameTypeEnum.PC28GAO
            })
            .getMany()

        // 遍历群组列表、并发送游戏信息到群组
        result.forEach((item) => {
            let publishList =  item.gameType == GameTypeEnum.PC28DI ? pledgeUpList28Di: pledgeUpList28Gao
            let privateList: Array<BotPledgeUpModel> =  []
            publishList = publishList.filter(item2 => {
                if (item2.isSm == 2) {
                    return true
                } else {
                    privateList.push(item2)
                    return false
                }
            })
            privateList = privateList.filter(item2 => {
                return item2.groupId == item.groupId
            })
            let html = new GameBotHtml().getStopTopHtml(
                roundId,
                openTime,
                item.groupId.indexOf('-') >= 0? publishList: privateList
            )
            new MessageUtils().sendPhotoHtmlBtn(
                bot,
                item.groupId.indexOf('-') < -1? AESUtils.decodeUserId(item.botUserId): item.groupId,
                html,
                replyMarkup,
                stopImage
            )
        })
    }


    /**
     * 保存开奖结果到数据库
     */
    public saveLotteryJson = async (json: Pc28LotteryJsonType) => {
        await new BotRoundModel().saveRound(json, GameTypeEnum.PC28DI, 1)
        await new BotRoundModel().saveRound(json, GameTypeEnum.PC28GAO, 1)
        return json
    }

    /**
     * 获取所有下注的用户列表、根据游戏类型进行分类
     */
    public getWinningUser = async (json: Pc28LotteryJsonType): Promise<Map<
        // 游戏类型
        GameTypeEnum,
        // 所有下注列表
        Array<BotPledgeUpModel>
    >> => {
        // 当前所有下注的用户
        let pledgeUpList = await new BotPledgeUpModel()
            .getUserList(json.data[0].expect)
        let result: Map<GameTypeEnum, Array<BotPledgeUpModel>> = new Map()
        pledgeUpList.forEach(item => {
            if (result.has(item.gameType)) {
                result.set(item.gameType, [...result.get(item.gameType)!, item])
            } else {
                result.set(item.gameType, [item])
            }
        })
        return result
    }

    /**
     * 发送官网维护消息到群组
     */
    public sendRepairHtml = async (bot: Telegraf<Context>) => {
        let groupList = await this.getJoinGameGroup()
        let html = new GameCommandHtml().repairHtml()
        groupList.forEach(item => {
            new MessageUtils().botSendText(bot, item.groupId, html)
        })
    }



    /**
     * 获取pc28开奖结果
     */
    public getLotteryJson = async (): Promise<Pc28LotteryJsonType | null> => {
        // let json = await request({
        //     url: 'http://api.openjiang.com/api?token=230F534DE38145D7&t=jnd28&rows=5&p=json',
        //     method: 'get'
        // })
        if (GameScheduleHandle.pc28Config.isTest) {
            let result = await new LotteryRequest().getLotteryJson()
            result.data[0].open_code = GameScheduleHandle.pc28Config.testList[GameScheduleHandle.pc28Config.testIndex]
            GameScheduleHandle.pc28Config.testIndex++
            return result
        } else {
            return new LotteryRequest().getLotteryJson()
        }


        // let json = await request({
        //     url: 'https://api.8828355.com/api?token=11EB9FBB41B4D90C&t=jnd28&rows=5&p=json',
        //     method: 'get'
        // })
        // console.log('开奖数据', json.data)
        // if (!json.data || !json.data.data) {
        //     throw Error(json.statusText ?? '您无权访问改ip')
        // }
        // json.data.data = json.data.data.map((item: any) => {
        //     item.expect = item['expect']
        //     if (ScheduleHandle.pc28Config.isTest) {
        //         item.open_code = ScheduleHandle.pc28Config.testList[ScheduleHandle.pc28Config.testIndex]
        //             ? ScheduleHandle.pc28Config.testList[ScheduleHandle.pc28Config.testIndex]
        //             : ScheduleHandle.pc28Config.testList[0]
        //     } else {
        //         item.open_code = item['opencode']
        //     }
        //     item.open_time = item['opentime']
        //     item.next_expect = item['drawIssue']
        //     item.next_time = item['drawTime']
        //     return item
        // })

        // 新的开奖接口
        // let json = await request({
        //     url: 'https://www.8kai.cc/localapi/api.php?ac=result&lottery=jndpc28&limit=15',
        //     method: 'get'
        // })
        // if (!json.data) {
        //     throw Error(json.statusText ?? '您无权访问改ip')
        // }
        // console.log('请求到的数据', json.data)
        // json.data.data = json.data.data.map((item: any) => {
        //     item.expect = item['nu_id']
        //     if (ScheduleHandle.pc28Config.isTest) {
        //         item.open_code = ScheduleHandle.pc28Config.testList[ScheduleHandle.pc28Config.testIndex]
        //             ? ScheduleHandle.pc28Config.testList[ScheduleHandle.pc28Config.testIndex]
        //             : ScheduleHandle.pc28Config.testList[0]
        //     } else {
        //         item.open_code = `${item['number_1']},${item['number_2']},${item['number_3']}`
        //     }
        //     item.open_time = item['kai_times']
        //     item.next_expect = item['next_nu_id']
        //     item.next_time = item['kai_times']
        //     return item
        // })


        // if (json.data instanceof String && json.data.indexOf('请求频率太快') > 0) {
        //     return {
        //         "rows": 5,
        //         "t": "jisu28",
        //         "message": "请求频率太快",
        //         "data": []
        //     }
        // }
        // console.log('返回的结果', json.data)
        // return json.data
    }

    /**
     * 根据游戏类型获取所有中奖用户
     * @param pledgeUpMap 根据游戏类型划分后的用户列表、具体查看 getWinningUser
     * @param lotteryJson 开奖结果
     * @param gameType
     */
    public getUserIsWinning = async (
        pledgeUpMap: Map<GameTypeEnum, Array<BotPledgeUpModel>>,
        lotteryJson: Pc28LotteryJsonType,
        gameType: GameTypeEnum
    ): Promise<Array<BotPledgeUpModel>> => {
        let currList = pledgeUpMap.get(gameType) ?? []
        if (currList.length < 0) {
            return []
        }
        // 当前中奖结果
        let openCode = lotteryJson.data[0].open_code
        let openSum = this.getLotterySum(openCode)
        // 获取判定后的开奖结果
        let winningType = new WinningTypeConfirm().getLotteryDesc(openCode, gameType)
        // 更新后的数据
        let needChangeList: Array<BotPledgeUpModel> = []
        for (let i = 0; i < currList.length; i++) {
            let item = currList[i]

            // 如果第一位是数字开头的证明是点杀
            if (new StringUtils().isStartWithNum(item.content)) {
                console.log('进行点杀判断', item.content)
                let arr = item.content.split('杀')
                if (new ComputeUtils(arr[0]).comparedTo(openSum) == 0) {
                    item.isWinning = 1
                    item.winningAmount = await BotOddsStorage.getOddsMoney(
                        item.bettingType,
                        item.amountMoney,
                        openCode,
                        gameType,
                        winningType.form.key
                    )
                    needChangeList.push(item)
                }
            }

            // 梭哈处理
            if (item.content.indexOf('梭哈') == 0) {
                let last = item.content.substring(2, item.content.length)
                if (winningType.code.key.indexOf(last) > -1) {
                    item.isWinning = 1
                    item.winningAmount = await BotOddsStorage.getOddsMoney(
                        item.bettingType,
                        item.amountMoney,
                        openCode,
                        gameType,
                        winningType.form.key
                    )
                    needChangeList.push(item)
                }
                continue
            }

            let last = item.content.substring(1, item.content.length)
            // 如果第二位是以数字开头证明只下了 单双大小
            if (new StringUtils().isStartWithNum(last)) {
                console.log('进行单双判定', item.content)
                let fist = item.content.substring(0, 1)
                if (winningType.code.key.indexOf(fist) > -1) {
                    item.isWinning = 1
                    item.winningAmount = await BotOddsStorage.getOddsMoney(
                        item.bettingType,
                        item.amountMoney,
                        openCode,
                        gameType,
                        winningType.form.key
                    )
                    needChangeList.push(item)
                }
                continue
            }

            console.log('特码判定', item.content)
            // 判定特码能否对上
            if (item.content.indexOf(winningType.code.key) > -1) {
                item.isWinning = 1
                item.winningAmount = await BotOddsStorage.getOddsMoney(
                    item.bettingType,
                    item.amountMoney,
                    openCode,
                    gameType,
                    winningType.form.key
                )
                needChangeList.push(item)
                continue
            }

            console.log('形态判定', item.content)
            // 判断形态是否对上
            if (item.content.indexOf(winningType.form.key) > -1) {
                item.isWinning = 1
                item.winningAmount = await BotOddsStorage.getOddsMoney(
                    item.bettingType,
                    item.amountMoney,
                    openCode,
                    gameType,
                    winningType.form.key
                )
                needChangeList.push(item)
            }

            console.log('极值判定', item.content)
            // 判断极值是否对上
            if (item.content.indexOf(winningType.max) > -1) {
                item.isWinning = 1
                item.winningAmount = await BotOddsStorage.getOddsMoney(
                    item.bettingType,
                    item.amountMoney,
                    openCode,
                    gameType,
                    winningType.form.key
                )
                needChangeList.push(item)
            }
        }
        return needChangeList
    }


    /**
     * 获取开奖结果之和
     */
    private getLotterySum = (openCode: string) => {
        return openCode.split(',').reduce((prev, curr) => {
            return prev + Number(curr)
        }, 0)
    }
}



export default PC28Controller
