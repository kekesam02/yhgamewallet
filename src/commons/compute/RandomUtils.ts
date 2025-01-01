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
     * @param maxMoney: 一个人最多领取的金额占比
     * @return Array
     */
    public randomAllocate = (totalMoney: number, count: number, maxMoney = 0.95): Array<number> => {
        let compute = new ComputeUtils(totalMoney).dividedBy(count, 2)
        // 计算平均值
        let average = compute.getNumber();
        // 初始化每个人的金额数组，初始值为0
        let amounts = new Array(count).fill(0);
        // 剩余要分配的金额（考虑到浮点数精度，初始时可能不为0）
        let remainingMoney = totalMoney;

        // 分配金额，尽量接近平均值，但允许微小差异
        for (let i = 0; i < count; i++) {
            // 最小金额 避免与前一个人相差太大
            let minAmount = 0
            if (i == 0) {
                minAmount = 0
            } else {
                minAmount = new ComputeUtils(amounts[i - 1]).multiplied(0.9).getNumber()
            }
            // 剩余未分配金额
            let remainCount = new ComputeUtils(count - i - 1).multiplied(average).multiplied(maxMoney).getNumber()
            // 最大金额 留出一些余额给后面的人
            let maxAmount = new ComputeUtils(remainingMoney).minus(remainCount).getNumber()
            // 确保最小金额不小于0
            minAmount = Math.max(minAmount, 0);
            // 在最小和最大金额之间随机选择一个值
            let amount = this.getRandomInt(minAmount, maxAmount, true)

            // 更新每个人的金额和剩余金额
            amounts[i] = amount;
            remainingMoney -= amount;
        }

        // 由于前面的分配可能存在微小差异，最后进行微调以确保总金额一致
        let totalDistributed = amounts.reduce((prev, curr) => {
            console.log('h昂----', prev, curr)
            return new ComputeUtils(prev).add(curr).getNumber()
        }, 0);
        console.log('计算出来的总和', totalDistributed)
        let difference = new ComputeUtils(totalMoney).minus(totalDistributed).getNumber()

        console.log('余额', difference)
        // 如果总金额有差异，余额大于1 金额最少的添加金额、小于1反之
        if (difference !== 0) {
            let maxIndex = 0
            let minIndex = 0
            for (let i = 0; i < amounts.length; i++) {
                if (amounts[i] > amounts[maxIndex]) {
                    maxIndex = i
                }
                if (amounts[i] < amounts[minIndex]) {
                    minIndex = i
                }
            }
            if (difference > 0) {
                amounts[minIndex] = new ComputeUtils(amounts[minIndex]).add(difference).getNumber()
            } else {
                amounts[maxIndex] = new ComputeUtils(amounts[maxIndex]).add(difference).getNumber()
            }
        }

        // 返回结果
        return amounts;
    }
}


export default RandomUtils
