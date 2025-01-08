import path from "path";
const QRCode = require('qrcode');
// const sharp = require('sharp');
class QRCodeUtils {

    /**
     * 生成二维码
     * 结果：返回buffer流
     * @param s 文本/链接/图片
     */
    public static createQrcodeBuffer = async (s: string, options = {
        errorCorrectionLevel: 'H', width: 350,
        height: 350, margin: 4
    }) => {
        try {
            // 生成二维码
            const qrCodeImage = await QRCode.toBuffer(s, options);
            return qrCodeImage
        } catch (e) {
            return Promise.reject("生成二维码失败...")
        }
    }

    /**
     * 生成二维码
     * 结果：返回base64的文本
     * 用法：<img src='base64'>
     * @param s 文本/链接/图片
     */
    public static createQrcodeBase64 = async (s: string, options = {
        errorCorrectionLevel: 'H', width: 350,
        height: 350, margin: 4
    }) => {
        try {
            // 生成二维码
            const qrCodeImage = await QRCode.toDataURL(s, options);
            return qrCodeImage
        } catch (e) {
            return Promise.reject("生成二维码失败...")
        }
    }


    // /**
    //  * 图片合成二维码
    //  * @param text
    //  * @param outputPath
    //  */
    // public static createQRCodeWithLogo = async (text: string, logoname: string = "usdtlogo_qr.png"): Promise<Buffer> => {
    //     try {
    //         // 生成二维码
    //         const qrCodeImage = await QRCode.toBuffer(text, {
    //             errorCorrectionLevel: 'H', width: 350,
    //             height: 350, margin: 4
    //         },);
    //         var logoPath = path.join(__dirname, './../../../static/images/' + logoname)
    //         // 合成图片
    //         const composite = await await sharp(qrCodeImage)
    //             .resize(350)
    //             .flatten({background: '#ff6600'})
    //             .composite([{
    //                 input: logoPath, gravity: 'center'
    //             }])
    //             .sharpen()
    //             .withMetadata()
    //             .png({quality: 100})
    //         // 输出合成后的图片
    //         return await composite.toBuffer();
    //     } catch (err) {
    //         return Promise.reject(err)
    //     }
    // }
}

export  default  QRCodeUtils