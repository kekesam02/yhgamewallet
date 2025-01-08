import {DefectListType} from "../../type/BotGameType/BotGameType";
import CommonEnumsIndex from "../../type/CommonEnumsIndex";
import moment from "moment";


/**
 * 游戏反水html
 */
class GameDefectHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成满足反水条件html
     * @param needList: 需要反水的数据列表
     * @param time 上次领取时间
     */
    public createDefectHtml = (needList: DefectListType, time: string) => {
        time = time? moment(time).format('YYYY-MM-DD HH:mm:ss'): ''
        let html = ``
        if (needList.length <= 0) {
            html += `当前无反水${this.N}`
        }
        needList.forEach(item => {
            html = `${new CommonEnumsIndex().getWalletTypeStr(item.wallType)}反水: ${item.backMoney}成功${this.N}`
        })
        html += `${this.N}上次领取时间: ${(time && time != '')? time: '无'}`
        return html
    }
}


export default GameDefectHtml
