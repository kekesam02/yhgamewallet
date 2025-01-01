import BotHb from "../../../../models/BotHb";
import {Context} from "telegraf";
import ButtonInnerQueryUtils from "../../../../commons/button/ButtonInnerQueryUtils";
import {getConfig} from "../../../../config/config";
import StartWalletEnum from "../../../../type/walletEnums/StartWalletEnum";
import ComputeUtils from "../../../../commons/compute/ComputeUtils";
import RedPacketHtml from "../../../../html/walletHtml/RedPacketHtml";
import BotPaymentModel from "../../../../models/BotPaymentModel";
import PaymentType from "../../../../type/PaymentType";
import UserModel from "../../../../models/UserModel";
import WalletController from "../../../controller/WalletController";
import CommonEnumsIndex from "../../../../type/CommonEnumsIndex";

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
        console.log('当前红包类型', botHb.hbType)
        botHb.createJson()
        botHb.hbType = 1
        botHb.createJson()
        await ctx.answerInlineQuery(
            ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: `🧧剩余数量${new ComputeUtils(botHb.num).minus(botHb.receiveNum)}`,
                description: `金额${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}`,
                input_message_content: {
                    message_text: new RedPacketHtml().getSendHtml(user, botHb, paymentList)
                },
                reply_markup: {
                    inline_keyboard: WalletController.receiveHbBtn(botHb.hbId)
                }
            })
        )
    }
}


export default WalletRedPacketInner
