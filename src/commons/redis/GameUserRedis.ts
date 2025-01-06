/**
 * 正在游戏（锁定不能游戏）的用户 redis 数据
 */
import redis from "../../config/redis";

class GameUserRedis {

    /**
     * 正在游戏的用户数据
     * @private
     */
    private playingUserList = []

    /**
     * 锁定的用户列表、不能进行游戏
     * @private
     */
    private notPlayingUserList = []



    /**
     * 添加正在进行游戏的用户信息
     */
    private addPlayingUser = () => {
        redis.set()
    }

}
