import BotOddsModel from "../models/BotOddsModel"
import GameEnumsIndex from "../type/gameEnums/GameEnumsIndex"
import botOddsModel from "../models/BotOddsModel"
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
            return BotOddsStorage.oddsList.find(item => item.id = Number(id))!
        }
        return BotOddsStorage.oddsList.find(item => item.id = Number(id))!
    }

    /**
     * 根据id 获取需要赔付的金额
     * @param id: oddsModel 的id
     * @param money: 下注金额
     */
    public static getOddsMoney = async (id: number, money: string): Promise<string> => {
        let botOdds = await BotOddsStorage.getOddsListById(`${id}`)
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
