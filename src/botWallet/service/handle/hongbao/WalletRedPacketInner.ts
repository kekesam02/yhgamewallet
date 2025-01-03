import BotHb from "../../../../models/BotHb";
import {Context} from "telegraf";
import ButtonInnerQueryUtils from "../../../../commons/button/ButtonInnerQueryUtils";
import StartWalletEnum from "../../../../type/walletEnums/StartWalletEnum";
import ComputeUtils from "../../../../commons/compute/ComputeUtils";
import RedPacketHtml from "../../../../html/walletHtml/RedPacketHtml";
import BotPaymentModel from "../../../../models/BotPaymentModel";
import PaymentType from "../../../../type/PaymentType";
import UserModel from "../../../../models/UserModel";
import WalletController from "../../../controller/WalletController";
import CommonEnumsIndex from "../../../../type/CommonEnumsIndex";
import ButtonUtils from "../../../../commons/button/ButtonUtils";
import RandomUtils from "../../../../commons/compute/RandomUtils";
import {ButtonCallbackType} from "../../../../commons/button/ButtonCallbackType";

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
        await ctx.answerInlineQuery(
            ButtonInnerQueryUtils.createInnerQueryReplyUpDialog({
                id: queryId,
                title: `🧧剩余数量${new ComputeUtils(botHb.num).minus(botHb.receiveNum)}`,
                description: `金额${botHb.money} ${new CommonEnumsIndex().getWalletTypeStr(botHb.walletType)}`,
                input_message_content: {
                    message_text: new RedPacketHtml().getSendHtml(user, botHb, paymentList)
                },
                reply_markup: {
                    inline_keyboard: botHb.conditonsyzm == 1
                        ? this.createVerifyMessage(hbId, botHb).reply_markup.inline_keyboard
                        : WalletController.receiveHbBtn(botHb.hbId).reply_markup.inline_keyboard
                }
            })
        )
    }

    /**
     * 随机生成5个验证码按钮
     */
    public createVerifyMessage = (hbId: string, botHb: BotHb) => {
        let index = new RandomUtils().getRandomInt(0, 5)
        let arr: Array<Array<ButtonCallbackType>> = [[], []]
        let numList = new RandomUtils().getRandomIntList(0, 5, 6)
        for (let i = 0; i < numList.length; i++) {
            let item = numList[i]
            if (i == index) {
                if (i < 3) {
                    arr[0].push({ text: `${botHb.getVerifyCodeData().sum}`, query: StartWalletEnum.HONGBAO_VERIFY_BTN + hbId + '_' + botHb.getVerifyCodeData().sum})
                } else {
                    arr[1].push({ text: `${botHb.getVerifyCodeData().sum}`, query: StartWalletEnum.HONGBAO_VERIFY_BTN + hbId + '_' + botHb.getVerifyCodeData().sum})
                }
                continue
            }
            console.log('进入', i)
            if (i < 3) {
                arr[0].push({ text: `${item}`, query: StartWalletEnum.HONGBAO_VERIFY_BTN + hbId + '_' + item})
            } else {
                arr[1].push({ text: `${item}`, query: StartWalletEnum.HONGBAO_VERIFY_BTN + hbId + '_' + item})
            }
        }
        return new ButtonUtils().createCallbackBtn(arr)
    }


}


export default WalletRedPacketInner
