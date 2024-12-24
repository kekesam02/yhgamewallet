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
}


export default BotGameConfig
