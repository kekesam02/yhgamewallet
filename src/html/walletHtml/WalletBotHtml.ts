import AESUtils from '../../commons/AESUtils'
import UserModel from "../../models/UserModel";
import WalletUserModel from "../../models/WalletUserModel";

/**
 * 游戏机器人返回的html字段
 */
class WalletBotHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成开始游戏的html字符串
     */
    getBotStartHtml = (tgId:number,model:UserModel): string => {
        var vipHtml = '';
        if (model.vip && model.vip < 10) {
            vipHtml = "💎尊贵的VIP" + model.vip + "💎\n";
        }
        var add = '';
        if (model.rechargeLink) {
            add = "\n🧾提现地址：" + AESUtils.encodeAddr(model.rechargeLink) + "\n";
        } else {
            add = "\n👐D暂无提现地址请前往个人中心绑定👐\n";
        }
        return vipHtml + "\n🆔 账户ID：" + tgId +
            "\n👼 用户昵称：<code>" + model.nickName + "</code>\n" +
            "\n💰️ USDT：" + model.USDT +
            "\n💰️ TRX：" + model.TRX +
            "\n💵 彩u：" + model.CUSDT +
            "\n💵 彩t：" + model.CTRX + "\n" +
            add +
            "➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n" +
            "\uD83C\uDFAE 游戏官方频道:@OnePalace " +
            "\uD83C\uDFAA\uD83C\uDFB2\uD83C\uDFB0";
    }
}


export default WalletBotHtml
