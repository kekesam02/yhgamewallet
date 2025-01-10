import type {Context} from "telegraf";
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import redis from "../../../../../config/redis";
import WalletHandleMethod from "../../dashbord/WalletHandleMethod";
import {addLockByTgId} from "../../../../../config/redislock";
import BotInviteUserModel from "../../../../../models/BotInviteUserModel";
import walletConfig from "../../../../WalletConfig";
import WalletUserCenterController from "../../../../controller/WalletUserCenterController";
import ButtonInnerQueryUtils from "../../../../../commons/button/ButtonInnerQueryUtils";

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
            await redis.set("currentop" + tgId, "yaoqinghaoyou", 'EX', 60 * 60 * 24)
            // 统计邀请人数
            const inviteUserModels = await BotInviteUserModel.createQueryBuilder()
                .where("inviter_tg_id = :inviteTgId",{"inviteTgId":AESUtils.encodeUserId(tgId+'')})
                .getMany()

            var arr = []
            for (let i = 0; i < inviteUserModels.length; i++) {
                var dtgId = AESUtils.decodeUserId(inviteUserModels[i].quiltTgId)
                arr.push('<a href="tg://user?id='+dtgId+'">@'+inviteUserModels[i].quiltUsername+'</a>')
            }
            // 用户点击就绑定关系
            const url= walletConfig.walltPayBotYaoQingURL+tgId
            let html = ""
            if(arr && arr.length > 0 ) {
                 html = "\uD83C\uDFAA推荐您的朋友加入一号公馆\n" +
                    "\uD83D\uDD25好友完成充值投注后，您将获取好友投注金额【0.2%】的奖励\n" +
                    "➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n" +
                    "1、已邀请人数：" + inviteUserModels.length + "\n" +
                    "2、邀请列表是：" + arr.join('、') + "\n" +
                    "3、推荐链接：\n<code>" + url + "</code> (点击复制)"
            }else{
                 html = "\uD83C\uDFAA推荐您的朋友加入一号公馆\n" +
                    "\uD83D\uDD25好友完成充值投注后，您将获取好友投注金额【0.2%】的奖励\n" +
                    "➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n" +
                    "推荐链接：\n<code>" + url + "</code> (点击复制)"
            }
            // 发送消息
            await ctx.replyWithHTML(html,WalletUserCenterController.createUserCenterYaoqingBtn(nickname,url))
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
    public static startInnerYaoqingHaoYou = async (query: string, queryId: string, tgId: number, ctx: Context) => {
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
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }


    /**
     * 分享好友邀请
     * @param query
     * @param queryId
     * @param tgId
     * @param ctx
     */
    public static startYaoqingHaoYou = async ( inviteTgId: string, ctx: Context) => {
        // 获取telegram的tgId
        let update: any = ctx?.update
        // 1：获取telegram的tgId
        var tgId: string = update?.message?.from?.id + '' || ''
        await addLockByTgId(['haoyouyapqing_start_lock_' + tgId + ''], async () => {
            var nickname: string = update.message?.from?.first_name || ''
            var username: string = update.message?.from?.username || ''
            if(tgId == inviteTgId){
                await ctx.replyWithHTML("⚠️  自己不能邀请自己!")
                return;
            }
            var quitTgIdAes = AESUtils.encodeUserId(tgId)
            // 查询是否被邀请过
            const {num} = await BotInviteUserModel.createQueryBuilder().select("count(1)","num")
                .where("quilt_tg_id = :quiltTgId",{"quiltTgId":quitTgIdAes})
                .getRawOne()
            const {num1} = await BotInviteUserModel.createQueryBuilder().select("count(1)","num1")
                .where("inviter_tg_id = :inviterTgId",{"inviterTgId":quitTgIdAes})
                .getRawOne()
            // 说明被邀请过了--单向开关
            if(num > 0 || num1 > 0 ){
                // 返回
                await ctx.replyWithHTML("⚠️  已被邀请!")
                await WalletHandleMethod.startCommandCallback(ctx)
                return
            }

            // 1、注册被邀请人 --- 如果被邀请人已经注册，就不绑定关系了
            var quitTgIdUserBot = await new UserModel().getUserModelById(quitTgIdAes)
            if(!quitTgIdUserBot){
                // 如果用户不存在就添加用户，把交易地址赋值给他
                await UserModel.createQueryBuilder().insert().into(UserModel).values({
                    tgId: quitTgIdAes,
                    nickName: nickname,
                    userName: username,
                    vip: 0,
                    USDT: "0"
                }).execute()
                // 查询回填ID
                quitTgIdUserBot = await new UserModel().getUserModelById(quitTgIdAes)
                // 2、查询邀请人信息
                var inviteTgIdAes = AESUtils.encodeUserId(inviteTgId)
                var inviterTgIdUserBot = await new UserModel().getUserModelById(inviteTgIdAes)
                // 3、保存邀请关系
                await BotInviteUserModel.createQueryBuilder().insert().into(BotInviteUserModel)
                    .values({
                        inviterTgId:inviteTgIdAes,
                        inviterUserId:inviterTgIdUserBot?.id,
                        inviterUsername:inviterTgIdUserBot?.nickName,
                        inviterNickname:inviterTgIdUserBot?.userName,
                        quiltTgId:quitTgIdAes,
                        quiltUserId:quitTgIdUserBot?.id,
                        quiltUsername:quitTgIdUserBot?.nickName,
                        quiltNickname:quitTgIdUserBot?.userName,
                        linkType: 0
                    }).execute()
                // 4、返回
                await WalletHandleMethod.startCommandCallback(ctx)
            }else{
                // 2、查询邀请人信息
                var inviteTgIdAes = AESUtils.encodeUserId(inviteTgId)
                var inviterTgIdUserBot = await new UserModel().getUserModelById(inviteTgIdAes)
                // 3、保存邀请关系
                await BotInviteUserModel.createQueryBuilder().insert().into(BotInviteUserModel)
                    .values({
                        inviterTgId:inviteTgIdAes,
                        inviterUserId:inviterTgIdUserBot?.id,
                        inviterUsername:inviterTgIdUserBot?.nickName,
                        inviterNickname:inviterTgIdUserBot?.userName,
                        quiltTgId:quitTgIdAes,
                        quiltUserId:quitTgIdUserBot?.id,
                        quiltUsername:quitTgIdUserBot?.nickName,
                        quiltNickname:quitTgIdUserBot?.userName,
                        linkType: 0
                    }).execute()
                // 4、返回
                await WalletHandleMethod.startCommandCallback(ctx)
            }
        }, async () => {
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }
}


export default WalletYaoqingHaoyouMethod
