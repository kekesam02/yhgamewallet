import BotHb from "../../../models/BotHb";
import {Context} from "telegraf";
import ButtonInnerQueryUtils from "../../../commons/button/ButtonInnerQueryUtils";
import {getConfig} from "../../../config/config";
import StartWalletEnum from "../../../type/walletEnums/StartWalletEnum";
import ComputeUtils from "../../../commons/compute/ComputeUtils";
import RedPacketHtml from "../../../html/walletHtml/RedPacketHtml";
import BotPaymentModel from "../../../models/BotPaymentModel";
import PaymentType from "../../../type/PaymentType";
import UserModel from "../../../models/UserModel";

/**
 * 红包内连消息处理
 */
class WalletRedPacketInner {

    public static InnerKey = 'redPacket '

    /**
     * 监听红包内连消息
     */
    public innerMessageHandle = async (ctx: Context, queryId: string, text: string) => {
        let hbId = text.split(' ')[1]
        let botHb = await new BotHb().getBotHb(hbId)
        let paymentList = await new BotPaymentModel().getPaymentByHB(hbId)
        paymentList = paymentList.filter(item => item.paymentType == PaymentType.LHB)
        console.log('获取到的红包对象', botHb)
        if (!botHb) {
            return
        }
        let user = await new UserModel().getUserModelById(botHb.tgId)
        if (!user) {
            return
        }
        botHb.createJson()
        botHb.hbType = 1
        botHb.createJson()
        await ctx.answerInlineQuery(
            ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: `🧧剩余数量${new ComputeUtils(botHb.num).minus(botHb.receiveNum)}\n金额${botHb.money}`,
                description: text,
                input_message_content: {
                    message_text: new RedPacketHtml().getSendHtml(user, botHb, paymentList)
                },
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🧧 领取红包',
                                callback_data: StartWalletEnum.HONGBAO_RECEIVE + hbId
                            },{
                                text: '\uD83D\uDCB0 钱包',
                                url: getConfig().botConfig.WalletUrl
                            }
                        ]
                    ]
                }
            })
        )
    }
}


export default WalletRedPacketInner
