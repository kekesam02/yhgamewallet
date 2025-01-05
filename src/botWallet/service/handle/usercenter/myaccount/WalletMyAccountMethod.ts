import type {Context} from "telegraf";
import WalletUserCenterController from "../../../../controller/WalletUserCenterController";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import moment from "moment/moment";
import WalletType from "../../../../../type/WalletType";
import PaymentType from "../../../../../type/PaymentType";
import redis from "../../../../../config/redis";
import {addLockByTgId} from "../../../../../config/redislock";

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
    public static startBAccount = async (ctx: Context,callbackData:string) => {
        this.loadData(ctx,callbackData,true)
    }

    /**
     * 搜索过滤
     * @param ctx
     * @param callbackData
     */
    public static searchFilterAccount = async (ctx:Context,callbackData:string)=>{
        this.loadData(ctx,callbackData,false)
    }

    /**
     * 处理账单的方法
     * @param ctx
     * @param callbackData
     * @param mark
     */
    private static loadData = async (ctx:Context,callbackData:string,mark:boolean)=>{
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        await addLockByTgId(['account_lock_'+tgId],async()=>{
            try {
                // 查询用户信息
                let nickname = ctx.callbackQuery?.from?.first_name || 0
                var accountCallbackData = callbackData?.replaceAll('myaccount_','') ||''
                var splitData = accountCallbackData?.split("_") || ['all',1,0,0]
                const pageNo = Number(splitData[1])
                const opPtype = splitData[2]
                const opPages = Number(splitData[3])
                var pageSize: number = 3
                var walletType: number = Number(opPtype)
                var searchWalletType = 0
                if(walletType == 1)searchWalletType = WalletType.USDT
                if(walletType == 2)searchWalletType = WalletType.TRX
                var html = "🏘️ 欢迎使用一号公馆钱包\n" +
                    "👜 操作用户是：<a href='tg://user?id=" + tgId + "'>" + nickname + "</a>，ID是：<a href='tg://user?id=" + tgId + "'>" + tgId + "</a>\n" +
                    "🚩 当前操作是：我的账单\n"
                // 开始根据用户查询账单
                const botPaymentModelPage = await BotPaymentModel.findPaymentByTgIdPage(tgId,searchWalletType,PaymentType.EMPTY, pageNo, pageSize)
                var botPaymentModels = botPaymentModelPage.records;
                var searchStr = ""
                var pages = botPaymentModelPage.pages
                if(searchWalletType == 1)searchStr = "搜索：USDT"
                if(searchWalletType == 2)searchStr = "搜索：TRX"
                html += "🚩 总成交"+botPaymentModelPage.total+"笔\n"
                html+=searchStr
                if(botPaymentModelPage.total > 0) {
                    for (let i = 0; i < botPaymentModels.length; i++) {
                        html += "\n(" + (botPaymentModels[i].operateType == 1 ? "➕收入" : "➖支出") + ")➖➖➖➖第" + ((pageNo - 1) * pageSize + i + 1) + "笔➖➖➖"
                        html += "\n货币类型：" + (botPaymentModels[i].walletType == WalletType.USDT ? 'USDT' : 'TRX')
                        html += "\n操作类型：" + botPaymentModels[i].paymentTypeName
                        if (botPaymentModels[i].paymentType == PaymentType.TX_DKJL) {
                            html += "\n操作金额：" + botPaymentModels[i].paymentAmount + ' ' + (botPaymentModels[i].walletType == WalletType.USDT ? 'USDT' : 'TRX') + " 手续费：1 " + (botPaymentModels[i].walletType == WalletType.USDT ? 'USDT' : 'TRX')
                        } else {
                            html += "\n操作金额：" + botPaymentModels[i].paymentAmount + ' ' + (botPaymentModels[i].walletType == WalletType.USDT ? 'USDT' : 'TRX')
                        }
                        html += "\n" + (botPaymentModels[i].operateType == 1 ? "收入" : "支出") + "前余额：" + botPaymentModels[i].balanceBefore + ' ' + (botPaymentModels[i].walletType == WalletType.USDT ? 'USDT' : 'TRX')
                        html += "\n" + (botPaymentModels[i].operateType == 1 ? "收入" : "支出") + "后余额：" + botPaymentModels[i].balanceAfter + ' ' + (botPaymentModels[i].walletType == WalletType.USDT ? 'USDT' : 'TRX')
                        html += "\n操作时间：" + moment(botPaymentModels[i].createTime).format('yyyy-MM-DD HH:mm')
                        if (botPaymentModels[i].applyTime) html += "\n申请时间：" + moment(botPaymentModels[i].applyTime).format('yyyy-MM-DD HH:mm')
                        if (botPaymentModels[i].passTime) html += "\n通过日期：" + moment(botPaymentModels[i].passTime).format('yyyy-MM-DD HH:mm')
                        if (botPaymentModels[i].description) html += "\n操作备注：" + botPaymentModels[i].description
                        // 提现
                        if (botPaymentModels[i].paymentType == PaymentType.TX_DKJL) {
                            if (botPaymentModels[i].status == 0) html += "\n操作状态：等待审核"
                            if (botPaymentModels[i].status == 1) html += "\n操作状态：已完成"
                            if (botPaymentModels[i].status == 2) html += "\n操作状态：被拒绝"
                        }
                        // 转账
                        if (botPaymentModels[i].paymentType == PaymentType.YHZZ) {
                            if (botPaymentModels[i].status == 0) html += "\n操作状态：等待收款"
                            if (botPaymentModels[i].status == 1) html += "\n操作状态：已完成"
                        }
                        // 收款
                        if (botPaymentModels[i].paymentType == PaymentType.YHSK) {
                            if (botPaymentModels[i].status == 0) html += "\n操作状态：等待确认"
                            if (botPaymentModels[i].status == 1) html += "\n操作状态：已完成"
                            if (botPaymentModels[i].status == 2) html += "\n操作状态：超时自动取消"
                        }
                        // 收款
                        if (botPaymentModels[i].paymentType == PaymentType.HYFL) {
                            if (botPaymentModels[i].status == 0) html += "\n操作状态：等待领取"
                            if (botPaymentModels[i].status == 1) html += "\n操作状态：已领取"
                        }
                    }
                }else{
                    html += "\n\n暂无任务交易记录"
                }
                // 设置操作
                await redis.set("currentop" + tgId, "tibilishi", 'EX', 60 * 60)
                if(mark) {
                    await ctx.replyWithHTML(html, WalletUserCenterController.createUserAccountListBtn(pageNo,pages, searchWalletType))
                }else{
                    await ctx.editMessageText(html,{parse_mode:"HTML"})
                    await ctx.editMessageReplyMarkup(WalletUserCenterController.createUserAccountListBtn(pageNo,pages, searchWalletType).reply_markup)
                }
            }catch (e){

            }
        },async ()=>{
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }

}


export default WalletMyAccountMethod

