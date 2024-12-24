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
class WalletUserCenterHandleMethod {
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
        var messageId:number = ctx.callbackQuery?.message?.message_id || 0
        if (messageId > 0) {
            ctx.deleteMessage(messageId)
        }
        // 3：发送带有分享按钮的消息
        var html = new WalletBotHtml().getBotStartHtml(tgId, user!)
        try {
            // 4: 机器人回复，显示信息和按钮相关
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: '💰️ 我的账单',
                        query: WalletUserCenterEnum.BACCOUNT
                    },
                    {
                        text: '💸 提币历史',
                        query: WalletUserCenterEnum.TBLS
                    }
                ],
                [
                    {
                        text: '🥯 彩金转化',
                        query: WalletUserCenterEnum.CTRXZH
                    },
                    {
                        text: '🥯 领取邀请返利',
                        query: WalletUserCenterEnum.YQFL
                    },
                    {
                        text: '🥯 首充返利',
                        query: WalletUserCenterEnum.SCFL
                    }
                ],
                [
                    {
                        text: '💰️ 小额免密',
                        query: WalletUserCenterEnum.XEMM
                    },
                    {
                        text: '🍻 邀请好友',
                        query: WalletUserCenterEnum.YQHY
                    }
                ],
                [
                    {
                        text: '🛄 设置提现地址',
                        query: WalletUserCenterEnum.SZTXDZ,
                    }
                ], [
                    {
                        text: '🏘️ 主菜单',
                        query: WalletUserCenterEnum.HOME,
                    }
                ],[
                    {
                        text: '🏘️ 测试',
                        url: 'https://t.me/VertexPaybot?start=withdraw'
                    }
                ]]))
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
        return Promise.resolve()
    }
}


export default WalletUserCenterHandleMethod
