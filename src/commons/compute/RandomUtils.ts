/**
 * 随机数生成类
 */
import ComputeUtils from "./ComputeUtils";
import BigNumber from "bignumber.js";

class RandomUtils {

    /**
     * 生成 min - max 之间的随机数、包含 min 和 max
     * @param min
     * @param max
     * @param isDecimal: 是否可以是小数、默认保留俩位小数
     */
    public getRandomInt = (
        min: number,
        max: number,
        isDecimal: boolean = false
    ): number => {
        if (isDecimal) {
            let num = Math.random() * (max - min + 1) + min
            return new BigNumber(num).precision(2).toNumber()
        }
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    /**
     * 随机生成不重复的数组
     */
    public getRandomIntList = (min: number, max: number, count: number) => {
        let arr = new Set()
        while (arr.size < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min
            arr.add(num)
        }
        return Array.from(arr)
    }

    /**
     * 将 金额(money) 平均分给 count 个人
     */
    public averageAllocate = (totalMoney: number, count: number): Array<number> => {
        // 剩余金额平局值
        let computeUtils = new ComputeUtils(totalMoney).dividedBy(count, 2)
        // 剩余金额随机加到一个人身上、幸运儿
        let goodIndex = this.getRandomInt(0, count)
        let moneyList = []
        for (let i = 0; i < count; i++) {
            moneyList[i] = computeUtils.getNumber()
            if (goodIndex == i) {
                moneyList[i] = new ComputeUtils(moneyList[i]).add(computeUtils.getRemain()).getNumber()
            }
        }
        return moneyList
    }

    /**
     * 将 金额(money) 随机分给 count 个人
     * @param totalMoney: 金额
     * @param count: 人数
     * @return Array
     */
    public randomAllocate = (totalMoney: number, count: number): Array<number> => {
        if (count == 1) {
            return [totalMoney]
        }
        // 先乘100、只计算小数点后的俩位
        let total = new ComputeUtils(totalMoney).multiplied(100)
        // 生成的金额列表
        let moneyList: Array<number> = []
        // 还没有分配的金额
        let balance = new ComputeUtils(total)
        // 金额最大的下标
        let maxIndex = 0
        // 金额最小的下标
        let minIndex = 0
        for (let i = 0; i < count; i++) {
            let currCompute = new ComputeUtils(balance.getNumber()).dividedBy(2, 2)
            let currMoney = this.getRandomInt(1, currCompute.getNumber())

            balance.minus(currMoney).add(currCompute.getRemain())
            if (i == count - 1) {
                moneyList.push(balance.add(currMoney).getNumber())
            } else {
                moneyList.push(currMoney)
            }
            if (moneyList[maxIndex] < moneyList[i]) {
                maxIndex = i
            }
            if (moneyList[minIndex] > moneyList[i]) {
                minIndex = i
            }
        }
        let sum = moneyList.reduce((prev, curr) => prev + curr, 0)
        let diff = new ComputeUtils(total).minus(sum).getNumber()
        // 修正金额
        if (diff != 0) {
            if (diff > 0) {
                moneyList[minIndex] = new ComputeUtils(moneyList[minIndex]).add(diff).getNumber()
            } else {
                moneyList[maxIndex] = new ComputeUtils(moneyList[maxIndex]).add(diff).getNumber()
            }
        }
        let sum2 = moneyList.reduce((prev, curr) => prev + curr)
        console.log('随机数列表', sum2, moneyList)
        return this.shuffle(moneyList.map(item => {
            return new ComputeUtils(item).dividedBy(100, 2).getNumber()
        }))
    }

    /**
     * 打乱数组
     * @param arr
     */
    public shuffle = (arr: Array<number>) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }
}


export default RandomUtils
