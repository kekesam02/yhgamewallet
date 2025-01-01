import type {Context, Telegraf} from "telegraf";
import redis from "../../../config/redis";
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
    }
}

export default WalletHandleHongBaoMethod
