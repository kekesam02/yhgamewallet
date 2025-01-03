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
import MessageTipUtils from "../../../../commons/message/MessageTipUtils";
import moment from "moment";
import botPaymentModel from "../../../../models/BotPaymentModel";
import ComputeUtils from "../../../../commons/compute/ComputeUtils";
import ButtonInnerQueryUtils from "../../../../commons/button/ButtonInnerQueryUtils";



class WalletRedPacket {

    private readonly ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 点击红包按钮触发 - 跳转到添加红包页面
     */
    public addRedPacket = async () => {
        let buttonList =  new ButtonUtils().createCallbackBtn([])
        let addBtnList = () => {
            buttonList.reply_markup.inline_keyboard.push([
                {
                    text: ButtonCommonMap.addBtnContent,
                    callback_data: StartWalletEnum.HONGBAO_ADD,
                    url: ''
                }
            ])
            buttonList.reply_markup.inline_keyboard.push([
                {
                    text: ButtonCommonMap.backBtnContent,
                    callback_data: StartWalletEnum.HONGBAO,
                    url: ''
                }
            ])
        }
        let botHbList = await new BotHb().getBotHbList(ContextUtil.getUserId(this.ctx))
        if (botHbList.length > 0) {
            botHbList.forEach(item => {
                buttonList.reply_markup.inline_keyboard.push([
                    {
                        text: `\uD83E\uDDE7 [${moment(item.createTime).format('MM-DD HH:mm')}] ${item.receiveNum ?? item.num}/${item.num} - ${new CommonEnumsIndex().getWalletTypeStr(item.walletType)}`,
                        callback_data: StartWalletEnum.HONGBAO_INFO + item.hbId,
                        url: ''
                    }
                ])
            })
            addBtnList()
            await new MessageUtils().sendTextReply(
                this.ctx,
                '从下面的列表中选择一个红包',
                buttonList.reply_markup.inline_keyboard
            )
        } else {
            addBtnList()
            await new MessageUtils().sendTextReply(
                this.ctx,
                '请在下面按钮操作您的红包：',
                buttonList.reply_markup.inline_keyboard
            )
        }
        await new BotHb().init(this.ctx)
        return true
    }

    /**
     * 查看红包详情触发
     */
    public lookRedPacketInfo = async (hbId: string) => {
        let user = await new UserModel().getUserModel(this.ctx)
        let botHb = await new BotHb().getBotHb(hbId)
        if (!botHb || !user) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        let html = new RedPacketHtml().getSuccessHtml(user, botHb)
        await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), `hongbaoWaterMoney_${hbId}`)
        await new MessageUtils().botSendTextToBot(this.ctx, html, WalletController.createSendHbBtn(botHb.hbId).reply_markup)
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
            await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), ``)
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
                await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), `hongbaoWaterMoney_${botHb.hbId}`)
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
            await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), `hongbaoWaterMoney_${hbId}`)
            await new MessageUtils().botSendTextToBot(this.ctx, html, WalletController.createSendHbBtn(botHb.hbId).reply_markup)
        } catch (err) {

        }
    }

    /**
     * 设置红包领取条件
     */
    public setGainCondition = async (hbId: string) => {
        console.log('设置领取红包条件')
        let user = await new UserModel().getUserModel(this.ctx)
        let botHb = await new BotHb().getBotHb(hbId)
        if (!botHb || !user) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        await this.updateCondition(user, botHb, true)
    }

    /**
     * 设置会员验证功能
     */
    public setVipVeri = async (text: string) => {
        let hbId = text.split('_')[0]
        let condition = text.split('_')[1]
        console.log('设置会员验证功能', text)
        let botHb = await new BotHb().getBotHb(hbId)
        let user = await new UserModel().getUserModel(this.ctx)
        if (!botHb || !user) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        botHb.conditonshy = Number(condition)
        await botHb.setBotHb()
        await this.updateCondition(user, botHb, false)
    }

    /**
     * 设置验证码验证功能
     */
    public setCodeVeri = async (text: string) => {
        let hbId = text.split('_')[0]
        let condition = text.split('_')[1]
        console.log('设置验证码', text)
        let botHb = await new BotHb().getBotHb(hbId)
        let user = await new UserModel().getUserModel(this.ctx)
        if (!botHb || !user) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        botHb.conditonsyzm = Number(condition)
        botHb.createVerifyCodeData()
        await botHb.setBotHb()
        await this.updateCondition(user, botHb, false)
    }

    /**
     * 开启流水红包验证
     */
    public startWaterVeri = async (text: string) => {
        let hbId = text.split('_')[0]
        await new MessageUtils().botSendTextToBot(
            this.ctx,
            '\uD83D\uDCA6 请选择流水红包时间',
            WalletController.waterHBTimeBtn(hbId).reply_markup
        )
    }

    /**
     * 选择红包流水时间触发
     */
    public selectWaterTime = async (text: string) => {
        let hbId = text.split('_')[0]
        let timeType = text.split('_')[1]
        let botHb = await new BotHb().getBotHb(hbId)
        if (!botHb) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        botHb.setWaterJson({
            time: Number(timeType),
            money: '0'
        })
        botHb.conditonsls = 1
        await botHb.setBotHb()
        await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), `hongbaoWaterMoney_${hbId}`)
        let html = new RedPacketHtml().createRedWaterMoney()
        await new MessageUtils().sendTextReply(
            this.ctx,
            html
        )
    }

    /**
     * 设置红包流水金额
     */
    public setWaterMoney = async (text: string, hbId: string) => {
        if (isNaN(Number(text))) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        let botHb = await new BotHb().getBotHb(hbId)
        if (!botHb) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        let json = botHb.getConditionJson()
        if (!json) {
            return new MessageTipUtils().handleErr(this.ctx)
        }
        botHb.setWaterJson({
            time: json.time,
            money: text
        })
        await botHb.setBotHb()
        let user = await new UserModel().getUserModel(this.ctx)
        await redis.set('currentop' + ContextUtil.getUserId(this.ctx, false), ``)
        await this.updateCondition(user, botHb, true, false)
    }

    /**
     * 更新/设置 红包领取条件文案
     * @param user
     * @param botHb
     * @param isAdd: true: 新增 false: 更新
     * @param isRemove: 是否删除之前的消息
     */
    public updateCondition = async (user: UserModel, botHb: BotHb, isAdd = true, isRemove = true) => {
        let button = WalletController.createConditionBtn(botHb)
        let html = new RedPacketHtml().getConditionHtml(user, botHb)
        if (isAdd) {
            if (isRemove) {
                await new MessageUtils().removeMessage(this.ctx)
            }
            await new MessageUtils().botSendTextToBot(this.ctx, html, button.reply_markup)
        } else {
            await new MessageUtils().editedMessage(this.ctx, html, button.reply_markup)
        }
    }


    // -------------- 下面是领取红包之类的
    /**
     * 验证红包验证码是否正确
     */
    public verifyCode = async (text: string) => {
        let hbId = text.split('_')[0]
        let code = text.split('_')[1]
        let botHb = await new BotHb().getBotHb(hbId)
        if (!botHb) {
            return new MessageTipUtils().redPacketExpired(this.ctx)
        }
        let user = await new UserModel().getUserModelById(botHb.tgId)
        if (!user) {
            return new MessageTipUtils().userNotTips(this.ctx)
        }
        let paymentList = await new BotPaymentModel().getPaymentByHB(hbId)
        paymentList = paymentList.filter(item => item.paymentType == PaymentType.LHB)
        if (code == botHb.getVerifyCodeData().sum) {
            let html = new RedPacketHtml().getSendHtml(user, botHb, paymentList)
            return  await new MessageUtils().editedMessage(this.ctx, html, WalletController.receiveHbBtn(botHb.hbId).reply_markup)
        } else {
            return await new MessageUtils().sendPopMessage(this.ctx, '请选择正确的验证码')
        }
    }

    /**
     * 点击领取红包回掉
     * @param hbId: 红包id
     */
    public receiveCallback = async (hbId: string) => {
        await addLock([hbId],  async () => {
            let botHb = await new BotHb().getBotHb(hbId)

            // 当前红包已经领完了
            if (!botHb) {
                return new MessageUtils().sendPopMessage(this.ctx, '来晚一步，红包已经领完了')
            }
            if (botHb.receiveNum - botHb.num >= 0){
                await this.updateReceiveHtml(hbId, botHb)
                return new MessageUtils().sendPopMessage(this.ctx, '来晚一步，红包已经领完了')
            }

            // 验证用户是否有领取红包的资格
            let isPermission = await this.verifyReceivePermission(this.ctx, botHb)
            if (!isPermission) {
                return false
            }

            // 开始领取红包
            let result = await botHb.receiveHb(this.ctx)
            if (result) {
                await this.updateReceiveHtml(hbId, botHb)
            } else {
                return new MessageUtils().sendPopMessage(this.ctx, '领取失败')
            }
        }, () => {
            return new MessageUtils().sendPopMessage(this.ctx, '来晚一步，红包已经领完了')
        })
    }

    /**
     * 点击红包不管能否领取都要尝试更新红包信息
     */
    public updateReceiveHtml = async (hbId: string, botHb: BotHb) => {
        // 领取成功处理
        let paymentList = await new BotPaymentModel().getPaymentByHB(hbId)
        paymentList = paymentList.filter(item => item.paymentType == PaymentType.LHB)
        let user = await new UserModel().getUserModelById(botHb.tgId)
        if (!user) {
            return
        }
        let html = new RedPacketHtml().getSendHtml(user, botHb, paymentList)
        await new MessageUtils().editedMessage(this.ctx, html, WalletController.receiveHbBtn(botHb.hbId).reply_markup)
    }

    /**
     *  验证用户是否有资格领取红包
     */
    public verifyReceivePermission = async (ctx: Context, botHb: BotHb): Promise<boolean> => {
        let verify1 = this.verifyVip(ctx, botHb)
        if (!verify1) {
            await new MessageUtils().sendPopMessage(ctx, '仅限 Premium会员领取')
            return false
        }
        let verify2 = await this.verifyWater(ctx, botHb)
        if (!verify2) {
            await new MessageUtils().sendPopMessage(ctx, '亲！流水还未达标哦')
            return false
        }
        return false
    }

    /**
     * 验证用户是否是 tg 会员
     */
    public verifyVip = (ctx: Context, botHb: BotHb): boolean => {
        if (botHb.conditonshy == 1) {
            if (ctx.callbackQuery && ctx.callbackQuery.from.is_premium) {
                return true
            }
            return false
        }
        console.log('跳过会员验证')
        return true
    }

    /**
     * 验证用户的流水是否达标
     */
    public verifyWater = async (ctx: Context, botHb: BotHb): Promise<boolean> => {
        if (botHb.conditonsls == 1) {
            let result = await new botPaymentModel().getUserWaterClass(ctx)
            let json = botHb.getConditionJson()
            if (!json) {
                return true
            }
            switch (json.time) {
                case 0:
                    // 日流水金额
                    return new ComputeUtils(result.dayWater).comparedTo(json.money) >= 0;
                case 1:
                    // 近七天流水金额
                    return new ComputeUtils(result.weekWater).comparedTo(json.money) >= 0;
                case 2:
                    // 近30天流水金额
                    return new ComputeUtils(result.day30Water).comparedTo(json.money) >= 0;
                case 3:
                    // 本月流水金额
                    return new ComputeUtils(result.monthWater).comparedTo(json.money) >= 0;
                case 4:
                    // 总流水金额
                    return new ComputeUtils(result.totalWater).comparedTo(json.money) >= 0;
                default:
                    return true
            }
        }
        console.log('跳过验证')
        return true
    }

}



export default WalletRedPacket
