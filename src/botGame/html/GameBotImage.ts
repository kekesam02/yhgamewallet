import {InputFile} from "telegraf/types"
import BotRoundModel from "../../models/BotRoundModel";
import ImageUtils from "../../commons/Image/ImageUtils";

/**
 * 游戏机器人生成图片类
 */
class GameBotImage {

    /**
     * 生成 PC28 开奖记录图片
     */
    public createPC28Img = (historyList: Array<BotRoundModel>): Promise<InputFile>  => {
        return new ImageUtils().htmlToImage(`
            <html>
            <body>
                <div></div>
            </body>
            </html>
        `)
    }
}


export default GameBotImage
