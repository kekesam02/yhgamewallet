/**
 * 红包相关处理
 */
import {Context} from "telegraf";
import MessageUtils from "../../../../commons/message/MessageUtils";
import ButtonUtils from "../../../../commons/button/ButtonUtils";
import StartWalletEnum from "../../../../type/walletEnums/StartWalletEnum";
import ButtonCommonMap from "../../../../commons/button/ButtonCommonMap";
import WalletType from "../../../../type/WalletType";
import UserModel from "../../../../models/UserModel";
import CommonEnumsIndex from "../../../../type/CommonEnumsIndex";
import {addLock, addLockByCtx} from "../../../../config/redislock";
import {queryRunner} from "../../../../config/database";
import ContextUtil from "../../../../commons/ContextUtil";
import RedPacketHtml from "../../../../html/walletHtml/RedPacketHtml";
import BotHb from "../../../../models/BotHb";
import WalletController from "../../../controller/WalletController";
import redis from "../../../../config/redis";
import BotPaymentModel from "../../../../models/BotPaymentModel";
import PaymentType from "../../../../type/PaymentType";



class WalletRedPacket {

    private readonly ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 点击红包按钮触发 - 跳转到添加红包页面
     */
    public addRedPacket = async () => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '请在下面按钮操作您的红包：',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: ButtonCommonMap.addBtnContent,
                        query: StartWalletEnum.HONGBAO_ADD
                    }
                ],
                [
                    {
                        text: ButtonCommonMap.backBtnContent,
                        query: StartWalletEnum.CLOSE_COMPUTER
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        await new BotHb().init(this.ctx)
        return true
    }

    /**
     * 点击添加红包按钮触发 - 跳转到选择货币页面
     */
    public selectWallType = async () => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '请在下面按钮操作您的红包：',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: 'USDT',
                        query: StartWalletEnum.HONGBAO_WALLET_USDT
                    }, {
                        text: "TRX",
                        query: StartWalletEnum.HONGBAO_WALLET_TRX
                    }
                ],[
                    {
                        text: ButtonCommonMap.backOne,
                        query: StartWalletEnum.HONGBAO_CANCEL_1
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        return true
    }

    /**
     * 点击选择红包金额类型按钮触发 - 跳转到选择红包类型页面
     */
    public selectRedPacketType = async (wallType: WalletType) => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '\uD83E\uDDE7 请选择发送类型：',
            new ButtonUtils().createCallbackBtn([
                    [
                        {
                            text: '随机包',
                            query: StartWalletEnum.HONGBAO_TYPE_RENDOM
                        }, {
                            text: "均分包",
                            query: StartWalletEnum.HONGBAO_TYPE_MIDDLE
                        }
                    ], [
                        {
                            text: ButtonCommonMap.backOne,
                            query: StartWalletEnum.HONGBAO_CANCEL_2
                        }
                    ]
            ]).reply_markup.inline_keyboard
        )
        return new BotHb().saveWalletType(this.ctx, wallType)
    }

    /**
     * 点击红包类型触发 - 跳转到红包金额输入页面
     * @param redPacketType: 红包类型
     *      0: 均分包
     *      1: 随机包
     */
    public inputMoney = async (redPacketType: number) => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '\uD83D\uDCA1 请回复你要发送的总金额()? 例如: 8.88',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: "\uD83D\uDEAB取消",
                        query: StartWalletEnum.HONGBAO_CANCEL_1
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        return new BotHb().saveMiddleType(this.ctx, redPacketType)
    }

    /**
     * 输入红包金额结束 - 发送输入红包数量按钮
     */
    public sendInputLength = async (money: string) => {
        let result = await new BotHb().saveMoney(this.ctx, money)
        if (result) {
            await new MessageUtils().botSendTextToBot(
                this.ctx,
                '\uD83D\uDCA1 请回复你要发送的数量()? 例如: 10',
                new ButtonUtils().createCallbackBtn([
                    [
                        {
                            text: "\uD83D\uDEAB取消",
                            query: StartWalletEnum.HONGBAO_CANCEL_1
                        }
                    ]
                ]).reply_markup
            )
        }
        return false
    }

    /**
     * 输入红包数量输入结束 - 返回确认支付按钮
     */
    public sendPayButton = async (length: string) => {
        console.log('保存发送红包的数量', length)
        let isSave = await new BotHb().saveLength(this.ctx, length)
        if (!isSave) {
            return false
        }
        let result = await new BotHb().getRedisData(this.ctx)
        if (result) {
            await new MessageUtils().botSendTextToBot(
                this.ctx,
                `\uD83D\uDCA1 发送${result.num}个红包\n支付金额${result.money}${result.hbType == 0? '随机': '均分'}${new CommonEnumsIndex().getWalletTypeStr(result.walletType)}`,
                new ButtonUtils().createCallbackBtn([
                    [
                        {
                            text: "确认支付",
                            query: StartWalletEnum.HONGBAO_TYPE_PAY
                        }, {
                            text: "\uD83D\uDEAB取消",
                            query: StartWalletEnum.HONGBAO_CANCEL_1
                        }
                    ]
                ]).reply_markup
            )
        }
        return false
    }

    /**
     * 确认支付
     */
    public startPay = async () => {
        await addLockByCtx(this.ctx,async () => {
            await queryRunner.startTransaction()
            let user = await queryRunner.manager.findOne(UserModel, {
                where: {
                    tgId: ContextUtil.getUserId(this.ctx)
                }
            }) as UserModel
            await queryRunner.commitTransaction()
            if (!user) {
                return false
            }
            let result = await new BotHb().startPay(this.ctx, user)
            if (result) {
                let redPacket = new BotHb().getRedisData(this.ctx)
                if (!redPacket) {
                    return false
                }
                // 密码验证通过、红包进行持久化存储
                let botHb = await new BotHb().saveLocalData(this.ctx)
                if (!botHb) {
                    return false
                }
                let html = new RedPacketHtml().getSuccessHtml(user, botHb)
                await new MessageUtils().botSendTextToBot(this.ctx, html, WalletController.createSendHbBtn(botHb.hbId).reply_markup)
            }
            return false
        }, async () => {
            console.log('保存红包失败')
        })
    }

    /**
     * 发送设置红包备注文案
     */
    public sendRemarkIpt = async (hbId: string) => {
        try {
            await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), `hongbaoRemark_${hbId}`)
            await new MessageUtils().sendTextReply(
                this.ctx,
                `💡请输入备注信息（150字内）`
            )
        } catch (err) {

        }
    }

    /**
     * 设置备注文字
     */
    public setRemark = async (text: string, hbId: string) => {
        console.log('传入的红包id-----', hbId)
        console.log('备注文字------', text)
        let botHb = await new BotHb().getBotHb(hbId)
        if (!botHb) {
            return
        }
        await queryRunner.startTransaction()
        let user = await queryRunner.manager.findOne(UserModel, {
            where: {
                tgId: ContextUtil.getUserId(this.ctx)
            }
        }) as UserModel
        await queryRunner.commitTransaction()
        try {
            botHb.remark = text
            await botHb.setBotHb()
            let html = new RedPacketHtml().getSuccessHtml(user, botHb)
            await new MessageUtils().botSendTextToBot(this.ctx, html, WalletController.createSendHbBtn(botHb.hbId).reply_markup)
        } catch (err) {

        }
    }

    /**
     * 设置红包领取条件
     */
    public setGainCondition = (hbId: string) => {

    }


    // -------------- 下面是领取红包之类的
    /**
     * 点击领取红包回掉
     * @param hbId: 红包id
     */
    public receiveCallback = async (hbId: string) => {
        console.log('点击领取红包按钮了', hbId)

        await addLock([hbId],  async () => {
            let botHb = await new BotHb().getBotHb(hbId)
            // 当前红包已经领完了
            if (!botHb || botHb.receiveNum - botHb.num >= 0) {
                return new MessageUtils().sendPopMessage(this.ctx, '来晚一步，红包已经领完了')
            }

            let result = await botHb.receiveHb(this.ctx)
            if (result) {
                // 领取成功处理
                let paymentList = await new BotPaymentModel().getPaymentByHB(hbId)
                paymentList = paymentList.filter(item => item.paymentType == PaymentType.LHB)
                console.log('获取到的订单列白哦', paymentList)
                let user = await new UserModel().getUserModelById(botHb.tgId)
                if (!user) {
                    return
                }
                let html = new RedPacketHtml().getSendHtml(user, botHb, paymentList)
                console.log('开始更新消息')
                await new MessageUtils().editedMessage(this.ctx, html, WalletController.receiveHbBtn(botHb.hbId).reply_markup)
                console.log('更新消息结束')
            } else {
                return new MessageUtils().sendPopMessage(this.ctx, '领取失败')
            }
        }, () => {
            return new MessageUtils().sendPopMessage(this.ctx, '来晚一步，红包已经领完了')
        })
    }

}



export default WalletRedPacket
