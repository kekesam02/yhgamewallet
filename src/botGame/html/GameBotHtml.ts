/**
 * 游戏机器人返回的html字段
 */
import GameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";
import GameEnumsClass from "../../typeEnums/gameEnums/GameEnumsClass";
import gameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";
import StartGameEnum from "../../typeEnums/gameEnums/StartGameEnum";

class GameBotHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成开始游戏的html字符串
     */
    getStartGame = (): string => {
        return `欢迎使用一号公馆娱乐机器人\uD83C\uDFAA\n`
        + "\n<tg-emoji emoji-id=\"5368324170671202286\">\uD83D\uDC47</tg-emoji><b>请选择你要娱乐的游戏\uD83C\uDFAE</b><tg-emoji emoji-id=\"5368324170671202286\">\uD83D\uDC4D</tg-emoji>"
    }

    /**
     * 获取进入游戏模式字符串
     */
    getGameModelHtml = (gameType: StartGameEnum): string => {
        let gameTypeStr = new GameEnumsClass().getStartGameStr(gameType)
        let html = `
            进入游戏模式：${gameTypeStr}${
            this.N}----------------${
            this.N}常用指令：点击复制\uD83D\uDC47${
            this.N}1.<code>历史</code>或者<code>1</code>${
            this.N}2.<code>取消</code>或者<code>2</code>${
            this.N}3.<code>反水</code>或者<code>3</code>${
            this.N}4.<code>规则</code>或者<code>4</code>${this.N}
        `;
        return html
    }
}


export default GameBotHtml
