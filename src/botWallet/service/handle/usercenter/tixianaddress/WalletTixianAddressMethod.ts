import type {Context} from "telegraf";
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import BotWithdrawalAddrModel from "../../../../../models/BotWithdrawalAddrModel";
import redis from "../../../../../config/redis";
import WalletHandleMethod from "../../WalletHandleMethod";
import walletUserCenterMethod from "../WalletUserCenterMethod";
import walletUserCenterController from "../../../../controller/WalletUserCenterController";
import {addLockByTgId} from "../../../../../config/redislock";
import WalletUserCenterMethod from "../WalletUserCenterMethod";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletTixianAddressMethod {
    /**
     * 设置提现地址
     * 代号：sztxdz_btn
     * @param ctx
     */
    public static startTxdz = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        await redis.set("currentop" + tgId, "addtxaddr", 'EX', 60 * 60)
        // 查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        if (!botWithdrawalAddrModel?.addr) {
            ctx.replyWithHTML("👜 请在消息框填写您的提现地址")
            return;
        }
        // 删除上一次的消息
        await walletUserCenterMethod.removeMessage(ctx)
        // 提示当前的信息
        await ctx.replyWithHTML("👜 您的提现地址是：\n<code>" + AESUtils.decodeAddr(botWithdrawalAddrModel?.addr || '')+"</code>（点击可复制）",walletUserCenterController.createUpdateTxAddrBtn())
    }


    // console.log(WalletUserCenterHandleMethod.isValidTronAddress("TQKKuYk3zNBJoBjLbZ1rp99URZuPQgNFey"))
    // console.log(WalletUserCenterHandleMethod.isValidTronAddress("xxxxxxxxx"))
    public static isValidTronAddress = (address: string) => {
        // 波场地址以'T'开头，长度为34字符，且只包含字母和数字
        return address != null && address.length == 34 && address.charAt(0) == 'T' && /^[A-Za-z0-9]+$/.test(address);
    }

    /**
     * 添加/修改提现地址
     * @param text
     * @param tgId
     * @param ctx
     */
    public static addtxaddrtx = async (text: string, tgId: number, ctx: Context) => {
       await addLockByTgId(['addtxaddr_lock_'+tgId+''],async ()=>{
           // 查询用户信息
           let userId = AESUtils.encodeUserId(tgId?.toString())
           var username = ctx.message?.from?.username || ''
           var nickname = ctx.message?.from?.first_name || ''
           if (!this.isValidTronAddress(text)) {
               //更换提现地址
               var html = "\uD83D\uDCA6 请填写正确的波场提现地址";
               ctx.replyWithHTML(html);
               return;
           }
           // 波长地址
           var encodeAddr = AESUtils.encodeAddr(text);
           // 判断用户是否存在
           var botUser = await new UserModel().getUserModelById(userId);
           if(botUser) {
               // 查询用户是否已经存在提现地址
               const botUserAddr = await BotWithdrawalAddrModel.createQueryBuilder().select().where("tg_id=:tgId", {tgId: userId})
                   .getOne()
               if (botUserAddr) {
                   if(botUserAddr.addr == encodeAddr){
                       ctx.replyWithHTML("⚠️ 当前地址和旧地址一致，无须修改..")
                       return
                   }
                   // 修改提现地址
                   await BotWithdrawalAddrModel.createQueryBuilder().update().set({
                       userId:botUser.id,
                       username: username,
                       nickname: nickname,
                       addr: encodeAddr
                   }).where("id=:id",{id:botUserAddr.id}).execute()
               } else {
                   // 保存提现地址
                   await BotWithdrawalAddrModel.createQueryBuilder().insert().into(BotWithdrawalAddrModel).values({
                       del: 0,
                       tgId: userId,
                       userId:botUser.id,
                       username: username,
                       nickname: nickname,
                       addr: encodeAddr
                   }).execute()
               }
               // 发送机器人消息
               await ctx.replyWithHTML("✅ 设置成功\n👜 您当前的提现地址是：<code>" + text+"</code>")
               // 进入到主页
               await WalletUserCenterMethod.startUserCenterMessageCallback(ctx)
           }else{
               await ctx.reply('用户不存在！')
           }
       },async ()=>{
           await ctx.reply('亲，操作慢点，休息一会在操作!')
       })
    }

    /**
     * 修改提现地址
     * @param ctx
     */
    public static updateTxAddress = async (ctx:Context)=>{
        // 1：获取telegram的tgId
        var tgId: string = ctx.callbackQuery?.from?.id + '' || "0"
        await redis.set("currentop" + tgId, "updatetxaddr", 'EX', 60 * 60)
        var html = "👜 请在消息框填写您的提现地址";
        ctx.replyWithHTML(html);
    }
}


export default WalletTixianAddressMethod
