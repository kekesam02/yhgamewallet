import moment from "moment";
import {stat} from "fs";


class TimeUtils {

    /**
     * 判断当前日期是否是今日
     */
    public getIsDay = (time: string) => {
        let curr = moment(time)
        let { startTime, endTime } = this.getDayTime()
        return curr.isAfter(startTime) && curr.isBefore(endTime);
    }

    /**
     * 判断当前日期是否在一周内
     */
    public getIsWeek = (time: string) => {
        let curr = moment(time)
        let { startTime, endTime } = this.getWeekTime()
        return curr.isAfter(startTime) && curr.isBefore(endTime);
    }

    /**
     * 判断当前日期是否是本月
     */
    public getIsMonth = (time: string) => {
        let curr = moment(time)
        let { startTime, endTime } = this.getMonthTime()
        return curr.isAfter(startTime) && curr.isBefore(endTime);
    }

    /**
     * 获取今日开始时间和结束时间
     * @param start_time: 重新设置开始时间
     */
    public getDayTime = (start_time?: string) => {
        // 今日开始时间
        let start = moment().format('YYYY-MM-DD 00:00:00')
        // 今日结束时间
        let end = start_time
            ? moment().format('YYYY-MM-DD 23:59:59')
            : moment(start_time).add(24, 'hours').format('YYYY-MM-DD 23:59:59')
        return {
            startTime: start,
            endTime: end
        }
    }

    /**
     * 获取一周内的开始时间和结束时间
     */
    public getWeekTime = () => {
        // 七天前开始时间
        let start = moment().subtract(6, 'days').format('YYYY-MM-DD 00:00:00')
        // 今日结束日期
        let end = moment().format('YYYY-MM-DD 23:59:59')
        return {
            startTime: start,
            endTime: end
        }
    }

    /**
     * 获取一个月内的开始时间和结束时间
     */
    public getMonthTime = () => {
        let start = moment().subtract(29, 'days').format('YYYY-MM-DD 00:00:00')
        // 今日结束日期
        let end = moment().format('YYYY-MM-DD 23:59:59')
        return {
            startTime: start,
            endTime: end
        }
    }

    /**
     * 判断是否在当前的时间段
     * @param start 开始时间 格式为 20:00
     * @param end 结束时间  格式为 20:35
     */
    public isTimeBetween = (start: string, end: string) => {
        const now = moment();
        let startArr = start.split(':')
        let endArr = end.split(':')
        const startTime = moment(now).startOf('day').add(startArr[0], 'hours').add(startArr[1], 'minute')
        const endTime = moment(now).startOf('day').add(endArr[0], 'hours').add(endArr[1], 'minute')
        return now.isBetween(startTime, endTime);
    }

}

export default TimeUtils
