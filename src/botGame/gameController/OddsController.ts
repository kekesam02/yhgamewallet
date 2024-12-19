import BotOddsModel from "../../models/BotOddsModel";
import GameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";



/**
 * 游戏赔率控制器
 */
class OddsController {

    /**
     * 获取游戏赔率表数据
     * @return {
     *     key: 游戏类型
     *     value: {
     *         key: 赔率描述文字 大单小单顺子之类的
     *         value: BotOddsModel
     *     }
     * }
     */
    public getOddsMap = async (): Promise<Map<number, Map<string, BotOddsModel>>> => {
        let map: Map<number, Map<string, BotOddsModel>> = new Map()
        let oddsList = await BotOddsModel
            .createQueryBuilder()
            .getMany()
        oddsList.forEach(item => {
            if (map.has(item.gameType)) {
                map.get(item.gameType)?.set(item.name, item)
            } else {
                map.set(item.gameType, new Map().set(item.name, item))
            }
        })
        return map
    }
}


export default OddsController
