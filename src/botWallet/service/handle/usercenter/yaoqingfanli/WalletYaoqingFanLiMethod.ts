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
        await addLockByTgId(['yahyfanli_lock_'+tgId],async ()=>{
            // 设置操作
            await redis.set("currentop" + tgId, "yaoqingfanli", 'EX', 60 * 60)
            // fafcs : 是否领取 0未领取 1领取
            // hdtype : 活动类型 1为开业充值，2为每日首充返利 3.邀请返利
            // tg_id : 领取用户
            // cjdw : usdt 1 /trx2
            //查询是否有好友返利
           const botKyHongDong =  await BotKyHuodongModel.createQueryBuilder()
                .where("fafcs = 0 and hdtype = 3 and cjdw = 1 and tg_id = :tgId",{tgId:AESUtils.encodeUserId(tgId+'')})
                .getOne()
            if(!botKyHongDong){
                // usdt没有返利
                // 发送消息
                await ctx.answerCbQuery("⚠️ 当前暂无好友返利信息",{show_alert: true})
            }else{
                //获取用户信息
                var userById = await new UserModel().getUserModelByIdNumber(tgId);
                //有返利需要用户确认
                const html="🛄 尊敬用户："+userById?.nickName+"您好\n" +
                    "\uD83D\uDD3A 一旦领取邀请好友返利，将清空当前彩金流水，如当前彩金流水达到转化标准，请优先转化再领取\n" +
                    "\uD83D\uDD3A 例：当前彩U余额有10，当前领取好友返利10，将按10+10的标准重新定义\n" +
                    "\uD83D\uDD3A 您当前返利彩U是："+botKyHongDong.cjje+"\n" +
                    "\uD83D\uDD3A 你当前彩U余额是："+userById?.CUSDT+"\n"+
                    "\uD83D\uDD3A 确认执行，点击下方【确认领取】按钮"
                // 删除上一次消息
                await WalletUserCenterMethod.removeMessage(ctx)
                // 发送消息
                await ctx.replyWithHTML(html,WalletUserCenterController.createYaoqingLingQuBtn())
            }
        },async ()=>{
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 开始领取邀请返利
     * @param ctx
     */
    public static startLingquFanli = async (ctx:Context)=>{
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        let inlineMessageId = ctx.callbackQuery?.inline_message_id || ""
        //查询是否有好友返利
        await addLockByTgId(['liqufanli_lock_'+tgId],async ()=>{
            // 设置操作
            await redis.set("currentop" + tgId, "yaoqingfanli", 'EX', 60 * 60)
            // fafcs : 是否领取 0未领取 1领取
            // hdtype : 活动类型 1为开业充值，2为每日首充返利 3.邀请返利
            // tg_id : 领取用户
            // cjdw : usdt 1 /trx2
            //查询是否有好友返利
            const botKyHongDong =  await BotKyHuodongModel.createQueryBuilder()
                .where("fafcs = 0 and hdtype = 3 and cjdw = 1 and tg_id = :tgId",{tgId:AESUtils.encodeUserId(tgId+'')})
                .getOne()
            if(!botKyHongDong){
                // usdt没有返利
                // 发送消息
                await ctx.answerCbQuery("⚠️ 领取失败，请联系管理员",{show_alert: true})
            }else{
                try {
                    await queryRunner.startTransaction()
                    // 1：修改为领取状态
                    await queryRunner.manager.update(BotKyHuodongModel,{
                        id: botKyHongDong.id
                    },{
                        fafcs: 1
                    })
                    // 2：给用户添加彩U
                    var botUser = await new UserModel().getUserModelByIdNumber(tgId);
                    const userCUsdt = botUser?.CUSDT
                    const addUserCUsdt = parseFloat(botKyHongDong.cjje) + parseFloat(userCUsdt || "0")
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
                        status:1,
                        paymentTypeNumber: 'fanli' + orderId,
                        paymentAmount: botKyHongDong.cjje ,
                        paymentRealAmount: botKyHongDong.cjje,
                        walletType: WalletType.USDT,
                        applyTime: applyTime,
                        chatId: inlineMessageId
                    })
                    // 删除上一次消息
                    await WalletUserCenterMethod.removeMessage(ctx)
                    // 发送消息
                    await ctx.replyWithHTML("✅ 领取成功",WalletUserCenterController.createUserCenterBackBtn())
                    await queryRunner.commitTransaction()
                } catch (e){
                    await queryRunner.rollbackTransaction()
                }
            }
        },async ()=>{
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }
}


export default WalletYaoqingFanLiMethod
