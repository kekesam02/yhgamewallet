import ButtonUtils from "../../commons/button/ButtonUtils";

/**
 * 公共的游戏控制器
 *      主要控制一些公共方法按钮之类的东西
 */
class GameController {

    /**
     * 查看余额按钮
     * @private key: 按钮名称 value: 回调 value
     */
    public static lookBalance = {
        text: '\uD83D\uDCB0查看余额',
        query: 'lookBalance'
    }

    /**
     * 最近投注
     */
    public static recentBetting = {
        text: '\uD83C\uDFAE最近投注',
        query: 'recentBetting'
    }

    /**
     * 流水
     */
    public static flowingWater = {
        text: '\uD83D\uDC8E流水',
        query: 'flowingWater'
    }

    /**
     * 盈亏
     */
    public static profitLoss = {
        text: '⚖️盈亏',
        query: 'profitLoss'
    }

    /**
     * 充值
     */
    public static recharge = {
        text: '\uD83D\uDE80充值',
        url: 'https://t.me/VertexPaybot?start=deposit'
    }

    /**
     * 提现
     */
    public static withdrawal = {
        text: '\uD83C\uDFF5提现',
        url: 'https://t.me/VertexPaybot?start=withdraw'
    }

    /**
     * 客户
     */
    public static customer = {
        text: '\uD83C\uDFEA官方客服',
        url: 'https://t.me/Yhclub01'
    }

    /**
     * 财务
     */
    public static finance = {
        text: '\uD83C\uDFE6官方财务',
        url: 'https://t.me/fjbfjb888'
    }


    /**
     * 生成游戏下方的公共按钮列表（查看余额、最近投注之类的）
     */
    public createCommonBtnList = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                GameController.lookBalance,
                GameController.recentBetting
            ],
            [
                GameController.flowingWater,
                GameController.profitLoss
            ],
            [
                GameController.recharge,
                GameController.withdrawal
            ],
            [
                GameController.customer,
                GameController.finance
            ]
        ])
    }

    /**
     * 生成充值按钮
     */
    public createTopUpBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                GameController.recharge
            ]
        ])
    }

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



export default GameController
