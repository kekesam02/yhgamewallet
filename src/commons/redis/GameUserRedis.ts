import RedisHandle from "./RedisHandle";
import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import RedisUtils from "./RedisUtils";
import redis from "../../config/redis";
import {remove} from "winston";
import redisUtils from "./RedisUtils";

/**
 * 正在游戏（锁定不能游戏）的用户 redis 数据
 */
class GameUserRedis {

    /**
     * 判断用户是否可以开始游戏
     *      true: 可以开始游戏
     *      false: 不能开始游戏
     */
    public static getUserIsStartGame = async (tgId: string): Promise<boolean> => {
        let key = RedisHandle.USER_GAME_LOCK_KEY
        let result = await new RedisUtils().getArrData(key, 'tgId', tgId)
        return result == null
    }

    /**
     * 添加用户游戏锁、添加在列表中的用户不能进行游戏
     *      type: 预留一下
     */
    public static addUserGameLock = async (tgId: string, type: number = 0) => {
        let key = RedisHandle.USER_GAME_LOCK_KEY
        var numberPromise = await redis.exists(tgId);
        if (numberPromise == 1) {
            try {
                const data = await redis.get(key) || ""
                let redisData = JSON.parse(data) as Array<any>
                redisData.push({
                    tgId: tgId,
                    type: type
                })
                await redis.set(key, redisData.toString())
            }catch (e){
        let result = await new RedisUtils().setArrData(key, {
            tgId: tgId,
            type: type
        }, 'tgId')
        return result
    }

    /**
     * 删除用户游戏锁、删除后用户可以进行游戏
     * @param tgId
     */
    public static removeUserGameLock = async (tgId: string) => {
        let key = RedisHandle.USER_GAME_LOCK_KEY
        let result = await new RedisUtils().removeArrData(key, 'tgId', tgId)
        return result
    }

    // ------- 下面是判定用户是否正在游戏中的方法

    /**
     * 判断用户是否正在游戏中
     *      true: 正在游戏中
     *      false: 暂未开始游戏
     */
    public static getUserIsPlaying = async (tgId: string, gameType: GameTypeEnum): Promise<boolean> => {
        let key = RedisHandle.Playing_User_Key
        let data = await redis.get(key)
        if (data) {
            let json: any = JSON.parse(data)
            if (json[gameType]) {
                let index = json[gameType].findIndex((item: any) => {
                    if (item == tgId) {
                        return true
                    }
                })
                if (index > -1) {
                    return true
                }
            }
            return false
        }
        return false
    }

    /**
     * 添加正在进行游戏的用户信息、不需要根据游戏类型进行区分
     */
    public static addPlayingUser = async (tgId: string, gameType: GameTypeEnum) => {
        let key = RedisHandle.Playing_User_Key
        var numberPromise = await redis.exists(tgId);
        if (numberPromise == 1) {
            try {
                const data = await redis.get(key) || ""
                let redisData = JSON.parse(data) as Array<any>
                redisData.push({
                    tgId: tgId,
                    gameType: gameType
                })
                await  redis.set(key, redisData.toString())
            }catch (e){

        let data = await redis.get(key)
        if (data) {
            let json: any = JSON.parse(data)
            if (json[gameType]) {
                json[gameType].push(tgId)
                new RedisUtils().setJsonData(key, json)
            } else {
                json[gameType] = [tgId]
                new RedisUtils().setJsonData(key, json)
            }
        } else {
            new RedisUtils().setJsonData(key, {
                gameType: [tgId]
            })
        }
    }

    /**
     * 根据游戏类型删除正在游戏中的用户
     * @param gameType
     */
    public static clearPlayingUser = async (gameType: GameTypeEnum) => {
        let key = RedisHandle.Playing_User_Key
        let result = await redis.get(key)
        if (result) {
            let json: Array<any> = JSON.parse(result)
            if (json[gameType]) {
                json[gameType] = []
            }
            new RedisUtils().setJsonData(key, json)
        }
        return result
    }
}

export default GameUserRedis
