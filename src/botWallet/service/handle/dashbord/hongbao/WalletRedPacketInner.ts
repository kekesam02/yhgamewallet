import BotHb from "../../../../../models/BotHb";
import {Context} from "telegraf";
import ButtonInnerQueryUtils from "../../../../../commons/button/ButtonInnerQueryUtils";
import ComputeUtils from "../../../../../commons/compute/ComputeUtils";
import RedPacketHtml from "../../../../../html/walletHtml/RedPacketHtml";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import PaymentType from "../../../../../type/PaymentType";
import UserModel from "../../../../../models/UserModel";
import CommonEnumsIndex from "../../../../../type/CommonEnumsIndex";
import WalletRedPacket from "./WalletRedPacket";

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
        if (!botHb) {
            return
        }
        let user = await new UserModel().getUserModelById(botHb.tgId)
        if (!user) {
            return
        }
        let inlineKeyBoard = await new WalletRedPacket(ctx).createVerifyMessage(botHb)
        await ctx.answerInlineQuery(
            ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: `🧧剩余数量${new ComputeUtils(botHb.num).minus(botHb.receiveNum)}`,
                description: `金额${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}`,
                input_message_content: {
                    message_text: new RedPacketHtml().getSendHtml(user, botHb, paymentList)
                },
                reply_markup: inlineKeyBoard.reply_markup,
            })
        )
    }


}


export default WalletRedPacketInner
