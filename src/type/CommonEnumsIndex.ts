import GameTypeEnum from "./gameEnums/GameTypeEnum";

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
}



export default CommonEnumsIndex
