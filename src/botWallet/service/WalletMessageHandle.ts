import type {Context} from "telegraf";
import ButtonUtils from '../../commons/button/ButtonUtils'
import WalletBotHtml from '../../html/walletHtml/WalletBotHtml'
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletCommand from "../const/WalletCommand";
import ContextUtil from "../../commons/ContextUtil";
import AESUtils from "../../commons/AESUtils";
import UserModel from "../../models/UserModel";

/**
 * 钱包机器人收到的用户消息处理器
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletMessageHandle {
    public listenerMessage = (ctx: Context) => {
        console.log('传入的用户消息', ctx)
        let text = ctx.text
        if (!text || text.length <= 0 || text == '') {
            return
        }
        switch (true) {
            // 下面是指令相关的消息------------
            case WalletCommand.command.includes(text):
                console.log('查询到的指令信息--')
                this.startCommand(ctx).then()
                break
            case WalletCommand.noteOrder.includes(text):
                console.log('查询注单信息')
                this.startCommand(ctx).then()
                break
            default:
                console.log('未能识别消息')
        }
    }

    /**
     *   /start指令的提示
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
    public startCommand = async (ctx: Context) => {
        // 获取telegram的tgId
        var tgId: number = ctx.message?.from?.id || 0
        var firstName: string = ctx.message?.from?.first_name || ''
        var username: string = ctx.message?.from?.username || ''
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 根据tgId查询用户是否存在。
        let user = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
        // 如果不存在就添加
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
        // 实时同步更新用户的昵称
        if (firstName && user && user.nickName != firstName) {
            // 如果用户不存在就添加用户
            await UserModel.createQueryBuilder().update(UserModel).set({
                nickName: firstName
            }).where('id = :id', {id: user.id}).execute();
        }
        // 发送带有分享按钮的消息
        var html = new WalletBotHtml().getBotStartHtml(tgId, user!)
        try {
            await ctx.replyWithHTML(html, new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: '💰️ 充值',
                        query: StartWalletEnum.CHONGZHI
                    },
                    {
                        text: '💸 体现',
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
                        text: '🍝 个人中心',
                        query: StartWalletEnum.USERCENTER
                    }
                ]]))
        } catch (err) {

        }
    }
}


export default WalletMessageHandle
