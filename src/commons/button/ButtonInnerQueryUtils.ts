import {InlineQueryResult, InlineQueryResultArticle} from "@telegraf/types/inline";
import {ExtraAnswerInlineQuery} from "telegraf/typings/telegram-types";

/**
 * 生成共的一些按钮按钮类
 */
class ButtonInnerQueryUtils {

    /**
     * 创建内连按钮列表（比如转账、发红包之类的按钮）
     */
    public static createInnerQueryReplyUpDialog({id,title,description,input_message_content,reply_markup}:any):any{
        return [{
            id:id,
            type: 'article',
            title,
            description,
            input_message_content,
            reply_markup,
            // 添加缓存时间
            cache_time: 0
        }]
    }

    /**
     * 创建内连按钮列表（比如转账、发红包之类的按钮）
     */
    public static createInnerQueryDialog({id,title,description,input_message_content}:any):any{
        return [{
            id:id,
            type: 'article',
            title,
            description,
            input_message_content,
            // 添加缓存时间
            cache_time: 0
        }]
    }
}


export default ButtonInnerQueryUtils
