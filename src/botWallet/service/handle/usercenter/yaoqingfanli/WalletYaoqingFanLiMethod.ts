import type {Context} from "telegraf";
import redis from "../../../../../config/redis";
import {addLockByTgId} from "../../../../../config/redislock";
import BotKyHuodongModel from "../../../../../models/BotKyHuodongModel";
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import WalletUserCenterMethod from "../WalletUserCenterMethod";
import WalletUserCenterController from "../../../../controller/WalletUserCenterController";
import {queryRunner} from "../../../../../config/database";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import PaymentTypeEnum from "../../../../../type/PaymentTypeEnum";
import WalletType from "../../../../../type/WalletType";
import CustomSnowflake from "../../../../../commons/CustomSnowflake";
import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";
import BotInviteUserModel from "../../../../../models/BotInviteUserModel";
import PaymentType from "../../../../../type/PaymentType";
import paymentType from "../../../../../type/PaymentType";
import walletType from "../../../../../type/WalletType";
import moment from "moment/moment";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletYaoqingFanLiMethod {
    /**
     * 领取邀请返利
     * 代号：yqfl_btn
     * @param ctx
     */
    public static startYqfl = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        await addLockByTgId(['yahyfanli_lock_' + tgId], async () => {
            // 设置操作
            await redis.set("currentop" + tgId, "yaoqingfanli", 'EX', 60 * 60 * 24)

            // 1: 查询邀请的好友列表
            var encodeUserId = AESUtils.encodeUserId(tgId + '');
            const invitersList = await BotInviteUserModel.createQueryBuilder().where("inviter_tg_id = :tgId", {
                "tgId": encodeUserId
            }).getMany()

            // 如果邀请好友不存在就返回
            if (invitersList && invitersList.length == 0) {
                await ctx.answerCbQuery("⚠️ 当前暂无好友返利信息", {show_alert: true})
                return
            }

            // 查询上一次的返利的最大时间
            // 3: 查询上次彩金提现的最大时间 del = 1
            let {ks}: any = await BotPaymentModel.createQueryBuilder().select("max(create_time)", "ks")
                .where("payment_type = " + paymentType.HYFL + " and status = 1  and wallet_type = " + walletType.USDT + " and user_id = :tgId",
                    {
                        tgId: encodeUserId
                    }).getRawOne()

            //4: 获大于上次时间的新的需要转化的上注彩金流水 del == 0 也就是新的彩金订单
            let sql = "payment_type = " + paymentType.SZ + " and del = 0 and status = 1 and fanli = 0  and  user_id IN (SELECT quilt_tg_id FROM bot_invite_user WHERE inviter_tg_id = '"+encodeUserId+"')"
            if (ks) sql += " and create_time >='" + moment(ks).format('yyyy-MM-DD HH:mm:ss') + "'"
            // 2: 查询所有好友下注的订单（有效del=0 and status = 1 and payment_type = 2  and fanli = 0）统计出来。状态是：0尚未结算
           const {cjje }  =  await BotPaymentModel.createQueryBuilder().select("SUM(payment_amount)",'cjje')
                .where(sql).getRawOne()
            if (cjje > 0) {
                //获取用户信息
                var userById = await new UserModel().getUserModelByIdNumber(tgId);
                //有返利需要用户确认
                const html = "🛄 尊敬用户：" + userById?.nickName + "您好\n\n" +
                    "友情提示：一旦领取邀请好友返利，将清空当前彩金流水，如当前彩金流水达到转化标准，请优先转化再领取\n" +
                    "例：当前彩U余额有10，当前领取好友返利10，将按10+10的标准重新定义\n\n" +
                    "您返利总彩U金额：" + cjje + "，返佣比例是："+(parseFloat(userById?.yqNum || "1") * 100)+"%\n" +
                    "您返利彩U金额是：" + (cjje * parseFloat(userById?.yqNum || "1")) + "\n" +
                    "您当前彩U余额是：" + userById?.CUSDT + "\n" +
                    "确认执行，点击下方【确认领取】按钮"
                // 删除上一次消息
                await WalletUserCenterMethod.removeMessage(ctx)
                // 发送消息
                await ctx.replyWithHTML(html, WalletUserCenterController.createYaoqingLingQuBtn())
            }else{
                // 发送消息
                await ctx.answerCbQuery("⚠️ 当前暂无好友返利信息", {show_alert: true})
            }
        }, async () => {
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 开始领取邀请返利
     * @param ctx
     */
    public static startLingquFanli = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        let inlineMessageId = ctx.callbackQuery?.inline_message_id || ""
        //查询是否有好友返利
        await addLockByTgId(['liqufanli_lock_' + tgId], async () => {
            // 设置操作
            await redis.set("currentop" + tgId, "yaoqingfanli", 'EX', 60 * 60 * 24)

            // 1: 查询邀请的好友列表
            var encodeUserId = AESUtils.encodeUserId(tgId + '');
            const invitersList = await BotInviteUserModel.createQueryBuilder().where("inviter_tg_id = :tgId", {
                "tgId": encodeUserId
            }).getMany()

            // 如果邀请好友不存在就返回
            if (invitersList && invitersList.length == 0) {
                await ctx.answerCbQuery("⚠️ 当前暂无好友返利信息", {show_alert: true})
                return
            }

            // 查询上一次的返利的最大时间
            // 3: 查询上次彩金提现的最大时间 del = 1
            let {ks}: any = await BotPaymentModel.createQueryBuilder().select("max(create_time)", "ks")
                .where("payment_type = " + paymentType.HYFL + " and status = 1  and wallet_type = " + walletType.USDT + " and user_id = :tgId",
                    {
                        tgId: encodeUserId
                    }).getRawOne()


            //4: 获大于上次时间的新的需要转化的上注彩金流水 del == 0 也就是新的彩金订单
            let sql = "payment_type = " + paymentType.SZ + " and del = 0 and status = 1 and fanli = 0  and  user_id IN (SELECT quilt_tg_id FROM bot_invite_user WHERE inviter_tg_id = '"+encodeUserId+"')"
            if (ks) sql += " and create_time >='" + moment(ks).format('yyyy-MM-DD HH:mm:ss') + "'"
            // 2: 查询所有好友下注的订单（有效del=0 and status = 1 and payment_type = 2  and fanli = 0）统计出来。状态是：0尚未结算
            const  botPayments =  await BotPaymentModel.createQueryBuilder().select("id,payment_amount")
                .where(sql).getRawMany()
            if (botPayments && botPayments.length > 0) {
                var cjje:number = 0;
                var arrids = []
                for (let i = 0; i < botPayments.length; i++) {
                    cjje += parseFloat(botPayments[i]?.payment_amount || "0")
                    arrids.push(botPayments[i]?.id)
                }

                try {
                    await queryRunner.startTransaction()
                    // 2：给用户添加彩U
                    var botUser = await new UserModel().getUserModelByIdNumber(tgId);
                    const userCUsdt = botUser?.CUSDT
                    const dcusdt = (cjje * parseFloat(botUser?.yqNum || "1"))
                    const addUserCUsdt = (dcusdt + parseFloat(userCUsdt || "0")).toFixed(3)
                    await queryRunner.manager.update(UserModel, {
                        id: botUser?.id
                    }, {
                        cusdtBl: "3",
                        sendCusdt: addUserCUsdt.toString(),
                        CUSDT: addUserCUsdt.toString()
                    })
                    // 3：添加支付记录
                    var orderId: string = CustomSnowflake.snowflake()
                    var applyTime = DateFormatUtils.CurrentDateFormatString()
                    await queryRunner.manager.save(BotPaymentModel, {
                        tgId: botUser?.tgId,
                        uid: botUser?.id,
                        username: botUser?.userName,
                        nickname: botUser?.nickName,
                        balanceBefore: userCUsdt + '',
                        balanceAfter: addUserCUsdt.toString(),
                        paymentType: PaymentTypeEnum.HYFL.value,
                        paymentTypeName: PaymentTypeEnum.HYFL.name,
                        operateType: 1, // 收入
                        status: 1,
                        paymentTypeNumber: 'fanli' + orderId,
                        paymentAmount: dcusdt+'',
                        paymentRealAmount: dcusdt+'',
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        passTime: applyTime,
                        passNickname: botUser?.nickName,
                        passUsername: botUser?.userName,
                        passTgid: botUser?.tgId,
                        fanli:1,
                        chatId: inlineMessageId,
                        description: "申请好友返利，金额是：" + dcusdt
                    })

                    await queryRunner.commitTransaction()
                    // 修改状态
                    await BotPaymentModel.createQueryBuilder().update(BotPaymentModel).set({
                        fanli: 1
                    }).where("id in(:...ids)",{ids:arrids}).execute()
                    // 删除上一次消息
                    await WalletUserCenterMethod.removeMessage(ctx)
                    // 发送消息
                    await ctx.replyWithHTML("✅ 领取成功\n" +
                        "\n领取之前彩U余额："+userCUsdt +
                        "\n领取之后彩U余额："+addUserCUsdt
                        , WalletUserCenterController.createUserCenterBackBtn())

                } catch (e) {
                    await queryRunner.rollbackTransaction()
                }
            }else{
                await ctx.answerCbQuery("⚠️ 当前暂无好友返利信息", {show_alert: true})
            }
        }, async () => {
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }
}


export default WalletYaoqingFanLiMethod
