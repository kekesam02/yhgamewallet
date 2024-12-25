import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import PaymentType from "../../type/PaymentType";
import moment from "moment";
import DateFormatUtils from "../date/DateFormatUtils";



/**
 * 扩展支付类型查询sql
 */
SelectQueryBuilder.prototype.whereTime = function(
    startTime: string,
    endTime: string
) {
    console.log('传入的数据', startTime)
    console.log(moment(startTime).format('YYYY-MM-DD HH:mm:ss'))
    let _startTime = (startTime && startTime != '')
        ? moment(startTime).format('YYYY-MM-DD HH:mm:ss')
        : moment('1970-01-01').format('YYYY-MM-DD HH:mm:ss')
    let _endTime = (endTime && endTime != '')
        ? moment(endTime).format('YYYY-MM-DD HH:mm:ss')
        : moment().format('YYYY-MM-DD HH:mm:ss')
    console.log('查询开始时间', _startTime)
    console.log('查询结束时间', _endTime)
    this.andWhere('create_time >= :startTime and create_time <= :endTime', {
        startTime: _startTime,
        endTime: _endTime
    })
    return this
}
