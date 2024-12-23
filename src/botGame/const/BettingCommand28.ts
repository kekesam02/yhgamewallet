import BotGameModel from "../../models/BotGameModel";
import {Context} from "telegraf";
import BotOddsModel from "../../models/BotOddsModel";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";


/**
 * 下注指令相关
 */
class BettingCommand28 {

    public ctx: Context

    /**
     * 当前所在群组信息
     */
    public group: BotGameModel

    /**
     * 当前游戏类型的赔率表
     */
    public oddsList: Array<BotOddsModel>

    public commandList = [
        /**
         * 大
         */
        ['大', 'D'],

        /**
         * 小
         */
        ['小', 'x'],

        /**
         * 单
         */
        ['单', 'd'],

        /**
         * 双
         */
        ['双', 's'],

        /**
         * 大单
         */
        ['大单', 'dd'],

        /**
         * 小单
         */
        ['小单', 'xd'],


        /**
         * 大双
         */
        ['大双', 'ds'],

        /**
         * 小双
         */
        ['小双', 'xs'],

        /**
         * 对子
         */
        ['对子', 'dz'],

        /**
         * 顺子
         */
        ['顺子', 'sz'],

        /**
         * 豹子
         */
        ['豹子', 'bz'],

        /**
         * 极大
         */
        ['极大', 'jd'],

        /**
         * 极小
         */
        ['极小', 'jx'],

        /**
         * 梭哈
         */
        ['梭哈', 'sh'],

        /**
         * 点杀
         */
        ['点杀', '.']
    ]

    constructor(
        ctx: Context,
        group: BotGameModel,
        oddsList: Array<BotOddsModel>
    ) {
        this.ctx = ctx
        this.group = group
        this.oddsList = oddsList
    }

    /**
     * 监听用户 pc28 下注指令
     */
    public listenerCommand = (
    ) => {
        let text = this.ctx.text!
        let commandStr = text
        // 是否是梭哈
        let allIn = false
        // 梭哈
        if (text.indexOf('梭哈') == 0 || text.indexOf('sh') == 0 ) {
            commandStr = text.substring(2, text.length)
            allIn = true
        }

        // 当前是点杀数字
        if (text.indexOf('杀') > -1 || text.indexOf('.') > -1) {
            let arr = text.indexOf('杀') > -1? text.split('杀'): text.split('.')
            let money = Number(arr[2])
            // 当前点杀数字
            let code = Number(arr[0])
            if (isNaN(money) || isNaN(code)) {
                // 金额解析错误
                return
            }
            if (code > -1 || code < 27) {
                // 点杀数字符合规则
                this.startBetting(text, `${money}`, this.commandList[this.commandList.length - 1])
            }
        }

        let curr = this.commandList.find(item => {
            if (item[0] == commandStr.substring(0, item[0].length)
                || item[1] == commandStr.substring(0, item[1].length)
            ) {
                return item
            }
        })
        if (!curr) return;
        if (allIn) {
            // 梭哈处理
            return this.startBetting(text, '梭哈', curr)
        }
        let money = curr[0] == text.substring(0, curr[0].length)
            ? text.replaceAll(curr[0]!, '')
            : text.replaceAll(curr[1]!, '')
        if (isNaN(Number(money))) {
            // 没有传入金额chilled
            return
        }
        this.startBetting(text, money, curr)
    }

    /**
     * 开始下注
     * @param: 下注内容
     * @param: 下注金额
     * @param: 当前下注的指令(大双、大单之类的)
     */
    public startBetting = (
        content: string,
        money: string,
        currCommand: Array<string>
    ) => {
        let currOdds = this.oddsList.find(item => {
            if (currCommand.includes(item.name) || currCommand.includes(item.alias)) {
                return item
            }
        })
        if (!currOdds) {
            return
        }
        console.log('当前下注内容', content)
        console.log('当前的赔率信息', currOdds)
        // 保存上注信息
        return new BotPledgeUpModel().createNewPledgeUp(
            this.ctx,
            123,
            money,
            this.group,
            content,
            content,
            currOdds
        )
    }
}


export default BettingCommand28
