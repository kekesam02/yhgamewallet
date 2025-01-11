import type {Context, Telegraf} from "telegraf";
import WalletController from "../../../../controller/WalletController";
import redis from "../../../../../config/redis";
import {addLockByTgId} from "../../../../../config/redislock";
import ButtonInnerQueryUtils from "../../../../../commons/button/ButtonInnerQueryUtils";
import WalletHandleMethod from "../WalletHandleMethod";
import WalletConfig from "../../../../WalletConfig";
import UserModel from "../../../../../models/UserModel";
import AESUtils from "../../../../../commons/AESUtils";
import {queryRunner} from "../../../../../config/database";
import PaymentTypeEnum from "../../../../../type/PaymentTypeEnum";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import WalletType from "../../../../../type/WalletType";
import CustomSnowflake from "../../../../../commons/CustomSnowflake";
import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";
import OrderUtils from "../../../../../commons/OrderUtils";


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
        await redis.set("currentop" + tgId, "shoukuan", 'EX', 60 * 60 * 24)
        // 3：判断是否登录
        const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
        // 4: 如果没有登录就输入密码登录
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }
        // 发送消息
        const html = "\uD83D\uDC47 点击下方按钮选择付款人";
        const promise = await ctx.replyWithHTML(html, WalletController.createShouKuanSwitchBtn(" -1",'shoukuan'))
        await redis.set("shoukuanmain_msgid_"+tgId,promise.message_id)
        await redis.set("shoukuanmain_chatid_"+tgId,promise.chat.id)
    }

    // 收款具体逻辑
    public static startShouKuanHandle = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['shoukuan_lock_' + tgId + ''], async () => {
            const fusername = ctx.inlineQuery?.from.username
            const id = ctx.inlineQuery?.from.id
            // 1：密码确认
            const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
                return
            }
            var money = query.replaceAll('-', '')
            var orderId: string = CustomSnowflake.snowflake()
            // 创建一个可分享的结果
            await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: "发起收款操作",
                description: "你正发起收款操作，收款金额【" + money + "】USDT",
                input_message_content: {
                    message_text: "\uD83D\uDCB0【@" + fusername + "】向你发起收款，收款金额【" + money + "】USDT。",
                    parse_mode: "HTML"
                },
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: '\uD83D\uDCB8 立即支付',
                            url: WalletConfig.walltPayBotSKInlineURL + id + '_' + money+"_"+orderId+"_"+queryId
                        }]
                    ]
                }
            }))

            // 提示钱包机器人已转账
            var msgId :string | null = await redis.get("shoukuanmain_msgid_"+tgId) || "0"
            var chatId :string | null = await redis.get("shoukuanmain_chatid_"+tgId) || "0"
            await ctx.telegram.editMessageText(chatId,parseInt(msgId),'',"⚠️  等待好友支付！",
                {parse_mode:"HTML",reply_markup:WalletController.createStatusWaitPayBtn().reply_markup})
        }, async () => {
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 立即开始支付
     * @param ctx
     */
    public static startShouKuanPayCommand = async (ctx: Context, payload: string, bot: Telegraf<Context>) => {
        let update: any = ctx?.update
        // 1：获取telegram的tgId
        var payTgId: string = update?.message?.from?.id + '' || ''
        var payUsername: string = update?.message?.from?.username + '' || ''
        var payNickname: string = update?.message?.from?.first_name + '' || ''
        // 获取收款人信息
        var s = payload.replaceAll("shoukuan_", "");
        var split = s.split("_");
        var tgIdvalue = split[0] || '' // 收款人
        var value = split[1] // 收款金额
        var orderId = split[2] || '' // 收款人
        var queryId = split[3] || '' // 改变内联的按钮状态
        // 如果是自己就拦截掉
        if (payTgId == tgIdvalue) {
            bot.telegram.sendMessage(payTgId, "⚠️ 不可以转账给自己")
            return
        }

        var manys = await BotPaymentModel.createQueryBuilder().where(
            "payment_type_number = :ptnum and user_id =:tgId ",{
                "ptnum":'zk'+orderId,
                "tgId":AESUtils.encodeUserId(tgIdvalue)
            }).getMany();

        if (manys && manys.length > 0){
            await ctx.replyWithHTML("请不要重复操作!",WalletController.createModelClientServerBtn())
            return;
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
                USDT: "0"
            }).execute()
        }

        var tgIdvaluePwd = AESUtils.encodeUserId(tgIdvalue);
        // 查询转账人信息
        const botUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: tgIdvaluePwd}).getOne()
        var html = "\uD83D\uDCB8 你正在付款给" + botUser?.nickName + "\n" +
            "\n" +
            "1、收款人用户ID : " + tgIdvalue + "\n" +
            "2、收款人名称 : " + botUser?.userName + "\n" +
            "3、支付金额 : " + value + " USDT\n" +
            "4、转账时间 : " + DateFormatUtils.CurrentDateFormatString() + " USDT\n" +
            "⚠️ 提示: 本次转账即时完成, 无法追回!";
        // 发送消息
        // 改变上个的支付状态
        //await ctx.telegram.editMessageReplyMarkup('',undefined,queryId,WalletController.createStatusWaitSurePayBtn().reply_markup)
        // 提示钱包机器人已转账
        var msgId :string | null = await redis.get("shoukuanmain_msgid_"+tgIdvalue) || "0"
        var chatId :string | null = await redis.get("shoukuanmain_chatid_"+tgIdvalue) || "0"
        await ctx.telegram.editMessageText(chatId,parseInt(msgId),'',"\"✅  好友正在确认支付！",
            {parse_mode:"HTML",reply_markup:WalletController.createStatusWaitPayBtn().reply_markup})
        // 生成新的确认和支付按钮
        await bot.telegram.sendMessage(payTgId, html, {
            parse_mode: "HTML",
            reply_markup: WalletController.createPayBotButton(payTgId, tgIdvalue, value,orderId).reply_markup
        })

        await redis.set("shouku_query_"+tgIdvalue,queryId)
    }

    /**
     * 确认支付
     * @param ctx
     */
    public static startPayCallback = async (ctx: Context, bot: Telegraf<Context>, callbackText: string) => {
        // 删除消息
        //var messageId = ctx?.callbackQuery?.message?.message_id+'' || '0'
        //var callbackQueryId = ctx?.callbackQuery?.id + ''
        var chatId = ctx?.chat?.id + ''
        // 防止幂等性
        var currentTgId = ctx?.callbackQuery?.from?.id + ''
        //  返回数据
        var callbackData = callbackText.replaceAll('skqrzf', '')?.split(',') || []
        // 付款人
        var callbackPayTgId = callbackData[0]
        // 收款金额
        var money = parseFloat(callbackData[1] || "0")
        // 收款人
        var callbackSkTgId = callbackData[2]
        // 订单ID防止幂等性用的
        const orderId = callbackData[3]

        var manys = await BotPaymentModel.createQueryBuilder().where(
            "payment_type_number = :ptnum and user_id =:tgId ",{
                "ptnum":'zk'+orderId,
                "tgId":AESUtils.encodeUserId(currentTgId)
            }).getMany();

        if (manys && manys.length > 0){
            await ctx.editMessageReplyMarkup(WalletController.createSureErrorBtn().reply_markup)
            return;
        }

        // 查询付款人信息
        const ecnodecallbackPayTgId = AESUtils.encodeUserId(callbackPayTgId)
        const payBotUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: ecnodecallbackPayTgId}).getOne()
        if (payBotUser) {
            // 付款金额
            const fukuanBeforeMoney = parseFloat(payBotUser?.USDT || "0")
            // 如果付款金额不足就返回
            if (fukuanBeforeMoney < money) {
                await ctx.replyWithHTML("提示：余额不足",{
                    parse_mode:"HTML",
                    reply_markup:WalletController.createSkChongzhiBtn().reply_markup
                })
                return
            }else{
                // 如果付款金额充足，就开始进行转账处理
                // 查询收款人信息
                const ecnodeCallbackSkTgId = AESUtils.encodeUserId(callbackSkTgId)
                const shouKuanBotUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: ecnodeCallbackSkTgId}).getOne()
                //保存转账记录
                var applyTime = DateFormatUtils.CurrentDateFormatString()
                // 收款金额
                const shoukuanBeforeMoney = parseFloat(shouKuanBotUser?.USDT || "0")
                const shoukuanAfterMoney =  shoukuanBeforeMoney + money
                // 付款金额
                const fukuanAfterMoney =  fukuanBeforeMoney - money
                try {
                    await queryRunner.startTransaction()
                    // 收款人余额增加
                    await queryRunner.manager.update(UserModel, {
                        id: shouKuanBotUser?.id
                    }, {
                        USDT: shoukuanAfterMoney + ''
                    })
                    // 开始新增收款人订单 --- 收入
                   await queryRunner.manager.save(BotPaymentModel, {
                        tgId: shouKuanBotUser?.tgId,
                        uid: shouKuanBotUser?.id,
                        username: shouKuanBotUser?.userName,
                        nickname: shouKuanBotUser?.nickName,
                        balanceBefore: shoukuanBeforeMoney + '',
                        balanceAfter: shoukuanAfterMoney + '',
                        paymentType: PaymentTypeEnum.YHSK.value,
                        paymentTypeName: PaymentTypeEnum.YHSK.name,
                        operateType: 1, // 收入
                        paymentTypeNumber: 'zk' + orderId,
                        paymentAmount: money + '',
                        paymentRealAmount: money + '',
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        passTime: applyTime,
                        passTgid: payBotUser.tgId,
                        passUsername: payBotUser.userName,
                        passNickname: payBotUser.nickName,
                        status:1,
                        chatId: chatId,
                        description:"已收到用户【@"+payBotUser?.userName+"】转账"
                    })
                    // 付款人余额减少
                    await queryRunner.manager.update(UserModel, {
                        id: payBotUser?.id
                    }, {
                        USDT: fukuanAfterMoney + ''
                    })
                    // 开始保存付款人订单 --- 支出
                    await queryRunner.manager.save(BotPaymentModel, {
                        tgId: payBotUser.tgId,
                        uid: payBotUser.id,
                        username: payBotUser.userName,
                        nickname: payBotUser.nickName,
                        balanceBefore: fukuanBeforeMoney + '',
                        balanceAfter: fukuanAfterMoney + '',
                        paymentType: PaymentTypeEnum.YHZZ.value,
                        paymentTypeName: PaymentTypeEnum.YHZZ.name,
                        operateType: 0,// 支出
                        paymentTypeNumber: 'zk' + orderId,
                        paymentAmount: money + '',
                        paymentRealAmount: money + '',
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        passTime: applyTime,
                        passTgid: shouKuanBotUser?.tgId,
                        passUsername: shouKuanBotUser?.userName,
                        passNickname: shouKuanBotUser?.nickName,
                        status:1,
                        chatId: chatId,
                        description:"已转账给用户【@"+shouKuanBotUser?.userName+"】"
                    })
                    // 付款人信息
                    var html = "✅ 成功转账给 " + shouKuanBotUser?.userName +
                        "\n\n" +
                        "1、用户ID  : " + currentTgId+ "\n" +
                        "2、转账用户 : " + shouKuanBotUser?.userName + "\n" +
                        "3、转账昵称 : " + shouKuanBotUser?.nickName + "\n" +
                        "4、支付金额 : " + money + " U" + "\n" +
                        "5、转账时间 : " + applyTime + "\n" +
                        "⚠️ 提示 : 您可以将次支付凭证转发给收款人";
                    await ctx.editMessageText(html,{parse_mode:"HTML",reply_markup:WalletController.createModelClientServerBtn().reply_markup})
                    // 收款人消息
                    var html2 = "✅ 收款操作完成，收到用户@"+payBotUser.userName+ "的付款信息金额是:" + money + " U"
                    var cmsgId :string | null = await redis.get("shoukuanmain_msgid_"+callbackSkTgId) || "0"
                    var cchatId :string | null = await redis.get("shoukuanmain_chatid_"+callbackSkTgId) || "0"
                    await ctx.telegram.editMessageText(cchatId,parseInt(cmsgId),'',html2,
                        {parse_mode:"HTML",reply_markup:WalletController.createModelBackBtn('shoukuan').reply_markup})
                    await redis.del("shoukuanmain_msgid_"+callbackSkTgId)
                    await redis.del("shoukuanmain_chatid_"+callbackSkTgId)
                    // 提交事务
                    await queryRunner.commitTransaction()
                }catch (e) {
                    await queryRunner.rollbackTransaction()
                    await ctx.replyWithHTML("付款失败，请联系客服进行处理...")
                }
            }
        }
    }

    /**
     * 取消支付
     * @param ctx
     */
    public static startCancelPayCallback = async (ctx: Context, bot: Telegraf<Context>, callbackText: string) => {
        // 删除消息
        var messageId = ctx?.callbackQuery?.message?.message_id || 0
        var callbackQueryId = ctx?.callbackQuery?.id + ''
        var currentTgId = ctx?.callbackQuery?.from?.id + ''
        var callbackData = callbackText.replaceAll('skqxzf', '')?.split(',') || []
        // 付款人
        var callbackPayTgId = callbackData[0]
        // 收款金额
        var money = callbackData[1]
        // 收款人
        var callbackSkTgId = callbackData[2]
        // 收款人
        var orderId = callbackData[3]

        // 幂等性处理
        var manys = await BotPaymentModel.createQueryBuilder().where(
            "payment_type_number = :ptnum and user_id =:tgId ",{
                "ptnum":'zk'+orderId,
                "tgId":AESUtils.encodeUserId(currentTgId)
            }).getMany();

        if (manys && manys.length > 0){
            await ctx.editMessageReplyMarkup(WalletController.createSureErrorBtn().reply_markup)
            return;
        }
        // 如果付款人是同一个人
        if (currentTgId == callbackPayTgId) {
            // 删除消息
            await ctx.deleteMessage(messageId)
            // 修改收款的信息
            await ctx.replyWithHTML("✅ 取消转账成功！")
            // 防止恶意输入无限的弹窗和显示
            const ecnodecallbackPayTgId = AESUtils.encodeUserId(callbackPayTgId)
            const payBotUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: ecnodecallbackPayTgId}).getOne()

            var html2 = "⚠️ 你发起的收款操作，已被用户@" + payBotUser?.userName + "拒绝，金额是：" + money
            var cmsgId :string | null = await redis.get("shoukuanmain_msgid_"+callbackSkTgId) || "0"
            var cchatId :string | null = await redis.get("shoukuanmain_chatid_"+callbackSkTgId) || "0"
            await ctx.telegram.editMessageText(cchatId,parseInt(cmsgId),'',html2,
                {parse_mode:"HTML",reply_markup:WalletController.createModelBackBtn('shoukuan').reply_markup})
            await redis.del("shoukuanmain_msgid_"+callbackSkTgId)
            await redis.del("shoukuanmain_chatid_"+callbackSkTgId)
        } else {
            await bot.telegram.sendMessage(currentTgId, "⚠️ 自己不能删除自己的操作")
        }

    }
}


export default WalletHandleShouKuanMethod
