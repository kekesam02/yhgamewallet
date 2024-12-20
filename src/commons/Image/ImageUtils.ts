import nodeHtmlToImage from 'node-html-to-image'
import {InputFile} from "telegraf/types";
import path from "path";
import fs from "fs";

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

    /**
     * 读取本地图片、并返回 buffer
     * @param url: 图片地址
     */
    public readImageFile = async (url: string): Promise<Buffer> => {
        const imagePath = path.join(__dirname, url)
        try {
            let result = await fs.readFileSync(imagePath)
            return Buffer.from(result)
        } catch (err) {
            console.log('读取图片失败', err)
            throw (err)
        }
    }
}


export default ImageUtils
