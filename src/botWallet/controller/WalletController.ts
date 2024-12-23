import ButtonUtils from "../../commons/button/ButtonUtils";

/**
 * 公共的游戏控制器
 * 主要控制一些公共方法按钮之类的东西
 */
class WalletController {

    /**
     * 创建空按钮组
     */
    public createEmptyBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
            ]
        ])
    }

}

export default WalletController
