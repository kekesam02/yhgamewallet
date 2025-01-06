import {Context, Telegraf} from 'telegraf'
import ButtonInnerQueryUtils from "../../../../commons/button/ButtonInnerQueryUtils";
import redis from "../../../../config/redis";
import WalletRedPacketInner from "../../handle/dashbord/hongbao/WalletRedPacketInner";
import WalletHandleZhuanzhangMethod from "../../handle/dashbord/zhuanzhaung/WalletHandleZhuanzhangMethod";
import WalletHandleShouKuanMethod from "../../handle/dashbord/shoukuan/WalletHandleShouKuanMethod";
import WalletController from "../../../controller/WalletController";
import WalletConfig from "../../../WalletConfig";
import WalletYaoqingHaoyouMethod from "../../handle/usercenter/yaoqinghaoyou/WalletYaoqingHaoyouMethod";

/**
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletInnerQueryHandle {
    public static listenerInnerQuery = async (ctx: Context,cbot:Telegraf<Context>) => {
        console.log('--------------------内连按钮回调--------------', ctx)
        let query = ctx.inlineQuery?.query || ''
        query = query.trim()
        const queryId:string = ctx.inlineQuery?.id +''
        const from = ctx.inlineQuery?.from
        try {
            // 设置提现地址
            var tgId: number = from?.id || 0
            const loginFlag = await redis.get("login_" + tgId)
            const currentop: string = await redis.get("currentop" + tgId) || ""
            console.log('传入的参数', currentop)
            if (loginFlag == "success" && currentop) {
                // 转账
                if (currentop == 'zhuanzhang') {
                    var text = ""
                    var flag:boolean = false
                    if(!query || !query.isMoney()){
                        flag = true
                        text="请输入数字,并且大于0"
                    }
                    var price = parseFloat(query || "0")
                    if(price <= 0){
                        flag = true
                        text="转账金额必须是正整数,并且大于0"
                    }
                    if(flag){
                        await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                            id: queryId,
                            title: '⚠️温馨提示！' ,
                            description: text,
                            input_message_content: {
                                message_text: '\uD83D\uDC47 \n'
                            },
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: '\uD83D\uDCB0一号公馆钱包',
                                        callback_data: 'qwe123',
                                        url: WalletConfig.walltPayBotURL
                                    }]
                                ]
                            }
                        }))
                        return
                    }
                    WalletHandleZhuanzhangMethod.startZhuangzhangHandle(query,queryId, tgId, ctx)
                    return;
                }
                // 收款
                if (currentop == 'shoukuan') {
                    var text = ""
                    var flag:boolean = false
                    if(!query || !query.isMoney()){
                        flag = true
                        text="请输入数字,并且小于0"
                    }
                    var price = parseFloat(query || "0")
                    if(price >= 0){
                        flag = true
                        text="转账金额必须是正整数,并且小于0"
                    }
                    if(flag){
                        await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                            id: queryId,
                            title: '⚠️温馨提示！' ,
                            description: text,
                            input_message_content: {
                                message_text: '\uD83D\uDC47 \n'
                            },
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: '\uD83D\uDCB0一号公馆钱包',
                                        callback_data: 'qwe123',
                                        url: 'http://t.me/VertexPaybot'
                                    }]
                                ]
                            }
                        }))
                        return
                    }
                    WalletHandleShouKuanMethod.startShouKuanHandle(query,queryId, tgId, ctx)
                    return;
                }
                // 红包
                if(currentop == 'hongbao' || query.indexOf(WalletRedPacketInner.InnerKey) == 0){
                    // 红包连消息处理
                    return new WalletRedPacketInner().innerMessageHandle(ctx,queryId, query)
                }

                // 邀请好友处理
                if (currentop == 'yaoqinghaoyou') {
                    // 红包连消息处理
                    return WalletYaoqingHaoyouMethod.startInnerYaoqingHaoYou(query,queryId, tgId, ctx)
                }
            }else{
                // 尝试发送一个简单的响应
                try {
                    await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                        id:queryId,
                        title: '会话失效了',
                        description: '操作失败，会话已失效请点击返回重新操作',
                        input_message_content: {
                            message_text: '操作失败，会话已失效请点击【返回】重新操作!'
                        },
                        reply_markup:WalletController.createCallbackCancleBtn().reply_markup
                    }))
                } catch (e) {
                    console.error('发送错误响应失败:', e)
                }
            }
        } catch (error) {
            // 尝试发送一个简单的响应
            try {
                await ctx.answerInlineQuery(ButtonInnerQueryUtils.createInnerQueryDialog({
                    id:queryId,
                    title: '出错了',
                    description: '请重试',
                    input_message_content: {
                        message_text: '操作失败，会话已失效请点击返回重新操作!'
                    },
                    reply_markup:WalletController.createCallbackCancleBtn().reply_markup
                }))
            } catch (e) {
                console.error('发送错误响应失败:', e)
            }
        }
    }
}


export default WalletInnerQueryHandle
