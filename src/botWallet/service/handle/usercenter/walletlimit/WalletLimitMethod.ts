import type {Context} from "telegraf";
import UserModel from "../../../../../models/UserModel";
import redis from "../../../../../config/redis";
import WalletHandleMethod from "../../WalletHandleMethod";
import walletUserCenterController from "../../../../controller/WalletUserCenterController";
import WalletUserCenterMethod from "../WalletUserCenterMethod";
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
class WalletLimitMethod {
    /**
     * 小额免密
     * 代号：xemm_btn
     * @param ctx
     */
    public static startXemm = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 查询用户信息
        var botUser = await new UserModel().getUserModelByIdNumber(tgId)
        // 设置操作
        redis.set("currentop" + tgId, "xemm", 'EX', 60 * 60)
        // 返回模板
        const html = "您当前额度是：" + botUser?.withdrawalLimit + "\n" + "\n" +
            "1、设置额度是为了资金安全" + "\n" +
            "2、每日消费超过此额度就需要验证安全密码" + "\n" +
            "3、为了您的资金安全官方建议额度不要太大"
        await WalletUserCenterMethod.removeMessage(ctx)
        await ctx.replyWithHTML(html,walletUserCenterController.createXiaoerMianMiBtn())
    }

    /**
     * 确认密码
     * 代号：smNoPasswordChange
     * @param ctx
     */
    public static startUpdateUserLimiter = async(ctx:Context)=>{
        const html = "请输入你要调整的额度(数字) ";
        await WalletUserCenterMethod.removeMessage(ctx)
        await ctx.replyWithHTML(html,walletUserCenterController.createUserCenterBackBtn())
    }

    /**
     * 调整额度
     * 代号：smNoPasswordChange
     * @param ctx
     */
    public static updateUserLimiter = async(text: string, tgId: number, ctx: Context)=>{
        await addLockByTgId(['xemm_lock_'+tgId+''],async()=>{
            if(!/^[1-9]\d*(\.\d+)?$/.test(text)){
                await ctx.replyWithHTML("⚠️ 限额必须是数字，并且大于0")
                return
            }
            // 限额的上线
            if(parseFloat(text) > 100000000){
                await ctx.replyWithHTML("⚠️ 最大上限为1,0000,0000")
                return
            }
            const botUser = await new UserModel().getUserModelByIdNumber(tgId)
            if(botUser) {
                await UserModel.createQueryBuilder().update().set({
                    withdrawalLimit: text
                }).where({
                    id: botUser.id
                }).execute()
                // 修改成功
                await ctx.replyWithHTML("✅ 修改成功，免密额度修改为："+text)
                // 返回个人中心
                await WalletHandleMethod.startCommandCallback(ctx)
            }else{
                await ctx.replyWithHTML("⚠️ 没有该用户信息")
            }
        }, async () => {
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }


}


export default WalletLimitMethod
