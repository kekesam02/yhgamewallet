import redis from "../../config/redis";
import RedisHandle from "./RedisHandle";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";

/**
 * 正在游戏（锁定不能游戏）的用户 redis 数据
 */
class GameUserRedis {

    /**
     * 判断用户是否正在游戏中
     *      true: 正在游戏中
     *      false: 暂未开始游戏
     */
    public getUserIsPlaying = (tgId: string) => {
        return !!this.getPlayingUser(tgId)
    }

    /**
     * 判断用户是否可以开始游戏
     *      true: 可以开始游戏
     *      false: 不能开始游戏
     */
    private getUserIsStartGame = (tgId: string) => {
        return !this.getUserGameLock(tgId)
    }

    /**
     * 添加用户游戏锁、添加在列表中的用户不能进行游戏
     *      type: 预留一下
     */
    public addUserGameLock = (tgId: string, type: number = 0) => {
        let key = RedisHandle.USER_GAME_LOCK_KEY
        if (redis.exists(tgId) == 1) {
            try {
                let redisData = JSON.parse(redis.get(key)) as Array<any>
                redisData.push({
                    tgId: tgId,
                    type: type
                })
                redis.set(key, redisData.toString())
            }
        } else {
            redis.set(key, [{
                tgId: tgId,
                type: type
            }].toString())
        }
    }

    /**
     * 添加正在进行游戏的用户信息、不需要根据游戏类型进行区分
     */
    public addPlayingUser = (tgId: string, gameType: GameTypeEnum) => {
        let key = RedisHandle.Playing_User_Key
        if (redis.exists(tgId) == 1) {
            try {
                let redisData = JSON.parse(redis.get(key)) as Array<any>
                redisData.push({
                    tgId: tgId,
                    gameType: gameType
                })
                redis.set(key, redisData.toString())
            }
        } else {
            redis.set(key, [{
                tgId: tgId,
                gameType: gameType
            }].toString())
        }
    }


    /**
     * 获取正在进行游戏的用户信息
     */
    private getPlayingUser = (tgId: string): {
        gameType: GameTypeEnum,
        tgId: string
    } | null => {
        let key = RedisHandle.Playing_User_Key
        let resultStr = redis.get(key)
        let curr: {
            gameType: GameTypeEnum,
            tgId: string
        } | null = null
        if (resultStr) {
            try {
                let result = JSON.parse(resultStr) as Array<any>
                for (let i = 0; i < result.length; i++) {
                    let item = result[i]
                    if (item.tgId == tgId) {
                        curr = item
                        break
                    }
                }
            } catch (err) {

            }
        }
        return curr
    }


    /**
     * 获取正在进行游戏的用户信息
     */
    private getUserGameLock = (tgId: string): {
        type: number,
        tgId: string
    } | null => {
        let key = RedisHandle.USER_GAME_LOCK_KEY
        let resultStr = redis.get(key)
        let curr: {
            type: number,
            tgId: string
        } | null = null
        if (resultStr) {
            try {
                let result = JSON.parse(resultStr) as Array<any>
                for (let i = 0; i < result.length; i++) {
                    let item = result[i]
                    if (item.tgId == tgId) {
                        curr = item
                        break
                    }
                }
            } catch (err) {

            }
        }
        return curr
    }

}
