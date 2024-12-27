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
    console.log('查询语句', gameTypeStr)
    console.log('查询参数', gameTypeParams)
    this.andWhere(gameTypeStr, gameTypeParams)
    return this
}
