/**
 * 钱包消息提示类
 */
class WalletMessage {

    /**
     * 错误消息
     */
    static ERROR_CLIENT = '提示：尊敬的用户，网络繁忙中请稍后再试！如遇到问题可联系客服：@Yhclub01'

    /**
     * 密码消息
     * @param cacheValue
     * @constructor
     */
    static PASSWPORD_ERROR = '⚠️ 密码长度不够，必须是4位!'
    static PASSWPORD_EMPTY = '⚠️ 请输入密码'
    static C_PASSWPORD_ERROR = '⚠️ 密码输入不正确!'
    static PASSWORD_MESSAGE = (cacheValue: string) => {
        return "✅ 密码设置成功！当前密码是：(" + cacheValue + ")\n\n⚠️ 请牢记密码，你的所有资金都和密码绑定，请注意保管您的密码。"
    }
    static PASSWORD_SUCCESS_MESSAGE =  "✅ 验证成功！欢迎使用一号公馆钱包。"

    static PASSWORD_TIP = (arr: string[]) => {
        return "\uD83C\uDFE6欢迎使用一号公馆钱包\n为了您的资金安全\n✏️请输入 4 位支付密码\n\n" + arr.join("")
    }
    static C_PASSWORD_TIP = (arr: string[]) => {
        return "\uD83C\uDFE6欢迎使用一号公馆钱包\n为了您的资金安全\n✏请输入 4 位支付密码\n\n" + arr.join("")
    }

}


export default WalletMessage
