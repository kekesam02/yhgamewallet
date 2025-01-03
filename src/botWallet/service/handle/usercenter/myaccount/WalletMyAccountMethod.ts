import type {Context} from "telegraf";
import WalletUserCenterController from "../../../../controller/WalletUserCenterController";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import moment from "moment/moment";
import WalletType from "../../../../../type/WalletType";
import PaymentType from "../../../../../type/PaymentType";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletMyAccountMethod {
    /**
     * 我的账单
     * 代号：baccount_btn
     * @param ctx
     */
    public static startBAccount = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 查询用户信息
        let username = ctx.callbackQuery?.from?.username || 0
        let nickname = ctx.callbackQuery?.from?.first_name || 0
        var pageNo: number = 1
        var pageSize: number = 5
        var searchType: number = 0
        var html = "🏘️ 欢迎使用一号公馆钱包\n" +
            "👜 当前操作是：我的账单\n" +
            "🚩 操作用户是：<a href='tg://user?id=" + tgId + "'>" + nickname + "</a>，ID是：<a href='tg://user?id=" + tgId + "'>" + tgId + "</a>\n"
        // 开始根据用户查询账单
        const botPaymentModelPage = await BotPaymentModel.findPaymentByTgIdPage(tgId,searchType,pageNo, pageSize)
        var botPaymentModels = botPaymentModelPage.records;
        html += "🚩 总成交"+botPaymentModelPage.total+"笔\n"
        for (let i = 0; i < botPaymentModels.length; i++) {
            html +="\n("+(botPaymentModels[i].operateType==1?"➕收入":"➖支出")+")➖➖➖➖第"+((pageNo-1)*pageSize+i + 1)+"笔➖➖➖➖"
            html +="\n货币类型：" + (botPaymentModels[i].walletType == WalletType.USDT?'USDT':'TRX')
            html +="\n操作类型：" + botPaymentModels[i].paymentTypeName
            html +="\n操作金额：" + botPaymentModels[i].paymentAmount
            html +="\n"+(botPaymentModels[i].operateType==1?"收入":"支出")+"之前余额：" + botPaymentModels[i].balanceBefore
            html +="\n"+(botPaymentModels[i].operateType==1?"收入":"支出")+"之后余额：" + botPaymentModels[i].balanceAfter
            html +="\n操作时间：" + moment(botPaymentModels[i].createTime).format('yyyy-MM-DD HH:mm')
            if(botPaymentModels[i].applyTime)html +="\n申请时间：" + moment(botPaymentModels[i].applyTime).format('yyyy-MM-DD HH:mm')
            if(botPaymentModels[i].passTime)html +="\n通过日期：" + moment(botPaymentModels[i].passTime).format('yyyy-MM-DD HH:mm')
            if(botPaymentModels[i].description)html +="\n备注：" + botPaymentModels[i].description
            // 提现
            if(botPaymentModels[i].paymentType == PaymentType.TX_DKJL){
                if(botPaymentModels[i].status==0)html +="\n状态：等待审核"
                if(botPaymentModels[i].status==1)html +="\n状态：已完成"
                if(botPaymentModels[i].status==2)html +="\n状态：被拒绝"
            }
            // 转账
            if(botPaymentModels[i].paymentType == PaymentType.YHZZ){
                if(botPaymentModels[i].status==0)html +="\n状态：等待收款"
                if(botPaymentModels[i].status==1)html +="\n状态：已完成"
            }
            // 收款
            if(botPaymentModels[i].paymentType == PaymentType.YHZZ){
                if(botPaymentModels[i].status==0)html +="\n状态：等待转账"
                if(botPaymentModels[i].status==1)html +="\n状态：已完成"
            }
        }
        await ctx.replyWithHTML(html, WalletUserCenterController.createUserAccountListBtn(pageNo, searchType))
    }
}


export default WalletMyAccountMethod

