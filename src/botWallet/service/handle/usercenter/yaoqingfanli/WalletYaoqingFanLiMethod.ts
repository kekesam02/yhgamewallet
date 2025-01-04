import type {Context} from "telegraf";
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
class WalletYaoqingFanLiMethod {
    /**
     * 领取邀请返利
     * 代号：yqfl_btn
     * @param ctx
     */
    public static startYqfl = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        await addLockByTgId(['yahyfanli_lock_'+tgId],async ()=>{
            // 设置操作
            await redis.set("currentop" + tgId, "yaoqingfanli", 'EX', 60 * 60)


            // BetCurrencyTypeEnum betCurrencyTypeEnum=null;
            // if (jetype.equals("u")){
            //     betCurrencyTypeEnum=BetCurrencyTypeEnum.USDT;
            // }else {
            //     betCurrencyTypeEnum=BetCurrencyTypeEnum.TRX;
            // }
            // //查询是否有好友返利
            // BotKyhuodong one1 = botKyhuodongService.lambdaQuery()
            //     .eq(BotKyhuodong::getTgId, AESUtil.jiaAESUserId(tgId))
            //     .eq(BotKyhuodong::getFafcs, 0)
            //     .eq(BotKyhuodong::getHdtype, 3)
            //     .eq(BotKyhuodong::getCjdw,betCurrencyTypeEnum.getValue())
            //     .one();
            // if (Objects.isNull(one1)){
            //     //usdt没有返利  //发送消息
            //     botEncapsulation.sendPop("当前暂无好友返利",callbackQueryId,bot);
            //
            // }else {
            //     //获取用户信息
            //     BotUser userById = botUserService.getUserById(tgId);
            //     //有返利需要用户确认
            //     String html="用户："+userById.getNickName()+"您好\n" +
            //         "领取邀请好友返利，将清空当前彩金流水，如当前彩金流水达到转化标准，请优先转化再领取\n" +
            //         "例：当前彩"+jetype+"余额有10，当前领取好友返利10，将按照10+10的标准重新定义\n" +
            //         "❗️确认执行，下方选择确认领取" +
            //         "当前返利彩"+jetype+":"+one1.getCjje()+"\n" +
            //         "彩"+jetype+"余额:"+userById.getCusdt();
            //     //内链
            //     botEncapsulation.deleteMessage(tgId,messageId,bot);
            //
            //     InlineKeyboardButton jstz234= InlineKeyboardButton.builder()
            //         .text("✅确认领取").callbackData("lqyqhyfl"+jetype)
            //         .build();
            //     InlineKeyboardButton jstz2345= InlineKeyboardButton.builder()
            //         .text("↩️返回").callbackData("grzx")
            //         .build();
            //
            //
            //     ArrayList<InlineKeyboardButton> objects8 = new ArrayList<>();
            //     objects8.add(jstz234);
            //     objects8.add(jstz2345);
            //     InlineKeyboardMarkup keyboardM1=  InlineKeyboardMarkup.builder()
            //         .keyboardRow(objects8)
            //         .build();
            //     botEncapsulation.sendMenu(tgId,html,keyboardM1,bot);



        },async ()=>{
            await ctx.replyWithHTML('亲，操作慢点，休息一会在操作!')
        })
    }

}


export default WalletYaoqingFanLiMethod
