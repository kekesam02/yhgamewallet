import {UpdateType} from "telegraf/typings/telegram-types";
import {Context} from "telegraf";
import StartGameEnum from "../../type/gameEnums/StartGameEnum";
import PC28Controller from '../gameController/PC28Controller'
import GameController from "../gameController/GameController";
import GameFindController from "../gameController/GameFindController";
import CommandController from "../gameController/CommandController";


/**
 * 娱乐机器人接收到的用户按钮点击事件处理器
 */
class GameCallbackHandle {
    public static listenerMessage = (ctx: Context) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        switch (callbackStr) {
            case StartGameEnum.LOW:
                // 开始 pc28 低倍游戏
                let pc28Controller = new PC28Controller()
                pc28Controller.joinPC28Low(ctx)
                break
            case StartGameEnum.HIGH:
                // 开始 pc28 高倍游戏
                break
            case StartGameEnum.BALL:
                // 开始定位球游戏
                this.startBall()
                break

            // ----------------  下面是查询用户点击相关事件
            case GameController.lookBalance.query:
                // 查询用户余额
                new GameFindController(ctx).getUserBalance().then()
                break
            case GameController.recentBetting.query:
                // 查询用户最近投注情况
                new GameFindController(ctx).getUserRecentBetting().then()
                break
            case GameController.flowingWater.query:
                // 查询用户流水
                new GameFindController(ctx).getUserFlowingWater()
                break
            case GameController.profitLoss.query:
                // 查询用户盈亏
                new GameFindController(ctx).getUserProfitLoss()
                break
        }
    }

    /**
     * 开始定位球游戏
     */
    public static startBall = () => {
        console.log('开始定位球游戏')
    }
}




export default GameCallbackHandle
