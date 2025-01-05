import type {Context} from "telegraf";
import redis from "../../../../../config/redis";
import {addLockByTgId} from "../../../../../config/redislock";
import WalletType from "../../../../../type/WalletType";
import BotRoundModel from "../../../../../models/BotRoundModel";
import GameTypeEnum from "../../../../../type/gameEnums/GameTypeEnum";
import BotPledgeUpModel from "../../../../../models/BotPledgeUpModel";
import AESUtils from "../../../../../commons/AESUtils";
import botRoundModel from "../../../../../models/BotRoundModel";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletCaiJinZhuanhuaMethod {

    /**
     * 彩金转化
     * 代号：ctrxzh_btn
     * @param ctx
     */
    public static startCtrxzh = async (ctx: Context,callbackData:string) => {
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var username: string = ctx.callbackQuery?.from?.username || ''
        var nickname: string = ctx.callbackQuery?.from?.first_name || ''
        var callbackQueryId: string = ctx.callbackQuery?.id || ''
        await addLockByTgId(['caijinzhuanghua_lock_'+tgId],async ()=>{
            // 设置操作
            await redis.set("currentop" + tgId, "caijinzhuanghua", 'EX', 60 * 60)
            //查询骰子是否有彩金上注
            const cj = await this.cj(tgId, WalletType.USDT);
            if (cj){
                await ctx.answerCbQuery("已有正在投注的彩金，无法转化，请无投注后重试",{show_alert:true});
                return;
            }
            //this.cjzhuanhua(BetCurrencyTypeEnum.CUSDT,tgId,userName,name,callbackQueryId,bot);
        },async ()=>{
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }



    private static cj = async (tgId:number,walletType:WalletType)=>{
            //查询是否有正在上注的游戏
            //查极速骰子最新未封盘期数
            var list2  = await BotRoundModel.createQueryBuilder()
                .where("tg_id:tgId and getEntertained = 0 and round_type = " + GameTypeEnum.TOUZIJS).getMany();
            if (list2.length >0 ) {
                //有启动骰子
                const botRoundModel: BotRoundModel = list2[0]
                const sfxz = await this.sfxz(tgId, botRoundModel?.roundId, walletType, GameTypeEnum.TOUZIJS);
                if (sfxz) {
                    return true;
                }
                //获取其他游戏最新期数
                const sfxz1 = await this.sfxz(tgId, botRoundModel?.roundId, walletType, GameTypeEnum.TOUZI);
                if (sfxz1) {
                    return true;
                }

                const sfxz2 = await this.sfxz(tgId, botRoundModel?.roundId, walletType, GameTypeEnum.PC28DI);
                if (sfxz2) {
                    return true;
                }

                const sfxz3 = await this.sfxz(tgId, botRoundModel?.roundId, walletType, GameTypeEnum.PC28GAO);
                if (sfxz3) {
                    return true;
                }

                const sfxz4 = await this.sfxz(tgId, botRoundModel?.roundId, walletType, GameTypeEnum.PCDWQ);
                if (sfxz4) {
                    return true;
                }
            }
            return false;
    }



    private static sfxz = async (tgId: number, roudId: number | undefined, walletType: WalletType, gameType: GameTypeEnum)=>{
        const list1 = await BotPledgeUpModel.createQueryBuilder()
            .where("user_id = :userId and game_type = :gameType and round_id = :roundId and wallet_type = :walletType and state = 0 and del = 0",
                {"userId":AESUtils.encodeUserId(tgId+''),"gameType":gameType,"roundId":roudId,"walletType":walletType})
            .getMany()
        if (list1.length>0) {
            return true;
        }
        return false
    }
}


export default WalletCaiJinZhuanhuaMethod
