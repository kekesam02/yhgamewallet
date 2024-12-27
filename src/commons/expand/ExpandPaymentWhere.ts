import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import PaymentType from "../../type/PaymentType";



/**
 * 扩展支付类型查询sql
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
            paymentTypeStr += ` or payment_type = :paymentType${index}`
        } else {
            paymentTypeStr += `payment_type = :paymentType${index}`
        }
    })
    paymentTypeStr += paymentTypeList.length > 1? ')': ''
    console.log('查询语句', paymentTypeStr)
    console.log('查询参数', paymentTypeParams)
    this.andWhere(paymentTypeStr, paymentTypeParams)
    return this
}
