import GameTypeEnum from "../../typeEnums/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import PaymentType from "../../typeEnums/PaymentType";

/**
 * 扩展支付相关 where 条件查询
 */
class ExpandPaymentWhere {

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
SelectQueryBuilder.prototype.wherePaymentType = function(paymentTypeList: Array<PaymentType>) {
    if (!paymentTypeList || paymentTypeList.length < 1) {
        return this
    }
    let paymentTypeParams: any = {}
    let paymentTypeStr = paymentTypeList.length > 1? '(': ''
    paymentTypeList.forEach((item, index) => {
        paymentTypeParams[`paymentType${index}`] = item
        if (index > 0) {
            paymentTypeStr += ` or payment_type = :gameType${index}`
        } else {
            paymentTypeStr += `payment_type = :gameType${index}`
        }
    })
    paymentTypeStr += paymentTypeList.length > 1? ')': ''
    this.andWhere(paymentTypeStr, paymentTypeParams)
    return this
}



export default ExpandPaymentWhere
