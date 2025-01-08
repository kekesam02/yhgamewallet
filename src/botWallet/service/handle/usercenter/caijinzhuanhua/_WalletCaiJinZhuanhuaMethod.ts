// import type {Context} from "telegraf";
// import {Telegraf} from "telegraf";
// import redis from "../../../../../config/redis";
// import {addLockByTgId} from "../../../../../config/redislock";
// import WalletType from "../../../../../type/WalletType";
// import walletType from "../../../../../type/WalletType";
// import GameTypeEnum from "../../../../../type/gameEnums/GameTypeEnum";
// import AESUtils from "../../../../../commons/AESUtils";
// import GameUserRedis from "../../../../../commons/redis/GameUserRedis";
// import UserModel from "../../../../../models/UserModel";
// import BotPaymentModel from "../../../../../models/BotPaymentModel";
// import paymentType from "../../../../../type/PaymentType";
// import PaymentType from "../../../../../type/PaymentType";
// import CustomSnowflake from "../../../../../commons/CustomSnowflake";
// import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";
// import PaymentTypeEnum from "../../../../../type/PaymentTypeEnum";
// import WalletUserCenterController from "../../../../controller/WalletUserCenterController";
// import walletUserCenterController from "../../../../controller/WalletUserCenterController";
//
// /**
//  * 公共方法处理
//  * 钱包机器人收到的用户消息处理器
//  * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
//  * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
//  * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
//  * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
//  * 仓库地址：https://github.com/gaozhihen/yhgame
//  */
// class WalletCaiJinZhuanhuaMethod {
//
//     /**
//      * 彩金转化
//      * 代号：ctrxzh_btn
//      * @param ctx
//      */
//     public static startCtrxzh = async (ctx: Context, callbackData: string, cbot: Telegraf<Context>) => {
//         var tgId: number = ctx.callbackQuery?.from?.id || 0
//         var inlineMessageId: string = ctx.callbackQuery?.inline_message_id || "0"
//         var username: string = ctx.callbackQuery?.from?.username || ''
//         var nickname: string = ctx.callbackQuery?.from?.first_name || ''
//         //var callbackQueryId: string = ctx.callbackQuery?.id || ''
//         await addLockByTgId(['caijinzhuanghua_lock_' + tgId], async () => {
//             // 设置操作
//             await redis.set("currentop" + tgId, "caijinzhuanghua", 'EX', 60 * 60 * 24)
//             // 1： 这里要加互斥锁 --如果用户正在上注就就不能彩金转化
//             // var userIsPlaying = GameUserRedis.getUserIsPlaying(tgId + '');
//             // if (userIsPlaying) {
//             //     await ctx.answerCbQuery("⚠️ 您已有正在投注的彩金操作，无法转化停止投注后再重试！",{show_alert:true});
//             //     return
//             // }
//             // 2: 当前转化用户
//             const aesUserId = AESUtils.encodeUserId(tgId + '')
//             var userById = await new UserModel().getUserModelById(aesUserId)
//             if (userById) {
//
//                 const numCusdt = parseFloat(userById?.CUSDT || "0")
//                 if (numCusdt <= 0) {
//                     await ctx.replyWithHTML("⚠️ 暂时没有需要转化的彩金！");
//                     return
//                 }
//
//                 // 3: 获取上次申请彩金转化的最大时间 del = 1
//                 let {ks}: any = await BotPaymentModel.createQueryBuilder().select("max(create_time)", "ks")
//                     .where("payment_type = " + paymentType.CJTX + " and del = 1 and wallet_type = " + walletType.USDT + " and user_id = :tgId",
//                         {}).getOne()
//
//                 // 4: 领取好友返利的最大时间查询和处理
//                 // let {ks1}:string = await BotPaymentModel.createQueryBuilder().select("max(create_time)", "ks")
//                 //     .where("payment_type = " + paymentType.HYFL + " and del = 0 and wallet_type = " + walletType.USDT + " and user_id = :tgId",
//                 //         {}).getOne()
//                 // if(ks1 && ks1.isAfter(ks)){
//                 //     ks = ks1
//                 // }
//
//                 //5: 获大于上次时间的新的需要转化的上注彩金流水 del == 0 也就是新的彩金订单
//                 let sql = "payment_type = " + paymentType.SZ + " and del = 0 and wallet_type = "
//                     + walletType.USDT + " and user_id = :tgId"
//                 if (ks) sql += " and create_time >=" + ks
//                 var list = await BotPaymentModel.createQueryBuilder()
//                     .where(sql, {tgId: aesUserId})
//                     .getMany();
//                 // 如果没有彩金订单就返回了。
//                 if (list && list.length <= 0) {
//                     await ctx.replyWithHTML("⚠️ 暂无新的彩金订单，请投注后再试！");
//                     return
//                 }
//
//                 //彩金流水
//                 var culs = 0; // culs当天提现彩U的总流水
//                 var tzuls = 0;
//                 var pculs = 0;
//                 var pcgaouls = 0;
//                 var pcdwquls = 0;
//                 var tzjsuls = 0;
//                 //游戏类型彩金流水
//                 for (let i = 0; i < list.length; i++) {
//                     const botPayment = list[i]
//                     culs = culs + parseFloat(botPayment.paymentAmount);
//                     if (botPayment.gameType == GameTypeEnum.TOUZI) {
//                         tzuls = tzuls + parseFloat(botPayment.paymentAmount);
//                     }
//
//                     if (botPayment.gameType == GameTypeEnum.PC28DI) {
//                         pculs = pculs + parseFloat(botPayment.paymentAmount);
//                     }
//
//                     if (botPayment.gameType == GameTypeEnum.PC28GAO) {
//                         pcgaouls = pcgaouls + parseFloat(botPayment.paymentAmount);
//                     }
//
//                     if (botPayment.gameType == GameTypeEnum.PCDWQ) {
//                         pcdwquls = pcdwquls + parseFloat(botPayment.paymentAmount);
//                     }
//
//                     if (botPayment.gameType == GameTypeEnum.TOUZIJS) {
//                         tzjsuls = tzjsuls + parseFloat(botPayment.paymentAmount);
//                     }
//                 }
//                 //------------------------申请提现的规则----------------------------
//                 const cusdtBl: any = userById?.cusdtBl || 0; // 彩金倍率
//                 const sendCusdt: any = userById?.sendCusdt || 0; // 发放彩U
//                 /**
//                  * 彩U设置的倍率
//                  *      比如：发送（send_cusdt）100彩金、设置倍率(cusdt_bl)为3、用户需要达到300流水才能将剩下的彩金提现
//                  *          用户当天流水金额 > send_cusdt(发放的彩U) * cusdt_bl(彩U倍率)    的时候才能将剩下的彩金提现
//                  */
//                 let wd: boolean = false // 是否开启彩金转化的规则 --- true开启， false代表没有要转化的彩金
//                 //let botPayMent:any = {};
//                 let multiply = cusdtBl * sendCusdt // 彩金转化的规则计算。
//                 // 开始保存彩金提现订单
//                 var orderId: string = CustomSnowflake.snowflake()
//                 var applyTime = DateFormatUtils.CurrentDateFormatString()
//                 // 彩金转化 =  上注的总金额，也就是（用户当天流水金额）,大于 彩金转化，并且存在彩金就可以进行转化
//                 if ((culs - multiply) >= 0 && multiply > 0) {
//                     let cusdt = userById?.CUSDT || 0;
//                     // 如果没有需要转化的数据就返回
//                     if (cusdt == 0) {
//                         const html = "\uD83D\uDCB0未转化彩u" + cusdt + "\n\uD83D\uDCB0" +
//                             "转化彩u流水 " + culs + "/" + multiply + "\n\uD83D\uDCB0可转化彩u0";
//                         await ctx.answerCbQuery(html);
//                         return;
//                     }
//
//                     // 开始清空用户的彩金余额
//                     var updateResult = await UserModel.createQueryBuilder().update()
//                         .set({CUSDT: "0", sendCusdt: "0"})
//                         .where("id = :id", {id: userById?.id})
//                         .execute();
//                     // 如果受影响行就说明清空成功
//                     if (updateResult && updateResult.affected && updateResult?.affected > 0) {
//                         const inerResult = await BotPaymentModel.createQueryBuilder().insert().into(BotPaymentModel)
//                             .values({
//                                 tgId: userById?.tgId,
//                                 uid: userById?.id,
//                                 username: userById?.userName,
//                                 nickname: userById?.nickName,
//                                 balanceBefore: cusdt + '',
//                                 balanceAfter: "0", // 申请成功cudst变成0余额
//                                 paymentType: PaymentTypeEnum.CJTX.value,
//                                 paymentTypeName: PaymentTypeEnum.CJTX.name,
//                                 operateType: 0, // 彩金支出
//                                 status: 1, // 申请中
//                                 paymentTypeNumber: orderId,
//                                 paymentAmount: cusdt + '',
//                                 paymentRealAmount: cusdt + '',
//                                 walletType: WalletType.USDT,
//                                 applyTime: applyTime,
//                                 chatId: inlineMessageId,
//                                 description: "彩金转化金额：" + cusdt
//                             }).execute()
//                         wd = true
//                         // 查询返回ID
//                         // botPayMent.id = inerResult.identifiers[0].id
//                     }
//                 }
//
//
//                 var tt = "U";
//                 if (wd) {
//                     var html = "\uD83C\uDFE6转化订单ID: " + orderId + "\n" +
//                         "nickname: " + nickname + "\n" +
//                         "username: " + username + "\n" +
//                         "uid: " + tgId + "\n" +
//                         "\n" +
//                         "\uD83D\uDCB5彩" + tt + "原始额度: " + sendCusdt + " \n" +
//                         "\uD83D\uDCB5彩" + tt + "提现标准: " + multiply + " \n" +
//                         "\uD83D\uDCB5转化量: " + userById?.CUSDT + " \n" +
//                         "\uD83D\uDCB5pc28高倍流水: " + pcgaouls + "\n" +
//                         "\uD83D\uDCB5pc28普通流水: " + pculs + "\n" +
//                         "\uD83D\uDCB5骰子流水: " + tzuls + "\n" +
//                         "\uD83D\uDCB5极速骰子流水: " + tzjsuls + "\n" +
//                         "\uD83D\uDCB5pc定位球流水: " + pcdwquls + "\n" +
//                         "➖➖➖➖➖➖➖➖➖➖➖\n" +
//                         "等待客服审批";
//
//                     //  机器人发个消息
//                     await ctx.replyWithHTML(html, WalletUserCenterController.createUserCenterBackBtn())
//                     //发送客服消息
//                     //计算参数
//                     const lssz = BotPaymentModel.chax(tgId, PaymentType.SZ, WalletType.USDT);
//                     const lszj = BotPaymentModel.chax(tgId, PaymentType.ZJ, WalletType.USDT);
//                     const cjdk = BotPaymentModel.chax(tgId, PaymentType.CJ_DKJL, WalletType.USDT);
//                     let tixian = "⌛️ 需要客服处理\n" +
//                         "\n" +
//                         "用户：<a href=\"tg://user?id=" + tgId + "\">" + userById?.nickName + "</a>\n" +
//                         "用户名 : <code>" + userById?.userName + "</code>\n" +
//                         "订单号 :  " + orderId + "\n" +
//                         "彩金上注流水 :  " + lssz + "\n" +
//                         "彩金中奖流水 :  " + lszj + "\n" +
//                         "彩金历史转化总额 :  " + cjdk + "\n" +
//                         "转化标准 :  " + multiply + "\n" +
//                         "原始额度 :  " + sendCusdt + "\n" +
//                         "\uD83D\uDCB5pc28高倍流水: " + pcgaouls + "\n" +
//                         "\uD83D\uDCB5pc28普通流水: " + pculs + "\n" +
//                         "\uD83D\uDCB5骰子流水: " + tzuls + "\n" +
//                         "\uD83D\uDCB5极速骰子流水: " + tzjsuls + "\n" +
//                         "\uD83D\uDCB5pc定位球流水: " + pcdwquls + "\n" +
//                         "转化货币 : USDT \n" +
//                         "转化金额 : " + userById?.CUSDT + "\n" +
//                         "备注 : " + userById?.notes;
//                     // 客服提醒
//                     await cbot.telegram.sendMessage(tgId, tixian, walletUserCenterController.createUserCenterCJZHBackBtn(orderId))
//                 } else {
//                     //弹窗信息
//                     var html = "\uD83D\uDCB0未转化彩" + tt + " " + userById?.CUSDT + "\n\uD83D\uDCB0" +
//                         "转化彩" + tt + "流水 " + culs + "/" + multiply + "\n\uD83D\uDCB0可转化彩" + tt + "0";
//                     await ctx.answerCbQuery(html, {show_alert: true})
//                 }
//             }
//         }, async () => {
//             await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
//         })
//     }
//
//     /**
//      * 客服统一转化
//      * @param ctx
//      * @param callbackQueryData
//      */
//     public static startTongYiZhuanhua = async (ctx: Context, callbackQueryData: string, cbot: Telegraf<Context>) => {
//         //客服点击同意彩金转化
//         var orderNum = callbackQueryData.replaceAll("tycjzh", "");
//         // 客服信息
//         var tgId: number = ctx.callbackQuery?.from?.id || 0
//         var messageId: number = ctx.callbackQuery?.message?.message_id || 0
//         var username: string = ctx.callbackQuery?.from?.username || ''
//         var nickname: string = ctx.callbackQuery?.from?.first_name || ''
//         var inlineMessageId: string = ctx.callbackQuery?.inline_message_id || "0"
//         //查询当前彩金转化订单
//         const botPaymentOne = await BotPaymentModel.createQueryBuilder()
//             .where("payment_type_number = :orderNum and del = 0", {orderNum: orderNum}).getOne()
//         if (botPaymentOne) {
//             const aesTgId = botPaymentOne.tgId;
//             const paymentAmount = botPaymentOne.paymentAmount
//             //彩u转化
//             const hb = WalletType.USDT;
//             //彩金转化增加用户余额
//             const userById = await new UserModel().getUserModelById(aesTgId);
//             const add = parseFloat(userById?.USDT || "0") + parseFloat(paymentAmount)
//             // 修改用户余额
//             await UserModel.createQueryBuilder().update()
//                 .set({USDT: add + ''})
//                 .where("id = :id", {id: userById?.id})
//                 .execute()
//
//             // //添加彩金打款支付记录
//             var passTime = DateFormatUtils.CurrentDateFormatString()
//             const inerResult = await BotPaymentModel.createQueryBuilder().insert().into(BotPaymentModel)
//                 .values({
//                     tgId: userById?.tgId,
//                     uid: userById?.id,
//                     username: userById?.userName,
//                     nickname: userById?.nickName,
//                     balanceBefore: userById?.USDT + '',
//                     balanceAfter: "0", // 申请成功cudst变成0余额
//                     paymentType: PaymentTypeEnum.CJ_DKJL.value,
//                     paymentTypeName: PaymentTypeEnum.CJ_DKJL.name,
//                     operateType: 1, // 收入(增加)
//                     status: 2, // 财务已审核
//                     paymentTypeNumber: 'zh' + orderNum,
//                     paymentAmount: botPaymentOne.paymentAmount,
//                     paymentRealAmount: botPaymentOne.paymentAmount,
//                     walletType: WalletType.USDT,
//                     passTime: passTime,
//                     passUsername: username,
//                     passNickname: nickname,
//                     passTgid: tgId + '',
//                     chatId: inlineMessageId
//                 }).execute()
//
//             //修改申请彩金提现的状态为1
//             await BotPaymentModel.createQueryBuilder().update()
//                 .set({del: 1})
//                 .where("id = :id", {id: botPaymentOne.id})
//                 .execute()
//
//             //给用户发送消息
//             const html = "恭喜用户：" + userById?.nickName + "\n" +
//                 "彩金已成功转化\n" +
//                 "转化彩金货币类型" + WalletType.USDT + "\n" +
//                 "转化金额：" + paymentAmount + "\n" +
//                 "增加余额" + hb + ":" + add.toString();
//             await ctx.replyWithHTML(html)
//             //给客服发送消息
//             await cbot.telegram.deleteMessage(tgId, messageId)
//             await ctx.telegram.sendMessage(tgId, "✅操作成功")
//         }
//     }
// }
//
// export default WalletCaiJinZhuanhuaMethod
