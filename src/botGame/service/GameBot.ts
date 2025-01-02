import {Context, Telegraf} from 'telegraf'
import {message} from 'telegraf/filters'
import process from 'node:process'
import {getConfig} from "../../config/config";
import GameMessageHandle from './GameMessageHandle'
import GameCallbackHandle from "./GameCallbackHandle";
import ScheduleHandle from "../../commons/ScheduleHandle";


/**
 * 娱乐机器人核心代码
 */
const bot = new Telegraf(getConfig().botConfig.GameBotToken)
bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id)
    // Using context shortcut
    await ctx.leaveChat()
})


/**
 * 监听用户发送过来的消息
 */
bot.on(
    message('text'),
async (ctx: Context) => {
    let messageHandle = new GameMessageHandle();
    try {
        await messageHandle.listenerMessage(ctx)
    } catch (err) {
        console.log('报错了', err)
    }
})

/**
 * 监听用户点击按钮回调
 */
bot.on('callback_query', async (ctx) => {
    try {
        await GameCallbackHandle.listenerMessage(ctx)
    } catch (err) {
        console.log('报错来了 ', err)
    }
})

bot.on('inline_query', async (ctx) => {
    try {
        const query = ctx.inlineQuery.query

        if(!query) return

        // 创建一个可分享的结果
        const result = [{
            type: 'article',
            id: '1',
            title: '代币余额' + '1000 USDT',
            description: "付款金额" + parseInt(query) +' USDT',
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


bot.launch()

/**
 * 开启默认需要运行的游戏定时器
 */
const startJob = () => {
    /**
     * 运行pc28游戏定时器（放入异步中、防止配置文件没有加载完成）
     */
    setTimeout(() => {
        ScheduleHandle.startPC28(bot)
    }, 10000)

}
startJob()


// Enable graceful stop
process.once('SIGINT', () => {
    console.log('监听到关闭了1')
    ScheduleHandle.closeJobs()
    bot.stop('SIGINT')
})
process.once('SIGTERM', () =>{
    console.log('监听到关闭了2')
    ScheduleHandle.closeJobs()
    bot.stop('SIGTERM');
})
