const moment = require('moment');

class DateFormatUtils {

    /**
     * 日期格式化
     * @param date
     * @param format
     */
    public static DateFormat =  (date: Date, format: string = "YYYY-MM-DD HH:mm:ss")  => {
        return moment(date).format(format)
    }

    /**
     * 日期格式化
     * @param date
     * @param format
     */
    public static DateFormatString =  (date: string, format: string = "YYYY-MM-DD HH:mm:ss")  => {
        return moment(new Date(date)).format(format)
    }


    /**
     * 日期格式化
     * @param format
     */
    public static CurrentDateFormatString =  ( format: string = "YYYY-MM-DD HH:mm:ss")  => {
        return moment(new Date()).format(format)
    }

    /**
     * 判断两个时间是否超过24小时
     * @param date1
     * @param date2
     */
    public static  isMoreThan24HoursApart = (date1:string, date2:string) =>{
        const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
        const d1 = moment(date1).toDate()
        const d2 = moment(date2).toDate()
        const difference = Math.abs(d1.getTime() - d2.getTime());
        return difference > oneDay;
    }

    /**
     * 判断两个时间是否超过24小时
     * @param date1
     * @param date2
     */
    public static  isMoreThan24HoursApartCurrent = (date2:string) =>{
        const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
        const d1 = new Date()
        const d2 = moment(date2).toDate()
        const difference = Math.abs(d1.getTime() - d2.getTime());
        return difference > oneDay;
    }
}

export  default  DateFormatUtils