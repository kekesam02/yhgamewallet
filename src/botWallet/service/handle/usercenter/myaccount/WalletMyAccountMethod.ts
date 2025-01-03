import type {Context} from "telegraf";
import ButtonUtils from '../../../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import WalletController from "../../../../controller/WalletController";
import BotWithdrawalAddrModel from "../../../../../models/BotWithdrawalAddrModel";
import redis from "../../../../../config/redis";
import WalletHandleMethod from "../../WalletHandleMethod";
import walletUserCenterController from "../../../../controller/WalletUserCenterController";
import WalletUserCenterController from "../../../../controller/WalletUserCenterController";
import {ALL} from "node:dns";
import botPaymentModel from "../../../../../models/BotPaymentModel";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";
import moment from "moment/moment";
import WalletType from "../../../../../type/WalletType";

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
            html +="\n➖➖➖➖➖➖"+((pageNo-1)*pageSize+i + 1)+"➖➖➖➖➖➖➖"
            html +="\n类型：" + botPaymentModels[i].paymentTypeName
            html +="\n金额：" + (botPaymentModels[i].operateType==1?"➕收入":"➖支出")+' '+botPaymentModels[i].paymentAmount+' '+(botPaymentModels[i].walletType == WalletType.USDT?'USDT':'TRX')
            html +="\n"+(botPaymentModels[i].operateType==1?"收入":"支出")+"之前余额：" + botPaymentModels[i].balanceBefore
            html +="\n"+(botPaymentModels[i].operateType==1?"收入":"支出")+"之后余额：" + botPaymentModels[i].balanceAfter
            html +="\n操作时间：" + moment(botPaymentModels[i].createTime).format('yyyy-MM-DD HH:mm')
            html +="\n申请时间：" + moment(botPaymentModels[i].applyTime).format('yyyy-MM-DD HH:mm')
            html +="\n通过日期：" + moment(botPaymentModels[i].passTime).format('yyyy-MM-DD HH:mm')
        }
        await ctx.replyWithHTML(html, WalletUserCenterController.createUserAccountListBtn(pageNo, searchType))
    }
}


export default WalletMyAccountMethod

