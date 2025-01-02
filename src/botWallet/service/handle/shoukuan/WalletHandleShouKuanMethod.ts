import type {Context, Telegraf} from "telegraf";
import WalletController from "../../../controller/WalletController";
import redis from "../../../../config/redis";
import {addLockByTgId} from "../../../../config/redislock";
import walletHandleMethod from "../WalletHandleMethod";
import ButtonInnerQueryUtils from "../../../../commons/button/ButtonInnerQueryUtils";
import WalletHandleMethod from "../WalletHandleMethod";
import WalletConfig from "../../../WalletConfig";
import UserModel from "../../../../models/UserModel";
import AESUtils from "../../../../commons/AESUtils";


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
class WalletHandleShouKuanMethod {
    
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
        const flag: boolean = await walletHandleMethod.isLogin(tgId, ctx)
        // 4: 如果没有登录就输入密码登录
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await walletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }
        // 发送消息
        const html = "\uD83D\uDC47 点击下方按钮选择付款人";
        await ctx.replyWithHTML(html, WalletController.createShouKuanSwitchBtn("-1"))
    }

    // 收款具体逻辑
    public static startShouKuanHandle = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['shoukuan_lock_' + tgId + ''], async () => {
            const fusername = ctx.inlineQuery?.from.username
            const id = ctx.inlineQuery?.from.id
            // 1：密码确认
            const flag: boolean = await walletHandleMethod.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await walletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
                return
            }
            var money = query.replaceAll('-','')
            // 创建一个可分享的结果
            await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: "你正发起收款操作，收款金额【" + money + "】USDT",
                description: "",
                input_message_content: {
                    message_text: "\uD83D\uDCB0【@"+fusername+"】向你发起收款，收款金额【"+money+"】USDT。",
                    parse_mode: "HTML"
                },
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: '\uD83D\uDCB8 立即支付',
                            url: WalletConfig.walltPayBotSKInlineURL +id+'_'+ money
                        }]
                    ]
                }
            }))
        }, async () => {
            await ctx.answerCbQuery('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 立即开始支付
     * @param ctx
     */
    public static startShouKuanPayCommand = async (ctx:Context,payload:string,bot:Telegraf<Context>)=>{
        let update: any = ctx?.update
        // 1：获取telegram的tgId
        var payTgId: string = update?.message?.from?.id+'' || ''
        var payUsername: string = update?.message?.from?.username+'' || ''
        var payNickname: string = update?.message?.from?.first_name+'' || ''
        // 获取收款人信息
        var s = payload.replaceAll("shoukuan_", "");
        var split = s.split("_");
        var tgIdvalue = split[0] || '' // 收款人
        var value = split[1] // 收款金额

        if (payTgId == tgIdvalue) {
            bot.telegram.sendMessage(payTgId,"⚠️ 不可以转账给自己")
            return
        }

        // 如果付款人没注册，就注册
        var payUserId = AESUtils.encodeUserId(payTgId);
        let payBotUser: UserModel | null = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: payUserId}).getOne()
        // 2：如果没有注册就先注册
        if (!payBotUser) {
            await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: payUserId,
                nickName: payNickname,
                userName: payUsername,
                vip: 0,
                USDT: "0",
                promotionLink: '',
                rechargeLink: ''
            }).execute()
        }

        var tgIdvaluePwd = AESUtils.encodeUserId(tgIdvalue);
        // 查询转账人信息
        const botUser = await UserModel.createQueryBuilder().where("tg_id=:tgId",{tgId:tgIdvaluePwd}).getOne()
        var html = "\uD83D\uDCB8 你正在付款给" + botUser?.nickName + "\n" +
            "\n" +
            "收款人用户ID : " + tgIdvalue + "\n" +
            "收款人名称 : " + botUser?.userName + "\n" +
            "\n" +
            "支付金额 : " + value + " USDT\n" +
            "\n" +
            "提示: 本次转账即时完成, 无法追回!";

        // 发送消息
        await bot.telegram.sendMessage(payTgId,html,{parse_mode:"HTML",reply_markup:WalletController.createPayBotButton(payTgId,tgIdvalue,value).reply_markup})
    }

    /**
     * 确认支付
     * @param ctx
     */
    public static startPayCallback = async(ctx:Context,bot:Telegraf<Context>,callbackText:string)=>{
        // 删除消息
        var messageId = ctx?.callbackQuery?.message?.message_id || 0
        var callbackQueryId= ctx?.callbackQuery?.id + ''
        var currentTgId= ctx?.callbackQuery?.from?.id + ''
        var callbackData = callbackText.replaceAll('skqxzf','')?.split(',') || []
        // 付款人
        var callbackPayTgId = callbackData[0]
        // 收款金额
        var money = callbackData[1]
        // 收款人
        var callbackSkTgId = callbackData[2]

        // 查询付款人信息
        // 查询收款人信息
            // 如果付款人余额不足，
                // 就发送消息提示--点击去充值
            // 如果充足就开始进入到订单保存
                // 保存成功，开始确认通知

        // if (bigDecimal.compareTo(bigDecimal1) < 0) {
        //     botEncapsulation.delSend(callbackQueryId, this);
        //     botEncapsulation.deleteMessage(chatId, messageId, this);
        //     //余额不足
        //     InlineKeyboardButton jstz = InlineKeyboardButton
        //         .builder()
        //         .text("⚠️ ⚠️ 点我充值")
        //         .url(botUrl + "?start=deposit")
        //         .build();
        //     ArrayList<InlineKeyboardButton> objects7 = new ArrayList<>();
        //     objects7.add(jstz);
        //     InlineKeyboardMarkup keyboardM1 = InlineKeyboardMarkup.builder()
        //         .keyboardRow(objects7).build();
        //     botEncapsulation.sendMenu(tgId, "余额不足", keyboardM1, this);
        // } else {
        //     //余额足够
        //     BigDecimal subtract = bigDecimal.subtract(bigDecimal1);
        //     botUserService.modifyBalance(subtract, AESUtil.jieAESUserId(userById.getTgId()), BetCurrencyTypeEnum.USDT);
        //
        //     botPaymentService.savePayment(AESUtil.jieAESUserId(userById.getTgId()), bigDecimal1,
        //         BetPaymentTypeEnum.YHZZ, CommonEnums.ZERO, null
        //         , BetCurrencyTypeEnum.USDT, null);
        //
        //     BotUser userById1 = botUserService.getUserById(Long.parseLong(to));
        //     BigDecimal subtract2 = new BigDecimal(userById1.getUsdt()).add(bigDecimal1);
        //     botUserService.modifyBalance(subtract2, AESUtil.jieAESUserId(userById1.getTgId()), BetCurrencyTypeEnum.USDT);
        //
        //     botPaymentService.savePayment(AESUtil.jieAESUserId(userById1.getTgId()), bigDecimal1,
        //         BetPaymentTypeEnum.YYSK, CommonEnums.ONE, null
        //         , BetCurrencyTypeEnum.USDT, null);
        //     botEncapsulation.delSend(callbackQueryId, this);
        //     botEncapsulation.deleteMessage(chatId, messageId, this);
        //
        //     String html = "成功转账给 " + createAHtml(toUser.getUserName(), toUser.getUserName()) +
        //         "\n" +
        //         "用户ID : " + AESUtil.jieAESUserId(toUser.getTgId()) + "\n" +
        //         "名称 : " + toUser.getUserName() + "\n" +
        //         "用户名 : " + toUser.getNickName() + "\n" +
        //         "支付金额 : " + bigDecimal1 + "USDT" +
        //         "\n" +
        //         "\n" +
        //         "提示 : 您可以将次支付凭证转发给收款人";
        //     botEncapsulation.sendMenu(tgId, html, this);
        //     String html2 = "收到 " + createAHtml(userById.getUserName(), userById.getUserName()) + " 付款 : " + bigDecimal1 + " USTD" +
        //         "\n";
        //     botEncapsulation.sendMenu(to, html2, this);
    }

    /**
     * 取消支付
     * @param ctx
     */
    public static startCancelPayCallback = async(ctx:Context,bot:Telegraf<Context>,callbackText:string)=>{
        // 删除消息
        var messageId = ctx?.callbackQuery?.message?.message_id || 0
        var callbackQueryId= ctx?.callbackQuery?.id + ''
        var currentTgId= ctx?.callbackQuery?.from?.id + ''
        var callbackData = callbackText.replaceAll('skqxzf','')?.split(',') || []
        // 付款人
        var callbackPayTgId = callbackData[0]
        // 收款金额
        var money = callbackData[1]
        // 收款人
        var callbackSkTgId = callbackData[2]
        // 如果付款人是同一个人
        if (currentTgId == callbackPayTgId) {
            // 修改收款的信息
            await ctx.telegram.answerCbQuery(callbackQueryId,"操作成功",{show_alert:false})
            await ctx.deleteMessage(messageId)
            await ctx.reply("已取消")
        }else{
            await bot.telegram.sendMessage(currentTgId,"⚠️ 自己不能删除自己的操作")
        }

    }
}


export default WalletHandleShouKuanMethod
