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

    /**
     * 判断 numStr 是否是纯数字
     * @param numStr
     * @return true: 纯数字
     */
    public isNum = (numStr: string): boolean => {
        return /^\d+$/.test(numStr)
    }

    /**
     * 数字截取
     * @param num
     */
    public static toFixedNoRounding = (data:string,point:number)=> {
        // 将数字转换为字符串
        var numStr = data.toString();
        // 判断是否有小数部分
        if (numStr.indexOf('.') >= 0) {
            // 截取小数点后两位
            return numStr.slice(0, numStr.indexOf('.') + (point + 1));
        } else {
            // 没有小数部分，直接返回原数字
            return numStr;
        }
    }
}


export default StringUtils
