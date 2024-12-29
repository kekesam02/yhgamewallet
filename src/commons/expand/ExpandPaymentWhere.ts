import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import PaymentType from "../../type/PaymentType";
import WalletType from "../../type/WalletType";



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
    this.andWhere(paymentTypeStr, paymentTypeParams)
    return this
}


/**
 * 扩展钱包类型查询sql
 */
SelectQueryBuilder.prototype.whereWalletType = function(walletTypeList: Array<WalletType>) {
    if (!walletTypeList || walletTypeList.length < 1) {
        return this
    }
    let walletTypeParams: any = {}
    let walletTypeStr = walletTypeList.length > 1? '(': ''
    walletTypeList.forEach((item, index) => {
        walletTypeParams[`walletType${index}`] = item
        if (index > 0) {
            walletTypeStr += ` or wallet_type = :walletType${index}`
        } else {
            walletTypeStr += `wallet_type = :walletType${index}`
        }
    })
    walletTypeStr += walletTypeList.length > 1? ')': ''
    this.andWhere(walletTypeStr, walletTypeParams)
    return this
}
