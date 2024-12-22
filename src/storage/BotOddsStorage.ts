import BotOddsModel from "../models/BotOddsModel"
import GameEnumsIndex from "../type/gameEnums/GameEnumsIndex"
import botOddsModel from "../models/BotOddsModel"
import GameTypeEnum from "../type/gameEnums/GameTypeEnum"

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
    private static oddsList = new Map<number, Array<botOddsModel>>()

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
        if (BotOddsStorage.oddsList.size <= 0) {
            await BotOddsStorage.init()
            return BotOddsStorage.oddsList
        }
        return BotOddsStorage.oddsList
    }

    /**
     * 初始化赔率表
     */
    public static init = async () => {
        let result = await new BotOddsModel().getOddsList(new GameEnumsIndex().getGameTypeAll())
        result.forEach(item => {
            if (BotOddsStorage.oddsList.has(item.gameType)) {
                let list = BotOddsStorage.oddsList.get(item.gameType) ?? []
                list.push(item)
                BotOddsStorage.oddsList.set(
                    item.gameType,
                    list
                )
            } else {
                BotOddsStorage.oddsList.set(item.gameType, [item])
            }
        })
    }
}



export default BotOddsStorage
