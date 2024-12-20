import {Context, Telegraf,Markup} from 'telegraf'
import { message } from 'telegraf/filters'
import process from 'node:process'
// https://blog.revincx.icu/posts/telegraf-guide/index.html
const bot = new Telegraf("7723665206:AAFEHMBvs8hW4CLgl9MvKSoISkENfaJ2NNk")
// 监听 /quit的命令
bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id)
    // Using context shortcut
    await ctx.leaveChat()
})

bot.command('caption', (ctx) => {
    return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
        {
            caption: 'Caption',
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                Markup.button.callback('Plain', 'plain'),
                Markup.button.callback('Italic', 'italic')
            ])
        }
    )
})

bot.command('start', (ctx) => {
    return ctx.replyWithHTML("<h1>哈哈</h1>",
        {
            caption: 'Caption',
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                Markup.button.callback('Plain', 'plain'),
                Markup.button.callback('Italic', 'italic')
            ])
        }
    )
})

bot.action('plain', async (ctx) => {
    console.log("plain=================>",ctx)
    await ctx.answerCbQuery()
    await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
        Markup.button.callback('Plain', 'plain'),
        Markup.button.callback('Italic', 'italic')
    ]))
})

bot.action('italic', async (ctx) => {
    console.log("italic=================>",ctx)
    await ctx.answerCbQuery()
    await ctx.editMessageCaption('_Caption_', {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Plain', 'plain'),
            Markup.button.callback('* Italic *', 'italic')
        ])
    })
})

// 监听 /oldschool的命令
bot.command('oldschool', (ctx) => {
    ctx.reply('Hello ' + ctx.message.chat.id)
})


bot.on(message('text'), async (ctx) => {
    console.log("text=============>",ctx.update)
    // 创建内联键盘按钮
    const shareButton = {
        reply_markup: {
            inline_keyboard: [
                [
                    // 方式1: 分享机器人按钮
                    {
                        text: '分享机器人',
                        url: `https://t.me/${ctx.botInfo.username}`,
                        callback_data: JSON.stringify({ command: 'delete'}),
                    },
                    // 方式2: 分享当前消息按钮
                    {
                        text: '选择转账对象',
                        callback_data: JSON.stringify({ command: 'delete'}),
                        switch_inline_query: ctx.message.text
                    }
                ]
            ]
        }
    }

    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
    // 发送带有分享按钮的消息
    await ctx.reply('点击进行转账:', shareButton)
})


bot.on('callback_query', async (ctx) => {
    console.log("================>callback_query")
    const message = ctx.callbackQuery.message;
    const data = JSON.parse(ctx.callbackQuery.data);
    const chatId = ctx.message.chat.id;

    if (data.command === 'delete') {
        const deleted = todos[chatId].splice(data.index, 1);
        bot.answerCallbackQuery(callbackQuery.id, { text: 'Deleted "' + deleted[0] + '" from your to-do list.' });
    }else {
        // Explicit usage
        await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)
        // Using context shortcut
        await ctx.answerCbQuery()
    }
})

bot.on('inline_query', async (ctx) => {
    console.log("================>inline_query")
    try {
        const query = ctx.inlineQuery.query
        if(!query) return
        // 创建一个可分享的结果
        const result = [{
            type: 'article',
            id: '1',
            title: '代币余额' + '1000 USDT',
            description: "付款金额" + parseFloat(query) +' USDT',
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

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

export default  bot