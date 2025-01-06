import {Context, Telegraf} from 'telegraf'
import {message} from 'telegraf/filters'
import process from 'node:process'
import {getConfig} from "../../../config/config";
import WalletMessageHandle from './message/WalletMessageHandle'
import WalletCallbackQueryHandle from "./callbackquery/WalletCallbackQueryHandle";
import WalletHandleMethod from "../handle/WalletHandleMethod";
import WalletInnerQueryHandle from "./inlinequery/WalletInnerQueryHandle";
import WalletHandleZhuanzhangMethod from "../handle/dashbord/zhuanzhaung/WalletHandleZhuanzhangMethod";
import WalletHandleShouKuanMethod from "../handle/dashbord/shoukuan/WalletHandleShouKuanMethod";
import WalletHandleChongzhiMethod from "../handle/dashbord/chongzhi/WalletHandleChongzhiMethod";
import WalletYaoqingHaoyouMethod from "../handle/usercenter/yaoqinghaoyou/WalletYaoqingHaoyouMethod";
import WalletUserCenterMethod from "../handle/usercenter/WalletUserCenterMethod";
import ScheduleHandle from "../../../commons/schedule/ScheduleHandle";
import ContextUtil from "../../../commons/ContextUtil";
import MessageUtils from "../../../commons/message/MessageUtils";
import StartWalletEnum from "../../../type/walletEnums/StartWalletEnum";

/**
 * 娱乐机器人核心代码
 */
const bot = new Telegraf(getConfig().botConfig.WalletToken)
const botWallet = new Telegraf(getConfig().botConfig.WalletTokenTest)

bot.command('quit', async (ctx: Context) => {
    WalletHandleMethod.clearCacheLogin(ctx)
    WalletHandleMethod.clearCacheRelation(ctx)
    ctx.reply("退出成功，谢谢你的使用！")
    await ctx.leaveChat()
})

bot.telegram.setMyCommands([
    {command: "start", description: "启动机器人"},
    {command: "quit", description: "退出机器人"},
    // 可以添加更多命令
]).then(() => {
    console.log("命令设置成功");
}).catch((err) => {
    console.error("设置命令时出错", err);
})

/**
 * 中间件拦截器
 */
bot.use(async (ctx, next) => {
    console.log("---------------------中间件拦截器--------------")

    let groupId = ContextUtil.getGroupId(ctx)
    let update: any = ctx?.update
    let callbackQuery: string = update.callback_query?.data
    // 判断当前环境、如果是在群组中的话只解析快速红包指令
    if (groupId && groupId.indexOf('-') > -1) {
        console.log('输入的文字', ctx.text)
        if (!callbackQuery) {
            let text = ctx.text ?? ''
            let arr = text.split(' ')
            if (text.indexOf('hb') < 0) {
                return
            }
            // 判定 @xxx 3 指令
            if (arr[0].startsWith('@')) {
                if (arr.length > 3) {
                    return
                }
                if (arr[1] != 'hb') {
                    return
                }
                if (isNaN(Number(arr[2]))) {
                    return
                }
                await next()
            }
            // 判定 hb 1 1 指令
            if (arr[0] == 'hb') {
                if (arr.length > 3) {
                    return
                }
                if (isNaN(Number(arr[1]))) {
                    return
                }
                await next()
            }
        }
        // 点击领取红包按钮
        if (callbackQuery.indexOf(StartWalletEnum.HONGBAO_RECEIVE) > -1) {
            if (callbackQuery.split('_').length == 2) {
                await next()
            }
        }
        // 点击验证码数字触发
        if (callbackQuery.indexOf(StartWalletEnum.HONGBAO_VERIFY_BTN) > -1) {
            if (callbackQuery.split('_').length == 3) {
                await next()
            }
        }


        return
    }
    // if(ctx.from?.id !== 753861233) {
    //     await ctx.reply("你没有权限操作")
    //     return
    // }
    await next()
})

/**
 * 监听/start命令
 */
bot.command('start', async (ctx) => {
    // 用于监听转账，红包，收款的密码监听
    var payload = ctx.payload
    if (payload) {
        // 转账
        if (payload.startsWith('inline_')) {
            WalletHandleZhuanzhangMethod.startCommandInputPassword(ctx, payload)
        }

        // 收款
        if (payload.startsWith('shoukuan_')) {
            WalletHandleShouKuanMethod.startShouKuanPayCommand(ctx, payload, bot)
        }

        // 充值
        if (payload.startsWith('deposit')) {
            WalletHandleChongzhiMethod.startChongZhiCommand(ctx)
        }

        // 邀请好友
        if (payload.startsWith('hy')) {
            var inviteTgId = payload.replaceAll('hy', '')
            if (/\d+/.test(inviteTgId)) {
                WalletYaoqingHaoyouMethod.startYaoqingHaoYou(inviteTgId, ctx)
            }else{
                // 返回个人首页
                WalletUserCenterMethod.startUserCenterCallback(ctx)
            }
        }

    } else {
        WalletHandleMethod.startCommandCallback(ctx)
    }
})

/**
 * 监听用户发送过来的消息
 */
bot.on(message('text'), async (ctx: Context) => {
    let messageHandle = new WalletMessageHandle();
    messageHandle.listenerMessage(ctx, botWallet)
})

/**
 * 监听用户点击按钮回调
 */
bot.on('callback_query', async (ctx) => {
    WalletCallbackQueryHandle.listenerMessage(ctx, bot, botWallet)
})

bot.on('inline_query', async (ctx) => {
    console.log('--------------------内连按钮回调--------------', ctx)
    WalletInnerQueryHandle.listenerInnerQuery(ctx, botWallet)
})


/**
 * 监听财务机器人按钮回调
 */
botWallet.on('callback_query', async (ctx) => {
    WalletCallbackQueryHandle.cBotlistenerMessage(ctx, bot)
})

bot.launch().then(() => {
    console.log('bot钱包walletBot已经成功启动')
})

/**
 * 开启默认需要运行的游戏定时器
 */
const startJob = () => {
    /**
     * 运行pc28游戏定时器（放入异步中、防止配置文件没有加载完成）
     */
    setTimeout(() => {
        ScheduleHandle.initWallet(bot)
    }, 10000)

}
startJob()


botWallet.launch().then(() => {
    console.log('botWallet钱包walletBot已经成功启动')
})


// Enable graceful stop
process.once('SIGINT', () => {
    console.log('监听到关闭了1')
    bot.stop('SIGINT')
})
process.once('SIGTERM', () => {
    console.log('监听到关闭了2')
    bot.stop('SIGTERM');
})


// Enable graceful stop
process.once('SIGINT', () => {
    console.log('监听到关闭了3')
    botWallet.stop('SIGINT')
})
process.once('SIGTERM', () => {
    console.log('监听到关闭了4')
    botWallet.stop('SIGTERM');
})
