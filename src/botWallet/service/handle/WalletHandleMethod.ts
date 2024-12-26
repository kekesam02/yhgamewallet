import type {Context} from "telegraf";
import ButtonUtils from '../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../html/walletHtml/WalletBotHtml'
import BotTronAddrModel from "../../../models/BotTronAddrModel";
import AESUtils from "../../../commons/AESUtils";
import UserModel from "../../../models/UserModel";
import MCoinRechargeAddrPoolModel from "../../../models/MCoinRechargeAddrPoolModel";
import WalletController from "../../controller/WalletController";
import messageUtils from "../../../commons/message/MessageUtils";
import QRCodeUtils from "../../../commons/qrcode/QRCodeUtils";
import {ButtonCallbackType} from "../../../commons/button/ButtonCallbackType";
import LocalCache from "../../../commons/cache/LocalCache";
import WalletMessage from "../../const/WalletMessage";
import {InlineQueryResultArticle} from "@telegraf/types/inline";
import BotWithdrawalAddrModel from "../../../models/BotWithdrawalAddrModel";
import redis from "../../../config/redis";
import walletBotHtml from "../../../html/walletHtml/WalletBotHtml";


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

    public static localCache: LocalCache = new LocalCache();
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
     * 清除缓存相关
     * @param ctx
     */
    public static clearCacheRelation = (ctx: Context) => {
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        this.localCache.del(chatId )
        this.localCache.del('mark_'+chatId)
    }

    /**
     * 清除缓存登录
     * @param ctx
     */
    public static clearCacheLogin = (ctx: Context) => {
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        this.localCache.set("login_" + chatId, "success")
        this.localCache.del('mark_'+chatId)
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
        this.removeMessage(ctx)
        this.clearCacheRelation(ctx)
        this.clearCacheLogin(ctx)
        this.startCommand(ctx, tgId, username, firstName)
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
        this.clearCacheRelation(ctx)
        this.clearCacheLogin(ctx)
        this.startCommand(ctx, tgId, username, firstName)
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
        // 3：查询用户是否存在交易地址
        const botWithdrawalAddrModel =  await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0',{tgId: userId}).getOne()
        // 4：发送带有分享按钮的消息
        var addr = botWithdrawalAddrModel?.addr || "";
        var html = WalletBotHtml.getBotStartHtml(tgId, addr,user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(WalletController.HomeBtns))
        } catch (err) {
            ctx.reply(WalletMessage.ERROR_CLIENT)
        }
    }


    /**
     * 充值方法
     * 代号：chongzhi_btn
     * @param ctx
     */
    public static startChongZhi = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 根据tgId查询用户是否存在。
        let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        var link: string | undefined = '';
        //获取专属充值连接，先查询是否有充值连接，没有的话就拿充值链接并且赋值
        if (!botUser) {
            let botTronAddrModel = await BotTronAddrModel.createQueryBuilder()
                .where("uses = :uses", {uses: 0}).limit(0).offset(1).getOne()
            link = botTronAddrModel?.addr;
            // 如果用户不存在就添加用户，把交易地址赋值给他
            await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                promotionLink: '',
                rechargeLink: link
            }).execute()
            // 回查用户的信息
            botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
            // 标识交易地址为使用
            await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModel?.id}).execute()
            // 加入到监听池中
            await MCoinRechargeAddrPoolModel.createQueryBuilder()
                .insert().into(MCoinRechargeAddrPoolModel)
                .values({
                    username: username,
                    nickname: firstName,
                    userId: botUser?.id,
                    tgId: userId,
                    address: link,
                    privateKey: "",
                    currency: "USDT"
                }).execute()
        } else {
            // 如果用户存在，交易地址不存在，就分配一个交易地址给用户
            if (!botUser.rechargeLink) {
                let botTronAddrModel = await BotTronAddrModel.createQueryBuilder()
                    .where("uses = :uses", {uses: 0}).getOne()
                link = botTronAddrModel?.addr;

                // 修改用户交易地址
                await UserModel.createQueryBuilder().update(UserModel).set({
                    nickName: firstName,
                    rechargeLink: link
                }).where('id = :id', {id: botUser.id}).execute()

                // 标识交易地址为使用
                await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModel?.id}).execute()

                // 加入到监听池中
                await MCoinRechargeAddrPoolModel.createQueryBuilder()
                    .insert().into(MCoinRechargeAddrPoolModel)
                    .values({
                        username: username,
                        nickname: firstName,
                        userId: botUser.id,
                        tgId: userId,
                        address: link,
                        privateKey: "",
                        currency: "USDT"
                    }).execute()
            } else {
                link = botUser.rechargeLink
            }
        }

        if (link != null) {
            var s = AESUtils.decodeAddr(link);
            const qrCodeImage = await QRCodeUtils.createQRCodeWithLogo(s);
            let replyMarkup = WalletController.createBackBtn().reply_markup
            new messageUtils().sendPhotoHtmlCtxBtn(ctx, WalletBotHtml.getBotUserHtml(s), replyMarkup, qrCodeImage)
        }
    }

    /**
     * 提现
     * 代号：tixian_btn
     * @param ctx
     */
    public static startTiXian = async (ctx: Context) => {
        const flag = await this.isLogin(ctx)
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        if(this.localCache.get('mark_'+chatId) == 1)return
        // 如果密码为空就开始设置密码
        if (!flag) {
            await this.sendPasswordSetupMessage(ctx, "", this.localCache.get('mark_'+chatId) != 1)
            return
        }

        // 查询是否有提现地址
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        if (!botWithdrawalAddrModel?.addr) {
            ctx.replyWithHTML("⚠️ 尚未设置提现地址请前往个人中心设置",
                WalletController.createBackDoubleBtn())
            return;
        }
        ctx.replyWithHTML(WalletBotHtml.getTixianHtml(),
            WalletController.createBackBtn())
        ctx.answerCbQuery('⚠️操作失败，余额不足\n\uD83D\uDCB0当前余额：0 USDT', {
            show_alert: true
        })

        return Promise.resolve()
    }

    /**
     * 转账
     * 代号：zhuanzhang_btn
     * @param ctx
     */
    public static startZhuanZhang = async (ctx: Context) => {
        const flag = await this.isLogin(ctx)
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        if(this.localCache.get('mark_'+chatId) == 1)return
        // 如果密码为空就开始设置密码
        if (!flag) {
            await this.sendPasswordSetupMessage(ctx, "", this.localCache.get('mark_'+chatId) != 1)
            return
        }

        console.log("ctx.updateType",ctx.updateType)
        var result :InlineQueryResultArticle[] = [
            {
                type: 'article',
                id: "1",
                title: "111",
                description: `Postado em 1111`,
                input_message_content: {
                    message_text: `👉 <a href="x">xxxx [LINK]</a>\n\n🗃 Postado em <a href="d">ccc</a>`,
                    parse_mode: 'HTML',
                },
                url: 'x',
            }
        ]
        try {
            await ctx.answerInlineQuery(result);
        }catch(e){
            console.log("e",e)
        }
        console.log("startZhuanZhang")
        return Promise.resolve()
    }

    /**
     * 收款
     * 代号：shoukuan_btn
     * @param ctx
     */
    public static startShouKuan = async (ctx: Context) => {
        const flag = await this.isLogin(ctx)
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        if(this.localCache.get('mark_'+chatId) == 1)return
        // 如果密码为空就开始设置密码
        if (!flag) {
            await this.sendPasswordSetupMessage(ctx, "", this.localCache.get('mark_'+chatId) != 1)
            return
        }

        console.log("startShouKuan")
        return Promise.resolve()
    }

    /**
     * 红包
     * 代号：hongbao_btn
     * @param ctx
     */
    public static startHongBao = async (ctx: Context) => {
        const flag = await this.isLogin(ctx)
        // 如果密码为空就开始设置密码
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        if(this.localCache.get('mark_'+chatId) == 1)return
        if (!flag) {
            await this.sendPasswordSetupMessage(ctx, "", this.localCache.get('mark_'+chatId) != 1)
            return
        }
        console.log("startHongBao")
        return Promise.resolve()
    }

    /**
     * 闪兑
     * 代号：shandui_btn
     * @param ctx
     */
    public static startShanDui = async (ctx: Context) => {
        const flag = await this.isLogin(ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
            await this.sendPasswordSetupMessage(ctx, "", this.localCache.get('mark_'+chatId) != 1)
            return
        }

        console.log("startShanDui")
        return Promise.resolve()
    }

    /**
     * 计算器输入
     * @param ctx
     */
    public static startInputPassword = async (ctx: Context) => {
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data || ""
        if (callbackStr.startsWith("num_")) {
            var cacheValue = this.localCache.get(chatId) || ""
            var currentVal = callbackStr.replaceAll('num_', '')
            var cvalue = cacheValue + currentVal
            if (cvalue.length > 4) return
            this.localCache.set(chatId , cvalue)
            await this.sendPasswordSetupMessage(ctx, cvalue, false)
        } else if (callbackStr == 'clear') {
            this.localCache.del(chatId)
            await this.sendPasswordSetupMessage(ctx, "", false)
        } else if (callbackStr == 'delete') {
            var cacheKey = this.localCache.get(chatId)
            if (cacheKey) {
                var arr = cacheKey.split("")
                arr.pop()
                var join = arr.join('');
                this.localCache.set(chatId, join)
                await this.sendPasswordSetupMessage(ctx, join, false)
            }
        }
    }


    /**
     * 转账、红包、提现、收款、闪兑提示输入密码
     * @param ctx
     */
    public static sendPasswordSetupMessage = async (ctx: Context, callbackStr: string = "", firstFlag: boolean = true) => {
        try {
            var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
            var arr = ["🔑 "]
            let length = callbackStr.length
            for (let i = 0; i < length; i++) {
                arr.push(callbackStr[i])
            }
            for (let i = length; i < 4; i++) {
                arr.push("_ ")
            }
            let surebtn = length >= 4
            const html = WalletMessage.PASSWORD_TIP(arr);
            const keybordsArr: Array<Array<ButtonCallbackType>> = []
            for (let i = 1; i <= 9; i += 3) {
                var rowInline: Array<ButtonCallbackType> = []
                for (let j = i; j < i + 3; j++) {
                    rowInline.push({
                        text: j + "",
                        query: "num_" + j
                    })
                }
                keybordsArr.push(rowInline)
            }
            // 计算器清空，删除，zero按钮
            keybordsArr.push(WalletController.ComputeClearDel)
            if (surebtn) {
                keybordsArr.push([WalletController.CloseComputer, WalletController.SaveUserPwd])
            } else {
                var len = keybordsArr.length
                var index = keybordsArr[len - 1].findIndex(c => c.query == 'update_pwd_btn')
                if (index != -1) {
                    keybordsArr[len - 1].splice(index, 1)
                }
            }
            // 设置启动开关
            this.localCache.set("mark_"+chatId,1)
            if (firstFlag) {
                // 4: 机器人回复，显示信息和按钮相关
                await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(keybordsArr))
            } else {
                // 4: 机器人回复，显示信息和按钮相关
                await ctx.editMessageText(html, new ButtonUtils().createCallbackBtn(keybordsArr))
            }
        } catch (err) {
            ctx.reply(WalletMessage.ERROR_CLIENT)
        }
    }


    /**
     * 提交密码
     * 代号：update_pwd_btn
     * @param ctx
     */
    public static startUpdatePwdCallback = async (ctx: Context) => {
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        var cacheValue = this.localCache.get(chatId) || ""
        if (cacheValue) {
            if (cacheValue.length >= 4) {
                var tgId: number = ctx.callbackQuery?.from?.id || 0
                var firstName: string = ctx.callbackQuery?.from?.first_name || ''
                let userId = AESUtils.encodeUserId(tgId?.toString())
                var password = cacheValue.substring(0, 4)
                // 开始查询密码
                const resp = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
                if (resp?.paymentPassword) {
                    if (resp.paymentPassword == password) {
                        // 清除计算器消息
                        this.removeMessage(ctx)
                        // 清空缓存
                        this.clearCacheRelation(ctx)
                        // 发送消息
                        ctx.replyWithHTML(WalletMessage.PASSWORD_SUCCESS_MESSAGE)
                        // 设置登录成功的标识
                        this.localCache.set("login_" + chatId, "success")
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
                    this.removeMessage(ctx)
                    // 清空缓存
                    this.clearCacheRelation(ctx)
                    // 发送消息
                    ctx.replyWithHTML(html)
                    // 设置登录成功的标识
                    this.localCache.set("login_" + chatId, "success")
                }
            } else {
                ctx.replyWithHTML(WalletMessage.PASSWPORD_ERROR)
            }
        } else {
            ctx.replyWithHTML(WalletMessage.PASSWPORD_EMPTY)
        }
    }


    /**
     * 是否登录
     * 公共方法
     * @param ctx
     */
    public static isLogin = async (ctx: Context)  => {
        var chatId: string = ctx.callbackQuery?.message?.chat?.id + "" || ""
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 查询的目的，是用户忘记密码。后台可以清空密码。这样可以让用户重新设置。
        const resp = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
        if (!resp?.paymentPassword) {
            this.localCache.del("login_" + chatId)
            this.localCache.del(chatId)
            return false
        }
        // 获取登录成功的标识
        return this.localCache.get("login_" + chatId) == "success"
    }
}


export default WalletHandleMethod
