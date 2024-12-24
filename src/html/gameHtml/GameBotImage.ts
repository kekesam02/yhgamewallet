import {InputFile} from "telegraf/types"
import BotRoundModel from "../../models/BotRoundModel";
import ImageUtils from "../../commons/Image/ImageUtils";
import {indexed} from "telegraf/typings/core/helpers/util";

/**
 * 游戏机器人生成图片类
 */
class GameBotImage {

    /**
     * 生成 PC28 开奖记录图片
     */
    public createPC28Img = (historyList: Array<BotRoundModel>): Promise<{
        source: Buffer
        filename?: string
    }>  => {
        // 获取极值描述文字
        let getLevelValue = (item: BotRoundModel) => {
            if (!item.result) {
                return `<div class="wrap-view peak">无</div>`
            }
            let total = item.numOne + item.numTwo + item.numThree
            if (total >= 0 && total <= 5) {
                return `<div class="wrap-view peak mark">极小</div>`
            } else if(total >= 22 && total <= 27) {
                return `<div class="wrap-view peak mark">极大</div>`
            }
            return `<div class="wrap-view peak">无</div>`
        }
        let createMapHtml = (): string => {
            let html = ''
            historyList.map((item, index) => {
                html = html + `
                <tr class="main-view">
                    <td><div class="wrap-view strone">${item.roundId}期</div></td>
                    <td class="result">
                        <div class="wrap-view">${item.numOne ?? ''}</div>
                    </td>
                    <td><div class="wrap-view">+</div></td>
                    <td class="result mark">
                        <div class="wrap-view">${item.numTwo ?? ''}</div>
                    </td>
                    <td><div class="wrap-view">+</div></td>
                    <td class="result mark">
                        <div class="wrap-view">${item.numThree ?? ''}</div>
                    </td>
                    <td><div class="wrap-view">=</div></td>
                    <td>
                        <div class="wrap-view">
                            ${ 
                                !item.result 
                                    ? ''
                                    : item.result.split('=')[1]}
                        </div>
                    </td>
                    <td>
                        <div class="wrap-view shallow two">
                            ${
                                !item.result 
                                    ?  ''
                                    : item.specialCode.split('').map(item2 => {
                                            if (item2 === '大' || item2 === '双') {
                                                return  `<span class="mark">${item2}</span>`
                                            }
                                            return `<span>${item2}</span>`
                                        })
                            }
                        </div>
                    </td>
                    <td>${getLevelValue(item)}</td>
                    <td>
                        ${
                            !item.form
                                ? `<div class="wrap-view shallow shape"></div>`
                                : item.form.indexOf('杂') > -1
                                    ? `<div class="wrap-view shallow shape">${item.form}</div>`
                                    : `<div class="wrap-view shallow shape mark">${item.form}</div>`
                        }
                    </td>
                    <td>
                        <div class="wrap-view shallow" style="color: rgb(19,38,250)">
                            ${
                                !item.result
                                    ? ''
                                    : item.numOne > item.numThree
                                        ? '龙'
                                        : item.numOne == item.numThree
                                            ? '合'
                                            : '虎'
                            }
                        </div>
                    </td>
                </tr>
                `
            })
            return html
        }
        return new ImageUtils().htmlToImage(`
            <html lang="en">
            <body>
                <style>
                    table, th, td {
                        border: 1px solid rgb(245,245,245); /* 设置表格、表头和单元格的边框为蓝色 */
                    }
                    .header-view table,.header-view th,.header-view td {
                        border: 1px solid #000;
                    }
                    body{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                        margin: 0;
                        font-size: 22px;
                        width: 502px;
                        height: 642px;
                    }
                    table{
                        white-space: nowrap;
                        font-family: WenQuanYi Zen Hei,sans-serif;
                        border-collapse: collapse;
                        font-weight: bold;
                    }
                    td{
                        padding: 0;
                    }
                    .main-view .wrap-view {
                        height: 27px;
                    }
                    .wrap-view{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0 8px;
                    }
                    .header-view{
                        background: black;
                        color: #fff;
                        border: 1px solid #000;
                        font-size: 22px;
                    }
                    .font-sm{
                        font-size: 16px;
                        font-weight: normal;
                    }
                    .result{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgb(80, 145, 233);
                        color: #fff;
                    }
                    .shallow{
                        background: rgb(242,242,242);
                    }
                    .result.mark{
                        background: rgb(200, 23, 27);
                        color: #fff;
                    }
            
            
                    .two{
                        color: rgb(19,38,250);
                    }
                    .two > .mark{
                        color: rgb(200,23,27);
                    }
                    .peak{
                        color: #000;
                    }
                    .peak.mark{
                        color: #fff;
                        background: rgb(200,23,27);
                    }
                    .shape{
                        color: rgb(218,201,38);
                    }
                    .shape.mark{
                        color: rgb(19,42,232);
                    }
                </style>
                <table border="1" cellspacing="0">
                    <tr class="header-view">
                        <th rowspan="2"><div class="wrap-view">回合</div></th>
                        <th colspan="7"><div class="wrap-view">结果</div></th>
                        <th rowspan="2"><div class=wrap-view">双面</div></th>
                        <th rowspan="2"><div class=wrap-view">极值</div></th>
                        <th colspan="2" rowspan="2"><div class="wrap-view">形态</div></th>
                    </tr>
                    <tr class="header-view">
                        <td>
                            <div class="wrap-view font-sm">A</div></td><td>
                            <div class="wrap-view font-sm"></div></td><td>
                            <div class="wrap-view font-sm">B</div></td><td>
                            <div class="wrap-view font-sm"></div></td><td>
                            <div class="wrap-view font-sm">C</div></td><td>
                            <div class="wrap-view font-sm"></div></td><td>
                            <div class="wrap-view font-sm">特码</div></td>
                    </tr>
                    ${createMapHtml()}
                </table>
            </body>
            </html>
        `)
    }
}


export default GameBotImage
