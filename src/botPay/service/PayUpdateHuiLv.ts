import https from "node:https";
import BotExchangeModel from "../../models/BotExchangeModel";
import ExchangeEnum from "../../type/WalletType/ExchangeEnum";
import StringUtils from "../../commons/StringUtils";


class PayUpdateHuiLv {

    private static url =  "https://apilist.tronscanapi.com/api/token_trc20?contract=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&showAll=1";
    private static tronApiKey =  "7ece4f07-bf73-4c8c-8219-ff624af32866";

    public static updateHuiLv = async ()=>{
        https.get(this.url,{
            headers:{
                "Accept":"application/json",
                "TRON-PRO-API-KEY":this.tronApiKey
            }
        },(res)=>{
            let data =  ''
            res.on("data",chunk => {
                data += chunk;
            })
            res.on("end",() => {
                if(data){
                    const jsonData = JSON.parse(data)
                    // 获取交易市场的usdt兑换trx的数据
                    const marketInfo = jsonData['trc20_tokens'][0]["market_info"]
                    if(marketInfo && marketInfo.priceInTrx > 0) {
                        // 获取usdt--->trx的实时汇率
                        const priceInTrx = StringUtils.toFixedNoRounding(marketInfo.priceInTrx,2)
                        // 获取trx--->usdt的实时汇率
                        const priceInUsd = StringUtils.toFixedNoRounding((100 / (parseFloat(priceInTrx) * 100)).toString(),2)
                        // 开始更新汇率 USDT转 trx的时候会直接*类型1的值
                        new BotExchangeModel().updateRate(ExchangeEnum.USDT_TRX, priceInTrx)
                        // 开始更新汇率 trx转 USDT 的时候会直接*类型2的值
                        new BotExchangeModel().updateRate(ExchangeEnum.TRX_USDT, priceInUsd.toString())
                    }
                }
            })
        }).on('error',err => {
            console.log('请求出错了...');
        })
    }
}

export  default  PayUpdateHuiLv