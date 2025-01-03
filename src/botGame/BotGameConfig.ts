/**
 * 游戏机器人配置
 */
class BotGameConfig {

    /**
     * 封盘时间、提前几秒钟上注(单位秒)
     */
    public FPTime: number = 5

    /**
     * 分盘提示时间、停止上注提前多少秒提示(默认位分盘前30秒)
     */
    public FPTipsTime: number = 35

    /**
     * pc28最大下注金额
     */
    public maxMoney28: number = 1000

    /**
     * pc28 点杀数字0和27 最大金额为500
     */
    public shaSpecialMoney: number = 500
}


export default BotGameConfig
