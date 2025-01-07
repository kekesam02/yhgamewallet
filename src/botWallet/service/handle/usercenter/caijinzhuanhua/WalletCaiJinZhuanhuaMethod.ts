import type {Context} from "telegraf";
import redis from "../../../../../config/redis";
import {addLockByTgId} from "../../../../../config/redislock";
import WalletType from "../../../../../type/WalletType";
import BotRoundModel from "../../../../../models/BotRoundModel";
import GameTypeEnum from "../../../../../type/gameEnums/GameTypeEnum";
import BotPledgeUpModel from "../../../../../models/BotPledgeUpModel";
import AESUtils from "../../../../../commons/AESUtils";
import botRoundModel from "../../../../../models/BotRoundModel";
import GameUserRedis from "../../../../../commons/redis/GameUserRedis";
import userModel from "../../../../../models/UserModel";
import UserModel from "../../../../../models/UserModel";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import paymentType from "../../../../../type/PaymentType";
import walletType from "../../../../../type/WalletType";
import CustomSnowflake from "../../../../../commons/CustomSnowflake";
import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletCaiJinZhuanhuaMethod {

    /**
     * 彩金转化
     * 代号：ctrxzh_btn
     * @param ctx
     */
    public static startCtrxzh = async (ctx: Context, callbackData: string) => {
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var username: string = ctx.callbackQuery?.from?.username || ''
        var nickname: string = ctx.callbackQuery?.from?.first_name || ''
        var callbackQueryId: string = ctx.callbackQuery?.id || ''
        await addLockByTgId(['caijinzhuanghua_lock_' + tgId], async () => {
            // 设置操作
            await redis.set("currentop" + tgId, "caijinzhuanghua", 'EX', 60 * 60)

         //    // 1： 这里要加互斥锁 --如果用户正在上注就就不能彩金转化
         //    var userIsPlaying = GameUserRedis.getUserIsPlaying(tgId + '');
         //    if (userIsPlaying) {
         //        await ctx.replyWithHTML("⚠️ 您已有正在投注的彩金，无法转化，请无投注后重试！");
         //        return
         //    }
         //
         //    // 2: 当前转化用户
         //    const aesUserId = AESUtils.encodeUserId(tgId + '')
         //    var userById = await new UserModel().getUserModelById(aesUserId)
         //
         //    // 3: 获取上次申请彩金转化的最大时间 del = 1
         //    let {ks}: string = await BotPaymentModel.createQueryBuilder().select("max(create_time)", "ks")
         //        .where("payment_type = " + paymentType.CJTX + " and del = 1 and wallet_type = " + walletType.USDT + " and user_id = :tgId",
         //            {}).getOne()
         //    // 4: 领取好友返利的最大时间查询和处理
         //    // let {ks1}:string = await BotPaymentModel.createQueryBuilder().select("max(create_time)", "ks")
         //    //     .where("payment_type = " + paymentType.HYFL + " and del = 0 and wallet_type = " + walletType.USDT + " and user_id = :tgId",
         //    //         {}).getOne()
         //    // if(ks1 && ks1.isAfter(ks)){
         //    //     ks = ks1
         //    // }
         //
         //    //5: 获大于上次时间的新的需要转化的上注彩金流水 del == 0 也就是新的彩金订单
         //    let sql = "payment_type = " + paymentType.SZ + " and del = 0 and wallet_type = "
         //        + walletType.USDT + " and user_id = :tgId"
         //    if (ks) sql += " and create_time >=" + ks
         //    var list = await BotPaymentModel.createQueryBuilder()
         //        .where(sql, {tgId: aesUserId})
         //        .getMany();
         //    // 如果没有彩金订单就返回了。
         //    if(list && list.length <= 0 ){
         //        await ctx.replyWithHTML("⚠️ 暂无新的彩金订单，请投注后再试！");
         //        return
         //    }
         //
         //    //彩金流水--culs当天提现彩U的总流水
         //    var culs = 0;
         //    var tzuls = 0;
         //    var pculs = 0;
         //    var pcgaouls = 0;
         //    var pcdwquls = 0;
         //    var tzjsuls = 0;
         //
         //    //游戏类型彩金流水
         //    for (let i = 0; i < list.length; i++) {
         //        const botPayment = list[i]
         //        culs = culs + parseFloat(botPayment.paymentAmount);
         //        if (botPayment.gameType == GameTypeEnum.TOUZI) {
         //            tzuls = tzuls + parseFloat(botPayment.paymentAmount);
         //        }
         //
         //        if (botPayment.gameType == GameTypeEnum.PC28DI) {
         //            pculs = pculs + parseFloat(botPayment.paymentAmount);
         //        }
         //
         //        if (botPayment.gameType == GameTypeEnum.PC28GAO) {
         //            pcgaouls = pcgaouls + parseFloat(botPayment.paymentAmount);
         //        }
         //
         //        if (botPayment.gameType == GameTypeEnum.PCDWQ) {
         //            pcdwquls = pcdwquls + parseFloat(botPayment.paymentAmount);
         //        }
         //
         //        if (botPayment.gameType == GameTypeEnum.TOUZIJS) {
         //            tzjsuls = tzjsuls + parseFloat(botPayment.paymentAmount);
         //        }
         //    }
         //
         //    /**
         //     * 彩U设置的倍率
         //     *      比如：发送（send_cusdt）100彩金、设置倍率(cusdt_bl)为3、用户需要达到300流水才能将剩下的彩金提现
         // *          用户当天流水金额 > send_cusdt(发放的彩U) * cusdt_bl(彩U倍率)    的时候才能将剩下的彩金提现
         //     */
         //    const cusdtBl = userById?.cusdtBl; // 彩金倍率
         //    const sendCusdt = userById?.sendCusdt; // 发放彩U
         //
         //    // 开始保存转化订单
         //    var orderId: string = CustomSnowflake.snowflake()
         //    var applyTime = DateFormatUtils.CurrentDateFormatString()

//             let wd:boolean = false;
//             let multiply = cusdtBl * sendCusdt;
//             if ((culs - multiply) >= 0 && multiply > 0) {
//                 let cusdt = userById?.CUSDT;
//                 if (cusdt == 0) {
//                     const html = "\uD83D\uDCB0未转化彩u" + cusdt + "\n\uD83D\uDCB0" +
//                         "转化彩u流水 " + culs + "/" + multiply + "\n\uD83D\uDCB0可转化彩u0";
//                     await ctx.answerCbQuery(html);
//                     return;
//                 }
//
//                 boolean update = botUserService.lambdaUpdate().eq(BotUser::getId, userById.getId())
//                     .set(BotUser::getCusdt, 0)
//                     .set(BotUser::getSendCusdt, 0).update();
//                 if (update) {
// //                    添加支付记录
//                     botPaymentService.savePayment(tgId, new BigDecimal(cusdt),
//                         BetPaymentTypeEnum.CJTX, CommonEnums.ONE, l + ""
//                         , ctype, null);
//                     wd = true;
//                 }
//             }
//
//
//             String tt = "";
//             if (ctype.equals(BetCurrencyTypeEnum.CUSDT)) {
//                 tt = "u";
//             } else {
//                 tt = "t";
//             }
//             String html = "";
//             if (wd) {
//                 html += "\uD83C\uDFE6转化订单ID: " + l + "\n" +
//                     "nickname: " + firstName + "\n" +
//                     "username: " + userName + "\n" +
//                     "uid: " + tgId + "\n" +
//                     "\n" +
//                     "\uD83D\uDCB5彩" + tt + "原始额度: " + sendCusdt + " \n" +
//                     "\uD83D\uDCB5彩" + tt + "提现标准: " + multiply + " \n" +
//                     "\uD83D\uDCB5转化量: " + userById.getCusdt() + " \n" +
//                     "\uD83D\uDCB5pc28高倍流水: " + pcgaouls + "\n" +
//                     "\uD83D\uDCB5pc28普通流水: " + pculs + "\n" +
//                     "\uD83D\uDCB5骰子流水: " + tzuls + "\n" +
//                     "\uD83D\uDCB5极速骰子流水: " + tzjsuls + "\n" +
//                     "\uD83D\uDCB5pc定位球流水: " + pcdwquls + "\n" +
//                     "➖➖➖➖➖➖➖➖➖➖➖\n" +
//                     "等待客服审批";
//                 InlineKeyboardButton jstz234 = InlineKeyboardButton.builder()
//                     .text("↩️返回").callbackData("grzx")
//                     .build();
//
//                 ArrayList<InlineKeyboardButton> objects8 = new ArrayList<>();
//                 objects8.add(jstz234);
//                 InlineKeyboardMarkup keyboardM1 = InlineKeyboardMarkup.builder()
//                     .keyboardRow(objects8)
//                     .build();
//                 botEncapsulation.sendMenu(tgId, html, keyboardM1, bot);
//
//                 //发送客服消息
//                 //财务审批
//                 List<BotUser> list4 = botUserService.lambdaQuery().eq(BotUser::getVip, 101).eq(BotUser::getDel, CommonEnums.ZERO).list();
//                 //封装参数
//                 //计算参数
//                 BigDecimal lssz = chax(tgId, BetPaymentTypeEnum.SZ, ctype);
//                 BigDecimal lszj = chax(tgId, BetPaymentTypeEnum.ZJ, ctype);
//                 BigDecimal cjdk = chax(tgId, BetPaymentTypeEnum.CJDK, ctype);
//
//                 String tixian = "⌛️ 需要客服处理\n" +
//                     "\n" +
//                     "用户：<a href=\"tg://user?id=" + tgId + "\">" + userById.getNickName() + "</a>\n" +
//                     "用户名 : <code>" + userById.getUserName() + "</code>\n" +
//                     "订单号 :  " + l + "\n" +
//                     "彩金上注流水 :  " + lssz + "\n" +
//                     "彩金中奖流水 :  " + lszj + "\n" +
//                     "彩金历史转化总额 :  " + cjdk + "\n" +
//                     "转化标准 :  " + multiply + "\n" +
//                     "原始额度 :  " + sendCusdt + "\n" +
//                     "\uD83D\uDCB5pc28高倍流水: " + pcgaouls + "\n" +
//                     "\uD83D\uDCB5pc28普通流水: " + pculs + "\n" +
//                     "\uD83D\uDCB5骰子流水: " + tzuls + "\n" +
//                     "\uD83D\uDCB5极速骰子流水: " + tzjsuls + "\n" +
//                     "\uD83D\uDCB5pc定位球流水: " + pcdwquls + "\n" +
//                     "转化货币 : " + ctype.getDesc() + "\n" +
//                     "转化金额 : " + userById.getCusdt() + "\n" +
//                     "备注 : " + userById.getNotes();
//                 InlineKeyboardButton dk = InlineKeyboardButton.builder()
//                     .text("同意转化").callbackData("tycjzh" + l)
//                     .build();
//
//                 ArrayList<InlineKeyboardButton> cjzh2 = new ArrayList<>();
//                 cjzh2.add(dk);
//                 InlineKeyboardMarkup cjzh = InlineKeyboardMarkup.builder()
//                     .keyboardRow(cjzh2)
//                     .build();
//                 //内链 已打款/异常退回/
//                 for (BotUser botUser : list4) {
//                     //给客服提醒
//                     botEncapsulation.sendMenu(AESUtil.jieAESUserId(botUser.getTgId()), tixian, cjzh, botWallet);
//                 }
//             } else {
//                 if (ctype.equals(BetCurrencyTypeEnum.CUSDT)) {
//                     //弹窗信息
//                     html += "\uD83D\uDCB0未转化彩" + tt + " " + new BigDecimal(userById.getCusdt()) + "\n\uD83D\uDCB0" +
//                         "转化彩" + tt + "流水 " + culs + "/" + multiply + "\n\uD83D\uDCB0可转化彩" + tt + "0";
//                 } else {
//                     //弹窗信息
//                     html += "\uD83D\uDCB0未转化彩" + tt + " " + new BigDecimal(userById.getCtrx()) + "\n\uD83D\uDCB0" +
//                         "转化彩" + tt + "流水 " + culs + "/" + multiply + "\n\uD83D\uDCB0可转化彩" + tt + "0";
//                 }
//                 botEncapsulation.sendPop(html, callbackQueryId, bot);
//             }

        }, async () => {
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 客服统一转化
     * @param ctx
     * @param callbackQueryData
     */
    public static startTongYiZhuanhua = async (ctx:Context,callbackQueryData:string)=>{
        // //客服点击同意彩金转化
        // var  ddh = callbackQueryData.replaceAll("tycjzh", "");
        // var tgId: number = ctx.callbackQuery?.from?.id || 0
        // var username: string = ctx.callbackQuery?.from?.username || ''
        // var nickname: string = ctx.callbackQuery?.from?.first_name || ''
        // //查询当前彩金转化订单
        // BotPayment one = botPaymentService.lambdaQuery().eq(BotPayment::getPaymentTypeNumber, ddh)
        //     .eq(BotPayment::getDel,CommonEnums.ZERO)
        //     .one();
        // String userId = one.getUserId();
        // String paymentAmount = one.getPaymentAmount();
        // BetCurrencyTypeEnum walletType = one.getWalletType();
        // //彩u转化
        // String hb=BetCurrencyTypeEnum.USDT.getDesc();
        // //修改添加订单彩金转化
        // //添加支付记录
        // botPaymentService.savePayment(AESUtil.jieAESUserId(userId),new BigDecimal(paymentAmount),
        //     BetPaymentTypeEnum.CJDK,CommonEnums.ONE,"zh"+ddh
        //     ,walletType,null);
        // //修改记录为1
        // one.setDel(CommonEnums.ONE);
        // botPaymentService.updateById(one);
        // //给用户发送消息
        // BotUser userById = botUserService.getUserById(AESUtil.jieAESUserId(userId));
        // BigDecimal add = new BigDecimal(userById.getUsdt()).add(new BigDecimal(paymentAmount));
        // botUserService.modifyBalance(add,AESUtil.jieAESUserId(userById.getTgId()),BetCurrencyTypeEnum.USDT);
        // String html="恭喜用户："+userById.getNickName()+"\n" +
        //     "彩金已成功转化\n" +
        //     "转化彩金货币类型"+walletType.getDesc()+"\n" +
        //     "转化金额："+paymentAmount+"\n" +
        //     "余额"+hb+":"+add.toString();
        // botEncapsulation.sendMenu(AESUtil.jieAESUserId(userId),html,bot);
        // //给客服发送消息
        // botEncapsulation.deleteMessage(tgId,messageId,bot);
        // botEncapsulation.sendMenu(tgId,"✅操作成功",bot);
        // //botServiceWallet.sendzhuanhua(tgId, ddh, messageId, callbackQueryId, this);
    }

}

export default WalletCaiJinZhuanhuaMethod
