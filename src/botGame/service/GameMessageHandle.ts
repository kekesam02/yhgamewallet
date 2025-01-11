import type {Context} from "telegraf";
import ButtonUtils from '../../commons/button/ButtonUtils'
import GameBotHtml from '../../html/gameHtml/GameBotHtml'
import StartGameEnum from "../../type/gameEnums/StartGameEnum";
import PC28Controller from "../gameController/PC28Controller";
import CommandController from "../gameController/CommandController";
import BettingController from "../gameController/BettingController";
import moment from "moment";
import ScheduleHandle from "../../commons/schedule/ScheduleHandle";
import MessageUtils from "../../commons/message/MessageUtils";
import GameBettingTips from "../../html/gameHtml/GameBettingTips";
import GameCallbackHandle from "./GameCallbackHandle";
import GameUserRedis from "../../commons/redis/GameUserRedis";
import ContextUtil from "../../commons/ContextUtil";
import BotGameModel from "../../models/BotGameModel";
import {addLock} from "../../config/redislock";
import {queryRunner} from "../../config/database";
import CommonEnumsIndex from "../../type/CommonEnumsIndex";

/**
 * 娱乐机器人接收到的用户消息处理器
 */
class GameMessageHandle {
    public listenerMessage = async (ctx: Context) => {
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
                let result = await GameCallbackHandle.isCanStartGame(ctx)
                if (!result) {
                    return
                }
                // 开始游戏
                this.startGame(ctx).then()
                break
            case text === '历史'
            || text ===  '1':
                await new PC28Controller().getLotteryList(ctx)
                break


            // 下面是指令相关的消息------------
            case CommandController.command.includes(text):
                // 查询所有指令
                console.log('查询到的指令信息--')
                await new CommandController().createCommand(ctx)
                break
            case CommandController.noteOrder.includes(text):
                // 查询注单信息
                console.log('查询注单信息')
                await new CommandController().createNoteOrder(ctx)
                break
            case CommandController.openWinner.includes(text):
                // 查询开奖数据
                console.log('查询开奖信息')
                await new CommandController().createOpenWinner(ctx)
                break
            case CommandController.balance.includes(text):
                // 查询开奖数据
                console.log('查询用户余额')
                await new CommandController().createUserBalance(ctx)
                break
            case CommandController.defect.includes(text):
                // 反水
                console.log('进行反水')
                let isPlaying = await GameUserRedis.getUserIsPlaying(ContextUtil.getUserId(ctx))
                if (isPlaying) {
                    await new MessageUtils().sendTextReply(ctx, '亲！正在游戏中、需等本期游戏结束在进行反水')
                    break
                }
                await new CommandController().createDefect(ctx)
                break
            case CommandController.cancel.includes(text):
                // 取消上注
                console.log('取消上注')
                if (moment().isBefore(ScheduleHandle.pc28Config.stopUpTime)) {
                    await new CommandController().cancelBet(ctx)
                }
                break
            case CommandController.water.includes(text):
                // 流水
                let groupId = ContextUtil.getGroupId(ctx)
                let groupModel = await BotGameModel
                    .createQueryBuilder()
                    .where('group_id = :groupId', {
                        groupId: groupId
                    })
                    .getOne()
                if (!groupModel) {
                    return
                }
                await new CommandController().water(ctx, [groupModel.gameType])
                break
            case CommandController.profitLoss.includes(text):
                // 盈亏
                console.log('查看盈亏')
                // 查询用户流水
                let groupId2 = ContextUtil.getGroupId(ctx)
                let groupModel2 = await BotGameModel
                    .createQueryBuilder()
                    .where('group_id = :groupId', {
                        groupId: groupId2
                    })
                    .getOne()
                if (!groupModel2) {
                    return
                }
                await new CommandController().profitLoss(ctx, [groupModel2.gameType])
                break
            case text.indexOf('hb') > -1:
                // 当前是红包的指令不进行处理
                break

            // 下面是下注相关 =================
            default:
                if (text && text.length > 0 && text.indexOf('/') < 0) {
                    // await new BettingController(ctx, text).listenerBettingCommand()
                    if (moment().isBefore(ScheduleHandle.pc28Config.stopUpTime)) {
                        await new BettingController(ctx, text).listenerBettingCommand()
                    } else {
                        // let stopHtml = new GameBettingTips().stopPledgeUpHtml()
                        // await new MessageUtils().sendTextReply(ctx, stopHtml)
                    }
                }
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

    /**
     * 退出当前游戏
     */
    public quitGame = async (ctx: Context) => {
        let isPlaying = await GameUserRedis.getUserIsPlaying(ContextUtil.getUserId(ctx))
        if (isPlaying) {
            await new MessageUtils().sendTextReply(ctx, '亲！正在游戏中、需等本期游戏结束才能退出')
            return
        }
        let groupId = ContextUtil.getGroupId(ctx)
        let tgId = ContextUtil.getUserId(ctx)
        let groupModel = await BotGameModel
            .createQueryBuilder()
            .where('group_id = :groupId', {
                groupId: groupId
            })
            .getOne()
        if (groupModel) {
            // 不是群组创建人拒绝响应
            if (tgId != groupModel?.botUserId) {
                return
            }
            groupModel.gameState = 0
            await addLock([groupId], async () => {
                await queryRunner.startTransaction()
                try {
                    await queryRunner.manager.save(groupModel)
                    await new MessageUtils().sendTextReply(ctx, '已退出当前游戏')
                    await queryRunner.commitTransaction()
                } catch (err) {
                    await queryRunner.rollbackTransaction()
                }
            }, async () => {
            })
        }
    }
}


export default GameMessageHandle
