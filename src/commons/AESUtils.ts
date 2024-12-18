const forge = require('node-forge')


/**
 * 加密解密
 */
class AESUtils {

    // 设置初始化向量
    public static iv = '0000000000000000'

    // 钱包加密字符串
    public static walletKey = 'ZrAoMQ4zEpM6iNR+ms9iRg=='

    // 用户ID加密字符串
    public static userIdKey = 'ZrAoMQ4zEpM6iNR+ms9iRg=='

    // 提现地址加密字符串
    public static addrKey = 'zDQZl2KqLiTCD3lgGuTYhg=='

    /**
     * 钱包加密
     */
    public static encodeWallet = (data: string): string => {
        return this.encryptPWD(data, this.walletKey)
    }

    /**
     * 钱包解密
     * @param data
     */
    public static decodeWallet = (data: string): string => {
        return this.decodePWD(data, this.walletKey)
    }

    /**
     * 用户ID加密
     */
    public static encodeUserId = (data: string = ''): string => {
        return this.encryptPWD(data, this.userIdKey)
    }

    /**
     * 用户ID解密
     * @param data
     */
    public static decodeUserId = (data: string): string => {
        return this.decodePWD(data, this.userIdKey)
    }

    /**
     * 提现地址加密
     */
    public static encodeAddr = (data: string): string => {
        return this.encryptPWD(data, this.addrKey)
    }

    /**
     * 提现地址解密
     * @param data
     */
    public static decodeAddr = (data: string): string => {
        return this.decodePWD(data, this.addrKey)
    }

    /**
     * 加密
     * @param data
     * @param key
     */
    public static encryptPWD = (data: string, key: string): string => {
        try {
            let cipher = forge.cipher.createCipher('AES-ECB', atob(key));
            cipher.start({iv: this.iv});
            cipher.update(forge.util.createBuffer(data));
            cipher.finish();
            let encrypted = cipher.output;

            return btoa(encrypted.data)
        } catch (e) {
            console.log("出错了", e)
            return ''
        }
    }

    /**
     * 解密
     */
    public static decodePWD = (data: string, key: string): string => {
        let cipher = forge.cipher.createDecipher('AES-ECB', atob(key));
        cipher.start({iv: this.iv});
        cipher.update(forge.util.createBuffer(atob(data)));
        cipher.finish()
        let encrypted = cipher.output;
        return encrypted.data
    }

    public static test = () => {
        // // 测试地址加密
        // let data = 'TJgSnEbS8cPHAqF4eBvDb9gbd8UPv7862f';
        // console.log('地址加密结果', this.encodeAddr(data))
        //
        // // 测试地址解密
        // let data2 = 'xC53lPi2Xa8Wwble3Z+chadiT4De37BZuZ/Q18FhKPGIE+uqDKHEi8aj4UgfiTbu';
        // console.log('地址解密结果', this.decodeAddr(data2))

        // 测试地址加密
        let data = '6966677497';
        console.log('地址加密结果', this.encodeUserId(data))

        // 测试地址解密
        let data2 = 'IXvJbqKkIyjaeFRlbxUEBQ==';
        console.log('地址解密结果', this.decodeUserId(data2))
    }

}


export default AESUtils
