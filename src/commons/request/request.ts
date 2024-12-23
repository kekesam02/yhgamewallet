import axios from "axios";
import {CreateAxiosDefaults, Method} from "axios/index";


/**
 * 网络请求临时封装
 * @param config
 */
let request = (config: CreateAxiosDefaults) => {
    return axios.request({
        url: config.url,
        method: config.method
    })
}


export default request
