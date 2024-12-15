import nodeHtmlToImage from 'node-html-to-image'
import {InputFile} from "telegraf/types";

/**
 * 图片操作公共类
 */
class ImageUtils {

    /**
     * 将 html 转化为 图片
     * @param html
     */
    public htmlToImage = async (html: string): Promise<InputFile> => {
        let result = await nodeHtmlToImage({
            html: html
        }) as Buffer
        return {
            source: Buffer.from(result),
            filename: '1.png'
        }
    }
}


export default ImageUtils
