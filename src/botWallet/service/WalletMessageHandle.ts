import type {Context} from "telegraf";
import WalletCommand from "../const/WalletCommand";
import WalletHandleMethod from "./handle/WalletHandleMethod";
import redis from "../../config/redis";
import WalletUserCenterHandleMethod from "./handle/WalletUserCenterHandleMethod";

/**
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletMessageHandle {
    public listenerMessage = async (ctx: Context) => {
        console.log('传入的用户消息', ctx)
        let text = ctx.text
        if (!text || text.length <= 0 || text == '') {
            return
        }

        // 获取telegram的tgId
        var tgId: number = ctx.message?.from?.id || 0
        const addtxaddr: string = await redis.get("addtxaddr" + tgId) || ""
        if (addtxaddr == 'addtxaddr') {
            WalletUserCenterHandleMethod.addtxaddrtx(text,tgId,ctx)
            return;
        }

        switch (true) {
            // 下面是指令相关的消息------------
            case WalletCommand.command.includes(text):
                console.log('查询到的指令信息--')
                WalletHandleMethod.startCommandCallback(ctx).then()
                break
            case WalletCommand.noteOrder.includes(text):
                console.log('查询注单信息')
                WalletHandleMethod.startCommandCallback(ctx).then()
                break
            default:
                console.log('未能识别消息')
        }
    }
}


export default WalletMessageHandle
