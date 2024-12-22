import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";


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
