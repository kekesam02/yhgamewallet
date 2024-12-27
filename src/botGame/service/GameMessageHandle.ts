import type {Context} from "telegraf";
import ButtonUtils from '../../commons/button/ButtonUtils'
import GameBotHtml from '../../html/gameHtml/GameBotHtml'
import StartGameEnum from "../../type/gameEnums/StartGameEnum";
import PC28Controller from "../gameController/PC28Controller";
import CommandController from "../gameController/CommandController";
import BettingController from "../gameController/BettingController";
import moment from "moment";
import ScheduleHandle from "../../commons/ScheduleHandle";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";

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
                console.log('查看流水')
                await new CommandController().water(ctx)
                break
            case CommandController.profitLoss.includes(text):
                // 盈亏
                console.log('查看盈亏')
                await new CommandController().profitLoss(ctx)
                break

            // 下面是下注相关 =================
            default:
                if (text && text.length > 0 && text.indexOf('/') < 0) {
                    await new BettingController(ctx, text).listenerBettingCommand()
                    // if (moment().isBefore(ScheduleHandle.pc28Config.stopUpTime)) {
                    //     await new BettingController(ctx, text).listenerBettingCommand()
                    // }
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
}


export default GameMessageHandle
