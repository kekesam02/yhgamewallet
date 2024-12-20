import GameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";
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
    console.log('传入的数据', gameTypeList.length)
    let gameTypeParams: any = {}
    let gameTypeStr = gameTypeList.length > 1? '(': ''
    gameTypeList.forEach((item, index) => {
        console.log('遍历---->', item)
        gameTypeParams[`gameType${index}`] = item
        if (index > 0) {
            gameTypeStr += ` or game_type = :gameType${index}`
        } else {
            gameTypeStr += `game_type = :gameType${index}`
        }
    })
    gameTypeStr += gameTypeList.length > 1? ')': ''
    console.log('添加的查询语句', gameTypeStr)
    console.log('查询条件', gameTypeParams)
    this.andWhere(gameTypeStr, gameTypeParams)
    return this
}



export default ExpandGameWhere
