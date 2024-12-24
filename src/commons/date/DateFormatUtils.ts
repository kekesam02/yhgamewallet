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
     * @param outputPath
     */
    public static DateFormatString =  (date: string, format: string = "YYYY-MM-DD HH:mm:ss")  => {
        return moment(new Date(date)).format(format)
    }
}

export  default  DateFormatUtils