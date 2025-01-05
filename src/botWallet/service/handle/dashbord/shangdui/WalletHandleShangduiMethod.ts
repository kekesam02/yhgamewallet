import type {Context, Telegraf} from "telegraf";
import redis from "../../../../../config/redis";
import {addLockByCtx, addLockByTgId} from "../../../../../config/redislock";
import WalletHandleMethod from "../../WalletHandleMethod";
import QuickExchangeHtml from "../../../../../html/walletHtml/ShanduiHtml";
import ShanduiHtml from "../../../../../html/walletHtml/ShanduiHtml";
import ButtonUtils from "../../../../../commons/button/ButtonUtils";
import StartWalletEnum from "../../../../../type/walletEnums/StartWalletEnum";
import MessageUtils from "../../../../../commons/message/MessageUtils";
import ContextUtil from "../../../../../commons/ContextUtil";
import UserModel from "../../../../../models/UserModel";
import ComputeUtils from "../../../../../commons/compute/ComputeUtils";
import {queryRunner} from "../../../../../config/database";
import WalletType from "../../../../../type/WalletType";
import BotExchangeModel from "../../../../../models/BotExchangeModel";
import ExchangeEnum from "../../../../../type/WalletType/ExchangeEnum";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import PaymentTypeEnum from "../../../../../type/PaymentTypeEnum";
import OrderUtils from "../../../../../commons/OrderUtils";
import walletType from "../../../../../type/WalletType";
import CommonEnumsIndex from "../../../../../type/CommonEnumsIndex";


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
class WalletHandleShangduiMethod {

    /**
     * USDT 转 TRX
     */
    public static USDT_TRX = 'shangdui_USDT_TRX'

    /**
     * TRX 转 USDT
     * @private
     */
    public static TRX_USDT = 'shangdui_TRX_USDT'

    /**
     * 闪兑
     * 代号：shandui_btn
     * @param ctx
     */
    public static startShanDui = async (ctx: Context, cbot: Telegraf<Context>, startWalletEnum: StartWalletEnum) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        redis.set("currentop" + tgId, "shangdui", 'EX', 60 * 60)
        const flag = await WalletHandleMethod.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }

        switch (startWalletEnum) {
            case StartWalletEnum.SHANGDUI_TRX_USDT:
                await this.sendInput(ctx, StartWalletEnum.SHANGDUI_TRX_USDT)
                break
            case StartWalletEnum.SHANGDUI_USDT_TRX:
                await this.sendInput(ctx, StartWalletEnum.SHANGDUI_USDT_TRX)
                break
            default:
                await this.sendExchange(ctx)
        }
        return Promise.resolve()
    }


    // 闪兑具体逻辑
    public static startShangduiHandle = async (text: string, tgId: number, ctx: Context) => {
        await addLockByTgId(['zhuanzhang_lock_' + tgId + ''], async () => {
            // 1：密码确认
            const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
                return
            }
        }, async () => {
            await ctx.reply('亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 发送闪兑消息
     */
    public static sendExchange = async (ctx: Context) => {
        let html = new QuickExchangeHtml().createQuickExchangeHtml('3.8')
        let btn = new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '♻️USDT=>TRX',
                    query: StartWalletEnum.SHANGDUI_USDT_TRX
                }, {
                    text: '♻️TRX=>USDT',
                    query: StartWalletEnum.SHANGDUI_TRX_USDT
                }
            ]
        ])
        await new MessageUtils().botSendTextToBot(ctx, html, btn.reply_markup)
    }

    /**
     * 发送 USDT 或 TRX 输入框到用户
     */
    public static sendInput = async (ctx: Context, startWallet: StartWalletEnum) => {
        let user = await new UserModel().getUserModel(ctx)
        if (startWallet == StartWalletEnum.SHANGDUI_TRX_USDT) {
            // TRX 转USDT
            redis.set('currentop' + ContextUtil.getUserId(ctx, false), this.TRX_USDT)
            let minStr = '10 TRX'
            let html = new ShanduiHtml().createStartInput('♻️TRX=>USDT',minStr, `${user.TRX} TRX`)
            return  new MessageUtils().botSendTextToBot(ctx, html)
        }
        if (startWallet == StartWalletEnum.SHANGDUI_USDT_TRX) {
            // USDT 转 TRX
            redis.set('currentop' + ContextUtil.getUserId(ctx, false), this.USDT_TRX)
            let minStr = '1 USDT'
            let html = new ShanduiHtml().createStartInput('♻️USDT=>TRX', minStr, `${user.USDT} USDT`)
            return  new MessageUtils().botSendTextToBot(ctx, html)
        }
    }

    /**
     * 开始转换
     */
    public static startExchange = async (text: string, tgId: number, ctx: Context, currentTop: string = '') => {
        if (isNaN(Number(text))) {
            await new MessageUtils().sendTextReply(ctx,'请输入正确的金额')
            return
        }
        let money = new ComputeUtils(text)
        if (currentTop.indexOf(this.TRX_USDT) > -1) {
            // trx 转 usdt
            if (money.comparedTo(10) < 0) {
                await new MessageUtils().sendTextReply(ctx,'最小金额为 10 TRX')
                return
            }
            await this.updateData(ctx, money.getValue(), currentTop)
        }
        if (currentTop.indexOf(this.USDT_TRX) > -1) {
            // trx 转 usdt
            if (money.comparedTo(1) < 0) {
                await new MessageUtils().sendTextReply(ctx,'最小金额为 1 USDT')
                return
            }
            await this.updateData(ctx, money.getValue(), currentTop)
        }
    }

    /**
     * 更新数据
     */
    private static updateData = async (ctx: Context, money: string, currentTop: string) => {
        // 金额类型
        let fromWalletType = WalletType.USDT
        let toWalletType = WalletType.TRX
        // 当前使用的汇率
        let exchangeType = ExchangeEnum.USDT_TRX
        // 更新之前的金额
        let beforeFromMoney = ''
        let beforeToMoney = ''
        // 更新之后的金额
        let afterFromMoney = ''
        let afterToMoney = ''
        let user = await new UserModel().getUserModel(ctx)

        if (currentTop.indexOf(this.TRX_USDT) > -1) {
            fromWalletType = WalletType.TRX
            toWalletType = WalletType.USDT
            exchangeType = ExchangeEnum.TRX_USDT
            beforeFromMoney = user.TRX
            beforeToMoney = user.USDT
        }
        if (currentTop.indexOf(this.USDT_TRX) > -1) {
            fromWalletType = WalletType.USDT
            toWalletType = WalletType.TRX
            exchangeType = ExchangeEnum.USDT_TRX
            beforeFromMoney = user.USDT
            beforeToMoney = user.TRX
        }

        // 获取当前 trx 转 usdt 的汇率
        let exchangeModel = await new BotExchangeModel().getRate(exchangeType)
        if (!exchangeModel) {
            return
        }
        let proportion = exchangeModel.proportion
        let addMoney = ''

        addMoney = new ComputeUtils(money).multiplied(proportion).getValue()
        user.updateUserMoney(fromWalletType, money, false)
        user.updateUserMoney(toWalletType, addMoney, true)
        afterFromMoney = user.getBalance(fromWalletType)
        afterToMoney = user.getBalance(toWalletType)


        await addLockByCtx(ctx, async () => {
            try {
                await queryRunner.startTransaction()
                if (user) {
                    await queryRunner.manager.save(user)
                    let orderId = new OrderUtils().createPaymentModelId()

                    await queryRunner.manager.save(BotPaymentModel, {
                        tgId: user.tgId,
                        uid: user?.id,
                        username: user?.userName,
                        nickname: user?.nickName,
                        balanceBefore: beforeFromMoney + '',
                        balanceAfter: afterFromMoney + '',
                        paymentType: PaymentTypeEnum.SD.value,
                        paymentTypeName: PaymentTypeEnum.SD.name,
                        operateType: 0, // 支出
                        paymentTypeNumber: orderId,
                        paymentAmount: money + '',
                        paymentRealAmount: money + '',
                        walletType: fromWalletType,
                        passUsername: user.userName,
                        passNickname: user.nickName,
                        status:1,
                        description: `${new CommonEnumsIndex().getWalletTypeStr(fromWalletType)} 转 ${new CommonEnumsIndex().getWalletTypeStr(toWalletType)}`
                    })

                    await queryRunner.manager.save(BotPaymentModel, {
                        tgId: user.tgId,
                        uid: user?.id,
                        username: user?.userName,
                        nickname: user?.nickName,
                        balanceBefore: beforeToMoney + '',
                        balanceAfter: afterToMoney + '',
                        paymentType: PaymentTypeEnum.SD.value,
                        paymentTypeName: PaymentTypeEnum.SD.name,
                        operateType: 1, // 收入
                        paymentTypeNumber: orderId,
                        paymentAmount: addMoney + '',
                        paymentRealAmount: addMoney + '',
                        walletType: toWalletType,
                        passUsername: user.userName,
                        passNickname: user.nickName,
                        status:1,
                        description: `${new CommonEnumsIndex().getWalletTypeStr(fromWalletType)} 转 ${new CommonEnumsIndex().getWalletTypeStr(toWalletType)}`
                    })

                    await new MessageUtils().sendTextReply(ctx, `成功兑换: ${addMoney} ${new CommonEnumsIndex().getWalletTypeStr(toWalletType)}`)
                    await queryRunner.commitTransaction()
                    await WalletHandleMethod.startCommandCallback(ctx)
                }
            } catch (err) {
                await queryRunner.rollbackTransaction()
            }
        }, async () => {

        })
    }
}

export default WalletHandleShangduiMethod
