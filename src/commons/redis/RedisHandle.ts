import {Context} from "telegraf";

/**
 * redis 控制器
 */
class RedisHandle {

    /**
     * 红包在 redis 中存储的 key 值
     *      RedPacket_ + tgId
     */
    public static RedPacketRedisKey = 'RedPacket_'

    /**
     * 正在进行游戏的列表 key 值
     *      数据格式:[
     *              {
     *               gameType: GameType,
     *               tgId: 加密后的tgId
     *              }
     *           ]
     */
    public static PlayingUserListRedisKey = 'PlayingUserListRedisKey'

    /**
     * 不能进行游戏的用户列表
     *      数据格式: [
     *          {
     *              tgId: 加密后的tgId
     *          }
     *        ]
     */
    public static NotPlayingUserListRedisKey = 'NotPlayingUserListRedisKey'
}

export default RedisHandle
