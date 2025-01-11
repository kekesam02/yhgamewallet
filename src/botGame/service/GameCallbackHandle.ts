import {Context} from "telegraf";
import StartGameEnum from "../../type/gameEnums/StartGameEnum";
import PC28Controller from '../gameController/PC28Controller'
import GameController from "../gameController/GameController";
import GameFindController from "../gameController/GameFindController";
import ContextUtil from "../../commons/ContextUtil";
import MessageUtils from "../../commons/message/MessageUtils";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import BotGameModel from "../../models/BotGameModel";
import CommonEnumsIndex from "../../type/CommonEnumsIndex";


/**
 * 娱乐机器人接收到的用户按钮点击事件处理器
 */
class GameCallbackHandle {
    public static listenerMessage = async (ctx: Context) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        switch (callbackStr) {
            case StartGameEnum.LOW:
                let isStart = await this.isCanStartGame(ctx)
                if (!isStart) {
                    return
                }
                // 开始 pc28 低倍游戏
                let pc28Controller1 = new PC28Controller()
                await pc28Controller1.joinPC28Low(ctx, GameTypeEnum.PC28DI)
                break
            case StartGameEnum.HIGH:
                // 开始 pc28 高倍游戏
                let isStart2 = await this.isCanStartGame(ctx)
                if (!isStart2) {
                    return
                }
                // 开始 pc28 高倍游戏
                let pc28Controller2 = new PC28Controller()
                await pc28Controller2.joinPC28Low(ctx, GameTypeEnum.PC28GAO)
                break
            case StartGameEnum.BALL:
                let isStart3 = await this.isCanStartGame(ctx)
                if (!isStart3) {
                    return
                }
                // 开始定位球游戏
                this.startBall()
                break

            // ----------------  下面是查询用户点击相关事件
            case GameController.lookBalance.query:
                // 查询用户余额
                await new GameFindController(ctx).getUserBalance()
                break
            case GameController.recentBetting.query:
                // 查询用户最近投注情况
                await new GameFindController(ctx).getUserRecentBetting()
                break
            case GameController.flowingWater.query:
                // 查询用户流水
                await new GameFindController(ctx).getUserFlowingWater(true, new CommonEnumsIndex().getAllGameType())
                break
            case GameController.profitLoss.query:
                // 查询用户盈亏
                await new GameFindController(ctx).getUserProfitLoss(true, new CommonEnumsIndex().getAllGameType())
                break
        }
    }

    /**
     * 判断用户是否可以开始游戏
     *      当前群组游戏只有菜菜可以开始
     *      私聊的所有人都可以开始游戏
     * @return true: 可以开始游戏
     */
    public static isCanStartGame = async (ctx: Context): Promise<boolean> => {
        if (ContextUtil.getGroupId(ctx).indexOf('-') > -1) {
            // 当前是在群组中开始游戏、点击开始的用户必须是菜菜
            if (
                ContextUtil.getUserId(ctx) != 'eWW8GfBUH53HJH75HOTfDg=='
                && ContextUtil.getUserId(ctx) != '5HhFhp4LdJa+L7fZlm3i9A=='
            ) {
                await new MessageUtils().sendTextReply(ctx, '只有管理员可以开始群组游戏')
                return false
            }
            return true
        }
        return true
    }

    /**
     * 开始定位球游戏
     */
    public static startBall = () => {
        console.log('开始定位球游戏')
    }
}




export default GameCallbackHandle
