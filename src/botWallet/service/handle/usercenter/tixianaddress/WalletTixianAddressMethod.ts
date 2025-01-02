import type {Context} from "telegraf";
import ButtonUtils from '../../../../../commons/button/ButtonUtils'
import WalletBotHtml from '../../../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import WalletController from "../../../../controller/WalletController";
import BotWithdrawalAddrModel from "../../../../../models/BotWithdrawalAddrModel";
import redis from "../../../../../config/redis";
import WalletHandleMethod from "../../WalletHandleMethod";

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


export default WalletTixianAddressMethod
