/**
 * 回调按钮类型   reply_markup - inline_keyboard - [[这里的类型描述]]
 */
export type ButtonSwithType = {
    // 按钮描述文字
    text: string,

    // 点击按钮携带的文字
    switch_inline_query?: string

    // 点击按钮携带的文字
    query?: string

    // 跳转地址
    url?: string
}


/**
 * 回调按钮类型   reply_markup - inline_keyboard - [[这里的类型描述]]
 */
export type ButtonInlineType = {
    // 按钮描述文字
    text: string,

    // 点击按钮携带的文字
    query?: string

    // 跳转地址
    url?: string
}

/**
 * 回调按钮类型
 *      点击按钮通过 callbackData 回调到机器人
 *      或者点击跳转到传入的 url
 */
export type ButtonCallbackType = {
    // 按钮描述文字
    text: string,

    // 点击按钮携带的文字
    query?: string

    // 跳转地址
    url?: string
}

