import {Context} from "telegraf";
import UserModel from "../../models/UserModel";
import GameUserHtml from "../html/GameUserHtml";
import MessageUtils from "../../commons/message/MessageUtils";
import AESUtils from "../../commons/AESUtils";


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
        console.log('查看余额', this.ctx?.from)
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
        await new MessageUtils(this.ctx).sendPopMessage(html)
    }

    /**
     * 查询用户最近投注
     */
    public getUserRecentBetting = () => {
        console.log('查询用户最近投注')
    }

    /**
     * 查询用户最近投注
     */
    public getUserFlowingWater = () => {
        console.log('查询用户最近投注')
    }

    /**
     * 查询用户盈亏
     */
    public getUserProfitLoss = () => {
        console.log('查询用户盈亏')
    }
}



export default GameFindController
