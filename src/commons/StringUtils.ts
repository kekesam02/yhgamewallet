/**
 * string扩展方法、暂时先这样存放
 */
class StringUtils {

    /**
     * 判断numStr是否以数字开头
     * @param numStr
     * @return true: 以数字开头的
     */
    public isStartWithNum = (numStr: string): boolean => {
        return /^\d/.test(numStr)
    }
}


export default StringUtils
