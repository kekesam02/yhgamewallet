import type {Context, Telegraf} from "telegraf";
import ButtonUtils from '../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../html/walletHtml/WalletBotHtml'
import BotTronAddrModel from "../../../models/BotTronAddrModel";
import AESUtils from "../../../commons/AESUtils";
import UserModel from "../../../models/UserModel";
import MCoinRechargeAddrPoolModel from "../../../models/MCoinRechargeAddrPoolModel";
import WalletController from "../../controller/WalletController";
import messageUtils from "../../../commons/message/MessageUtils";
import QRCodeUtils from "../../../commons/qrcode/QRCodeUtils";
import {ButtonCallbackType} from "../../../commons/button/ButtonCallbackType";
import WalletMessage from "../../const/WalletMessage";
import BotWithdrawalAddrModel from "../../../models/BotWithdrawalAddrModel";
import redis from "../../../config/redis";
import BotPaymentModel from "../../../models/BotPaymentModel";
import {addLockByTgId} from "../../../config/redislock";
import WalletRedPacket from "./WalletRedPacket";
import WalletHandleMethod from "./WalletHandleMethod";


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
class WalletHandleShangduiMethod {
    /**
     * 闪兑
     * 代号：shandui_btn
     * @param ctx
     */
    public static startShanDui = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "shangdui", 'EX', 60 * 60)
        const flag = await WalletHandleMethod.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }

        console.log("startShanDui")
        return Promise.resolve()
    }


    // 闪兑具体逻辑
    public static startShangduiHandle = async (text: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['zhuanzhang_lock_' + tgId + ''], async () => {
            // 1：密码确认
            const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
                return
            }

            ctx.reply(text)

        }, async () => {
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }
}

export default WalletHandleShangduiMethod
