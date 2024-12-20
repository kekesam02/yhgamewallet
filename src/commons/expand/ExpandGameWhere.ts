import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";

/**
 * 游戏机器人查询相关类
 */
class ExpandGameWhere {

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
}

/**
 * 扩展游戏类型查询sql
 */
SelectQueryBuilder.prototype.whereGameType = function(gameTypeList: Array<GameTypeEnum>) {
    if (!gameTypeList || gameTypeList.length < 1) {
        return this
    }
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
    this.andWhere(gameTypeStr, gameTypeParams)
    return this
}



export default ExpandGameWhere
