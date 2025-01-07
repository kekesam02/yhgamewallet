/**
 * 模拟开奖操作
 */
class MockLottery {

    public static index = 0

    public getData = (): Promise<{
        data: {
            data: {
                result: Array<{
                    // 当前期数
                    issue: string,
                    // 开奖结果
                    code: string,
                    // 开奖时间
                    gmtCreateStr: string,
                }>
            }
        }
    }> => {
        if (MockLottery.index == 0) {
            console.log('获取卡酱数据')
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.getKaData())
                }, 1000)
            })
        } else {
            console.log('获取正确结果')
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.getRecoverData())
                }, 1000)
            })
        }
    }

    /**
     * 获取卡奖数据
     */
    public getKaData = (): {
        data: {
            data: {
                result: Array<{
                    // 当前期数
                    issue: string,
                    // 开奖结果
                    code: string,
                    // 开奖时间
                    gmtCreateStr: string,
                }>
            }
        }
    } => {
        return {
            data: {
                data: {
                    result: [
                        {
                            issue: '111',
                            code: '1,2,3',
                            gmtCreateStr: '2025-01-08 00:13:35'
                        }
                    ]
                }
            }
        }
    }

    /**
     * 获取恢复后的数据
     */
    public getRecoverData = (): {
        data: {
            data: {
                result: Array<{
                    // 当前期数
                    issue: string,
                    // 开奖结果
                    code: string,
                    // 开奖时间
                    gmtCreateStr: string,
                }>
            }
        }
    } => {
        return {
            data: {
                data: {
                    result: [
                        {
                            issue: '115',
                            code: '1,1,5',
                            gmtCreateStr: '2025-01-08 00:13:35'
                        },{
                            issue: '114',
                            code: '1,1,6',
                            gmtCreateStr: '2025-01-08 00:13:35'
                        },{
                            issue: '113',
                            code: '1,1,7',
                            gmtCreateStr: '2025-01-08 00:13:35'
                        },{
                            issue: '112',
                            code: '1,1,8',
                            gmtCreateStr: '2025-01-08 00:13:35'
                        }
                    ]
                }
            }
        }
    }
}

export default MockLottery
