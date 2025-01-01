import type {Context, Telegraf} from "telegraf";
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
import WalletMessage from "../../const/WalletMessage";
import {InlineQueryResultArticle} from "@telegraf/types/inline";
import BotWithdrawalAddrModel from "../../../models/BotWithdrawalAddrModel";
import redis from "../../../config/redis";
import BotPaymentModel from "../../../models/BotPaymentModel";
import {addLockByTgId} from "../../../config/redislock";
import DateFormatUtils from "../../../commons/date/DateFormatUtils";
import PaymentTypeEnum from "../../../type/PaymentTypeEnum";
import ButtonInnerQueryUtils from "../../../commons/button/ButtonInnerQueryUtils";
import WalletRedPacket from "./WalletRedPacket";
import CustomSnowflake from "../../../commons/CustomSnowflake";
import WalletType from "../../../type/WalletType";
import {queryRunner} from "../../../config/database";
import BotHb from "../../../models/BotHb";


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
    public static clearCacheRelation = (ctx: Context) => {
        var tgId: number | string = ctx.callbackQuery?.message?.chat?.id || ctx.message?.from?.id || 0
        redis.del('pwd_' + tgId + '')
        redis.del('mark_' + tgId)
    }

    /**
     * 清除缓存登录
     * @param ctx
     */
    public static clearCacheLogin = (ctx: Context) => {
        var tgId: number | string = ctx.callbackQuery?.message?.chat?.id || ctx.message?.from?.id || 0
        redis.del("login_" + tgId)
        redis.del('mark_' + tgId)
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
        this.removeMessage(ctx)
        this.clearCacheRelation(ctx)
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
        redis.del("currentop" + tgId)
        this.removeMessage(ctx)
        this.clearCacheRelation(ctx)
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
                USDT:"0",
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
                USDT:"0",
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
            var s = AESUtils.decodeAddr(link)
            const qrCodeImage = await QRCodeUtils.createQRCodeWithLogo(s)
            let replyMarkup = WalletController.createBackBtn().reply_markup
            new messageUtils().sendPhotoHtmlCtxBtn(ctx, WalletBotHtml.getBotUserHtml(s), replyMarkup, qrCodeImage)
        }
    }

    /**
     * 提现
     * 代号：tixian_btn
     * @param ctx
     */
    public static startTiXian = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "tx", 'EX', 60 * 60)
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        if (!botWithdrawalAddrModel?.addr) {
            this.removeMessage(ctx)
            ctx.replyWithHTML("⚠️ 尚未设置提现地址请前往个人中心设置",
                WalletController.createBackDoubleBtn())
            return;
        }
        // 2：密码确认
        const flag: boolean = await this.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await this.sendPasswordSetupMessage(ctx, "", mark != '1')
            return
        }
        return ctx.replyWithHTML(WalletBotHtml.getTixianHtml(), WalletController.createBackBtn())
    }

    // 提现具体逻辑
    public static startTxHandle = async (text: string, tgId: number, ctx: Context, cbot: Telegraf<Context>) => {
        await addLockByTgId(['tx_lock_' + tgId + ''], async () => {
            // 1：密码确认
            const flag: boolean = await this.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await this.sendPasswordSetupMessage(ctx, "", mark != '1')
                return
            }

            // 2: 判断是否提现开头
            if (!text.startsWith('提现')) {
                await ctx.replyWithHTML("⚠️ 请输入正确的提现格式：提现+金额\n比如：提现10或者提现 10")
                return
            }

            // 获取提现金额
            const price = parseFloat(text.replaceAll('提现', '').trim())
            if (isNaN(price) || price < 0) {
                await ctx.replyWithHTML("⚠️ 请输入提现金额，必须是正整数！")
                return
            }

            if (price < 10) {
                await ctx.replyWithHTML("⚠️ 最低提现10u！")
                return
            }

            // 查询用户信息
            let userId = AESUtils.encodeUserId(tgId?.toString())
            let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
            // 查询用户余额
            if (botUser) {
                const userUsdt = parseFloat(botUser.USDT)
                const shengyuUsdt = userUsdt - price
                // 用户的余额 - 提现的余额 如果小于1，说明不够，因为手续费需要1U
                if (shengyuUsdt < 1) {
                    await ctx.replyWithHTML("⚠️ 账户余额不足！")
                    return
                }
                try {
                    // 查询用户是否存在交易地址
                    const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
                        .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
                    if (!botWithdrawalAddrModel?.addr) {
                        await ctx.replyWithHTML("⚠️ 交易异常，提现地址不存在！")
                        return
                    }

                    try {
                        await queryRunner.startTransaction()
                        // 修改用户余额
                        await queryRunner.manager.update(UserModel,{
                            id: botUser.id
                        },{
                            USDT: shengyuUsdt + ''
                        })

                        // 申请时间
                        var applyTime = DateFormatUtils.CurrentDateFormatString()
                        const chatId = ctx?.chat?.id + '' || '';
                        // 开始新增订单
                        const botPayment =  await queryRunner.manager.save(BotPaymentModel,{
                            tgId: botUser.tgId,
                            uid: botUser.id,
                            username: botUser.userName,
                            nickname: botUser.nickName,
                            balanceBefore: userUsdt + '',
                            balanceAfter: shengyuUsdt + '',
                            paymentType: PaymentTypeEnum.TX_SQ.value,
                            paymentTypeName: PaymentTypeEnum.TX_SQ.name,
                            operateType: 0,
                            paymentTypeNumber: botWithdrawalAddrModel?.addr,
                            paymentAmount: (price - 1) + '',
                            paymentRealAmount: price + '',
                            walletType: WalletType.USDT,
                            applyTime: applyTime,
                            chatId: chatId
                        })
                        //判断是否为异常用户 ----------------这里要思考
                        var userByLinks = await UserModel.createQueryBuilder()
                            .where('recharge_link = :rechargeLink and del = 0', {'rechargeLink': botUser.rechargeLink})
                            .getMany()
                        let result = "没有异常"
                        if (userByLinks && userByLinks.length > 1) {
                            for (let userByLink of userByLinks) {
                                result = "风控用户"
                                await UserModel.createQueryBuilder().update()
                                    .set({riskManagement: 1}).where("id=:id", {id: userByLink.id}).execute()
                            }
                        }

                        // 统计相关
                        var sumPriceArr = await BotPaymentModel.createQueryBuilder("t1")
                            .select(['t1.payment_type as ptype', 't1.payment_type_name as pname', 'SUM(payment_amount) as num'])
                            .where('t1.user_id = :tgId and del = 0 and wallet_type = 1', {tgId: botUser.tgId})
                            .groupBy("t1.payment_type").execute()

                        var botPayMentObj: any = {
                            'm_1': 0,
                            'm_2': 0,
                            'm_3': 0,
                            'm_4': 0,
                            'm_5': 0,
                            'm_6': 0,
                            'm_7': 0,
                            'm_8': 0,
                            'm_9': 0,
                            'm_10': 0,
                            'm_11': 0,
                            'm_12': 0,
                            'm_13': 0,
                            'm_14': 0,
                            'm_15': 0,
                            'm_16': 0,
                            'm_17': 0,
                            'm_18': 0,
                            'm_19': 0,
                            'm_101': 0,
                            'm_201': 0,
                        }

                        if (sumPriceArr && sumPriceArr.length > 0) {
                            for (let i = 0; i < sumPriceArr.length; i++) {
                                botPayMentObj['m_' + sumPriceArr[i]?.ptype?.toString()] = sumPriceArr[i].num || 0
                            }
                        }

                        const tixian = "⌛️ 请等待，需要财务处理\n\n" +
                            "用户：<a href=\"tg://user?id=" + tgId + "\">" + botUser?.nickName + "</a>\n" +
                            "用户名 : <code>" + botUser?.userName + "</code>\n" +
                            "申请时间 : " + applyTime + "\n" +
                            "提现金额 : " + (price || 0) + "\n" +
                            "实际金额 : " + ((price - 1) || 0) + "\n" +
                            "提现地址(点击复制) : <code>" + AESUtils.decodeAddr(botWithdrawalAddrModel?.addr || '') + "</code>\n" +
                            "提现货币类型（❗️） : USDT\n" +
                            "备注 : " + botUser.notes + "\n" +
                            "是否异常用户 : " + result + "\n\n" +
                            "➖➖➖➖➖其他信息➖➖➖➖➖\n" +
                            "上注流水 :  " + (botPayMentObj['m_2'] || 0) + "\n" +
                            "中奖流水 :  " + (botPayMentObj['m_5'] || 0) + "\n" +
                            "充值总额 :  " + (botPayMentObj['m_1'] || 0) + "\n" +
                            "反水总额 :  " + (botPayMentObj['m_4'] || 0) + "\n" +
                            "已提现流水 :  " + (botPayMentObj['m_8'] || 0) + "\n" +
                            "申请提现流水 :  " + (botPayMentObj['m_3'] || 0) + "\n" +
                            "彩金转化流水 :  " + (botPayMentObj['m_9'] || 0) + "\n" +
                            "转账支出流水 :  " + (botPayMentObj['m_10'] || 0) + "\n" +
                            "转账收入流水 :  " + (botPayMentObj['m_11'] || 0) + "\n" +
                            "红包支出流水 :  " + (botPayMentObj['m_12'] || 0) + "\n" +
                            "红包收入流水 :  " + (botPayMentObj['m_13'] || 0) + "\n" +
                            "每日首充返利流水 :  " + (botPayMentObj['m_16'] || 0) + "\n" +
                            "开业豪礼 :  " + (botPayMentObj['m_17'] || 0) + "\n" +
                            "每日首充返利流水 :  " + (botPayMentObj['m_16'] || 0) + "\n"

                        // 6: 财务消息
                        await cbot.telegram.sendMessage(tgId, tixian, {
                            parse_mode: "HTML",
                            reply_markup: WalletController.createMarkClientBtn(botPayment.id + "").reply_markup
                        })
                        // 7: 发送消息
                        await ctx.replyWithHTML(this.noteOrderTxcg(botUser.USDT, shengyuUsdt, price, botWithdrawalAddrModel?.addr), WalletController.createBackBtn())
                        await queryRunner.commitTransaction()
                    }catch (e){
                        await queryRunner.rollbackTransaction()
                        await ctx.answerCbQuery('提示：服务器忙，请稍后在试', {show_alert: true})
                    }
                } catch (e) {
                    return ctx.reply('⌛️ 亲操作慢点，休息一会在操作!')
                }
            }
        }, async () => {
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 财务标记打款
     * @param ctx
     */
    public static startMarkTixian = async (tgId: string, msg: string, ctx: Context, ubot: Telegraf<Context>) => {
        var payMentId = msg.replaceAll("bjydk", '')
        if (payMentId) {
            // 开始修改订单状态
            var botPayment = await BotPaymentModel.createQueryBuilder().where("id=:id", {id: payMentId}).getOne()
            // 获取用户提现的金额
            if (botPayment) {
                // 如果审核已经通过，就无须在操作了
                if (botPayment.paymentType == PaymentTypeEnum.TX_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过打款业务，不要重复操作!")
                    return;
                }

                if (botPayment.paymentType == PaymentTypeEnum.TK_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过退款操作，不要重复操作!")
                    return;
                }

                var passTime = DateFormatUtils.CurrentDateFormatString()
                // 开始修改状态
                await BotPaymentModel.createQueryBuilder().update(BotPaymentModel)
                    .set({
                        paymentType: PaymentTypeEnum.TX_DKJL.value,
                        paymentTypeName: PaymentTypeEnum.TX_DKJL.name,
                        passTgid: ctx.botInfo.id + '',
                        passUsername: ctx.botInfo.username,
                        passNickname: ctx.botInfo.first_name,
                        passTime: passTime,
                    })
                    .where("id=:id", {id: botPayment.id})
                    .execute()
                const addr = AESUtils.decodeAddr(botPayment.paymentTypeNumber) || ''
                const html: string = "\uD83D\uDCE3尊敬的用户：" + botPayment?.nickname + "您好！\n" +
                    "\uD83D\uDCE3财务已确认打款，请查收\n" +
                    "\uD83D\uDCE3温馨提示，提现手续费usdt为1u，TRX为实时等额汇率\n" +
                    "\uD83D\uDCE31号公馆祝您赌运昌隆\uD83C\uDF8A\n\n" +
                    "\uD83D\uDD3A实际提现：" + (botPayment?.paymentRealAmount || 0) + "\n" +
                    "\uD83D\uDD3A到账金额：" + (botPayment?.paymentAmount || 0) + "\n" +
                    "\uD83D\uDD3A还剩余额：" + (botPayment?.balanceAfter || 0) + "\n" +
                    "\uD83D\uDD3A申请时间：" + botPayment.applyTime + "\n" +
                    "\uD83D\uDD3A打款时间：" + passTime + "\n" +
                    "\uD83D\uDD3A货币类型：USDT" + "\n" +
                    "\uD83D\uDD3A提现地址：" + addr

                // 5:给申请人发消息
                await ubot.telegram.sendMessage(tgId, html, {
                    parse_mode: "HTML",
                    reply_markup: WalletController.createBackBtn().reply_markup
                })
                // 6: 编辑回复的按钮
                await ctx.editMessageReplyMarkup(WalletController.createSuccessBtn(botPayment.username).reply_markup)
            }
        }
    }

    /**
     * 财务异常驳回
     * @param ctx
     */
    public static startRefuseTixian = async (tgId: string, msg: string, ctx: Context, ubot: Telegraf<Context>) => {
        var payMentId = msg.replaceAll("txycth", '')
        if (payMentId) {
            // 开始修改订单状态
            var botPayment = await BotPaymentModel.createQueryBuilder().where("id=:id", {id: payMentId}).getOne()
            // 获取用户提现的金额
            if (botPayment) {
                if (botPayment.paymentType == PaymentTypeEnum.TK_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过退款业务，不要重复操作!")
                    return;
                }
                // 如果审核已经通过，就无须在操作了
                if (botPayment.paymentType == PaymentTypeEnum.TX_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过打款业务，不要重复操作!")
                    return;
                }

                try {
                    await queryRunner.startTransaction()
                    // 给用户增加余额
                    queryRunner.manager.update(UserModel,{
                        tgId: botPayment.tgId
                    },{
                        USDT: () => {
                            return "usdt + " + botPayment?.paymentRealAmount
                        }
                    })
                    var refuseTime = DateFormatUtils.CurrentDateFormatString()
                    queryRunner.manager.update(BotPaymentModel,{
                        id: botPayment.id
                    },{
                        paymentType: PaymentTypeEnum.TK_DKJL.value,
                        paymentTypeName: PaymentTypeEnum.TK_DKJL.name,
                        passTgid: ctx.botInfo.id + '',
                        passUsername: ctx.botInfo.username,
                        passNickname: ctx.botInfo.first_name,
                        passTime: refuseTime
                    })

                    const addr = AESUtils.decodeAddr(botPayment.paymentTypeNumber) || ''
                    const html: string = "\uD83D\uDCE3尊敬的用户：" + botPayment?.nickname + "您好！\n" +
                        "\uD83D\uDCE3财务异常退回金额\n" +
                        "\uD83D\uDCE3温馨提示，请核对地址后重新提交，如有疑问请联系财务\n" +
                        "\uD83D\uDCE31号公馆祝您赌运昌隆\uD83C\uDF8A\n\n" +
                        "\uD83D\uDD3A退回金额：" + (botPayment?.paymentRealAmount || 0) + "\n" +
                        "\uD83D\uDD3A退之前余额：" + (botPayment?.balanceAfter || 0) + "\n" +
                        "\uD83D\uDD3A退之后余额：" + (botPayment?.balanceBefore || 0) + "\n" +
                        "\uD83D\uDD3A申请时间：" + botPayment.applyTime + "\n" +
                        "\uD83D\uDD3A退回时间：" + refuseTime + "\n" +
                        "\uD83D\uDD3A货币类型：USDT" + "\n" +
                        "\uD83D\uDD3A地址：" + addr
                    // 给申请人发消息
                    await ubot.telegram.sendMessage(tgId, html, {
                        parse_mode: "HTML",
                        reply_markup: WalletController.createBackBtn().reply_markup
                    })
                    // 6: 编辑回复的按钮
                    await ctx.editMessageReplyMarkup(WalletController.createFailBtn(botPayment.username).reply_markup)
                    await queryRunner.commitTransaction()
                }catch (e){
                    await queryRunner.rollbackTransaction()
                    await ctx.answerCbQuery('提示：服务器忙，请稍后在试', {show_alert: true})
                }
            }
        }
    }

    public static noteOrderTxcg = (ye: string, shengyuUsdt: number, je: number, address: string | undefined) => {
        var html =
            "✅ 提现成功，等待客服确认到账！\n\n" +
            "\uD83D\uDD3A提现金额：" + je + "U\n" +
            "\uD83D\uDD3A实际到账金额：" + (je - 1) + "U，手续费：1U\n" +
            "\uD83D\uDD3A提之前余额：" + ye + " USDT\n" +
            "\uD83D\uDD3A提之后余额：" + shengyuUsdt + " USDT\n" +
            "\uD83D\uDD3A申请时间：" + DateFormatUtils.CurrentDateFormatString() + "\n" +
            "\uD83D\uDD3A提现地址：" + AESUtils.decodeAddr(address || '') + "\n" +
            "\uD83D\uDD3A货币类型：USDT"
        return html;
    }


    /**
     * 转账
     * 代号：zhuanzhang_btn
     * @param ctx
     */
    public static startZhuanZhang = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "zhuanzhang", 'EX', 60 * 60)
        // 3：判断是否登录
        const flag: boolean = await this.isLogin(tgId, ctx)
        // 4: 如果没有登录就输入密码登录
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await this.sendPasswordSetupMessage(ctx, "", mark != '1')
            return
        }
        // 发送消息
        const html = "\uD83D\uDC47 点击下方按钮选择收款人";
        return ctx.replyWithHTML(html, WalletController.createZhuanzhangSwitchBtn("1"))
    }

    // 转账具体逻辑
    public static startZhuangzhangHandle = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        // 1：密码确认
        const flag: boolean = await this.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await this.sendPasswordSetupMessage(ctx, "", mark != '1')
            return
        }

        // const sid = ctx.botInfo.id
        // const snickname = ctx.botInfo.first_name
        // const susername = ctx.botInfo.username
        // const fid = ctx.inlineQuery?.from.id
        // const fnickname = ctx.inlineQuery?.from.first_name
        const inlineMessageId = ctx.inlineMessageId
        const fusername = ctx.inlineQuery?.from.username
        // 查询用户余额
        let userId = AESUtils.encodeUserId(tgId?.toString())
        let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        if (botUser) {
            if (parseFloat(botUser.USDT) > 0) {
                // 创建一个可分享的结果
                await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                    id: queryId,
                    title: "转款金额【" + query + "】USDT",
                    description: "\uD83D\uDCB0您正在向用户【@" + fusername + "】发起转账，点击【确定转账】并立即生效",
                    input_message_content: {
                        message_text: "\uD83D\uDD30为了您的资金安全，请验证密码来解锁此笔转账",
                        parse_mode: "HTML"
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: '✅确认解锁',
                                callback_data: "qrjs" + query + "," + tgId
                            }, {
                                text: '\uD83D\uDEAB取消转账',
                                callback_data: "quxiaozz" + query + "," + tgId
                            }]
                        ]
                    }
                }))
            } else {
                // 创建一个可分享的结果
                await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                    id: queryId,
                    title: '⚠️温馨提示：操作失败，余额不足！',
                    description: "\uD83D\uDCB0当前余额：" + botUser.USDT + " USDT",
                    input_message_content: {
                        message_text: '\uD83D\uDC47 \n'
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: '\uD83D\uDCB0一号公馆钱包',
                                callback_data: 'qwe123',
                                url: 'http://t.me/VertexPaybot'
                            }]
                        ]
                    }
                }))
            }
        }
    }

    /**
     * 确认解锁
     * @param ctx
     */
    public static startZhuanZhangUnLock = async (ctx: Context) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var nickname: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        let inlineMessageId = ctx.callbackQuery?.inline_message_id || ""
        // 转账金额
        var money = callbackStr.replaceAll("qrjs", "").split(",")[0];
        var sendTgId = callbackStr.replaceAll("qrjs", "").split(",")[1];
        // 必须是转账本人操作。否则返回
        if (sendTgId != tgId.toString()) {
            await ctx.answerCbQuery('提示：不是你发起的转账', {show_alert: true})
            return
        }
        // 开始查询用户
        let userId = AESUtils.encodeUserId(tgId?.toString())
        const botUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
        if (botUser) {
            let userUsdt = parseFloat(botUser.USDT || "0")
            let zhuanMoney = parseFloat(money)
            let walletFreeLimit = parseFloat(botUser.withdrawalLimit || "100")

            // 余额不足
            if (userUsdt <= 0) {
                await ctx.answerCbQuery('提示：余额不足，当前余额是0', {show_alert: true})
                return
            }

            // 余额不够
            if (userUsdt < zhuanMoney) {
                await ctx.answerCbQuery('提示：余额不足，当前余额：【' + userUsdt + '】 不足以转出【' + zhuanMoney + '】!', {show_alert: true})
                return
            }

            // 开始验证免密额度 --- 直接转账
            if (zhuanMoney <= walletFreeLimit) {
                // 扣除用户余额、用户余额递减
                try {
                    await queryRunner.startTransaction()
                    var realMoney = userUsdt - zhuanMoney
                    //保存转账记录
                    var orderId: string = CustomSnowflake.snowflake()
                    var applyTime = DateFormatUtils.CurrentDateFormatString()
                    // 开始新增订单
                    const botPayment = await queryRunner.manager.save(BotPaymentModel, {
                        tgId: botUser.tgId,
                        uid: botUser.id,
                        username: botUser.userName,
                        nickname: botUser.nickName,
                        balanceBefore: userUsdt + '',
                        balanceAfter: realMoney + '',
                        paymentType: PaymentTypeEnum.YHZZ.value,
                        paymentTypeName: PaymentTypeEnum.YHZZ.name,
                        operateType: 1,
                        paymentTypeNumber: 'zk' + orderId,
                        paymentAmount: zhuanMoney + '',
                        paymentRealAmount: zhuanMoney + '',
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        chatId: inlineMessageId
                    })

                    await queryRunner.manager.update(UserModel, {
                        id: botUser.id
                    }, {
                        USDT: realMoney + ''
                    })
                    // 更换收款的按钮
                    await ctx.editMessageText("\uD83D\uDCB0 【"+botPayment.username+"】转账给你 " + zhuanMoney + " USDT", {parse_mode: 'HTML'})
                    await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangSKBtn(botPayment.id + '').reply_markup)
                    await queryRunner.commitTransaction()
                } catch (e) {
                    await queryRunner.rollbackTransaction()
                    await ctx.answerCbQuery('提示：服务器忙，请稍后在试', {show_alert: true})
                }
            } else {
                console.log(ctx?.chat?.id)
                redis.set("zk_inlineMessageId" + tgId, inlineMessageId, 'EX', 1000 * 60 * 60 * 6);
                await ctx.editMessageText("⌛️ 请等待对方点击下方按钮验证", {parse_mode: 'HTML'})
                await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangPwdBtn(inlineMessageId,"zhuanzhang").reply_markup)
            }
        }
    }

    /**
     * 用户输入密码
     * @param ctx
     * @param payload
     */
    public static startCommandInputPassword = async(ctx : Context,payload :string) => {
        var qrjs = payload.replaceAll("inline_", "");

        var inlineMessageId = qrjs.split("_")[1]
        await ctx.telegram.editMessageText('',undefined,inlineMessageId,
            "\uD83D\uDCB0 xxx转账给你 10 USDT",
            {parse_mode: 'HTML'}
        )

        await  ctx.telegram.editMessageReplyMarkup('',undefined,inlineMessageId,
            WalletController.createZhuanzhangSKBtn('11').reply_markup
        )
        // 可以考虑清除原来的密码
        // 开始生成输入密码确认
        await this.sendPasswordSetupMessage(ctx,"",true)
    }

    /**
     * 取消转账
     * @param ctx
     */
    public static cancelZhuanZhang = (ctx: Context) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var sendTgId = callbackStr.replaceAll("qrjs", "").split(",")[1];
        // 必须是转账本人操作。否则返回
        if (sendTgId != tgId.toString()) {
            ctx.answerCbQuery('提示：不是你发起的转账', {show_alert: true})
            return
        }
        // 删除此消息
        ctx.editMessageText("提示：对方已取消转账!")
        ctx.editMessageReplyMarkup(WalletController.createEmptyBtn().reply_markup)
    }

    /**
     * 点击收款按钮进行收款
     * @param ctx
     */
    public static startZhuanzhangSK = async (ctx:Context)=>{
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取收款人tgId
        var tgId: string = ctx.callbackQuery?.from?.id+'' || '0'
        var nickname: string = ctx.callbackQuery?.from?.first_name+'' || '0'
        var username: string = ctx.callbackQuery?.from?.username+'' || '0'
        // 2: 查询转账人
        var botPaymentId = callbackStr.replaceAll("shoukuanzk", "");
        var botPayment:BotPaymentModel | null = await BotPaymentModel.createQueryBuilder().where("id=:id", {id: botPaymentId}).getOne()
        // 获取转账人信息
        if (botPayment) {
            let botPaymentTgId = botPayment?.tgId
            let encodeUserId = AESUtils.encodeUserId(tgId)
            // if(encodeUserId == botPaymentTgId){
            //     await ctx.answerCbQuery("收款人不能是自己",{show_alert:true})
            //     return;
            // }
            try {
                // 收款时间
                var applyTime = DateFormatUtils.CurrentDateFormatString()
                // 转账金额
                var zhuanMoney = botPayment?.paymentAmount
                // 事务开启
                await queryRunner.startTransaction()
                // 1：查询收款人是否注册
                let botUser:UserModel | null = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: encodeUserId}).getOne()
                // 2：如果没有注册就先注册
                if (!botUser){
                    await UserModel.createQueryBuilder().insert().into(UserModel).values({
                        tgId: encodeUserId,
                        nickName: nickname,
                        userName: username,
                        vip: 0,
                        USDT:"0",
                        promotionLink: '',
                        rechargeLink: ''
                    }).execute()
                }

                // 再次查询用户信息
                const newbotUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: encodeUserId}).getOne()
                const beforeAmount =  newbotUser?.USDT || "0"
                // 3：开始修改用户余额
                await UserModel.createQueryBuilder().update(UserModel).set({
                    USDT: () => {
                        return "usdt + " + botPayment?.paymentAmount
                    }
                }).where({
                    id: newbotUser?.id
                }).execute()
                // 新增之后的余额
                const afterAmount:number = parseFloat(beforeAmount)  + parseFloat(botPayment?.paymentAmount || '0')
                //4：修改原来的订单为为--成功
                await queryRunner.manager.update(BotPaymentModel, {
                  id:botPayment?.id
                },{
                  status :1,
                  passTime: applyTime,
                  passTgid:encodeUserId,
                  passUsername:username,
                  passNickname:nickname
                })

                //5：保存收款记录
                var orderId: string = CustomSnowflake.snowflake()
                let inlineMessageId = ctx.callbackQuery?.inline_message_id
                // 开始存收款订单
                await queryRunner.manager.save(BotPaymentModel, {
                    tgId: encodeUserId,
                    uid: newbotUser?.id,
                    username: username,
                    nickname: nickname,
                    balanceBefore: beforeAmount + '',
                    balanceAfter: afterAmount + '',
                    paymentType: PaymentTypeEnum.YHSK.value,
                    paymentTypeName: PaymentTypeEnum.YHSK.name,
                    operateType: 1,
                    paymentTypeNumber: 'zk' + orderId,
                    paymentAmount: zhuanMoney + '',
                    paymentRealAmount: zhuanMoney + '',
                    walletType: WalletType.USDT,
                    applyTime: applyTime,
                    passTime: applyTime,
                    passTgid:botPayment.tgId,
                    passUsername:botPayment.username,
                    passNickname:botPayment.passNickname,
                    status:1,
                    chatId: inlineMessageId
                })
                ctx.editMessageText("✅ 收款完成!")
                ctx.editMessageReplyMarkup(WalletController.createZhuanzhangSureBtn(botPayment?.username||'').reply_markup)
                await queryRunner.commitTransaction()
            } catch (e){
                ctx.editMessageText("出错了，请稍后在试试!")
                ctx.editMessageReplyMarkup(WalletController.createZhuanzhangSureBtn(botPayment?.username||'').reply_markup)
                await queryRunner.rollbackTransaction()
            }
        }
    }



    /**
     * 收款
     * 代号：shoukuan_btn
     * @param ctx
     */
    public static startShouKuan = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "shoukuan", 'EX', 60 * 60)
        // 3：判断是否登录
        const flag: boolean = await this.isLogin(tgId, ctx)
        // 4: 如果没有登录就输入密码登录
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await this.sendPasswordSetupMessage(ctx, "", mark != '1')
            return
        }
        // 发送消息
        const html = "\uD83D\uDC47 点击下方按钮选择付款人";
        return ctx.replyWithHTML(html, WalletController.createShouKuanSwitchBtn("1"))
    }

    // 收款具体逻辑
    public static startShouKuanHandle = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['zhuanzhang_lock_' + tgId + ''], async () => {
            // 1：密码确认
            const flag: boolean = await this.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await this.sendPasswordSetupMessage(ctx, "", mark != '1')
                return
            }
        }, async () => {
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 红包
     * 代号：hongbao_btn
     * @param ctx
     */
    public static startHongBao = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        let tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "hongbao", 'EX', 60 * 60)
        const flag = await this.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        var mark = await redis.get('mark_' + tgId) || '0'
        if (mark && mark == '1') return
        if (!flag) {
            await this.sendPasswordSetupMessage(ctx, "", mark != '1')
            return
        }
        return new WalletRedPacket(ctx).addRedPacket()
    }

    // 红包接收用户输入文字处理
    public static startHongBaoHandle = async(text: string, tgId: number, ctx: Context, currentop: string)=>{
        if (currentop.indexOf('hongbaoMoney') > -1) {
            // 红包金额处理 - 结束后返回红包数量输入框
            return new WalletRedPacket(ctx).sendInputLength(text)
        }
        if (currentop.indexOf('hongbaoLength') > -1) {
            // 红包数量处理
            return new WalletRedPacket(ctx).sendPayButton(text)
        }
        if (currentop.indexOf('hongbaoRemark') > -1) {
            // 红包数量处理
            return new WalletRedPacket(ctx).setRemark(text, currentop)
        }
    }

    /**
     * 闪兑
     * 代号：shandui_btn
     * @param ctx
     */
    public static startShanDui = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "shangdui", 'EX', 60 * 60)
        const flag = await this.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await this.sendPasswordSetupMessage(ctx, "", mark != '1')
            return
        }

        console.log("startShanDui")
        return Promise.resolve()
    }


    // 闪兑具体逻辑
    public static startShangduiHandle = async (text: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['zhuanzhang_lock_' + tgId + ''], async () => {
            // 1：密码确认
            const flag: boolean = await this.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await this.sendPasswordSetupMessage(ctx, "", mark != '1')
                return
            }

            ctx.reply(text)

        }, async () => {
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 计算器输入
     * @param ctx
     */
    public static startInputPassword = async (ctx: Context) => {
        var tgId: string = ctx.callbackQuery?.message?.chat?.id + "" || ''
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data || ''
        if (callbackStr.startsWith("num_")) {
            var cacheValue = await redis.get('pwd_' + tgId) || ''
            var currentVal = callbackStr.replaceAll('num_', '')
            var cvalue = cacheValue + currentVal
            if (cvalue.length > 4) return
            redis.set('pwd_' + tgId, cvalue)
            await this.sendPasswordSetupMessage(ctx, cvalue, false)
        } else if (callbackStr == 'clear') {
            redis.del('pwd_' + tgId)
            await this.sendPasswordSetupMessage(ctx, "", false)
        } else if (callbackStr == 'delete') {
            var cacheKey = await redis.get('pwd_' + tgId)
            if (cacheKey) {
                var arr = cacheKey.split("")
                arr.pop()
                var join = arr.join('')
                redis.set('pwd_' + tgId, join)
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
            var tgId: string = ctx.callbackQuery?.message?.chat?.id + "" || ''
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
                        query: "num_" + j
                    })
                }
                keybordsArr.push(rowInline)
            }
            // 计算器清空，删除，zero按钮
            keybordsArr.push(WalletController.ComputeClearDel)
            if (surebtn) {
                keybordsArr.push([WalletController.SaveUserPwd])
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
            ctx.reply(WalletMessage.ERROR_CLIENT)
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
                        redis.set("login_" + tgId, "success", 'EX', 1000 * 60 * 60 * 24)
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
                    this.removeMessage(ctx)
                    // 清空缓存
                    this.clearCacheRelation(ctx)
                    // 发送消息
                    ctx.replyWithHTML(html)
                    // 设置登录成功的标识
                    redis.set("login_" + tgId, "success", 'EX', 1000 * 60 * 60 * 24)
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
            this.startTiXian(ctx, cbot)
        } else if (currentOp == 'zhuanzhang') {
            this.startZhuanZhang(ctx, cbot)
        } else if (currentOp == 'shoukuan') {
            this.startShouKuan(ctx, cbot)
        } else if (currentOp == 'hongbao') {
            this.startHongBao(ctx, cbot)
        } else if (currentOp == 'shandui') {
            this.startShanDui(ctx, cbot)
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
