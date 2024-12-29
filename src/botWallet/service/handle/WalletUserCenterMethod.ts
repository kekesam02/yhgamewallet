import type {Context} from "telegraf";
import ButtonUtils from '../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../commons/AESUtils";
import UserModel from "../../../models/UserModel";
import WalletController from "../../controller/WalletController";
import BotWithdrawalAddrModel from "../../../models/BotWithdrawalAddrModel";
import redis from "../../../config/redis";
import WalletHandleMethod from "./WalletHandleMethod";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletUserCenterMethod {

    /**
     * 删除上一次消息
     * @param ctx
     */
    public static removeMessage = async (ctx: Context) => {
        var messageId: number = ctx.callbackQuery?.message?.message_id || 0
        if (messageId > 0) {
            ctx.deleteMessage(messageId)
        }
    }

    /**
     * 个人中心按钮--执行方法
     * 代号：user_center
     * @param ctx
     */
    public static startUserCenterCallback = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 根据tgId查询用户是否存在。
        let user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        // 1：如果不存在就添加
        if (!user) {
            // 如果用户不存在就添加用户
            var insertResultPromise = await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                promotionLink: '',
                rechargeLink: ''
            }).execute();
            // 查询覆盖原来的值
            user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        }

        // 2：实时同步更新用户的昵称
        if (firstName && user && user.nickName != firstName) {
            // 如果用户不存在就添加用户
            await UserModel.createQueryBuilder().update(UserModel).set({
                nickName: firstName
            }).where('id = :id', {id: user.id}).execute();
        }

        // 删除上一次消息
        var messageId: number = ctx.callbackQuery?.message?.message_id || 0
        if (messageId > 0) {
            ctx.deleteMessage(messageId)
        }
        // 3：查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder()
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        // 4：发送带有分享按钮的消息
        var addr = botWithdrawalAddrModel?.addr || "";
        var html = WalletBotHtml.getBotStartHtml(tgId, addr, user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(WalletController.UserHomeBtns))
        } catch (err) {

        }
    }

    /**
     * 我的账单
     * 代号：baccount_btn
     * @param ctx
     */
    public static startBAccount = async (ctx: Context) => {
        return Promise.resolve()
    }

    /**
     * 提币历史
     * 代号：tbls_btn
     * @param ctx
     */
    public static startTbls = async (ctx: Context) => {
        return Promise.resolve()
    }

    /**
     * 彩金转化
     * 代号：ctrxzh_btn
     * @param ctx
     */
    public static startCtrxzh = async (ctx: Context) => {
        return Promise.resolve()
    }

    /**
     * 领取邀请返利
     * 代号：yqfl_btn
     * @param ctx
     */
    public static startYqfl = async (ctx: Context) => {
        return Promise.resolve()
    }

    /**
     * 首充返利
     * 代号：scfl_btn
     * @param ctx
     */
    public static startScfl = async (ctx: Context) => {
        return Promise.resolve()
    }

    /**
     * 小额免密
     * 代号：xemm_btn
     * @param ctx
     */
    public static startXemm = async (ctx: Context) => {
        return Promise.resolve()
    }

    /**
     * 邀请好友
     * 代号：yqhy_btn
     * @param ctx
     */
    public static startYqhy = async (ctx: Context) => {
        return Promise.resolve()
    }

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
        // 查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        if (!botWithdrawalAddrModel?.addr) {
            redis.set("currentop" + tgId, "addtxaddr", 'EX', 60 * 60)
            ctx.replyWithHTML("👜 请在消息框填写您的提现地址")
            return;
        }
        ctx.replyWithHTML("👜 您的提现地址是：" + AESUtils.decodeAddr(botWithdrawalAddrModel?.addr || ''))
    }


    // console.log(WalletUserCenterHandleMethod.isValidTronAddress("TQKKuYk3zNBJoBjLbZ1rp99URZuPQgNFey"))
    // console.log(WalletUserCenterHandleMethod.isValidTronAddress("xxxxxxxxx"))
    public static isValidTronAddress = (address: string) => {
        // 波场地址以'T'开头，长度为34字符，且只包含字母和数字
        return address != null && address.length == 34 && address.charAt(0) == 'T' && /^[A-Za-z0-9]+$/.test(address);
    }

    public static addtxaddrtx = async (text: string, tgId: number, ctx: Context) => {
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        if (!this.isValidTronAddress(text)) {
            //更换提现地址
            var html = "\uD83D\uDCA6 请输入正确的波场提现地址";
            ctx.replyWithHTML(html);
            return;
        }

        // 保存提现地址
        await BotWithdrawalAddrModel.createQueryBuilder().insert().into(BotWithdrawalAddrModel).values({
            tgId: userId,
            del:0,
            addr: AESUtils.encodeAddr(text)
        }).execute();

        redis.set("addtxaddrvalue" + tgId, text, 'EX', 60 * 60 * 6)
        // 发送机器人消息
        ctx.replyWithHTML("✅ 设置成功\n👜 提现地址是：" + text)
        // 进入到主页
        WalletHandleMethod.startButtonBack(ctx)
    }

}


export default WalletUserCenterMethod
