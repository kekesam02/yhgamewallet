import BotGameModel from "../../models/BotGameModel";
import {Context} from "telegraf";
import BotOddsModel from "../../models/BotOddsModel";
import BotPledgeUpModel, {PledgeUpInfoType} from "../../models/BotPledgeUpModel";
import StringUtils from "../../commons/StringUtils";
import ComputeUtils from "../../commons/ComputeUtils";
import ScheduleHandle from "../../commons/ScheduleHandle";


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
        ['杀', '.'],

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
        ['双', 's']
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
    public listenerCommand = async (
    ) => {
        let text = this.ctx.text!
        let  parseList =  this.parseCommand(text)
        await new BotPledgeUpModel().createNewPledgeUp(
            this.ctx,
            this.group,
            parseList
        )
    }

    /**
     * 解析下注指令
     */
    public parseCommand = (text: string): PledgeUpInfoType => {
        let arr = text.split(' ')
        let resultList: PledgeUpInfoType = {
            roundId: Number(ScheduleHandle.pc28Config.roundId),
            totalMoney: '0',
            list: []
        }
        for (let i = 0; i < arr.length; i++) {
            let itemText = arr[i]
            // 当前下注金额
            let money = '0'
            // 当前是几杀
            let sha = ''
            // 获取当前指令
            let currCommand: Array<string> | undefined = this.commandList.find(item2 => {
                // 点杀处理
                if (item2[0] == '杀' && new StringUtils().isStartWithNum(itemText)) {
                    // 判断传入的是杀还是.   true 杀
                    let isStr = itemText.indexOf('杀') > -1
                    let first = isStr ? itemText.split('杀')[0]: itemText.split('.')[0]
                    sha = first + '杀'
                    money = isStr
                        ? itemText.replaceAll(first + '杀', '')
                        : itemText.replaceAll(first + '.', '')
                    if (!isStr) {
                        itemText = itemText.replaceAll(first + '.', first + '杀')
                    }
                    return item2
                }
                // 其他指令处理
                if (
                    itemText.substring(0, item2[0].length) == item2[0]
                    || itemText.substring(0, item2[1].length) == item2[1]
                ) {
                    money =  itemText.substring(0, item2[0].length) == item2[0]
                        ? itemText.replaceAll(item2[0], '')
                        : itemText.replaceAll(item2[1], '')
                    return item2
                }
            })
            if (!currCommand) {
                console.log('指令不存在')
                break
            }
            console.log('金币', money)

            // 如果是梭哈的话判定一下后面的指令能否对上、如果对不上直接break
            if (currCommand[0] == '梭哈') {
                if (money == '梭哈') {
                    break
                }
                let exit = this.commandList.find(item2 => item2.indexOf(money) > -1)
                if (!exit) {
                    break
                }
            }

            // 如果不是梭哈的话判定后面文字是否为数字、不是数字直接break
            if (currCommand[0] != '梭哈' && isNaN(Number(money))) {
                console.log('解析不到金额指令')
                break
            }

            // 获取赔率数据
            let odds: BotOddsModel | undefined = this.oddsList.find(item => {
                if (currCommand?.[0] == '杀') {
                    // 点杀处理
                    if (sha == item.name || sha == item.alias) {
                        return item
                    }
                } else if (currCommand?.[0] == '梭哈') {
                    // 梭哈处理
                    if (money.indexOf(item.name) > -1 || money.indexOf(item.alias) > -1) {
                        return item
                    }
                } else {
                    if (currCommand!.includes(item.name) || currCommand!.includes(item.alias)) {
                        return item
                    }
                }

            })
            if (!odds) {
                break
            }

            // 获取投注总金额、在后面用来判定余额是否足够
            if (currCommand[0] != '梭哈') {
                // 设置下注的总金额
                resultList.totalMoney = new ComputeUtils(0).add(money).toString()
            }
            resultList.list.push({
                money: money,
                content: itemText,
                command: currCommand[0],
                odds: odds
            })
        }
        console.log('整理后的数据', resultList)
        return resultList
    }
}


export default BettingCommand28
