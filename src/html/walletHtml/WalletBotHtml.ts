import AESUtils from '../../commons/AESUtils'
import DateFormatUtils from '../../commons/date/DateFormatUtils'
import UserModel from "../../models/UserModel";

/**
 * 游戏机器人返回的html字段
 */
class WalletBotHtml {

    static getTixianHtml = ()=> {
       var  html = "\uD83D\uDD39 提现指南 \uD83D\uDD39\n" +
            "  \uD83D\uDD3A提现格式：提现+金额 （例如：提现100）\n" +
            "  \uD83D\uDD3A最低提现金额：10 USDT \uD83D\uDCB5\n" +
            "  \uD83D\uDD3A手续费：1 USDT，将从余额中扣除 \uD83D\uDCB8\n" +
            "\n" +
            "⚠️ 提现操作不可撤销，请仔细核对信息！\n" +
            "⚠️ 提现 USDT 将收取 1 USDT 手续费";
        return html
    }


    static getBotUserHtml = (s: string) => {
        // 获取当前日期和时间
        const formattedDate = DateFormatUtils .DateFormat(new Date());
        var html = '\n<strong>当前中国时间：' + formattedDate + '</strong>\n\n' +
            '\uD83D\uDCB0 充值专属钱包地址:  （目前只收TRC20 USDT，转错概不负责。）点击可复制\n' +
            '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n' +
            '<code>' + s + '</code>\n' +
            '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n' +
            '请仔细比对地址，如果和图片中地址不一致，请停止充值，立即重新安装飞机软件。';
        return html
    }
    /**
     * 生成开始游戏的html字符串
     */
    static getBotStartHtml = (tgId: number, model: UserModel): string => {
        var vipHtml = '';
        if (model.vip && model.vip < 10) {
            vipHtml = "💎尊贵的VIP" + model.vip + "💎\n";
        }
        var add = '';
        if (model.rechargeLink) {
            add = "\n🧾提现地址：" + AESUtils.decodeAddr(model.rechargeLink) + "\n";
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
