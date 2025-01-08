import { getConfig } from "../config/config";

/**
 * 钱包配置
 */
class WalletConfig {

    // 钱包机器人
    static walltPayBotURL:string = getConfig().botConfig.WalletUrl
    // 转账使用
    static walltPayBotInlineURL:string = this.walltPayBotURL+'?start=inline_'
    // 收款使用
    static walltPayBotSKInlineURL:string = this.walltPayBotURL+'?start=shoukuan_'
    // 点击收款余额不足的充值返回
    static walltPayBotChongZhiURL:string = this.walltPayBotURL+'?start=deposit'
    // 登陆使用
    static walltPayBotLoginURL:string = this.walltPayBotURL+'?start=login_'
    // 邀请好友
    static walltPayBotYaoQingURL:string = this.walltPayBotURL+'?start=hy'
    // 个人跳转
    static MEURL:string = 'https://t.me/'
}

export default WalletConfig
