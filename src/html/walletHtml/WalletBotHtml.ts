import AESUtils from '../../commons/AESUtils'
import DateFormatUtils from '../../commons/date/DateFormatUtils'
import UserModel from "../../models/UserModel";

/**
 * 游戏机器人返回的html字段
 */
class WalletBotHtml {

    static getTixianHtml = ()=> {
       var  html = "\uD83D\uDD39 提现指南 \uD83D\uDD39\n" +
            "——————————————————\n" +
            "提现模板： 提现+金额 （比如：提现10）\n" +
            "——————————————————\n" +
            "\uD83D\uDD3A 1、最低提现金额：10 USDT\n" +
            "\uD83D\uDD3A 2、手续费：1 USDT，将从余额中扣除\n" +
            "\uD83D\uDD3A 3、提现操作不可撤销，请仔细核对信息\n" +
            "\uD83D\uDD3A 4、提现 USDT 将收取 1 USDT 手续费\n";
        return html
    }


    static getBotUserHtml = (s: string) => {
        // 获取当前日期和时间
        const formattedDate = DateFormatUtils .DateFormat(new Date());
        var html = '\n<strong>当前中国时间：' + formattedDate + '</strong>\n\n' +
            '\uD83D\uDCB0 充值专属钱包地址:  （目前只收TRC20 USDT，转错概不负责。）点击可复制\n' +
            '➖➖➖➖➖➖➖➖➖➖➖➖➖\n' +
            '<code>' + s + '</code>\n' +
            '➖➖➖➖➖➖➖➖➖➖➖➖➖\n' +
            '请仔细比对地址，如果和图片中地址不一致，请停止充值，立即重新安装飞机软件。';
        return html
    }
    /**
     * 生成开始游戏的html字符串
     */
    static getBotStartHtml = (tgId: number,addr:string, model: UserModel): string => {
        var vipHtml = "💎尊敬的<code>【"+model.nickName+"】</code>欢迎使用一号公馆钱包!";
        if (model.vip && model.vip < 10) {
            vipHtml = "💎尊贵的VIP" + model.vip + "💎\n";
        }
        var add = '';
        if (addr) {
            add = "\n🧾提现地址：<code>" + AESUtils.decodeAddr(model.rechargeLink) + "</code>\n";
        } else {
            add = "\n👐暂无提现地址请前往个人中心绑定👐\n";
        }
        return vipHtml + "\n🆔 账户ID：" + tgId +
            "\n\n🥯 USDT：" + model.USDT +
            "\n🥯 TRX：" + model.TRX +
            "\n💵 彩u：" + model.CUSDT +
            "\n💵 彩t：" + model.CTRX +
            "\n🥯 免密额度：" + model.withdrawalLimit + add +
            "\n\uD83C\uDFAE 游戏官方频道:@OnePalace " +
            "\uD83C\uDFAA\uD83C\uDFB2\uD83C\uDFB0";
    }
}


export default WalletBotHtml
