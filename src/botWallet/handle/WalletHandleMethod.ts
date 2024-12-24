import type {Context} from "telegraf";
import ButtonUtils from '../../commons/button/ButtonUtils'
import WalletBotHtml from '../../html/walletHtml/WalletBotHtml'
import BotTronAddrModel from "../../models/BotTronAddrModel";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import AESUtils from "../../commons/AESUtils";
import UserModel from "../../models/UserModel";
import MCoinRechargeAddrPoolModel from "../../models/MCoinRechargeAddrPoolModel";
import WalletController from "../../botWallet/controller/WalletController";
import messageUtils from "../../commons/message/MessageUtils";
import QRCodeUtils from "../../commons/qrcode/QRCodeUtils";
import DateFormatUtils from "../../commons/date/DateFormatUtils";
import {ButtonCallbackType} from "../../commons/button/ButtonCallbackType";


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
class WalletHandleMethod {
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
     * 个人中心主菜单返回
     * 代号：home_btn
     * @param ctx
     */
    public static startButtonBack = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        this.startCommand(ctx, tgId, username, firstName)
    }

    /**
     * 命令/start执行指令
     * @param ctx
     */
    public static startCommandCallback = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.message?.from?.id || 0
        var firstName: string = ctx.message?.from?.first_name || ''
        var username: string = ctx.message?.from?.username || ''
        this.startCommand(ctx, tgId, username, firstName)
    }

    /**
     *  公共方法
     *  // var botId = ctx.botInfo.id
     *  // var botFirstName = ctx.botInfo.first_name
     *  // var botUsername = ctx.botInfo.username
     *  // var botCanJoinGroups = ctx.botInfo.can_join_groups
     *  // var token = ctx.telegram.token
     *  // var apiMode = ctx.telegram.options.apiMode
     *  // var nickname:string = ctx.message?.from?.first_name || ''
     *  // var username:string = ctx.message?.from?.username || ''
     *  // var isBot:boolean = ctx.message?.from?.is_bot || false
     *  // var date:number = ctx.message?.date || 0
     *  // var messageId:number = ctx.message?.message_id || 0
     */
    public static startCommand = async (ctx: Context, tgId: number, username: string, firstName: string) => {
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

        // 3：发送带有分享按钮的消息
        var html = new WalletBotHtml().getBotStartHtml(tgId, user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: '💰️ 充值',
                        query: StartWalletEnum.CHONGZHI
                    },
                    {
                        text: '💸 提现',
                        query: StartWalletEnum.TIXIAN
                    }
                ],
                [
                    {
                        text: '↪️ 转账',
                        query: StartWalletEnum.ZHUANZHANG
                    },
                    {
                        text: '↩️ 收款',
                        query: StartWalletEnum.SHOUKUANG
                    }
                ],
                [
                    {
                        text: '🧧 红包',
                        query: StartWalletEnum.HONGBAO
                    },
                    {
                        text: '🥯 闪兑',
                        query: StartWalletEnum.SHANGDUI
                    }
                ],
                [
                    {
                        text: '🏘️ 个人中心',
                        query: StartWalletEnum.USERCENTER,
                    }
                ]]))
        } catch (err) {
            ctx.reply("提示：尊敬的用户，网络繁忙中请稍后再试！如遇到问题可联系客服：@Yhclub01")
        }
    }


    /**
     * 充值方法
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
                .where("uses = :uses", {uses: 0}).limit(0).offset(1).getOne()
            link = botTronAddrModel?.addr;
            // 如果用户不存在就添加用户，把交易地址赋值给他
            await UserModel.createQueryBuilder().insert().into(UserModel).values({
                tgId: userId,
                nickName: firstName,
                userName: username,
                vip: 0,
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
                let botTronAddrModel = await BotTronAddrModel.createQueryBuilder()
                    .where("uses = :uses", {uses: 0}).getOne()
                link = botTronAddrModel?.addr;

                // 修改用户交易地址
                await UserModel.createQueryBuilder().update(UserModel).set({
                    nickName: firstName,
                    rechargeLink: link
                }).where('id = :id', {id: botUser.id}).execute()

                // 标识交易地址为使用
                await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModel?.id}).execute()

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
            var messageId: number = ctx.callbackQuery?.message?.message_id || 0
            if (messageId > 0) {
                ctx.deleteMessage(messageId)
            }

            var s = AESUtils.decodeAddr(link);
            const qrCodeImage = await QRCodeUtils.createQRCodeWithLogo(s);
            // 获取当前日期和时间
            const formattedDate =  DateFormatUtils.DateFormat(new Date());
            var html = '\n<strong>当前中国时间：' + formattedDate + '</strong>\n\n' +
                '\uD83D\uDCB0 充值专属钱包地址: （目前只收TRC20 USDT，转错概不负责。）\n' +
                '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n' +
                '<code>' + s + '</code>（点击可复制）\n' +
                '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n' +
                '请仔细比对地址，如果和图片中地址不一致，请停止充值，立即重新安装飞机软件。';
            let replyMarkup = new WalletController().createBackBtn().reply_markup
            new messageUtils().sendPhotoHtmlCtxBtn(ctx, html, replyMarkup, qrCodeImage)
        }
    }

    /**
     * 转账、红包、提现、收款、闪兑提示输入密码
     * @param ctx
     */
    public static sendPasswordSetupMessage = async (ctx:Context) => {
        try {
            const html = "\uD83C\uDFE6欢迎使用一号公馆钱包\n为了您的资金安全\n✏️请设置 4 位支付密码\n";
            const keybordsArr:Array<Array<ButtonCallbackType>> = []
            for (let i = 1; i <= 9; i += 3) {
                var rowInline : Array<ButtonCallbackType> = []
                for (let j = i; j < i + 3; j++) {
                    rowInline.push({
                        text: j+"",
                        query: "num_"+j
                    })
                }
                keybordsArr.push(rowInline)
            }
            keybordsArr.push([{
                text: "清空",
                query: "clear"
            },{
                text: "0",
                query: "num_0"
            },{
                text: "删除",
                query: "delete"
            }])
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn(keybordsArr))
        } catch (err) {
            ctx.reply("提示：尊敬的用户，网络繁忙中请稍后再试！如遇到问题可联系客服：@Yhclub01")
        }
    }


    /**
     * 提现
     * 代号：tixian_btn
     * @param ctx
     */
    public static startTiXian = async (ctx: Context) => {

    }

    /**
     * 转账
     * 代号：zhuanzhang_btn
     * @param ctx
     */
    public static startZhuanZhang= async (ctx: Context) => {

    }

    /**
     * 收款
     * 代号：shoukuan_btn
     * @param ctx
     */
    public static startShouKuan= async (ctx: Context) => {

    }

    /**
     * 红包
     * 代号：hongbao_btn
     * @param ctx
     */
    public static startHongBao= async (ctx: Context) => {

    }

    /**
     * 闪兑
     * 代号：shandui_btn
     * @param ctx
     */
    public static startShanDui= async (ctx: Context) => {

    }
}


export default WalletHandleMethod
