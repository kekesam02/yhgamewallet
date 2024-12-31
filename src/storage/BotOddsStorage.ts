import BotOddsModel from "../models/BotOddsModel"
import botOddsModel from "../models/BotOddsModel"
import GameEnumsIndex from "../type/gameEnums/GameEnumsIndex"
import GameTypeEnum from "../type/gameEnums/GameTypeEnum"
import ComputeUtils from "../commons/ComputeUtils";

/**
 * 赔率表数据持久化
 */
class BotOddsStorage {

    /**
     * 整合后的赔率表数据
     *  {
     *      kay:  游戏类型
     *      value: 当前类型游戏的赔率数据列表
     *  }
     */
    private static oddsMap = new Map<number, Array<botOddsModel>>()

    /**
     * 列表odds
     * @private
     */
    private static oddsList: Array<botOddsModel> = []

    /**
     * 根据id获取赔率数据
     */
    public static getOddsListById = async (id: string): Promise<BotOddsModel> => {
        if (BotOddsStorage.oddsList.length <= 0) {
            await BotOddsStorage.init()
            return BotOddsStorage.oddsList.find(item => item.id == Number(id))!
        }
        return BotOddsStorage.oddsList.find(item => item.id == Number(id))!
    }

    /**
     * 根据id 获取需要赔付的金额
     * @param id: oddsModel 的id
     * @param money: 下注金额
     * @param openCode: 开奖结果
     * @param gameType: 游戏类型
     * @param form: 形态
     */
    public static getOddsMoney = async (
        id: number,
        money: string,
        openCode: string,
        gameType: GameTypeEnum,
        form: string
    ): Promise<string> => {
        let botOdds = await BotOddsStorage.getOddsListById(`${id}`)
        let arr = openCode.split(',')
        let sum = arr.reduce((prev, curr) => Number(curr) + prev, 0)

        // 如果是杀点杀的话就正常取计算赔率、不管13、14之类的
        if (botOdds.name.indexOf('杀') > -1) {
            return new ComputeUtils(money).multiplied(botOdds.odds).toString()
        }

        // pc28低倍特殊处理
        if (gameType == GameTypeEnum.PC28DI) {
            if (sum == 13 || sum == 14) {

                // 遇13/14大/小/单/双赔 1.6
                if (
                    botOdds.name == '单'
                    || botOdds.name == '双'
                    || botOdds.name == '大'
                    || botOdds.name == '小'
                ) {
                    return new ComputeUtils(money).multiplied(1.6).toString()
                }

                // 遇大单、大双、小双、小单下注组合下注回本
                if (
                    botOdds.name == '大单'
                    || botOdds.name == '大双'
                    || botOdds.name == '小双'
                    || botOdds.name == '小单'
                ) {
                    return new ComputeUtils(money).multiplied(1).toString()
                }
            }
        }

        // pc28高倍特殊处理
        if (gameType == GameTypeEnum.PC28GAO) {
            // 如果点杀的话正常计算赔率
            if (botOdds.name.indexOf('杀') > -1) {
                return new ComputeUtils(money).multiplied(botOdds.odds).toString()
            }

            // 遇13/14大/小/单/双赔 1.6
            if (
                botOdds.name == '单'
                || botOdds.name == '双'
                || botOdds.name == '大'
                || botOdds.name == '小'
            ) {
                return new ComputeUtils(money).multiplied(1).toString()
            }

            // 遇大单、大双、小双、小单下注组合下注回本
            if (
                botOdds.name == '大单'
                || botOdds.name == '大双'
                || botOdds.name == '小双'
                || botOdds.name == '小单'
            ) {
                return new ComputeUtils(money).multiplied(1).toString()
            }
        }

        if (form != '杂子') {
            if (
                botOdds.name != '对子'
                && botOdds.name != '顺子'
                && botOdds.name != '豹子'
                && botOdds.name != '极大'
                && botOdds.name != '极小'
            ) {
                return new ComputeUtils(money).multiplied(1).toString()
            }
        }

        return new ComputeUtils(money).multiplied(botOdds.odds).toString()
    }


    /**
     * 获取赔率表数组指定游戏类型
     */
    public static getOddsListGame = async (gameType: GameTypeEnum): Promise<Array<BotOddsModel>> => {
        let result = await BotOddsStorage.getOddsList()
        return result.get(gameType) ?? []
    }

    /**
     * 获取赔率表数据列表
     */
    public static getOddsList = async (): Promise<Map<number, Array<botOddsModel>>> => {
        if (BotOddsStorage.oddsMap.size <= 0) {
            await BotOddsStorage.init()
            return BotOddsStorage.oddsMap
        }
        return BotOddsStorage.oddsMap
    }

    /**
     * 初始化赔率表
     */
    public static init = async () => {
        let result: Array<BotOddsModel> = await new BotOddsModel().getOddsList(new GameEnumsIndex().getGameTypeAll())
        result.forEach(item => {
            if (BotOddsStorage.oddsMap.has(item.gameType)) {
                let list = BotOddsStorage.oddsMap.get(item.gameType) ?? []
                list.push(item)
                BotOddsStorage.oddsMap.set(
                    item.gameType,
                    list
                )
            } else {
                BotOddsStorage.oddsMap.set(item.gameType, [item])
            }
            BotOddsStorage.oddsList.push(item)
        })
    }
}



export default BotOddsStorage
