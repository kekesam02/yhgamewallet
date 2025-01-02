import type {Context, Telegraf} from "telegraf";
import ButtonUtils from '../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../commons/AESUtils";
import UserModel from "../../../models/UserModel";
import WalletController from "../../controller/WalletController";
import {ButtonCallbackType} from "../../../commons/button/ButtonCallbackType";
import WalletMessage from "../../const/WalletMessage";
import BotWithdrawalAddrModel from "../../../models/BotWithdrawalAddrModel";
import redis from "../../../config/redis";
import WalletHandleTixianMethod from "./tixian/WalletHandleTixianMethod";
import WalletHandleZhuanzhangMethod from "./zhuanzhaung/WalletHandleZhuanzhangMethod";
import WalletHandleShouKuanMethod from "./shoukuan/WalletHandleShouKuanMethod";
import WalletHandleHongBaoMethod from "./hongbao/WalletHandleHongBaoMethod";
import WalletHandleShangduiMethod from "./shangdui/WalletHandleShangduiMethod";
import walletUserCenterMethod from "./usercenter/WalletUserCenterMethod";

/**
 * 公共方法处理
 * npm install @img/sharp-darwin-arm64 @img/sharp-libvips-darwin-arm64 @img/sharp-libvips-linux-x64 @img/sharp-libvips-linuxmusl-x64 @img/sharp-linux-x64 @img/sharp-linuxmusl-x64 --force
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletHandleMethod {
    /**
     * 删除上一次消息
     * @param ctx
     */
    public static removeMessage = async (ctx: Context) => {
        try {
            var messageId: number = ctx.callbackQuery?.message?.message_id || 0
            if (messageId > 0) {
                ctx.deleteMessage(messageId)
            }
        } catch (e) {
        }
    }

    /**
     * 清除缓存相关
     * @param ctx
     */
    public static clearCacheRelation = async (ctx: Context) => {
        var tgId: number | string = ctx.callbackQuery?.message?.chat?.id || ctx.message?.from?.id || 0
        await redis.del('pwd_' + tgId )
        await redis.del('mark_' + tgId)
    }

    /**
     * 清除缓存登录
     * @param ctx
     */
    public static clearCacheLogin = async (ctx: Context) => {
        var tgId: number | string = ctx.callbackQuery?.message?.chat?.id || ctx.message?.from?.id || 0
        await redis.del("login_" + tgId)
        await redis.del('mark_' + tgId)
    }

    /**
     * 个人中心主菜单返回
     * 代号：home_btn
     * @param ctx
     */
    public static startButtonBack = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        redis.del("currentop" + tgId)
        await this.removeMessage(ctx)
        await this.clearCacheRelation(ctx)
        await this.startCommand(ctx, tgId, username, firstName)
    }

    /**
     * 命令/start执行指令
     * @param ctx
     */
    public static startCommandCallback = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.message?.from?.id || 0
        var firstName: string = ctx.message?.from?.first_name || ''
        var username: string = ctx.message?.from?.username || ''
        redis.del("currentop" + tgId)// 删除操作
        await this.removeMessage(ctx)
        await this.clearCacheRelation(ctx)
        await this.startCommand(ctx, tgId, username, firstName)
    }

    /**
     *  公共方法
     *  // var botId = ctx.botInfo.id
     *  // var botFirstName = ctx.botInfo.first_name
     *  // var botUsername = ctx.botInfo.username
     *  // var botCanJoinGroups = ctx.botInfo.can_join_groups
     *  // var token = ctx.telegram.token
     *  // var apiMode = ctx.telegram.options.apiMode
     *  // var nickname:string = ctx.message?.from?.first_name || ''
     *  // var username:string = ctx.message?.from?.username || ''
     *  // var isBot:boolean = ctx.message?.from?.is_bot || false
     *  // var date:number = ctx.message?.date || 0
     *  // var messageId:number = ctx.message?.message_id || 0
     */
    public static startCommand = async (ctx: Context, tgId: number, username: string, firstName: string) => {
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 根据tgId查询用户是否存在。
        let user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        // 1：如果不存在就添加
        if (!user) {
            // 如果用户不存在就添加用户
            await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                USDT: "0",
                promotionLink: '',
                rechargeLink: ''
            }).execute()
            // 查询覆盖原来的值
            user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        }

        // 2：实时同步更新用户的昵称
        if (firstName && user && user.nickName != firstName) {
            // 如果用户不存在就添加用户
            await UserModel.createQueryBuilder().update(UserModel).set({
                nickName: firstName
            }).where('id = :id', {id: user.id}).execute()
        }
        // 3：查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        // 4：发送带有分享按钮的消息
        var addr = botWithdrawalAddrModel?.addr || '';
        var html = WalletBotHtml.getBotStartHtml(tgId, addr, user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(WalletController.HomeBtns))
        } catch (err) {
            await ctx.reply(WalletMessage.ERROR_CLIENT)
        }
    }

    /**
     * 计算器输入
     * @param ctx
     */
    public static startInputPassword = async (ctx: Context) => {
        var tgId: string = ctx.callbackQuery?.message?.chat?.id + "" || ''
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data || ''
        var currentVals = callbackStr.replaceAll('num_', '').split("_")
        var currentVal = currentVals[0]
        var inlineMessageId = currentVals[1]
        var money = currentVals[2]
        var operator = currentVals[3]
        var sendTgId = currentVals[4]
        if (callbackStr.startsWith("num_")) {
            var cacheValue = await redis.get('pwd_' + tgId) || ''
            var cvalue = cacheValue + currentVal
            if (cvalue.length > 4) cvalue = cvalue.substring(0,4)
            redis.set('pwd_' + tgId, cvalue)
            await this.sendPasswordSetupMessage(ctx, cvalue, false, {inlineMessageId,money,operator,tgId:sendTgId})
        } else if (callbackStr == 'clear') {
            redis.del('pwd_' + tgId)
            await this.sendPasswordSetupMessage(ctx, "", false, {inlineMessageId,money,operator,tgId:sendTgId})
        } else if (callbackStr == 'delete') {
            var cacheKey = await redis.get('pwd_' + tgId)
            if (cacheKey) {
                var arr = cacheKey.split("")
                arr.pop()
                var join = arr.join('')
                redis.set('pwd_' + tgId, join)
                await this.sendPasswordSetupMessage(ctx, join, false, {inlineMessageId,money,operator,tgId:sendTgId})
            }
        }
    }


    /**
     * 转账、红包、提现、收款、闪兑提示输入密码
     * @param ctx
     */
    public static sendPasswordSetupMessage = async (ctx: Context, callbackStr: string = "", firstFlag: boolean = true, validator: {
        inlineMessageId: string,
        money?: string,
        tgId?: string,
        operator?: string
    }) => {
        var tgId: string = ctx.callbackQuery?.message?.chat?.id+'' || ''
        if(!tgId || tgId=='undefined')tgId=validator?.tgId || ''
        try {
            var arr = ["🔑 "]
            let length = callbackStr.length
            for (let i = 0; i < length; i++) {
                arr.push(callbackStr[i])
            }
            for (let i = length; i < 4; i++) {
                arr.push("_ ")
            }
            let surebtn = length >= 4
            const html = WalletMessage.PASSWORD_TIP(arr)
            const keybordsArr: Array<Array<ButtonCallbackType>> = []
            for (let i = 1; i <= 9; i += 3) {
                var rowInline: Array<ButtonCallbackType> = []
                for (let j = i; j < i + 3; j++) {
                    rowInline.push({
                        text: j + "",
                        query: "num_" + j + '_' + validator.inlineMessageId+'_'+validator.money+"_"+validator.operator+'_'+validator.tgId
                    })
                }
                keybordsArr.push(rowInline)
            }
            // 计算器清空，删除，zero按钮
            keybordsArr.push(WalletController.ComputeClearDel)
            if (surebtn) {
                if (validator.inlineMessageId == "0") {
                    keybordsArr.push([WalletController.SaveUserPwd])
                } else {
                    keybordsArr.push([WalletController.ValidatorUserPwd(
                        validator?.tgId,
                        validator?.inlineMessageId,
                        validator?.money,
                        validator?.operator
                    )])
                }
            } else {
                var len = keybordsArr.length
                var index = keybordsArr[len - 1].findIndex(c => c.query == 'update_pwd_btn')
                if (index != -1) {
                    keybordsArr[len - 1].splice(index, 1)
                }
            }
            // 设置启动开关
            redis.set("mark_" + tgId, 1)
            if (firstFlag) {
                // 4: 机器人回复，显示信息和按钮相关
                await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(keybordsArr))
            } else {
                // 4: 机器人回复，显示信息和按钮相关
                await ctx.editMessageText(html, new ButtonUtils().createCallbackBtn(keybordsArr))
            }
        } catch (err) {
            // 删除缓存
            await redis.del('pwd_'+tgId)
            await ctx.reply(WalletMessage.ERROR_CLIENT)
        }
    }

    /**
     * 提交密码
     * 代号：update_pwd_btn
     * @param ctx
     */
    public static startUpdatePwdCallback = async (ctx: Context, cbot: Telegraf<Context>) => {
        var tgId: string = ctx.callbackQuery?.from?.id + "" || ''
        var cacheValue = await redis.get('pwd_' + tgId)
        if (cacheValue) {
            if (cacheValue.length >= 4) {
                var firstName: string = ctx.callbackQuery?.from?.first_name || ''
                let userId = AESUtils.encodeUserId(tgId?.toString())
                var password = cacheValue.substring(0, 4) || ''
                // 开始查询密码
                const resp = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
                if (resp?.paymentPassword) {
                    if (resp.paymentPassword == password) {
                        // 清除计算器消息
                        await this.removeMessage(ctx)
                        // 清空缓存
                        await this.clearCacheRelation(ctx)
                        // 发送消息
                        await ctx.replyWithHTML(WalletMessage.PASSWORD_SUCCESS_MESSAGE)
                        // 设置登录成功的标识
                        await redis.set("login_" + tgId, "success", 'EX',   60 * 60 * 24)
                        // 可以考虑进行交易的处理
                        await this.loginCallback(tgId, ctx, cbot)
                    } else {
                        ctx.replyWithHTML(WalletMessage.C_PASSWPORD_ERROR)
                    }
                } else {
                    // 开始执行密码修改
                    await UserModel.createQueryBuilder().update()
                        .set({paymentPassword: password, nickName: firstName})
                        .where("tg_id=:tgId", {'tgId': userId}).execute()
                    // 设置密码消息
                    const html = WalletMessage.PASSWORD_MESSAGE(cacheValue)
                    // 清除计算器消息
                    await this.removeMessage(ctx)
                    // 清空缓存
                    await this.clearCacheRelation(ctx)
                    // 发送消息
                    await ctx.replyWithHTML(html)
                    // 设置登录成功的标识
                    await redis.set("login_" + tgId, "success", 'EX',  60 * 60 * 24)
                    // 可以考虑进行交易的处理
                    await this.loginCallback(tgId, ctx, cbot)
                }
            } else {
                ctx.replyWithHTML(WalletMessage.PASSWPORD_ERROR)
            }
        } else {
            ctx.replyWithHTML(WalletMessage.PASSWPORD_EMPTY)
        }
    }

    /**
     * 登录成功以后直接激活具体业务
     * @param tgId
     * @param ctx
     * @param cbot
     */
    public static loginCallback = async (tgId: string, ctx: Context, cbot: Telegraf<Context>) => {
        const currentOp = await redis.get("currentop" + tgId)
        if (currentOp == 'tx') {
            WalletHandleTixianMethod.startTiXian(ctx, cbot)
        } else if (currentOp == 'zhuanzhang') {
            WalletHandleZhuanzhangMethod.startZhuanZhang(ctx, cbot)
        } else if (currentOp == 'shoukuan') {
            WalletHandleShouKuanMethod.startShouKuan(ctx, cbot)
        } else if (currentOp == 'hongbao') {
            WalletHandleHongBaoMethod.startHongBao(ctx, cbot)
        } else if (currentOp == 'shandui') {
            WalletHandleShangduiMethod.startShanDui(ctx, cbot)
        }else if (currentOp == 'xemm') {
            walletUserCenterMethod.startUserCenterCallback(ctx)
        }else{
            this.startButtonBack(ctx)
        }
    }


    /**
     * 是否登录
     * 公共方法
     * @param ctx
     */
    public static isLogin = async (tgId: number, ctx: Context) => {
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 查询的目的，是用户忘记密码。后台可以清空密码。这样可以让用户重新设置。
        const resp = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
        if (!resp?.paymentPassword) {
            redis.del("login_" + tgId)
            redis.del('pwd_' + tgId + '')
            return false
        }
        // 获取登录成功的标识
        const loginFlag = await redis.get("login_" + tgId)
        return loginFlag == "success"
    }
}

export default WalletHandleMethod
