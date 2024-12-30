/**
 * 娱乐机器人下注相关提示文案
 */
import BotGameConfig from "../../botGame/BotGameConfig";

class GameBettingTips {


    /**
     * 禁止对押金提示文案
     */
    public limitMaxMoney = () => {
        return `超过最大金额限制${new BotGameConfig().maxMoney28}`
    }

    /**
     * 禁止对押金提示文案
     */
    public onPledgeErrHtml = () => {
        return `禁止对押`
    }

    /**
     * 禁止返组合提示文案
     */
    public callbackHtml = () => {
        return `禁止反组合`
    }

    /**
     * 禁止双向下注
     */
    public twoWayHtml = () => {
        return `禁止双向下注`
    }

    /**
     * 禁止杀组合
     */
    public killGroupHtml = () => {
        return `禁止杀组合下注`
    }

    /**
     * 点杀数字最多下注10个
     */
    public killNumHtml = () => {
        return `点杀数字最多下注10个`
    }

    /**
     * 停止下注提示
     */
    public stopPledgeUpHtml = () => {
        return `当前已停止下注`
    }
}



export default GameBettingTips
