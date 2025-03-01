import GameTypeEnum from "./GameTypeEnum";
import StartGameEnum from "./StartGameEnum";
import WalletType from "../WalletType";


/**
 * 用来获取游戏枚举的描述文字
 */
class GameEnumsIndex {

    /**
     * 获取所有的游戏类型
     */
    public getGameTypeAll = () => {
        return [
            GameTypeEnum.TOUZI ,
            GameTypeEnum.PC28DI ,
            GameTypeEnum.PC28GAO ,
            GameTypeEnum.TOUZIFS ,
            GameTypeEnum.PC28DIFS ,
            GameTypeEnum.PC28GAOFS ,
            GameTypeEnum.TOUZIJS ,
            GameTypeEnum.PCDWQ ,
            GameTypeEnum.PCDWQFS
        ]
    }

    /**
     * 获取所有的钱包类型
     */
    public getWallTypeAll = () => {
        return [
            WalletType.USDT,
            WalletType.CUSDT,
            WalletType.TRX,
            WalletType.CTRX,
            WalletType.JIFEN,
        ]
    }

    /**
     * 获取当前开始游戏的类型
     */
    public getStartGameStr = (type: StartGameEnum) => {
        switch (type) {
            case StartGameEnum.LOW:
                return 'Pc28'
            case StartGameEnum.HIGH:
                return 'Pc28高倍'
            case StartGameEnum.BALL:
                return 'Pc定位球'
        }
    }

    /**
     * 获取游戏类型描述文字
     */
    public getGameTypeStr = (type: GameTypeEnum): string => {
        switch (type) {
            case GameTypeEnum.TOUZI:
                return '骰子'
            case GameTypeEnum.PC28DI:
                return 'pc28'
            case GameTypeEnum.PC28GAO:
                return 'pc28高倍'
            case GameTypeEnum.TOUZIFS:
                return '骰子反水'
            case GameTypeEnum.PC28DIFS:
                return 'pc28反水'
            case GameTypeEnum.PC28GAOFS:
                return 'pc28高倍反水'
            case GameTypeEnum.TOUZIJS:
                return '骰子(一分钟期)'
            case GameTypeEnum.PCDWQ:
                return 'pc定位球'
            case GameTypeEnum.PCDWQFS:
                return 'pc定位球反水'
            default:
                return 'pc28'
        }
    }
}



export default GameEnumsIndex
