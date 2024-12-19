/**
 * 游戏常用指令类
 */
import GameCommandHtml from "../html/GameCommandHtml";
import {Context} from "telegraf";
import BotGameModel from "../../models/BotGameModel";
import BotPaymentModel from "../../models/BotPaymentModel";
import PaymentType from "../../typeEnums/PaymentType";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import MessageUtils from "../../commons/message/MessageUtils";


class GameCommand {

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
     * 生成所有指令的html结果
     */
    public createCommand = (ctx: Context) => {
        let html = new GameCommandHtml().createCommandHtml()
        return  ctx.replyWithHTML(html)
    }

    /**
     * 生成注单指令
     */
    public createNoteOrder = async (ctx: Context) => {
        try {
            // 获取当前群组信息
            let groupModel = await new BotGameModel().getCurrGroup(ctx)
            if (groupModel) {
                let result = await new BotPledgeUpModel().getHistory(ctx,10, [
                    groupModel.gameType
                ])
                let html = new GameCommandHtml().createNoteOrder(result)
                new MessageUtils().sendTextReply(ctx, html).then()
            }
        } catch (err) {
            console.log('出现错误', err)
        }
    }

}


export default GameCommand
