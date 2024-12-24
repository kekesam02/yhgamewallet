import ButtonUtils from "../../commons/button/ButtonUtils";

/**
 * 钱包
 * 主要控制一些公共方法按钮之类的东西
 */
class WalletController {

    /**
     * 返回首页
     */
    public static BackHome = {
        text: '↩️ 返回',
        query: 'backhome'
    }

    /**
     * 创建返回按钮
     */
    public createBackBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                WalletController.BackHome
            ]
        ])
    }

}

export default WalletController
