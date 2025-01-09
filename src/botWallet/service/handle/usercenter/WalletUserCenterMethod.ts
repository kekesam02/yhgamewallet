import type {Context} from "telegraf";
import ButtonUtils from '../../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../../commons/AESUtils";
import UserModel from "../../../../models/UserModel";
import WalletController from "../../../controller/WalletController";
import BotWithdrawalAddrModel from "../../../../models/BotWithdrawalAddrModel";
import redis from "../../../../config/redis";
import WalletHandleMethod from "../dashbord/WalletHandleMethod";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletUserCenterMethod {

    /**
     * 删除上一次消息
     * @param ctx
     */
    public static removeMessage = async (ctx: Context) => {
        var messageId: number = ctx.callbackQuery?.message?.message_id || 0
        if (messageId > 0) {
            ctx.deleteMessage(messageId)
        }
    }

    /**
     * message类型
     * @param ctx
     */
    public static startUserCenterMessageCallback = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.message?.from?.id || 0
        var firstName: string = ctx.message?.from?.first_name || ''
        var username: string = ctx.message?.from?.username || ''
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 设置操作
        await redis.set("currentop" + tgId, "usercenter", 'EX', 60 * 60 * 24)
        // 1：密码确认
        const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }

        // 根据tgId查询用户是否存在。
        let user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        // 1：如果不存在就添加
        if (!user) {
            // 如果用户不存在就添加用户
            var insertResultPromise = await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                promotionLink: '',
                rechargeLink: ''
            }).execute();
            // 查询覆盖原来的值
            user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        }

        // 2：实时同步更新用户的昵称
        if (firstName && user && user.nickName != firstName) {
            // 如果用户不存在就添加用户
            await UserModel.createQueryBuilder().update(UserModel).set({
                nickName: firstName
            }).where('id = :id', {id: user.id}).execute();
        }

        // 删除上一次消息
        var messageId: number = ctx.callbackQuery?.message?.message_id || 0
        if (messageId > 0) {
            ctx.deleteMessage(messageId)
        }
        // 3：查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder()
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        // 4：发送带有分享按钮的消息
        var addr = botWithdrawalAddrModel?.addr || "";
        var html = WalletBotHtml.getBotStartHtml(tgId, addr, user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(WalletController.UserHomeBtns))
        } catch (err) {

        }
    }

    /**
     * 个人中心按钮--执行方法
     * 代号：user_center
     * @param ctx
     */
    public static startUserCenterCallback = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 设置操作
        await redis.set("currentop" + tgId, "usercenter", 'EX', 60 * 60 * 24)
        // 1：密码确认
        const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }

        // 根据tgId查询用户是否存在。
        let user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        // 1：如果不存在就添加
        if (!user) {
            // 如果用户不存在就添加用户
            var insertResultPromise = await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                promotionLink: '',
                rechargeLink: ''
            }).execute();
            // 查询覆盖原来的值
            user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        }

        // 2：实时同步更新用户的昵称
        if (firstName && user && user.nickName != firstName) {
            // 如果用户不存在就添加用户
            await UserModel.createQueryBuilder().update(UserModel).set({
                nickName: firstName
            }).where('id = :id', {id: user.id}).execute();
        }

        // 删除上一次消息
        var messageId: number = ctx.callbackQuery?.message?.message_id || 0
        if (messageId > 0) {
            ctx.deleteMessage(messageId)
        }
        // 3：查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder()
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        // 4：发送带有分享按钮的消息
        var addr = botWithdrawalAddrModel?.addr || "";
        var html = WalletBotHtml.getBotStartHtml(tgId, addr, user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(WalletController.UserHomeBtns))
        } catch (err) {

        }
    }
}


export default WalletUserCenterMethod
