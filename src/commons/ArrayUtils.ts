/**
 * string扩展方法、暂时先这样存放
 */
class ArrayUtils {

    // 数组为空
    public static isEmpty = (arr: []): boolean => {
        return (!arr || arr.length === 0);
    }

    // 数组不为空
    public static isNotEmpty = (arr: []): boolean => {
        return !this.isEmpty(arr);
    }

}


export default ArrayUtils
