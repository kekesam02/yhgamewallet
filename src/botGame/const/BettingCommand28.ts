import BotGameModel from "../../models/BotGameModel";
import {Context} from "telegraf";
import BotOddsModel from "../../models/BotOddsModel";
import BotPledgeUpModel, {PledgeUpInfoType} from "../../models/BotPledgeUpModel";
import StringUtils from "../../commons/StringUtils";
import ComputeUtils from "../../commons/compute/ComputeUtils";
import ScheduleHandle from "../../commons/scheduleHandle/ScheduleHandle";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {addLockByCtx} from "../../config/redislock";
import BotGameConfig from "../BotGameConfig";
import MessageUtils from "../../commons/message/MessageUtils";
import GameBettingTips from "../../html/gameHtml/GameBettingTips";
import UserModel from "../../models/UserModel";
import WalletType from "../../type/WalletType";


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
        ['极大', 'jd', '级大'],

        /**
         * 极小
         */
        ['极小', 'jx', '级小'],

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
        ...this.commandList
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
            return new MessageUtils().sendTextReply(this.ctx, '请输入正确的下注指令')
        }

        // // 判断是否是USDT下注、如果是USDT下注没有下注限制
        let userModel = await new UserModel().getUserModel(this.ctx)
        let isJudge = false
        if (
            new ComputeUtils(userModel.CUSDT).comparedTo(parseList.totalMoney) < 0
            && new ComputeUtils(userModel.USDT).comparedTo(parseList.totalMoney) >= 0
        ) {
            isJudge = true
        }


        await addLockByCtx(this.ctx,async () => {
            // await queryRunner.startTransaction()
            // let userModelList = await queryRunner.manager.find(UserModel, {
            //     where: {
            //         tgId: AESUtils.encodeUserId(this.ctx?.from?.id.toString())
            //     }
            // }) as Array<UserModel>
            // if (userModelList.length < 0) {
            //     return
            // }
            // let userModel = userModelList[0]
            if (
                new ComputeUtils(userModel.CUSDT).comparedTo(parseList.totalMoney) < 0
                && new ComputeUtils(userModel.USDT).comparedTo(parseList.totalMoney) >= 0
            ) {
                isJudge = true
            }

            // 下注规则判定返回值
            let ruleNum = await this.ruleJudge(parseList, text)
            console.log('下注规则判定', ruleNum)
            // USDT 下注没有限制
            if (!isJudge) {
                // 用户对押
                if (ruleNum == 2) {
                    console.log('用户对押')
                    return new MessageUtils().sendTextReply(this.ctx, new GameBettingTips().onPledgeErrHtml())
                }
                // 杀组合下注限制
                if (ruleNum == 3) {
                    return new MessageUtils().sendTextReply(this.ctx, new GameBettingTips().killGroupHtml())
                }
                // 反组合下注限制
                if (ruleNum == 4) {
                    return new MessageUtils().sendTextReply(this.ctx, new GameBettingTips().callbackHtml())
                }
                // 双向下注限制
                if (ruleNum == 5) {
                    return new MessageUtils().sendTextReply(this.ctx, new GameBettingTips().twoWayHtml())
                }
            }
            // 用户下注金额超过最大限制
            if (ruleNum == 1) {
                console.log('用户对押')
                return new MessageUtils().sendTextReply(this.ctx, new GameBettingTips().limitMaxMoney())
            }
            // 点杀限制
            if (ruleNum == 6) {
                return new MessageUtils().sendTextReply(this.ctx, new GameBettingTips().killNumHtml())
            }

            // 开始上注
            await new BotPledgeUpModel().createNewPledgeUp(
                this.ctx,
                this.group,
                parseList
            )
            // ScheduleHandle.pc28Config.roundId = `${Number(ScheduleHandle.pc28Config.roundId) + 1}`
        }, async () => {
            console.log('上注出现错误')
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
            if (new StringUtils().isNum(itemText)) {
                break
            }
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
                if (exit) {
                    itemText = `${currCommand[0]}${exit[0]}`
                } else {
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
                    || money.split('.').length > 2
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

    /**
     * 判断用户下注是否符合规则
     *      0: 符合下注规则
     *      1: 超过最大金额限制
     *      2: 对押
     *      3: 杀组合
     *      4: 反组合
     *      5、存在双项下注限制、需要在根据数据库数据判定一次
     *      6、点杀最多下注10个数字
     */
    public ruleJudge = async (info: PledgeUpInfoType, currText: string): Promise<number> => {
        // 下注判定结果
        let {errIndex, killNum} = this.rule_onPledge(info)

        // 如果本次下注点杀数字大于10退出
        if (killNum > 10) {
             return 6
        }
        /**
         * 如果当前已经出现错误了直接退出
         * 如果当前下注数字不等于5证明不需要进行双向下注限制判定了
         * 如果点杀次数不等于1的话、需要从数据库进行查找本次下注的点杀数据
         */
        if (killNum == 0) {
            if (errIndex != 0 && errIndex != 5) {
                return errIndex
            }
        }

        // 本次下注条件满足需要从数据库取数据出来再次判定、只判定 cusdt
        let pledgeList = await new BotPledgeUpModel().getHistory(
            this.ctx,
            20,
            [
                GameTypeEnum.PC28GAO,
                GameTypeEnum.PC28DI
            ],
            [
                WalletType.CUSDT,
                WalletType.USDT
            ]
        )

        if (pledgeList.length > 0) {
            let currRoundId = Number(ScheduleHandle.pc28Config.roundId)
            // 本期多群下注text
            let currAllText = ''
            // 上期多群下注text
            let prevText = ''
            // 上次下注期数
            let prevRoundId: number = 0

            pledgeList.forEach((item, index) => {
                // 设置本期所有上注 text 数据
                if (currRoundId == item.roundId) {
                    currAllText = currAllText == ''
                        ? `${item.content}`
                        : `${currAllText} ${item.content}`
                }

                // 设置上期开奖期数
                if (prevRoundId == 0 && item.roundId != info.roundId) {
                    prevRoundId = item.roundId
                }
                // 设置上期开奖下注 text 数据
                if (prevRoundId != 0 && prevRoundId == item.roundId) {
                    prevText = prevText == ''
                        ? item.content
                        : `${prevText} ${item.content}`
                }
            })

            // 重新生成本期下注数据进行判定
            currAllText = currAllText == ''? currText: `${currText} ${currAllText}`
            // 本期多群下注整理后的数据
            let currAllInfo = this.parseCommand(currAllText)
            let result2 = this.rule_onPledge(currAllInfo)
            let returnNum2 = result2.errIndex
            let killNum2 = result2.killNum

            // 如果本次下注点杀数字大于10退出
            if (killNum2 > 10) {
                return 6
            }

            // 如果当前下注数字不等于5证明不需要进行双向下注限制判定了
            if (returnNum2 != 5) {
                return returnNum2
            }

            // 上期整理后的下注数据
            let prevInfo = this.parseCommand(prevText)
            let result3 = this.rule_onPledge(prevInfo, true)
            return result3.errIndex
        }

        return  errIndex
    }

    /**
     * 规则判定1、不能大小、单双对押
     *      双向下注：
     *          双向下注：一直买大单小双、或者大双小单
     *      普通列表判定:
     *          1、对押金：不能大小对押、单双对押 —  下了单不能下双 - 下了大不能下小
     *          2、杀组合：下注三个及以上普通组合
     *          3、反组合：大小单双配相反组合、比如大10、小单10；单10、小双10
     *      金额限制：
     *          最大金额 new BotGameConfig().maxMoney28 现在是1000
     *      组合下注：
     *          组合下注不能超过3个、如：大单10、大双10、小单10
     * @param info 本期下注数据
     * @param isTwo 是否只判断是否双向
     * @return {
     *     errIndex
     *          0: 符合下注规则
     *          1: 超过最大金额限制
     *          2: 对押
     *          3: 杀组合
     *          4: 反组合
     *          5、存在双项下注限制、需要在根据数据库数据判定一次
     *          6、点杀最多下注10个数字
     * }
     */
    private rule_onPledge = (info: PledgeUpInfoType, isTwo: boolean = false): {
        // 错误代码
        errIndex: number,
        // 点杀不同数字下注次数
        killNum: number
    } => {
        /**
         * 错误代码
         *  1: 超过最大金额限制
         *  2: 对押
         *  3: 双向下注
         *  4: 反组合
         *  5: 双向下注
         */
        let errIndex = 0
        // 最大下注金额限制
        let limitMoney = new BotGameConfig().maxMoney28
        if (new ComputeUtils(info.totalMoney).comparedTo(limitMoney) > 0) {
            errIndex = 1
            return {
                errIndex: errIndex,
                killNum: 0
            }
        }

        // 点杀 0和27 下注金额限制为500
        let shaSpecialMoney = new ComputeUtils(0)
        info.list.forEach(item => {
            console.log(item.money)
            if (item.command.indexOf('杀') > -1) {
                let key = item.content.split('杀')[0]
                if (
                    new ComputeUtils(key).comparedTo(0) == 0
                    || new ComputeUtils(key).comparedTo(27) == 0
                ) {
                    shaSpecialMoney = shaSpecialMoney.add(item.money)
                }
            }
        })
        console.log('当前点杀下注金额', shaSpecialMoney.getNumber())
        if (shaSpecialMoney.comparedTo(new BotGameConfig().shaSpecialMoney) > 0) {
            errIndex = 1
            return {
                errIndex: errIndex,
                killNum: 0
            }
        }

        // 双向下注数据列表
        let ruleList = [
            // 大小对押限制
            ['单', '双'],
            ['大', '小'],

            // 杀组合
            ['大单', '大双', '小双'],
            ['大单', '大双', '小单'],
            ['大单', '小双', '小单'],
            ['大双', '小双', '小单'],

            // 返组合
            ['大', '小单'],
            ['大', '小双'],
            ['小', '大单'],
            ['小', '大双'],

            // 双向下注
            ['大单', '小双'],
            ['大双', '小单']
        ]
        let newRuleList: Array<Array<string>> = []
        // 当前点杀下注map
        let killMap = new Map<string, number>()

        for (let i = 0; i < info.list.length; i++) {
            let item = info.list[i]
            if (item.command.indexOf('杀') > -1) {
                let key = item.content.split('杀')[0]
                if (killMap.has(key)) {
                    let num = killMap?.get(key) ?? 0
                    let value = num + 1
                    killMap.set(key, value)
                } else {
                    killMap.set(key, 1)
                }
                continue
            }

            ruleList.forEach((item2, index2) => {
                if (!newRuleList[index2]) {
                    newRuleList[index2] = [...item2]
                }
                if (item2.includes(item.command) || item2.includes(item.money)) {
                    let command = item2.includes(item.money)? item.money: item.command
                    let removeIndex = newRuleList[index2].indexOf(command)
                    if (removeIndex !== -1 && newRuleList[index2][removeIndex] == command) {
                        newRuleList[index2].splice(removeIndex, 1)
                    }
                }
            })
        }
        console.log('过滤出的数据', )

        for (let i = 0; i < newRuleList.length; i++) {
            // 只判定双向下注结果
            if (isTwo) {
                if (i >= 10) {
                    if (newRuleList[i].length == 0) {
                        errIndex = 5
                    }
                }
                continue
            }

            // 判定所有下注结果
            if (newRuleList[i].length == 0) {
                if (i < 2) {
                    errIndex = 2
                    break
                }
                if (i < 6) {
                    errIndex = 3
                    break
                }
                if (i < 10) {
                    errIndex = 4
                    break
                }
                errIndex = 5
                break
            }
        }

        return {
            errIndex: errIndex,
            killNum: killMap.size
        }
    }
}


export default BettingCommand28
