

//     "next_expect": "73674887",
//     "next_time": "2024-12-13 22:14:15"
/**
 * pc28 开奖结果类型
 */
export type Pc28LotteryJsonType = {
    /**
     * 返回的开奖行数
     */
    rows: number

    /**
     * 游戏类型
     */
    t: string

    /**
     * 描述文字
     */
    message: string

    /**
     * 开奖数据
     */
    data: Array<{
        /**
         * 当前期数
         */
        expect: string

        /**
         * 开奖结果
         */
        open_code: string

        /**
         * 开奖时间
         */
        open_time: string

        /**
         * 下期开奖期数
         */
        next_expect: string

        /**
         * 下期开奖时间
         */
        next_time: string
    }>
}


