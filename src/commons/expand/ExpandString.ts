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
 */
String.prototype.isMoney = function (): boolean {
    return !(isNaN(Number(this)) || this.indexOf('-') > -1)
}

Number.prototype.isMoney = function (): boolean {
    if (isNaN(Number(this)) || this.toString().indexOf('-1') > -1) {
        return false
    }
    return true
}
