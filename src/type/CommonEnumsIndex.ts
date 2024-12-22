import GameTypeEnum from "./gameEnums/GameTypeEnum";
import WalletType from "./WalletType";


/**
 * 获取公共的类型描述文字之类的
 */
class CommonEnumsIndex {

    /**
     * 获取所有的游戏类型
     */
    public getAllGameType = () => {
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
     * 获取钱包类型描述文字
     */
    public getWalletTypeStr = (walletType: WalletType): string =>{
        switch (walletType) {
            case WalletType.USDT:
                return 'usdt'
            case WalletType.CUSDT:
                return '彩U'
            case WalletType.TRX:
                return 'TRX'
            case WalletType.CTRX:
                return '彩T'
            case WalletType.JIFEN:
                return '积分'
        }
    }
}



export default CommonEnumsIndex
