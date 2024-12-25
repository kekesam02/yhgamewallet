import WalletType from "../WalletType";

/**
 * 存储娱乐机器人相关常用的一些类型
 */



/**
 * 反水数据列表对象
 */
type DefectListType = Array<{
    /**
     * 钱包/流水 类型
     */
    wallType: WalletType,

    /**
     * 流水金额
     */
    waterMoney: string,

    /**
     * 需要反水的金额
     */
    backMoney: string
}>


export {
    DefectListType
}
