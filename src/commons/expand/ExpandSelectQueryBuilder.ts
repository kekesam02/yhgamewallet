import {ObjectLiteral} from "typeorm/common/ObjectLiteral";
import GameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";
require('./ExpandGameWhere')


declare module 'typeorm/query-builder/SelectQueryBuilder' {
    interface SelectQueryBuilder<Entity extends ObjectLiteral> {
        /**
         * 扩展游戏类型查询方法
         * @param gameTypeList 要查询的游戏类型
         */
        whereGameType: (gameTypeList: Array<GameTypeEnum>) => this
    }
}
