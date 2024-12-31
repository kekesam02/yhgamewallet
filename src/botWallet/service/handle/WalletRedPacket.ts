/**
 * 红包相关处理
 */
import {Context} from "telegraf";
import messageUtils from "../../../commons/message/MessageUtils";
import MessageUtils from "../../../commons/message/MessageUtils";
import ButtonUtils from "../../../commons/button/ButtonUtils";
import StartWalletEnum from "../../../type/walletEnums/StartWalletEnum";
import ButtonCommonMap from "../../../commons/button/ButtonCommonMap";
import RedPacketModel from "../../../models/RedPacketModel";
import WalletType from "../../../type/WalletType";



class WalletRedPacket {

    private readonly ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 点击红包按钮触发 - 跳转到添加红包页面
     */
    public addRedPacket = async () => {
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
        return new MessageUtils().removeMessage(this.ctx)
    }

    /**
     * 点击添加红包按钮触发 - 跳转到选择货币页面
     */
    public selectWallType = async () => {
        await new MessageUtils().sendTextReply(
            this.ctx,
            '请在下面按钮操作您的红包：',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: 'USDT',
                        query: StartWalletEnum.HONGBAO_ADD
                    }, {
                        text: "TRX",
                        query: StartWalletEnum.CLOSE_COMPUTER
                    }
                ],[
                    {
                        text: ButtonCommonMap.backOne,
                        query: StartWalletEnum.HONGBAO_CANCEL_1
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        new RedPacketModel().saveInit(this.ctx)
        return new MessageUtils().removeMessage(this.ctx)
    }

    /**
     * 点击选择红包金额类型按钮触发 - 跳转到选择红包类型页面
     */
    public selectRedPacketType = async (wallType: WalletType) => {
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
        new RedPacketModel(0, wallType).saveWalletType(this.ctx, wallType)
        return new MessageUtils().removeMessage(this.ctx)
    }

    /**
     * 点击红包类型触发 - 跳转到红包金额输入页面
     * @param redPacketType: 红包类型
     *      0: 均分包
     *      1: 随机包
     */
    public inputMoney = async (redPacketType: number) => {
        await new MessageUtils().sendTextReply(
            this.ctx,
            '\uD83D\uDCA1 请回复你要发送的总金额()? 例如: 8.88：',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: "\uD83D\uDEAB取消",
                        query: StartWalletEnum.CLOSE_COMPUTER
                    }
                ], [
                    {
                        text: ButtonCommonMap.backOne,
                        query: StartWalletEnum.HONGBAO_CANCEL_1
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        new RedPacketModel().saveMiddleType(this.ctx, redPacketType)
        return new MessageUtils().removeMessage(this.ctx)
    }
}



export default WalletRedPacket
