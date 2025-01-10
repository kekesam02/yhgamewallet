/**
 * 扩展 string 和 number 方法
 */
interface String {
    isMoney: () => boolean
}

interface Number {
    isMoney: () => boolean
}

/**
 * 判定字符串是否是 金额
 * @param isDecimal: 是否可为小数
 *      false: 金额类型不能是小数
 */
String.prototype.isMoney = function (isDecimal: boolean = false): boolean {
    if (isNaN(Number(this))
        || this.toString().indexOf('-') > -1
    ) {
        return false
    }
    if (Number(this) <= 0 || this.toString().startsWith('0')) {
        return false
    }
    if (!isDecimal && this.toString().indexOf('.') > -1) {
        return false
    }
    return true
}

Number.prototype.isMoney = function (isDecimal: boolean = false): boolean {
    if (isNaN(Number(this)) || this.toString().indexOf('-') > -1) {
        return false
    }
    if (Number(this) <= 0 || this.toString().startsWith('0')) {
        return false
    }
    if (!isDecimal && this.toString().indexOf('.') > -1) {
        return false
    }
    return true
}
