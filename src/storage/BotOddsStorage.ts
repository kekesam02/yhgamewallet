import BotOddsModel from "../models/BotOddsModel";

/**
 * 赔率表数据持久化
 */
class BotOddsStorage {

    /**
     * 整合后的赔率表数据
     */
    public static oddsList = []

    public static getOddsList = []

    /**
     * 初始化赔率表
     */
    public static init = async () => {
        let result = await new BotOddsModel().getOddsList()
        result.forEach(item => {
            console.log('循环赔率item------> ', item)
        })
        BotOddsStorage.oddsList = result
    }
}
