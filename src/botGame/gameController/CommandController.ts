import GameCommandHtml from "../../html/gameHtml/GameCommandHtml";
import {Context} from "telegraf";
import BotGameModel from "../../models/BotGameModel";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import MessageUtils from "../../commons/message/MessageUtils";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import PC28Controller from "./PC28Controller";
import UserModel from "../../models/UserModel";
import GameUserHtml from "../../html/userHtml/GameUserHtml";
import GameFindController from "./GameFindController";


/**
 * 娱乐机器人指令控制器(游戏机器人常用指令)
 */
class CommandController {

    /**
     * 指令命令
     */
    public static command = ['指令']

    /**
     * 注单指令
     */
    public static noteOrder = ['注单', 'zd']

    /**
     * 开奖指令
     */
    public static openWinner = ['开奖', 'kj']

    /**
     * 余额
     */
    public static balance = ['余额', 'ye']

    /**
     * 反水
     */
    public static defect = ['反水', '返水', 'fs']

    /**
     * 取消
     */
    public static cancel = ['取消', 'qx']

    /**
     * 流水
     */
    public static water = ['流水', 'ls']

    /**
     * 盈亏
     */
    public static profitLoss = ['盈亏', 'yk']

    /**
     * 发送所有指令的html结果并发送到群组
     */
    public createCommand = (ctx: Context) => {
        let html = new GameCommandHtml().createCommandHtml()
        return  ctx.replyWithHTML(html)
    }

    /**
     * 生成注单指令 html 查询结果并发送到群组
     */
    public createNoteOrder = async (ctx: Context) => {
        // 获取当前群组信息
        let groupModel = await new BotGameModel().getCurrGroup(ctx)
        if (groupModel) {
            let result = await new BotPledgeUpModel().getHistory(ctx,10, [
                groupModel.gameType
            ])
            let html = new GameCommandHtml().createNoteOrder(result)
            new MessageUtils().sendTextReply(ctx, html).then()
        }
    }

    /**
     * 生成开奖结果查询信息并发送到群组
     * @param ctx
     */
    public createOpenWinner = async (ctx: Context) => {
        // 获取当前群组信息
        let groupModel = await new BotGameModel().getCurrGroup(ctx)
        switch (groupModel?.gameType) {
            case GameTypeEnum.PC28DI:
                return new PC28Controller().getLotteryList(ctx)
            case GameTypeEnum.PC28GAO:
                return new PC28Controller().getLotteryList(ctx)
        }
    }

    /**
     * 生成用户余额查询信息并发送到群组
     * @param ctx
     */
    public createUserBalance = async (ctx: Context) => {
        let user = await new UserModel().getUserModel(ctx)
        let html = new GameUserHtml().getUserBalanceHtml(user!, true)
        return  new MessageUtils().sendTextReply(ctx, html)
    }

    /**
     * 给用户进行反水（暂时不对、需要确定规则）
     * @param ctx
     */
    public createDefect = async (ctx: Context) => {
        // 获取当前群组信息
        let groupModel = await new BotGameModel().getCurrGroup(ctx)
        if (!groupModel?.gameType) {
            return
        }
        // let oddsList = await new BotOddsModel().getOddsList([
        //     groupModel!.gameType
        // ])
        console.log('获取到的赔率表数据')
    }

    /**
     * 取消上注
     * @param ctx
     */
    public cancelBet = async (ctx: Context) => {
        return new BotPledgeUpModel().cancelPledgeUp(ctx)
    }

    /**
     * 查看用户流水
     * @param ctx
     */
    public water = async (ctx: Context) => {
        console.log('查看用户流水')
        return new GameFindController(ctx).getUserFlowingWater(false)
    }

    /**
     * 查看用户盈亏
     * @param ctx
     */
    public profitLoss = async (ctx: Context) => {
        console.log('查看用户盈亏')
        return  new GameFindController(ctx).getUserProfitLoss(false)
    }

}


export default CommandController
