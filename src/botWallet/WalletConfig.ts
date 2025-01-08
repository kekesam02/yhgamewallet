import { getConfig } from "../config/config";

/**
 * 钱包配置
 */
class WalletConfig {

    // 钱包机器人
    static walltPayBotURL = ()=> getConfig().botConfig.WalletUrl
    // 转账使用
    static walltPayBotInlineURL =  ()=>getConfig().botConfig.WalletUrl+'?start=inline_'
    // 收款使用
    static walltPayBotSKInlineURL =  ()=>getConfig().botConfig.WalletUrl+'?start=shoukuan_'
    // 点击收款余额不足的充值返回
    static walltPayBotChongZhiURL =  ()=>getConfig().botConfig.WalletUrl+'?start=deposit'
    // 登陆使用
    static walltPayBotLoginURL =  ()=>getConfig().botConfig.WalletUrl+'?start=login_'
    // 邀请好友
    static walltPayBotYaoQingURL =  ()=>getConfig().botConfig.WalletUrl+'?start=hy'
    // 个人跳转
    static MEURL:string = 'https://t.me/'
}

export default WalletConfig
