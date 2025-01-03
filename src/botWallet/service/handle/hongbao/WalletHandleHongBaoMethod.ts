import type {Context, Telegraf} from "telegraf";
import redis from "../../../../config/redis";
import WalletRedPacket from "./WalletRedPacket";
import WalletHandleMethod from "../WalletHandleMethod";
import UserModel from "../../../../models/UserModel";
import MessageUtils from "../../../../commons/message/MessageUtils";
import RandomUtils from "../../../../commons/compute/RandomUtils";


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
class WalletHandleHongBaoMethod {

    /**
     * 红包
     * 代号：hongbao_btn
     * @param ctx
     */
    public static startHongBao = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        let tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "hongbao", 'EX', 60 * 60)
        const flag = await WalletHandleMethod.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        var mark = await redis.get('mark_' + tgId) || '0'
        if (mark && mark == '1') return
        if (!flag) {
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }
        return new WalletRedPacket(ctx).addRedPacket()
    }

    // 红包接收用户输入文字处理
    public static startHongBaoHandle = async (text: string, tgId: number, ctx: Context, currentop: string) => {
        if (currentop.indexOf('hongbaoMoney') > -1) {
            // 红包金额处理 - 结束后返回红包数量输入框
            return new WalletRedPacket(ctx).sendInputLength(text)
        }
        if (currentop.indexOf('hongbaoLength') > -1) {
            // 红包数量处理
            return new WalletRedPacket(ctx).sendPayButton(text)
        }
        if (currentop.indexOf('hongbaoRemark') > -1) {
            // 红包数量处理
            return new WalletRedPacket(ctx).setRemark(text, currentop.split('_')[1])
        }
        if (currentop.indexOf('hongbaoWaterMoney_') > -1) {
            // 红包流水金额处理
            return new WalletRedPacket(ctx).setWaterMoney(text, currentop.split('_')[1])
        }
    }

    /**
     * 输入文字快速的发放红包
     *      true: 快速发放红包命令判定成功
     *      false: 快速发放红包命令判定失败
     */
    public static quickSendPacket = async (text: string, tgId: number, ctx: Context) => {
        if (text.indexOf('hb') < 0) {
            return false
        }
        new RandomUtils().randomAllocate(10, 10)
        return true
        // try {
        //     let arr = text.split(' ')
        //     if (arr[1] != 'hb') {
        //         return false
        //     }
        //
        //     /**
        //      * 指定用户领取红包
        //      * 指令为 @大在签约 hb 2
        //      * 表示 给用户 大在签约 发放了一个金额为2USDT的红包
        //      */
        //     if (arr[0].startsWith('@')) {
        //         let userName = arr[0].replaceAll('@', '')
        //         if (arr.length > 3) {
        //             return false
        //         }
        //         if (arr[1] != 'hb') {
        //             return false
        //         }
        //         // 红包金额
        //         let money = arr[2]
        //         // 红包数量
        //         let num = 1
        //         if (isNaN(Number(money))) {
        //             return false
        //         }
        //         let user = UserModel
        //             .createQueryBuilder()
        //             .where('user_name = :userName', {
        //                 userName: userName
        //             })
        //             .getOne()
        //         if (!user) {
        //             await new MessageUtils().sendTextReply(ctx, '未找到该用户')
        //             return true
        //         }
        //
        //         // 开始发放指定用户红包
        //
        //     }
        //
        //
        //     if (arr[0] != 'hb') {
        //         if (arr.length > 3) {
        //             return false
        //         }
        //         // 红包金额
        //         let money = arr[1]
        //         // 红包数量
        //         let num = arr[2]? arr[2]: 1
        //         if (isNaN(Number(money))) {
        //             return false
        //         }
        //
        //         // 开始发放红包、
        //     }
        //     return false
        // } catch (err) {
        //     return false
        // }
    }
}

export default WalletHandleHongBaoMethod
