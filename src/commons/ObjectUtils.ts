import UserModel from "../models/UserModel";

/**
 * string扩展方法、暂时先这样存放
 */
class ObjectUtils {


    // 对象为空
    public static isEmpty = (obj: any): boolean => {
        return (!obj || Object.keys(obj).length === 0);
    }

    // 对象不为空
    public static isNotEmpty = (obj: any): boolean => {
        return !this.isEmpty(obj)
    }

}


export default ObjectUtils
