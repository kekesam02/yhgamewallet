import GameTypeEnum from "../../type/gameEnums/GameTypeEnum";
import GameEnumsIndex from "../../type/gameEnums/GameEnumsIndex";
import StartGameEnum from "../../type/gameEnums/StartGameEnum";
import { Pc28LotteryJsonType } from "../../type/gameEnums/LooteryJsonType";
import moment from 'moment'
import BotOddsModel from "../../models/BotOddsModel";
import UserModel from "../../models/UserModel";
import WalletType from "../../type/WalletType";
import CommonEnumsIndex from "../../type/CommonEnumsIndex";
import AESUtils from "../../commons/AESUtils";
import BotPledgeUpModel, {PledgeUpInfoType} from "../../models/BotPledgeUpModel";
import WinningTypeConfirm from "../../botGame/const/WinningTypeConfirm";
import ComputeUtils from "../../commons/ComputeUtils";
import BotGameConfig from "../../botGame/BotGameConfig";

/**
 * 游戏机器人返回的html字段
 */
class GameBotHtml {

    // 结果模版字符串缩进会在 html 中展示问题
    private N = '\n'

    /**
     * 生成开始游戏的html字符串
     */
    public getBotStartHtml = (): string => {
        return `欢迎使用一号公馆娱乐机器人\uD83C\uDFAA\n`
        + "\n<tg-emoji emoji-id=\"5368324170671202286\">\uD83D\uDC47</tg-emoji><b>请选择你要娱乐的游戏\uD83C\uDFAE</b><tg-emoji emoji-id=\"5368324170671202286\">\uD83D\uDC4D</tg-emoji>"
    }

    /**
     * 生成余额不够字符串
     * @param user: 用户
     * @param roundId: 期数
     * @param content: 下注内容
     */
    public getBalanceNot = (
        user: UserModel,
        roundId: number,
        pledgeUpInfo: PledgeUpInfoType
    ): string => {
        let userId = AESUtils.decodeUserId(user.tgId)
        let content = ''
        pledgeUpInfo.list.forEach(item => {
            content = `${content}${item.content}${this.N}`
        })
        return `
            昵称: <a href="tg://user?id=${userId}">${user.userName}</a>${this.N
            }ID: <code>${userId}</code>${this.N
            }期号: <code>${roundId}</code>${this.N
            }${content}${this.N
            }余额不足${this.N
            }------------------------------------${this.N
            }USDT: ${user.USDT}${this.N
            }TRX: ${user.TRX}${this.N
            }彩U: ${user.CUSDT}${this.N
            }彩t: ${user.CTRX}
        `
    }

    /**
     * 生成下注后返回的字符串内容
     * @param user: 用户
     * @param roundId: 期号
     * @param content: 下注成功内容
     * @param wallType: 钱包类型
     */
    public getBettingHtml = (
        user: UserModel,
        pledgeUpInfo: PledgeUpInfoType,
        wallType: WalletType
    ): string => {
        let content = ''
        let wallTypeStr = new CommonEnumsIndex().getWalletTypeStr(wallType)
        pledgeUpInfo.list.forEach(item => {
            content = `${content}${item.content}${wallTypeStr}${this.N}`
        })
        if (pledgeUpInfo.list[0].command == '梭哈') {
            content = `${pledgeUpInfo.list[0].content}${pledgeUpInfo.totalMoney}${wallTypeStr}${this.N}`
        }
        let userId = AESUtils.decodeUserId(user.tgId)
        // let vipHtml = '1'
        return `
            ${user.userName} 【${userId}】${this.N
            }当前期号：<code>${pledgeUpInfo.roundId}</code>${this.N
            }下注成功内容${this.N
            }${content}${this.N
            }---------------${this.N
            }余额: ${wallTypeStr}${user.getBalance(wallType)}
        `
    }

    /**
     * 获取进入游戏模式字符串
     */
    public getGameModelHtml = (gameType: StartGameEnum): string => {
        let gameTypeStr = new GameEnumsIndex().getStartGameStr(gameType)
        let html = `
            进入游戏模式：${gameTypeStr}${
            this.N}----------------${
            this.N}常用指令：点击复制\uD83D\uDC47${
            this.N}1.<code>历史</code>或者<code>1</code>${
            this.N}2.<code>取消</code>或者<code>2</code>${
            this.N}3.<code>反水</code>或者<code>3</code>${
            this.N}4.<code>规则</code>或者<code>4</code>${this.N}
        `;
        return html
    }

    /**
     * 生成游戏开始下注html
     * @param json: pc28 开奖json
     * @param gameType: 游戏类型
     * @param oddsMap: 赔率列表
     */
    public getStartGameHtml = (
        json: Pc28LotteryJsonType,
        gameType: GameTypeEnum,
        oddsMap: Map<number, Map<string, BotOddsModel>>
    ): string => {
        // 890和901结果
        let baJiuLin = ''
        let gameName = ''
        let gquserName = ''
        let defect = '0'
        switch (gameType) {
            case GameTypeEnum.TOUZI:
                gquserName = '\n⚠️3/18不可点杀 \n'
                return ''
            case GameTypeEnum.TOUZIJS:
                gquserName = '@'
                return ''
            case GameTypeEnum.PC28DI:
                gquserName = `⚠️遇13/14大/小/单/双赔 1.6 \n⚠️遇13/14下注组合回本`
                baJiuLin = '不属于'
                gameName = 'pc2.0'
                defect = oddsMap.get(5)?.get('pc反水')?.odds ?? '0'
                return this.createPC28Html(
                    json,
                    oddsMap.get(gameType)!,
                    gameName,
                    baJiuLin,
                    gquserName,
                    defect
                )
            case GameTypeEnum.PC28GAO:
                gquserName = `⚠️遇13/14 、对子、顺子、豹子，中奖回本金`
                baJiuLin = '属于'
                gameName = 'pc2.8'
                defect = oddsMap.get(6)?.get('pc2.8反水')?.odds ?? '0'
                return this.createPC28Html(
                    json,
                    oddsMap.get(gameType)!,
                    gameName,
                    baJiuLin,
                    gquserName,
                    defect
                )
            default:
                return ''
        }
    }

    /**
     * 生成封盘提醒html
     */
    public getCloseTips = (roundId: string): string => {
        return `
        ❗️❗️提醒❗️❗️❗️${this.N
        }${roundId}期封盘剩下30秒！${this.N
        }以下下注一切以机器人收录为准${this.N
        }如机器人未收录则无效！无争议！${this.N
        }领取活动需按活动流水下分，未领取则不计算${this.N
        }本群自由反水，输入反水即可反当前流水！
        `
    }

    /**
     * 生成停止上注 html
     * @param roundId: 游戏期号
     * @param startTime: 开奖时间
     * @param pledgeUpList: 当前下注用户
     */
    public getStopTopHtml = (
        roundId: string,
        startTime: string,
        pledgeUpList: Array<BotPledgeUpModel>
    ): string => {
        let personLength: Array<string> = []
        pledgeUpList.map(item => {
            if (personLength.indexOf(item.userName) < 0) {
                personLength.push(item.userName)
            }
        })
        let headerHtml = `
            <tg-emoji emoji-id='5368324170671202286'>\uD83D\uDC47</tg-emoji>期号：<code> ${roundId}</code> 停止下注${this.N
            }<tg-emoji emoji-id='5368324170671202286'>\uD83D\uDC47</tg-emoji>开奖时间：${startTime}${this.N
            }-----------------------${this.N
            }本期人数: ${personLength.length}${this.N
            }-----本期下注玩家-----`
        pledgeUpList.forEach(item => {
            headerHtml += `${this.N}${item.userName} ${item.content}${new CommonEnumsIndex().getWalletTypeStr(item.walletType)}`
        })
        return headerHtml
    }

    /**
     * 生成开奖结果文字描述html
     * @param json: 中奖json
     * @param roundId: 当前期数
     * @param code: 当前开奖号码
     * @param gameType: 游戏类型
     * @param pledgeUpList: 下注列表 (过滤后已经中奖的数据)
     */
    public getLotteryTextHtml = (
        json: Pc28LotteryJsonType,
        roundId: string,
        code: string,
        gameType: GameTypeEnum,
        pledgeUpList: Array<BotPledgeUpModel>
    ) => {
        let arrCode = code.split(',')
        let sum = arrCode.reduce((prev, curr) => {
            return prev.add(curr)
        }, new ComputeUtils(0)).toString()
        let winnerType = new WinningTypeConfirm().getLotteryDesc(code, gameType)
        let html = `${roundId}期开奖${this.N
        }${arrCode[0]}+${arrCode[1]}+${arrCode[2]}=${sum}(${winnerType.code.key})${this.N
        }特殊奖: ${winnerType.form.key}${this.N
        }=======本期中奖结果=======${this.N}`
        pledgeUpList.forEach(item => {
            // 上注的内容纯文字
            let contentText = item.content.replaceAll(item.amountMoney, '')
            // 倍率
            let rate = new ComputeUtils(item.winningAmount).dividedBy(item.amountMoney, 2).toString()
            html += `${item.userName} ${contentText} 中 ${item.winningAmount}(${rate})倍率${this.N}`
        })
        return html
    }





    /**
     * 生成 pc28 开始下注html
     * @param json:  获取到的 json 数据
     * @param oddsMap: 赔率map表
     * @param gameName: 游戏名称
     * @param baJiuLin: 890/901结果
     * @param gquserName: 是否可点杀
     * @param defect: 反水
     */
    public createPC28Html = (
        json: Pc28LotteryJsonType,
        oddsMap: Map<string, BotOddsModel>,
        gameName: string,
        baJiuLin: string,
        gquserName: string,
        defect: string
    ): string => {
        let currData = json.data[0]
        let nextTime = moment(currData.next_time)
        // 封盘时间
        let fbTime = nextTime.subtract(new BotGameConfig().FPTime, 'seconds').format('YYYY-MM-DD HH:mm:ss')
        return `
            <tg-emoji emoji-id=\"5368324170671202286\">\uD83C\uDFAA</tg-emoji>期号：<code>${currData.next_expect}</code>开始下注${this.N

            }<tg-emoji emoji-id=\"5368324170671202286\">\uD83C\uDDE8\uD83C\uDDE6</tg-emoji>封盘时间：${fbTime}${this.N
            }<tg-emoji emoji-id=\"5368324170671202286\">\uD83C\uDDE8\uD83C\uDDE6</tg-emoji>开奖时间：${currData.next_time}${this.N
            }————————————————${this.N
            }下注格式：下注类型+金额 例子：大100 大单100${this.N
            }点杀特码：数字+杀+金额 例子：11杀10 18杀20${this.N
            }——————————————————————${this.N
            }玩法赔率/限注：${this.N
            }大小单双 ${oddsMap.get('大')?.odds}倍 （1-1000）${this.N
            }极值大小 ${oddsMap.get('极大')?.odds}倍 （1-1000）${this.N
            }— — — — — —${this.N
            }组合投注：${this.N
            }大单/小双 ${oddsMap.get('大单')?.odds}倍 （1-1000）${this.N
            }小单/大双 ${oddsMap.get('大双')?.odds}倍 （1-1000）${this.N
            }— — — — — —${this.N
            }特殊组合：${this.N
            }对子 ${oddsMap.get('对子')?.odds}倍 (1-1000)${this.N
            }顺子 ${oddsMap.get('顺子')?.odds}倍 (1-1000)${this.N
            }（890,901${baJiuLin}顺子）${this.N
            }豹子 ${oddsMap.get('豹子')?.odds}倍(1-1000)${this.N
            }— — — — — —${this.N
            }特码数字：${this.N
            }\uD83D\uDCB50/27=${oddsMap.get('27杀')?.odds}倍   1/26=${oddsMap.get('26杀')?.odds}倍\uD83D\uDCB5${this.N
            }\uD83D\uDCB52/25=${oddsMap.get('25杀')?.odds}倍    3/24=${oddsMap.get('24杀')?.odds}倍 \uD83D\uDCB5${this.N
            }\uD83D\uDCB54/23=${oddsMap.get('23杀')?.odds}倍      5/22=${oddsMap.get('22杀')?.odds}倍 \uD83D\uDCB5${this.N
            }\uD83D\uDCB56/21=${oddsMap.get('21杀')?.odds}倍      7/20=${oddsMap.get('20杀')?.odds}倍 \uD83D\uDCB5${this.N
            }\uD83D\uDCB58/19=${oddsMap.get('19杀')?.odds}倍     9/18=${oddsMap.get('18杀')?.odds}倍  \uD83D\uDCB5${this.N
            }\uD83D\uDCB510/17=${oddsMap.get('17杀')?.odds}倍  11/16=${oddsMap.get('16杀')?.odds}倍 \uD83D\uDCB5${this.N
            }\uD83D\uDCB512/15=${oddsMap.get('15杀')?.odds}倍   13/14=${oddsMap.get('14杀')?.odds}倍\uD83D\uDCB5${this.N
            }0/27限额（1-500）其余数字（1-1000)${this.N
            }${gquserName}${this.N
            }⚠️豹子点杀 点杀数字 必须要加空格 数字最多下注10个${this.N
            }—————————————————${this.N
            }投注时确保 @VertexPaybot 里有一定的余额${this.N
            }余额优先消耗彩金 获取简易信息发送【指令】${this.N
            }一切下注已机器人收录为准，未收录无效，无争议！${this.N
            }流水满一百起反 反水${defect}%  游戏群发送【反水】即可领取${this.N
            }—————————————————————————${this.N
            }以上${gameName}游戏群最终解释权归一号公馆所有${this.N
            }一号公馆官方钱包 @VertexPaybot${this.N
            }一号公馆官方游戏机器人 @OnePalace_Gamebot
        `
    }
}


export default GameBotHtml
