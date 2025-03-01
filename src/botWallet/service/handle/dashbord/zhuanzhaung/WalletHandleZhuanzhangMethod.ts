import type {Context, Telegraf} from "telegraf";
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import WalletController from "../../../../controller/WalletController";
import WalletMessage from "../../../../const/WalletMessage";
import redis from "../../../../../config/redis";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";
import PaymentTypeEnum from "../../../../../type/PaymentTypeEnum";
import ButtonInnerQueryUtils from "../../../../../commons/button/ButtonInnerQueryUtils";
import CustomSnowflake from "../../../../../commons/CustomSnowflake";
import WalletType from "../../../../../type/WalletType";
import {queryRunner} from "../../../../../config/database";
import WalletHandleMethod from "../WalletHandleMethod";
import WalletConfig from "../../../../WalletConfig";
import {addLockByTgId} from "../../../../../config/redislock";
import dateFormatUtils from "../../../../../commons/date/DateFormatUtils";
import walletHandleMethod from "../WalletHandleMethod";
import walletController from "../../../../controller/WalletController";


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
class WalletHandleZhuanzhangMethod {

    /**
     * 转账
     * 代号：zhuanzhang_btn
     * @param ctx
     */
    public static startZhuanZhang = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        await redis.set("currentop" + tgId, "zhuanzhang", 'EX', 60 * 60 * 24)
        // 3：判断是否登录
        const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
        // 4: 如果没有登录就输入密码登录
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }
        const html = "\uD83D\uDC47 点击下方按钮选择收款人";
        // 发送消息
        const promise = await ctx.replyWithHTML(html, WalletController.createZhuanzhangSwitchBtn("1","zhuanzhang"));
        await redis.set("zhuanzhangmain_msgid_"+tgId,promise.message_id)
        await redis.set("zhuanzhangmain_chatid_"+tgId,promise.chat.id)
    }

    // 转账具体逻辑
    public static startZhuangzhangHandle = async (query: string, queryId: string, tgId: number, ctx: Context) => {
        const fusername = ctx.inlineQuery?.from.username
        // 查询用户余额
        let userId = AESUtils.encodeUserId(tgId?.toString())
        let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        if (botUser) {
            const userUsdt = parseFloat(botUser.USDT)
            const zhuanMoney = parseFloat(query)
            if (userUsdt > 0) {
                // 这里判断余额是否充足
                if (userUsdt < zhuanMoney) {
                    // 创建一个可分享的结果
                    await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                        id: queryId,
                        title: '⚠️ 温馨提示：操作失败，余额不足！',
                        description: '提示：余额不足，当前余额：【' + userUsdt + '】 不足以转出【' + zhuanMoney + '】!',
                        input_message_content: {
                            message_text: '\uD83D\uDC47 \n'
                        },
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                    text: '\uD83D\uDCB0一号公馆钱包',
                                    callback_data: 'qwe123',
                                    url: WalletConfig.walltPayBotURL
                                }]
                            ]
                        }
                    }))
                    return
                }
                // 创建一个可分享的结果
                await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                    id: queryId,
                    title: "转款金额【" + query + "】USDT",
                    description: "\uD83D\uDCB0用户【@" + fusername + "】正在向您发起转账，点击并立即生效",
                    input_message_content: {
                        message_text: "\uD83D\uDD30为了您的资金安全，请验证密码来解锁此笔转账，请耐心等待！",
                        parse_mode: "HTML"
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: '✅ 确认解锁',
                                callback_data: "qrjs" + query + "," + tgId+","+fusername
                            }, {
                                text: '\uD83D\uDEAB 取消转账',
                                callback_data: "quxiaozz" + query + "," + tgId+","+fusername
                            }]
                        ]
                    }
                }))
            } else {
                // 创建一个可分享的结果
                await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                    id: queryId,
                    title: '⚠️ 温馨提示：操作失败，余额不足！',
                    description: "\uD83D\uDCB0当前余额：" + botUser.USDT + " USDT",
                    input_message_content: {
                        message_text: '\uD83D\uDC47 \n'
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: '\uD83D\uDCB0一号公馆钱包',
                                callback_data: 'qwe123',
                                url: WalletConfig.walltPayBotURL
                            }]
                        ]
                    }
                }))
            }
        }
    }

    /**
     * 确认解锁
     * -- 小额免密
     * -- callback_query
     * @param ctx
     */
    public static startZhuanZhangUnLock = async (ctx: Context) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        let inlineMessageId = ctx.callbackQuery?.inline_message_id || ""
        // 转账金额
        var callbackDataSplit = callbackStr.replaceAll("qrjs", "").split(",")
        var money = callbackDataSplit[0];
        var sendTgId = callbackDataSplit[1];
        var fusername = callbackDataSplit[2];
        // 必须是转账本人操作。否则返回
        if (sendTgId != tgId.toString()) {
            await ctx.answerCbQuery('⚠️ 提示：不是你发起的转账', {show_alert: true})
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
                await ctx.answerCbQuery('⚠️ 提示：余额不足，当前余额是0', {show_alert: true})
                return
            }
            // 余额不够
            if (userUsdt < zhuanMoney) {
                await ctx.answerCbQuery('⚠️ 提示：余额不足，当前余额：【' + userUsdt + '】 不足以转出【' + zhuanMoney + '】!', {show_alert: true})
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
                        operateType: 0, // 支出
                        paymentTypeNumber: 'zk' + orderId,
                        paymentAmount: zhuanMoney + '',
                        paymentRealAmount: zhuanMoney + '',
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        chatId: inlineMessageId,
                        description:"用户【@"+botUser?.userName+"】发起转账，金额：" + money,
                    })

                    await queryRunner.manager.update(UserModel, {
                        id: botUser.id
                    }, {
                        USDT: realMoney + ''
                    })
                    // 更换收款的按钮
                    await ctx.editMessageText("\uD83D\uDCB0 【" + botPayment.username + "】转账给你 " + zhuanMoney + " USDT", {parse_mode: 'HTML'})
                    await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangSKBtn(botPayment.id + '').reply_markup)
                    await queryRunner.commitTransaction()
                    // 开始写入24小时定时过期转账
                    await redis.set("tx_botpayment_"+tgId,botPayment.id,"EX",60 * 60 * 24)
                    try {
                        // 提示钱包机器人已转账
                        var msgId :string | null = await redis.get("zhuanzhangmain_msgid_"+tgId) || "0"
                        var chatId :string | null = await redis.get("zhuanzhangmain_chatid_"+tgId) || "0"
                        await ctx.telegram.editMessageText(chatId,parseInt(msgId),'',"⚠️  已完成转账，等待对方收款",
                            {parse_mode:"HTML",reply_markup:WalletController.createStatusWaitTextBtn().reply_markup})
                    }catch (e){
                        ctx.replyWithHTML("⚠️  已完成转账，等待对方收款")
                    }

                } catch (e) {
                    await queryRunner.rollbackTransaction()
                    await ctx.answerCbQuery('⚠️ 提示：服务器忙，请稍后在试', {show_alert: true})
                }
            } else {
                const cacheLogin = await redis.get("zk_input_lock_"+tgId)
                if(cacheLogin == "success"){
                    // 同时改变按钮的状态为收款
                    await this.startZhuanZhangPwdUnLock(ctx,tgId + '_' + money + '_' + inlineMessageId)
                    return
                }
                // 缓存用于用户输入完密码。获取对应的信息，inlineMessageId是用来修改按钮状态的
                await ctx.editMessageText("⌛️ 请等待对方验证密码", {parse_mode: 'HTML'})
                await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangPwdBtn(tgId + '', inlineMessageId, money, "zhza").reply_markup)
            }
        }
    }


    /**
     * 请等待对方验证密码
     * -- callback_query
     * @param ctx
     * @param payload
     */
    public static startCommandInputPassword = async (ctx: Context, payload: string) => {
        var qrjs = payload.replaceAll("inline_", "");
        var tgId: number = ctx.message?.from?.id || 0
        var inlineMessageId = qrjs.split("_")[0] || ""
        var money = qrjs.split("_")[1] || ""
        var operator = qrjs.split("_")[2] || ""
        var sendTgId = qrjs.split("_")[3] || ""
        // if (sendTgId != tgId.toString()) {
        //     await ctx.telegram.editMessageText('',undefined,inlineMessageId,'提示：请等待对方验证')
        //     return
        // }
        // 开始生成输入密码确认
        await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", true, {
            tgId: tgId.toString(),
            inlineMessageId: inlineMessageId,
            money: money,
            operator: operator
        })
    }


    /**
     * 确认解锁 --- 点击确认密码
     * -- 大额密码校验确认
     * -- callback_query
     * @param ctx
     */
    public static startZhuanZhangPwdUnLock = async (ctx: Context,cacheInlineMessaeData:string) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 如果验证通过了，就开始转账
        let userId = AESUtils.encodeUserId(tgId?.toString())
        const botUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
        var sendTgId = cacheInlineMessaeData.split("_")[0]|| "";
        var money = cacheInlineMessaeData.split("_")[1]|| "";
        let inlineMessageId = cacheInlineMessaeData?.split("_")[2] || ""
        let userUsdt = parseFloat(botUser?.USDT || "0")
        let zhuanMoney = parseFloat(money)
        // 必须是转账本人操作。否则返回
        if (sendTgId != tgId.toString()) {
            await ctx.answerCbQuery('提示：不是你发起的转账', {show_alert: true})
            return
        }
        // 扣除用户余额、用户余额递减
        try {
            await queryRunner.startTransaction()
            var realMoney = userUsdt - zhuanMoney
            //保存转账记录
            var orderId: string = CustomSnowflake.snowflake()
            var applyTime = DateFormatUtils.CurrentDateFormatString()
            // 开始新增订单
            const botPayment = await queryRunner.manager.save(BotPaymentModel, {
                tgId: botUser?.tgId,
                uid: botUser?.id,
                username: botUser?.userName,
                nickname: botUser?.nickName,
                balanceBefore: userUsdt + '',
                balanceAfter: realMoney + '',
                paymentType: PaymentTypeEnum.YHZZ.value,
                paymentTypeName: PaymentTypeEnum.YHZZ.name,
                operateType: 0, // 支出
                status:0,
                paymentTypeNumber: 'zk' + orderId,
                paymentAmount: money+ '' ,
                paymentRealAmount: money+ '',
                walletType: WalletType.USDT,
                applyTime: applyTime,
                description:"用户【@"+botUser?.userName+"】发起转账，金额：" + money,
                chatId: inlineMessageId
            })

            await queryRunner.manager.update(UserModel, {
                id: botUser?.id
            }, {
                USDT: realMoney + ''
            })

            // 更换收款的按钮
            await ctx.telegram.editMessageText('', undefined, inlineMessageId,
                "\uD83D\uDCB0 【" + botPayment.username + "】转账给你 " + money + " USDT",
                {parse_mode: 'HTML'}
            )
            await ctx.telegram.editMessageReplyMarkup('', undefined, inlineMessageId,
                WalletController.createZhuanzhangSKBtn(botPayment.id + '').reply_markup
            )
            // 提交事务
            await queryRunner.commitTransaction()
            // 写入缓存，这样就可以避免下次大额在输入密码
            await redis.set("zk_input_lock_"+tgId,"success",'EX',60 * 60 * 24)
            // 删除密码验证------------------------------如果想续期不输入密码就注释掉
            // 开始写入24小时定时过期转账
            await redis.set("tx_botpayment_"+tgId,botPayment.id,"EX",60 * 60 * 24)

           try {
               // 提示钱包机器人已转账
               var msgId :string | null = await redis.get("zhuanzhangmain_msgid_"+tgId) || "0"
               var chatId :string | null = await redis.get("zhuanzhangmain_chatid_"+tgId) || "0"
               await ctx.telegram.editMessageText(chatId,parseInt(msgId),'',"⚠️ 已完成转账，等待对方收款！",
                   {parse_mode:"HTML",reply_markup:WalletController.createStatusWaitTextBtn().reply_markup})
           }catch (e){
               ctx.replyWithHTML("⚠️ 已完成转账，等待对方收款！")
           }
        } catch (e) {
            await queryRunner.rollbackTransaction()
            await ctx.answerCbQuery('提示：服务器忙，请稍后在试', {show_alert: true})
        }
    }

    /**
     * 转账用户验证密码
     * -- callback_query
     * @param ctx
     */
    public static startValidatorPwdCallback = async (ctx: Context, query: string) => {
        var callbackData = query.replaceAll('vpb_', '');
        var inlineMessageId = callbackData.split("_")[0] || ""
        var money = callbackData.split("_")[1] || ""
        var operator = callbackData.split("_")[2] || ""
        var sendTgId = callbackData.split("_")[3] || ""
        var tgId: string = ctx.callbackQuery?.from?.id + "" || ''
        var cacheValue = await redis.get('pwd_' + tgId)
        const currentOp = await redis.get("currentop" + tgId)
        if (cacheValue && currentOp == 'zhuanzhang') {
            if (cacheValue.length >= 4) {
                var firstName: string = ctx.callbackQuery?.from?.first_name || ''
                let userId = AESUtils.encodeUserId(tgId?.toString())
                var password = cacheValue.substring(0, 4) || ''
                // 开始查询密码
                const resp = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: userId}).getOne()
                if (resp?.paymentPassword) {
                    if (resp.paymentPassword == password) {
                        // 清除计算器消息
                        await WalletHandleMethod.removeMessage(ctx)
                        // 清空缓存
                        await WalletHandleMethod.clearCacheRelation(ctx)
                        // 发送消息
                        await ctx.replyWithHTML("✅ 你已成功解锁该笔转账!",WalletController.createBackBtn())
                        // 同时改变按钮的状态为收款
                        await this.startZhuanZhangPwdUnLock(ctx,tgId + '_' + money + '_' + inlineMessageId)
                    } else {
                        ctx.replyWithHTML(WalletMessage.C_PASSWPORD_ERROR)
                    }
                } else {
                    // 开始执行密码修改
                    await UserModel.createQueryBuilder().update()
                        .set({paymentPassword: password, nickName: firstName})
                        .where("tg_id=:tgId", {'tgId': userId}).execute()
                    // 清除计算器消息
                    await WalletHandleMethod.removeMessage(ctx)
                    // 清空缓存
                    await WalletHandleMethod.clearCacheRelation(ctx)
                    // 发送消息
                    await ctx.replyWithHTML("✅ 你已成功解锁该笔转账!",WalletController.createBackBtn())
                    // 同时改变按钮的状态为收款
                    await this.startZhuanZhangPwdUnLock(ctx,tgId + '_' + money + '_' + inlineMessageId)
                }
            } else {
                ctx.replyWithHTML(WalletMessage.PASSWPORD_ERROR)
            }
        }
    }


    /**
     * 取消转账
     * @param ctx
     */
    public static cancelZhuanZhang = async (ctx: Context) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var sendTgId = callbackStr.replaceAll("qrjs", "").split(",")[1];
        // 必须是转账本人操作。否则返回
        if (sendTgId != tgId.toString()) {
            ctx.answerCbQuery('⚠️ 提示：不是你发起的转账', {show_alert: true})
            return
        }

       try {
           // 删除机器人的选择收款人消息
           var msgId :string | null = await redis.get("zhuanzhangmain_msgid_"+tgId) || "0"
           var chatId :string | null = await redis.get("zhuanzhangmain_chatid_"+tgId) || "0"
           await ctx.telegram.editMessageText(chatId,parseInt(msgId),"","⚠️ 已取消转账!",{
               parse_mode:"HTML",
               reply_markup:WalletController.createModelBackBtn('zhuangzhang').reply_markup
           })
       }catch (e) {
            ctx.replyWithHTML("⚠️ 已取消转账!")
       }
        // 删除此消息
        await ctx.editMessageText("⚠️ 已取消转账",{
            parse_mode:"HTML",
            reply_markup:WalletController.createHomeBackEmptyBtn().reply_markup
        })
        // 删除缓存操作
        await redis.del("zk_input_lock_"+tgId)
        await redis.del("tx_botpayment_"+tgId)
        await redis.del("currentop" + tgId)
        await redis.del("zhuanzhangmain_msgid_"+tgId)
        await redis.del("zhuanzhangmain_chatid_"+tgId)
    }

    /**
     * 点击收款按钮进行收款
     * @param ctx
     */
    public static startZhuanzhangSK = async (ctx: Context) => {
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data
        // 1：获取收款人tgId
        var tgId: string = ctx.callbackQuery?.from?.id + '' || '0'
        var nickname: string = ctx.callbackQuery?.from?.first_name + '' || '0'
        var username: string = ctx.callbackQuery?.from?.username + '' || '0'
        await addLockByTgId(['zhuanzhangmain_sk_lock_'+tgId],async()=>{
            // 2: 查询转账人
            var botPaymentId = callbackStr.replaceAll("shoukuanzk", "");
            var botPayment: BotPaymentModel | null = await BotPaymentModel.createQueryBuilder().where("id=:id", {id: botPaymentId}).getOne()
            // 获取转账人信息
            if (botPayment) {
                let encodeUserId = AESUtils.encodeUserId(tgId)
                let botPaymentTgId = botPayment?.tgId || ""
                let deTgId = AESUtils.decodeUserId(botPaymentTgId)
                if(encodeUserId == botPaymentTgId){
                    await ctx.answerCbQuery("⚠️ 收款人不能是自己",{show_alert:true})
                    return;
                }
                // 该笔订单已完成
                if(botPayment.status == 1){
                    await ctx.editMessageText("✅ 该笔订转账已完成")
                    await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangPeriod24HourBtn().reply_markup)
                    return;
                }
                // 该笔订单已被退回
                if(botPayment.status == 2){
                    await ctx.editMessageText("⚠️ 转账超时，已被取消")
                    await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangPeriod24HourBtn().reply_markup)
                    return;
                }
                // 开始判断订单是否超过24小时，如果超过24小时就把订单作废，余额退回
                var mark = dateFormatUtils.isMoreThan24HoursApartCurrent(botPayment.createTime)
                if(mark){
                    try {
                        // 操作时间
                        var applyTime = DateFormatUtils.CurrentDateFormatString()
                        // 1：查询收款人是否注册
                        let botUser: UserModel | null = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: botPayment.tgId}).getOne()
                        const userUsdt = botUser?.USDT || "0"
                        const backUserUsdt = parseFloat(botPayment.paymentAmount) + parseFloat(userUsdt)
                        await queryRunner.startTransaction()
                        // 修改订单信息
                        await queryRunner.manager.update(BotPaymentModel,{
                            id:botPayment.id,
                            version:botPayment.version
                        },{
                            status:2,//超时退回
                            balanceBefore:userUsdt,//退回之余额
                            balanceAfter:backUserUsdt.toString(),//退回之后余额
                            description:"超时自动退回",
                            passTime:applyTime,
                            passTgid:'1',
                            passUsername:"机器人退回",
                            passNickname:"机器人退回",
                            version:()=>{
                                return 'version + 1'
                            }
                        })
                       // 把退回的余额加回去
                       await queryRunner.manager.update(UserModel,{
                           id: botUser?.id
                       },{
                           USDT: backUserUsdt.toString()
                       })
                        // 提示信息
                        await ctx.editMessageText("⚠️ 转账超时，已被取消!")
                        await ctx.editMessageReplyMarkup(WalletController.createZhuanzhangPeriod24HourBtn().reply_markup)
                        await queryRunner.commitTransaction()
                    }catch (e){
                        await queryRunner.rollbackTransaction()
                    }
                    return
                }

                try {
                    // 收款时间
                    var applyTime = DateFormatUtils.CurrentDateFormatString()
                    // 转账金额
                    var zhuanMoney = botPayment?.paymentAmount
                    // 事务开启
                    await queryRunner.startTransaction()
                    // 1：查询收款人是否注册
                    let botUser: UserModel | null = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: encodeUserId}).getOne()
                    // 2：如果没有注册就先注册
                    if (!botUser) {
                        await UserModel.createQueryBuilder().insert().into(UserModel).values({
                            tgId: encodeUserId,
                            nickName: nickname,
                            userName: username,
                            vip: 0,
                            USDT: "0",
                        }).execute()
                    }
                    // 再次查询用户信息
                    const newbotUser = await UserModel.createQueryBuilder().where("tg_id=:tgId", {tgId: encodeUserId}).getOne()
                    const beforeAmount = newbotUser?.USDT || "0"
                    // 3：开始修改用户余额
                    await UserModel.createQueryBuilder().update(UserModel).set({
                        USDT: () => {
                            return "usdt + " + botPayment?.paymentAmount
                        }
                    }).where({
                        id: newbotUser?.id
                    }).execute()
                    // 新增之后的余额
                    const afterAmount: number = parseFloat(beforeAmount) + parseFloat(botPayment?.paymentAmount || '0')
                    //4：修改原来的订单为为--成功
                    await queryRunner.manager.update(BotPaymentModel, {
                        id: botPayment?.id,
                        version:botPayment.version
                    }, {
                        status: 1,// 已完成转账
                        passTime: applyTime,
                        passTgid: encodeUserId,
                        passUsername: username,
                        passNickname: nickname,
                        version:()=>{
                            return 'version + 1'
                        }
                    })

                    //5：保存收款记录
                    var orderId: string = CustomSnowflake.snowflake()
                    let inlineMessageId = ctx.callbackQuery?.inline_message_id
                    //6：开始存收款订单
                    await queryRunner.manager.save(BotPaymentModel, {
                        tgId: encodeUserId,
                        uid: newbotUser?.id,
                        username: username,
                        nickname: nickname,
                        balanceBefore: beforeAmount + '',
                        balanceAfter: afterAmount + '',
                        paymentType: PaymentTypeEnum.YHSK.value,
                        paymentTypeName: PaymentTypeEnum.YHSK.name,
                        operateType: 1, // 收入
                        paymentTypeNumber: 'zk' + orderId,
                        paymentAmount: zhuanMoney + '',
                        paymentRealAmount: zhuanMoney + '',
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        passTime: applyTime,
                        passTgid: botPayment.tgId,
                        passUsername: botPayment.username,
                        passNickname: botPayment.nickname,
                        status: 1, // 已完成收款
                        description:"用户【@"+username+"】完成收款。",
                        chatId: inlineMessageId
                    })
                    //7：提示收款完成
                    ctx.editMessageText("✅ "+nickname+"已完成收款!",{
                        parse_mode:"HTML",
                        reply_markup:WalletController.createHomeBackEmptyBtn().reply_markup
                    })
                    await queryRunner.commitTransaction()
                    try {
                        // 提示钱包机器人已转账
                        var msgId :string | null = await redis.get("zhuanzhangmain_msgid_"+deTgId) || "0"
                        var chatId :string | null = await redis.get("zhuanzhangmain_chatid_"+deTgId) || "0"
                        await ctx.telegram.editMessageText(chatId,parseInt(msgId),'',"✅ 转账已完成",
                            {parse_mode:"HTML",reply_markup:WalletController.createModelBackBtn('zhuangzhang').reply_markup})
                        await redis.del("zhuanzhangmain_msgid_"+tgId)
                        await redis.del("zhuanzhangmain_chatid_"+tgId)
                    }catch (e){
                        ctx.replyWithHTML("✅ 转账已完成")
                    }
                } catch (e) {
                    ctx.editMessageText("出错了，请稍后在试试!")
                    ctx.editMessageReplyMarkup(WalletController.createHomeBackEmptyBtn().reply_markup)
                    await queryRunner.rollbackTransaction()
                }
            }
        },async ()=>{

        })
    }


}

export default WalletHandleZhuanzhangMethod
