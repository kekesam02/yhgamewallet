import { ButtonCallbackType, ButtonInlineType } from "./ButtonCallbackType";


/**
 * 生成共的一些按钮按钮类
 */
class ButtonUtils {

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
    public createCallbackBtn(list: Array<ButtonCallbackType>) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [...list.map(item => {
                        return {
                            text: item.text,
                            callback_data: item.query ?? '',
                            url: item.url ?? null
                        }
                    })]
                ]
            }
        }
    }
}


export default ButtonUtils
