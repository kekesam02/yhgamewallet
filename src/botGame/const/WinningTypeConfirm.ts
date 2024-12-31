import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";


/**
 * 中奖结果返回的结果
 */
type lotteryResultType = {

    // 特码
    code: string

    // 形态
    form: string
}


/**
 * 中奖类型判定
 */
class WinningTypeConfirm {

    public gameType: GameTypeEnum

    /**
     * 大
     */
    public da = {
        key: '大',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return sum > 13;
        }
    }

    /**
     * 极大
     */
    public jida = {
        key: '极大',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return sum >= 22
        }
    }

    /**
     * 大单
     */
    public dadan = {
        key: '大单',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            if (this.da.value(num1, num2, num3, sum, gameType)) {
                return this.dan.value(num1, num2, num3, sum, gameType)
            }
            return false
        }
    }

    /**
     * 大双
     */
    public dashuang = {
        key: '大双',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            if (this.da.value(num1, num2, num3, sum, gameType)) {
                return this.shuang.value(num1, num2, num3, sum, gameType)
            }
            return false
        }
    }

    /**
     * 小
     */
    public xiao = {
        key: '小',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return sum <= 13
        }
    }

    /**
     * 极小
     */
    public jixiao = {
        key: '极小',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return sum <= 5
        }
    }

    /**
     * 小单
     */
    public xiaodan = {
        key: '小单',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            if (this.xiao.value(num1, num2, num3, sum, gameType)) {
                return this.dan.value(num1, num2, num3, sum, gameType)
            }
            return false
        }
    }

    /**
     * 小双
     */
    public xiaoshaung = {
        key: '小双',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            if (this.xiao.value(num1, num2, num3, sum, gameType)) {
                return this.shuang.value(num1, num2, num3, sum, gameType)
            }
            return false
        }
    }

    /**
     * 单
     */
    public dan = {
        key: '单',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return sum % 2 == 1
        }
    }

    /**
     * 双
     */
    public shuang = {
        key: '双',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return sum % 2 != 1
        }
    }


    // ------------- 下面双形态相关

    /**
     * 顺子类型
     *      key: 中奖描述文字
     *      value: 判定中奖方法
     */
    public sunzi = {
        key: '顺子',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            // pc28高倍单独判定
            if (gameType == GameTypeEnum.PC28GAO) {
                let result = this.gao28Special(num1, num2, num3, sum, gameType)
                if (result) {
                    return true
                }
            }
            if  (num3 - num2 == 1 && num2 - num1 == 1) {
                return true
            }
            if  (num3 - num1 == 1 && num2 - num3 == 1) {
                return true
            }
            if  (num1 - num2 == 1 && num3 - num1 == 1) {
                return true
            }
            if  (num2 - num1 == 1 && num1 - num3 == 1) {
                return true
            }
            if  (num1 - num2 == 1 && num2 - num3 == 1) {
                return true
            }
            if  (num1 - num3 == 1 && num3 - num2 == 1) {
                return true
            }
            return false
        }
    }

    /**
     * 对子
     */
    public duizi = {
        key: '对子',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return num1 == num2 || num1 == num3 || num2 == num3;

        }
    }

    /**
     * 豹子
     */
    public baozi = {
        key: '豹子',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return num1 == num2 && num2 == num3;
        }
    }

    /**
     * 形态默认是(杂六)
     */
    public formDefault = {
        key: '杂子',
        value: (
            num1: number,
            num2: number,
            num3: number,
            sum: number,
            gameType: GameTypeEnum
        ) => {
            return false
        }
    }

    /**
     * PC28高倍顺子单独处理
     */
    private gao28Special = (
        num1: number,
        num2: number,
        num3: number,
        sum: number,
        gameType: GameTypeEnum
    ): boolean => {
        // 890单独处理
        if (sum == 17) {
            if (num1 == 8){
                if (num2 == 0 && num3 == 9) return true
                if (num2 == 9 && num3 == 0) return true
            }
            if (num1 == 0){
                if (num2 == 8 && num3 == 9) return true
                if (num2 == 9 && num3 == 8) return true
            }
            if (num1 == 9){
                if (num2 == 0 && num3 == 8) return true
                if (num2 == 8 && num3 == 0) return true
            }
        }

        // 901单独处理
        if (sum == 10) {
            if (num1 == 9){
                if (num2 == 0 && num3 == 1) return true
                if (num2 == 1 && num3 == 0) return true
            }
            if (num1 == 0){
                if (num2 == 9 && num3 == 1) return true
                if (num2 == 1 && num3 == 9) return true
            }
            if (num1 == 1){
                if (num2 == 9 && num3 == 0) return true
                if (num2 == 0 && num3 == 9) return true
            }
        }
        return false
    }

    /**
     * 获取开奖结果
     */
    public getLotteryDesc = (result: string, gameType: GameTypeEnum) => {
        switch (gameType) {
            case GameTypeEnum.PC28DI:
                return this.getLotteryDescPC28DI(result, gameType)
            case GameTypeEnum.PC28GAO:
                return this.getLotteryDescPC28DI(result, gameType)
            default:
                return this.getLotteryDescPC28DI(result, gameType)
        }
    }

    /**
     * 获取开奖结果描述文字
     * @param result: 开奖结果
     * @return
     *      code: 双面 大小单双、组合
     *      form: 形态 对子顺子豹子
     *      max: 极值
     */
    public getLotteryDescPC28DI = (result: string, gameType: GameTypeEnum): {
        code: {
            key: string,
            value: any
        },
        form: {
            key: string,
            value: any
        },
        max: string
    } => {
        // 需要判断的单双之类的类型
        let codeList = [
            this.dadan,
            this.dashuang,
            this.xiaodan,
            this.xiaoshaung,
            this.dan,
            this.shuang
        ]
        let arr = result.split(',').map(item => Number(item))
        let num1 = arr[0]
        let num2 = arr[1]
        let num3 = arr[2]
        let sum = arr.reduce((prev, curr) => {
            return prev + curr
        }, 0)
        // 特殊代码结果(单双之类的)
        let codeResult = codeList.find(item => {
            return item.value(num1, num2, num3, sum, gameType)
        })

        // 需要判定的形态列表
        let formList = [
            this.baozi,
            this.sunzi,
            this.duizi
        ]
        // 形态判定结果
        let formResult = formList.find(item => {
            return item.value(num1, num2, num3, sum, gameType)
        })

        if (!formResult) {
            formResult = this.formDefault
        }

        let maxResult = '无'
        if (sum >= 22) {
            maxResult = '极大'
        }
        if (sum <= 5) {
            maxResult = '极小'
        }

        return {
            code: codeResult!,
            form: formResult!,
            max: maxResult
        }
    }
}



export default WinningTypeConfirm
