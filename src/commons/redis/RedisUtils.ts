/**
 * redis 公共方法
 */
import redis from "../../config/redis";

class RedisUtils {

    /**
     * redis 中存储json数据
     */
    public setJsonData = (key: string, data: any) => {
        return redis.set(key, JSON.stringify(data))
    }

    /**
     * redis 获取json数据
     */
    public async getJsonData(key: string) {
        let dataStr = await redis.get(key)
        if (dataStr) {
            return JSON.parse(dataStr)
        }
        return null
    }

    /**
     * 设置数组数据
     *      如果数据存在的话覆盖推入
     *      如果数据不存在的话创建为数组在推入到 redis 中
     * @param key: redis 中的key
     * @param item: 要推入数组的item
     * @param itemKey: 数组中的唯一id属性
     */
    public setArrData = async (key: string, item: any, itemKey: string) => {
        let dataStr = await redis.get(key)
        if (dataStr) {
            try {
                let arr = JSON.parse(dataStr) as Array<any>
                let isExit = false
                arr.map(item2 => {
                    if (item2[itemKey] == item[itemKey]) {
                        item2 = item
                        isExit = true
                    }
                    return item2
                })
                if (!isExit) {
                    arr.push(item)
                }
                return redis.set(key, JSON.stringify(arr))
            } catch (err) {
                // 解构失败、redis 中数据格式有问题直接覆盖
                return redis.set(key, JSON.stringify([item]))
            }
        } else {
            return redis.set(key, JSON.stringify([item]));
        }
    }

    /**
     * 获取redis 数组中 arr[itemKey] == keyValue 的数据
     * @param key: redis 中的key
     * @param itemKey: 数组中的唯一key、要删除数据的key
     * @param keyValue: 数组中唯一key、匹配的value
     */
    public getArrData = async (key: string, itemKey: string, keyValue: string) => {
        let result = await redis.get(key)
        if (result) {
            let json: Array<any> = JSON.parse(result)
            let index = json.findIndex(item2 => {
                if (item2[itemKey] == keyValue) {
                    return true
                }
            })
            if (index > -1) {
                return json[index]
            }
            return null
        }
        return null
    }

    /**
     * 删除数组数据
     * @param key: redis 中的key
     * @param itemKey: 数组中的唯一key、要删除数据的key
     * @param keyValue: 数组中唯一key、匹配的value
     */
    public removeArrData = async (key: string, itemKey: string, keyValue: string) => {
        let result = await redis.get(key)
        if (result) {
            let json: Array<any> = JSON.parse(result)
            let index = json.findIndex(item2 => {
                if (item2[itemKey] == keyValue) {
                    return true
                }
            })
            if (index > -1) {
                json.splice(index, 1)
            }
            return redis.set(key, JSON.stringify(json))
        }
        return true
    }

}


export default RedisUtils
