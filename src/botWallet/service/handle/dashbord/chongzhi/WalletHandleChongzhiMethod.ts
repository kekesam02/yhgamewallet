import type {Context} from "telegraf";
import WalletBotHtml from '../../../../../html/walletHtml/WalletBotHtml'
import BotTronAddrModel from "../../../../../models/BotTronAddrModel";
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import MCoinRechargeAddrPoolModel from "../../../../../models/MCoinRechargeAddrPoolModel";
import WalletController from "../../../../controller/WalletController";
import messageUtils from "../../../../../commons/message/MessageUtils";
import QRCodeUtils from "../../../../../commons/qrcode/QRCodeUtils";


/**
 * 公共方法处理
 * npm install @img/sharp-darwin-arm64 @img/sharp-libvips-darwin-arm64 @img/sharp-libvips-linux-x64 @img/sharp-libvips-linuxmusl-x64 @img/sharp-linux-x64 @img/sharp-linuxmusl-x64 --force
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletHandleChongzhiMethod {
    /**
     * 充值方法
     * 形式：callbackquery
     * 代号：chongzhi_btn
     * @param ctx
     */
    public static startChongZhi = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 根据tgId查询用户是否存在。
        let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        var link: string | undefined = '';
        //获取专属充值连接，先查询是否有充值连接，没有的话就拿充值链接并且赋值
        if (!botUser) {
            let botTronAddrModel = await BotTronAddrModel.createQueryBuilder()
                .where("uses = :uses", {uses: 0}).limit(0).getOne()
            link = botTronAddrModel?.addr;
            // 如果用户不存在就添加用户，把交易地址赋值给他
            await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                USDT: "0",
                promotionLink: '',
                rechargeLink: link
            }).execute()
            // 回查用户的信息
            botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
            // 标识交易地址为使用
            await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModel?.id}).execute()
            // 加入到监听池中
            await MCoinRechargeAddrPoolModel.createQueryBuilder()
                .insert().into(MCoinRechargeAddrPoolModel)
                .values({
                    username: username,
                    nickname: firstName,
                    userId: botUser?.id,
                    tgId: userId,
                    address: link,
                    privateKey: "",
                    currency: "USDT"
                }).execute()
        } else {
            // 如果用户存在，交易地址不存在，就分配一个交易地址给用户
            if (!botUser.rechargeLink) {
                let botTronAddrModels = await BotTronAddrModel.createQueryBuilder()
                    .where("uses = :uses", {uses: 0}).getMany()
                link = botTronAddrModels[0]?.addr;
                // 修改用户交易地址
                await UserModel.createQueryBuilder().update(UserModel).set({
                    nickName: firstName,
                    rechargeLink: link
                }).where('id = :id', {id: botUser.id}).execute()
                // 标识交易地址为使用
                await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModels[0]?.id}).execute()
                // 加入到监听池中
                await MCoinRechargeAddrPoolModel.createQueryBuilder()
                    .insert().into(MCoinRechargeAddrPoolModel)
                    .values({
                        username: username,
                        nickname: firstName,
                        userId: botUser.id,
                        tgId: userId,
                        address: link,
                        privateKey: "",
                        currency: "USDT"
                    }).execute()
            } else {
                link = botUser.rechargeLink
            }
        }

        if (link != null) {
            var s = AESUtils.decodeAddr(link)
            //const qrCodeImage = await QRCodeUtils.createQRCodeWithLogo(s)
            const qrCodeImage = await QRCodeUtils.createQrcodeBuffer(s)
            let replyMarkup = WalletController.createBackBtn().reply_markup
            new messageUtils().sendPhotoHtmlCtxBtn(ctx, WalletBotHtml.getBotUserHtml(s), replyMarkup, qrCodeImage)
        }
    }

    /**
     * 命令方式充值
     * 代号：start=deposit
     * @param ctx
     */
    public static startChongZhiCommand = async (ctx: Context) => {
        let update: any = ctx?.update
        // 1：获取telegram的tgId
        var tgId: string = update?.message?.from?.id + '' || ''
        var firstName: string = update?.message?.from?.first_name + '' || ''
        var username: string = update?.message?.from?.username + '' || ''
        // 2：查询用户信息
        let userId = AESUtils.encodeUserId(tgId)
        // 根据tgId查询用户是否存在。
        let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        var link: string | undefined = '';
        //获取专属充值连接，先查询是否有充值连接，没有的话就拿充值链接并且赋值
        if (!botUser) {
            let botTronAddrModel = await BotTronAddrModel.createQueryBuilder()
                .where("uses = :uses", {uses: 0}).limit(0).getOne()
            link = botTronAddrModel?.addr;
            // 如果用户不存在就添加用户，把交易地址赋值给他
            await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
                USDT: "0",
                promotionLink: '',
                rechargeLink: link
            }).execute()
            // 回查用户的信息
            botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
            // 标识交易地址为使用
            await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModel?.id}).execute()
            // 加入到监听池中
            await MCoinRechargeAddrPoolModel.createQueryBuilder()
                .insert().into(MCoinRechargeAddrPoolModel)
                .values({
                    username: username,
                    nickname: firstName,
                    userId: botUser?.id,
                    tgId: userId,
                    address: link,
                    privateKey: "",
                    currency: "USDT"
                }).execute()
        } else {
            // 如果用户存在，交易地址不存在，就分配一个交易地址给用户
            if (!botUser.rechargeLink) {
                let botTronAddrModels = await BotTronAddrModel.createQueryBuilder()
                    .where("uses = :uses", {uses: 0}).getMany()
                link = botTronAddrModels[0]?.addr;
                // 修改用户交易地址
                await UserModel.createQueryBuilder().update(UserModel).set({
                    nickName: firstName,
                    rechargeLink: link
                }).where('id = :id', {id: botUser.id}).execute()
                // 标识交易地址为使用
                await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModels[0]?.id}).execute()
                // 加入到监听池中
                await MCoinRechargeAddrPoolModel.createQueryBuilder()
                    .insert().into(MCoinRechargeAddrPoolModel)
                    .values({
                        username: username,
                        nickname: firstName,
                        userId: botUser.id,
                        tgId: userId,
                        address: link,
                        privateKey: "",
                        currency: "USDT"
                    }).execute()
            } else {
                link = botUser.rechargeLink
            }
        }

        if (link != null) {
            var s = AESUtils.decodeAddr(link)
            //const qrCodeImage = await QRCodeUtils.createQRCodeWithLogo(s)
            const qrCodeImage = await QRCodeUtils.createQrcodeBuffer(s)
            let replyMarkup = WalletController.createBackBtn().reply_markup
            new messageUtils().sendPhotoHtmlCtxBtn(ctx, WalletBotHtml.getBotUserHtml(s), replyMarkup, qrCodeImage)
        }
    }
}


export default WalletHandleChongzhiMethod
