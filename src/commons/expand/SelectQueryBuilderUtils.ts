import GameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import BotPledgeUpModel from "../../models/BotPledgeUpModel";
import {BaseEntity} from "typeorm";

/**
 * 重写 BaseEntity 类 主要是为了优化条件查询语句
 */
class SelectQueryBuilderUtils extends BaseEntity {

    /**
     * 重写 createQueryBuilder 方法
     */
    static createQueryBuilder(alias?: string) {
        return this
            .getRepository()
            .createQueryBuilder(alias)
            ;
    }

    /**
     * 获取所有的游戏类型
     */
    public getAllGameType = [
        GameTypeEnum.TOUZI ,
        GameTypeEnum.PC28DI ,
        GameTypeEnum.PC28GAO ,
        GameTypeEnum.TOUZIFS ,
        GameTypeEnum.PC28DIFS ,
        GameTypeEnum.PC28GAOFS ,
        GameTypeEnum.TOUZIJS ,
        GameTypeEnum.PCDWQ ,
        GameTypeEnum.PCDWQFS
    ]

    /**
     * 生成游戏类型查询sql
     */
    public createGameSql = <T>(
        selectQueryBuilder: SelectQueryBuilder<T>,
        gameTypeList: Array<GameTypeEnum>
    ): SelectQueryBuilder<T> => {
        // 游戏类型筛选
        let gameTypeParams: any = {}
        let gameTypeStr = gameTypeList.length > 1? '(': ''
        gameTypeList.forEach((item, index) => {
            gameTypeParams[`gameType${index}`] = item
            if (index > 0) {
                gameTypeStr += ` or game_type = :gameType${index}`
            } else {
                gameTypeStr += `game_type = :gameType${index}`
            }
        })
        gameTypeStr += gameTypeList.length > 1? ')': ''
        selectQueryBuilder.andWhere(gameTypeStr, gameTypeParams)
        return selectQueryBuilder
    }

}



export default SelectQueryBuilderUtils
