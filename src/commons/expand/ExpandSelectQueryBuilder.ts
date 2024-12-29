import {ObjectLiteral} from "typeorm/common/ObjectLiteral";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import PaymentType from "../../type/PaymentType";
import WalletType from "../../type/WalletType";
require('./ExpandGameWhere')
require('./ExpandPaymentWhere')
require('./ExpandCommandWhere')

/**
 * 扩展 sql 查询方法
 */
declare module 'typeorm/query-builder/SelectQueryBuilder' {
    interface SelectQueryBuilder<Entity extends ObjectLiteral> {
        /**
         * 扩展游戏类型查询方法
         * @param gameTypeList 要查询的游戏类型
         */
        whereGameType: (gameTypeList: Array<GameTypeEnum>) => this

        /**
         * 扩展钱包类型查询方法
         * @param gameTypeList 要查询的钱包类型
         */
        whereWalletType: (gameTypeList: Array<WalletType>) => this

        /**
         * 扩展支付类型查询方法
         * @param gameTypeList 要查询的游戏类型
         */
        wherePaymentType: (paymentTypeList: Array<PaymentType>) => this

        /**
         * 扩展时间查询方法
         * @param startTime 开始时间
         * @param endTime 结束时间
         */
        whereTime: (startTime: string, endTime: string) => this
    }
}

