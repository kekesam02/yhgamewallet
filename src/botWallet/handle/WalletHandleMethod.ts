import type {Context} from "telegraf";
import ButtonUtils from '../../commons/button/ButtonUtils'
import WalletBotHtml from '../../html/walletHtml/WalletBotHtml'
import BotTronAddrModel from "../../models/BotTronAddrModel";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import AESUtils from "../../commons/AESUtils";
import UserModel from "../../models/UserModel";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";

/**
 * 公共方法处理
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletHandleMethod {

    /**
     * 个人中心主菜单返回
     * @param ctx
     */
    public static startButtonBack = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        var firstName: string = ctx.callbackQuery?.from?.first_name || ''
        var username: string = ctx.callbackQuery?.from?.username || ''
        this.startCommand(ctx, tgId, firstName, username)
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
        this.startCommand(ctx, tgId, firstName, username)
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
            }).execute();
            // 并且标识交易地址为使用
            await BotTronAddrModel.createQueryBuilder().update().set({uses: 1}).where("id=:id", {'id': botTronAddrModel?.id}).execute()
            //加入到监听
            // MCoinRechargeAddrPool mCoinRechargeAddrPool = new MCoinRechargeAddrPool();
            // mCoinRechargeAddrPool.setAddress(link);
            // mCoinRechargeAddrPool.setPrivateKey("");
            // mCoinRechargeAddrPool.setCurrency("USDT");
            // mCoinRechargeAddrPoolService.save(mCoinRechargeAddrPool);
        } else {
            // //没有支付链接
            // if (Objects.isNull(userById.getRechargeLink())){
            //     BotTronAddr botTronAddr = botTronAddrService.lambdaQuery()
            //         .eq(BotTronAddr::getUses, CommonEnums.ZERO)
            //         .list().get(0);
            //     link=botTronAddr.getAddr();
            //     botUserService.updateUserLink(tgId,link);
            //     botTronAddrService.lambdaUpdate().eq(BotTronAddr::getId,botTronAddr.getId())
            //         .set(BotTronAddr::getUses,CommonEnums.ONE).update();
            //     //加入到监听
            //     MCoinRechargeAddrPool mCoinRechargeAddrPool = new MCoinRechargeAddrPool();
            //     mCoinRechargeAddrPool.setAddress(link);
            //     mCoinRechargeAddrPool.setPrivateKey("");
            //     mCoinRechargeAddrPool.setCurrency("USDT");
            //     mCoinRechargeAddrPoolService.save(mCoinRechargeAddrPool);
            // }else {
            //     link= userById.getRechargeLink();
            // }
        }

        //封装数据
//            String botParameter = BotEncapsulateTextWallet.sendMsgZflj();
//            //发送支付信息
//            botEncapsulation.sendMenu(tgId,botParameter,bot);
        //封装数据
        //取消上一次消息
        // if (Objects.nonNull(callbackQueryId)){
        //     botEncapsulation.delSend(callbackQueryId,bot);
        //     // 删除上一个消息
        //     botEncapsulation. deleteMessage(chatId, messageId,bot);
        // }
        // String s = AESUtil.jieAESAddr(link);
        // BotParameter entertained = BotEncapsulateTextWallet.entertained(s);
        // //获取图片
        // InputStream inputStream = QRCodeGenerator.zfTp(s);
        // //发送支付链接
        // botEncapsulation.sendMenuImage(tgId,inputStream,entertained.getHtml(),entertained.getKeyboardMarkup(),bot);

    }
}


export default WalletHandleMethod
