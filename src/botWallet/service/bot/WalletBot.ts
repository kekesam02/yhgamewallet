import {Context, Telegraf} from 'telegraf'
import {message} from 'telegraf/filters'
import process from 'node:process'
import {getConfig} from "../../../config/config";
import WalletMessageHandle from '../WalletMessageHandle'
import WalletCallbackHandle from "../WalletCallbackHandle";
import WalletHandleMethod from "../handle/WalletHandleMethod";

/**
 * 娱乐机器人核心代码
 */
const bot = new Telegraf(getConfig().botConfig.WalletToken)
const botWallet = new Telegraf(getConfig().botConfig.WalletTokenTest)

bot.command('quit', async (ctx:Context) => {
    WalletHandleMethod.clearCacheLogin(ctx)
    WalletHandleMethod.clearCacheRelation(ctx)
    ctx.reply("退出成功，谢谢你的使用！")
    //await ctx.telegram.leaveChat(ctx?.chat?.id || '')
})



bot.telegram.setMyCommands([
    { command: "start", description: "启动机器人" },
    { command: "quit", description: "退出机器人" },
    // 可以添加更多命令
]).then(() => {
    console.log("命令设置成功");
}) .catch((err) => {
    console.error("设置命令时出错", err);
});
/**
 * 监听/start命令
 */
bot.command('start', async (ctx) => {
    WalletHandleMethod.startCommandCallback(ctx)
})

/**
 * 监听用户发送过来的消息
 */
bot.on(message('text'), async (ctx: Context) => {
    let messageHandle = new WalletMessageHandle();
    messageHandle.listenerMessage(ctx,botWallet)
})

/**
 * 监听用户点击按钮回调
 */
bot.on('callback_query', async (ctx) => {
    WalletCallbackHandle.listenerMessage(ctx,botWallet)
})

bot.on('inline_query', async (ctx) => {
    console.log('--------------------内连按钮回调--------------', ctx)
    try {
        const query = ctx.inlineQuery.query
        if (!query) return
        // 创建一个可分享的结果
        const result = [{
            type: 'article',
            id: '1',
            title: '代币余额' + '1000 USDT',
            description: "付款金额" + parseFloat(query) + ' USDT',
            input_message_content: {
                message_text: query
            },
            // 添加缓存时间
            cache_time: 0
        }] as const

        // 添加错误处理和超时控制
        await Promise.race([
            ctx.answerInlineQuery(result),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 8000)
            )
        ])
    } catch (error) {
        console.error('内联查询处理错误:', error)
        // 尝试发送一个简单的响应
        try {
            await ctx.answerInlineQuery([{
                type: 'article',
                id: '1',
                title: '出错了',
                description: '请重试',
                input_message_content: {
                    message_text: '操作失败，请重试'
                }
            }])
        } catch (e) {
            console.error('发送错误响应失败:', e)
        }
    }
})


/**
 * 监听财务机器人按钮回调
 */
botWallet.on('callback_query', async (ctx) => {
    WalletCallbackHandle.cBotlistenerMessage(ctx,bot)
})

bot.launch().then(() =>{
    console.log('bot钱包walletBot已经成功启动')
})


botWallet.launch().then(() =>{
    console.log('botWallet钱包walletBot已经成功启动')
})

/**
 * 开启默认需要运行的游戏定时器
 */
const startJob = () => {

}
startJob()


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
