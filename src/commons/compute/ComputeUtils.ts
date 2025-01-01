import BigNumber from "bignumber.js";

/**
 * 加减乘除之类的计算类
 */
class ComputeUtils {

    public num1 = new BigNumber(0)
    public remain = new BigNumber(0)

    constructor(num: number | string | ComputeUtils) {
        if (num instanceof ComputeUtils) {
            this.num1 = new BigNumber(num.getValue())
        } else {
            this.num1 = new BigNumber(num)
        }
    }

    public toString = () => {
        return this.num1.valueOf().toString()
    }

    /**
     * 获取计算后的结果
     */
    public getValue = () => {
        return this.num1.valueOf()
    }

    /**
     * 获取计算后的结果
     */
    public getNumber = (): number => {
        return Number(this.num1.valueOf())
    }

    /**
     * 除法获取余数
     */
    public getRemain = () => {
        return this.remain.valueOf()
    }

    /**
     * 加法计算
     */
    public add(num2: number | string | ComputeUtils): ComputeUtils {
        if (num2 instanceof ComputeUtils) {
            this.num1 = this.num1.plus(num2.getValue())
        } else {
            this.num1 = this.num1.plus(num2)
        }
        return this
    }

    /**
     * 减法
     * @param num2
     */
    public minus(num2: number | string | ComputeUtils): ComputeUtils {
        if (num2 instanceof ComputeUtils) {
            this.num1 = this.num1.minus(num2.getValue())
        } else {
            this.num1 = this.num1.minus(num2)
        }
        return this
    }

    /**
     * 乘法
     * @param num2
     */
    public multiplied(num2: number | string | ComputeUtils): ComputeUtils {
        if (num2 instanceof ComputeUtils) {
            this.num1 = this.num1.multipliedBy(num2.getValue())
        } else {
            this.num1 = this.num1.multipliedBy(num2)
        }
        return this
    }

    /**
     * 除法
     * @param num2
     * @param have
     */
    public dividedBy(num2: number | string | ComputeUtils, have: number | string): ComputeUtils {
        let currNum = null
        if (num2 instanceof ComputeUtils) {
            currNum = num2.getValue()
        } else {
            currNum = num2
        }
        let result = this.num1
            .dividedBy(currNum)
            .precision(Number(have) + 1, 0)
            .valueOf()
        if (result.split('.').length > 1) {
            if (result.split('.')[1].length > 2) {
                result = result.substring(0, result.length - 1)
            }
        }
        let remain = this.num1
            .minus(new BigNumber(currNum).multipliedBy(result).valueOf())
            .valueOf()
        this.num1 = new BigNumber(result)
        this.remain = new BigNumber(remain)
        return this
    }

    /**
     * 比较大小
     *      1: 大于
     *      -1: 小于
     *      0: 等于
     * @param num2
     */
    public comparedTo(num2: number | string): number {
        return this.num1.comparedTo(num2)
    }
}


export default ComputeUtils
