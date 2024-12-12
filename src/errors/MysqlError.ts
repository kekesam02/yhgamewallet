import {callbackify} from "util";
import {CustomError} from "./customError";


/**
 * 数据库异常记录
 */
export class MysqlError extends CustomError {
    constructor(message?: string) {
        console.log('储物文字==================', message)
        super(210, message || 'Client is forbidden by risk control.');
    }
}


