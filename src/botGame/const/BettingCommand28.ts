import BotGameModel from "../../models/BotGameModel";
import {Context} from "telegraf";
import BotOddsModel from "../../models/BotOddsModel";
import BotPledgeUpModel, {PledgeUpInfoType} from "../../models/BotPledgeUpModel";
import StringUtils from "../../commons/StringUtils";
import ComputeUtils from "../../commons/ComputeUtils";
import ScheduleHandle from "../../commons/ScheduleHandle";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import MutexUtils, {accessResource} from "../../commons/lock/MutexUtils";


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

    /**
     * 公共下注指令
     */
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

    /**
     * pc28高倍下注指令
     * @private
     */
    private commandHeightList = [
        ...this.commandList,
        /**
         * 极大
         */
        ['极大', 'jd', '级大'],

        /**
         * 极小
         */
        ['极小', 'jx', '级小']
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
        if (parseList.list.length <= 0) {
            console.log('指令不存在直接退出')
            return
        }
        await accessResource(async () => {
            await new BotPledgeUpModel().createNewPledgeUp(
                this.ctx,
                this.group,
                parseList
            )
        })
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
            // 当前下注使用的指令
            let currCommandList = this.group.gameType == GameTypeEnum.PC28DI? this.commandList: this.commandHeightList
            // 获取当前指令
            let currCommand: Array<string> | undefined = currCommandList.find((item2, index2) => {
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
                let isExit = false;
                item2.forEach((item3, index3) => {
                    if (itemText.substring(0, item3.length) == item3) {
                        money = itemText.replaceAll(item3, '')
                        itemText = itemText.replaceAll(item3, item2[0])
                        isExit = true
                    }
                })
                if (isExit) {
                    return item2
                }
                return false
            })
            if (!currCommand) {
                console.log('指令不存在')
                break
            }

            // 如果是梭哈的话判定一下后面的指令能否对上、如果对不上直接break
            if (currCommand[0] == '梭哈') {
                if (money == '梭哈') {
                    break
                }
                let exit = currCommandList.find(item2 => item2.indexOf(money) > -1)
                if (!exit) {
                    break
                }
            }

            // 如果不是梭哈的话判定后面文字是否为数字、不是数字直接break
            if (currCommand[0] != '梭哈'
                && (
                    !money
                    || money == '0'
                    || money == ''
                    || isNaN(Number(money))
                )
            ) {
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
                resultList.totalMoney = new ComputeUtils(resultList.totalMoney).add(money).toString()
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
