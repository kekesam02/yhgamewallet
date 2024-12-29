import {ButtonCallbackType, ButtonInlineType, ButtonSwithType} from "./ButtonCallbackType";
import {keyboard} from "telegraf/markup";


/**
 * 生成共的一些按钮按钮类
 */
class ButtonUtils {

    /**
     * 创建内连按钮列表（比如转账、发红包之类的按钮）
     */
    public createInlineKeySwitchBoard(list: Array<Array<ButtonSwithType>>):{ reply_markup: { inline_keyboard: any[][] } }  {
        return {
            reply_markup: {
                inline_keyboard: [
                    ...list.map(item => {
                        return [
                            ...item.map(item2 => {
                                return {
                                    text: item2.text,
                                    switch_inline_query:item2.switch_inline_query??'',
                                    callback_data: item2.query ?? '',
                                    url: item2.url ?? ''
                                }
                            })
                        ]
                    })
                ]
            }
        }
    }

    /**
     * 创建内连按钮列表（比如转账、发红包之类的按钮）
     */
    public createInlineKeyBoard(list: Array<ButtonInlineType>) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [...list.map(item => {
                        return {
                            text: item.text,
                            switch_inline_query: item.query ?? ''
                        }
                    })]
                ]
            }
        }
    }

    /**
     * 创建 CallbackData 按钮（点击按钮回回掉到 bot.on('callback_query' 事件）
     * @param list  创建的按钮列表
     */
    public createCallbackBtn(list: Array<Array<ButtonCallbackType>>): {
        reply_markup: {
            inline_keyboard: Array<Array<{
                text: string,
                callback_data: string,
                url: string
            }>>
        }
    } {
        return {
            reply_markup: {
                inline_keyboard: [
                    ...list.map(item => {
                        return [
                            ...item.map(item2 => {
                                return {
                                    text: item2.text,
                                    callback_data: item2.query ?? '',
                                    url: item2.url ?? ''
                                }
                            })
                        ]
                    })
                ]
            }
        }
    }
}


export default ButtonUtils
