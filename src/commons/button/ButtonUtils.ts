/**
 * 内连按钮类型   reply_markup - inline_keyboard - [[这里的类型描述]]
 */
type ButtonInlineType = {
    // 按钮描述文字
    text: string,

    // 点击按钮携带的文字
    query: string
}


/**
 * 生成共的一些按钮按钮类
 */
class ButtonUtils {

    /**
     * 创建内连按钮列表
     */
    public createInlineKeyBoard(list: Array<ButtonInlineType>) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [...list.map(item => {
                        return {
                            text: item.text,
                            switch_inline_query: item.query
                        }
                    })]
                ]
            }
        }
    }
}


export default ButtonUtils
