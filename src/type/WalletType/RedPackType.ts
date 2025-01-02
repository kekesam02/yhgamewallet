
/**
 * 领取红包流水条件
 */
type RedPackConditionJsonType = {

    /**
     * 0: 日流水
     * 1: 近七天
     * 2: 近30天
     * 3: 本月
     * 4: 总流水
     */
    time: number

    /**
     * 流水需要达到的金额、单位 U
     */
    money: string
}



export {
    RedPackConditionJsonType
}
