import {Context} from "telegraf";
import UserModel from "../../models/UserModel";
import GameUserHtml from "../html/GameUserHtml";
import MessageUtils from "../../commons/message/MessageUtils";
import AESUtils from "../../commons/AESUtils";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import BotPaymentModel from "../../models/BotPaymentModel";
import WalletType from "../../typeEnums/WalletType";
import BotExchangeModel from "../../models/BotExchangeModel";
import htmlUtils from "../../commons/HtmlUtils";
import GameController from "./GameController";
import GameEnumsClass from "../../typeEnums/gameEnums/GameEnumsClass";
import ContextUtil from "../../commons/ContextUtil";


/**
 * 游戏查询用户相关信息类
 */
class GameFindController {

    public ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 查询用户余额
     */
    public getUserBalance = async () => {
        let userId = AESUtils.encodeUserId(this.ctx?.from?.id.toString())
        let user = await UserModel
            .createQueryBuilder()
            .where('tg_id = :tgId', {
                tgId: userId
            })
            .getOne()
        if (!user) {
            user = await new UserModel().createNewUser(this.ctx)
        }
        let html = new GameUserHtml().getUserBalanceHtml(user!)
        await new MessageUtils().sendPopMessage(this.ctx, html)
    }

    /**
     * 查询用户最近投注(最近的十条记录)
     */
    public getUserRecentBetting = async () => {
        let list = await new BotPledgeUpModel().getHistory(this.ctx, 5)
        let html = new GameUserHtml().getPledgeHtml(list)
        console.log(html)
        await new MessageUtils().sendPopMessage(this.ctx, html)
    }

    /**
     * 查询用户流水
     */
    public getUserFlowingWater = async () => {
        let {
            gameType,
            dayWater,
            weekWater,
            totalWater
        } = await new BotPaymentModel().getUserWaterClass(this.ctx)
        let html = new GameUserHtml().getUserPaymentHtml(
            this.ctx,
            {
                gameType: new GameEnumsClass().getGameTypeStr(gameType),
                dayWater: dayWater.getValue(),
                weekWater: weekWater.getValue(),
                totalWater: totalWater.getValue()
            }
        )
        await new MessageUtils().sendPopMessage(this.ctx, html)
    }

    /**
     * 查询用户盈亏
     */
    public getUserProfitLoss = async () => {
        let {
            gameType,
            dayWater,
            weekWater,
            totalWater
        } = await new BotPaymentModel().getUserProfitLoss(this.ctx)
        let html = new GameUserHtml().getUserProfitLossHtml(
            this.ctx,
            {
                gameType: new GameEnumsClass().getGameTypeStr(gameType),
                dayWater: dayWater.getValue(),
                weekWater: weekWater.getValue(),
                totalWater: totalWater.getValue()
            }
        )
        await new MessageUtils().sendPopMessage(this.ctx, html)
    }
}



export default GameFindController
