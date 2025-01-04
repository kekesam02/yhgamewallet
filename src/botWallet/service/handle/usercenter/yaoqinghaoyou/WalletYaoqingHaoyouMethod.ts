import type {Context} from "telegraf";
import ButtonUtils from '../../../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import WalletController from "../../../../controller/WalletController";
import BotWithdrawalAddrModel from "../../../../../models/BotWithdrawalAddrModel";
import redis from "../../../../../config/redis";
import WalletHandleMethod from "../../WalletHandleMethod";
import {addLockByTgId} from "../../../../../config/redislock";
import BotInviteUserModel from "../../../../../models/BotInviteUserModel";
import walletConfig from "../../../../WalletConfig";
import walletUserCenterController from "../../../../controller/WalletUserCenterController";
import ButtonInnerQueryUtils from "../../../../../commons/button/ButtonInnerQueryUtils";
import WalletConfig from "../../../../WalletConfig";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletYaoqingHaoyouMethod {
    /**
     * 邀请好友
     * 代号：yqhy_btn
     * @param ctx
     */
    public static startYqhy = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var nickname: string = ctx.callbackQuery?.from?.first_name || ''
        await addLockByTgId(['yaoqinghaoyou_lock_'+tgId+''],async ()=>{
            // 设置操作
            await redis.set("currentop" + tgId, "yaoqinghaoyou", 'EX', 60 * 60)
            // 统计邀请人数
            const {num} = await BotInviteUserModel.createQueryBuilder().select("count(1)","num")
                .where("inviter_tg_id = :inviteTgId",{"inviteTgId":AESUtils.encodeUserId(tgId+'')})
                .getRawOne()
            // 用户点击就绑定关系
            const url= walletConfig.walltPayBotYaoQingURL+tgId;
            const html="\uD83C\uDFAA推荐您的朋友加入一号公馆\n" +
                "\uD83D\uDD25好友完成充值投注后，您将获取好友投注金额【0.2%】的奖励\n" +
                "➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n" +
                "已邀请人数："+num+"\n" +
                "推荐链接：\n<code>" +url+"</code>(点击复制)";
            // 发送消息
            await ctx.replyWithHTML(html,walletUserCenterController.createUserCenterBackBtn(nickname,url))
        },async ()=>{
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 分享好友邀请
     * @param query
     * @param queryId
     * @param tgId
     * @param ctx
     */
    public static startYaoqingHaoYou = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['haoyouyapqing_lock_' + tgId + ''], async () => {
            // 创建一个可分享的结果
            await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryDialog({
                id: queryId,
                title: "好友邀请",
                description: query,
                input_message_content: {
                    message_text: query,
                    parse_mode: "HTML"
                }
            }))
        }, async () => {
            await ctx.answerCbQuery('亲，操作慢点，休息一会在操作!')
        })
    }

}


export default WalletYaoqingHaoyouMethod
