import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import GameTypeEnum from "../type/gameEnums/GameTypeEnum";
import {Context} from "telegraf";
import ContextUtil from "../commons/ContextUtil";


@Entity({
    name: 'bot_tron_addr'
})
class BotTronAddrModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户是否已经删除 0: 未删除  1: 已删除
     */
    @Column({
        name: 'addr',
        default: 0
    })
    addr: string

    /**
     * 是否使用 0没有使用  1已经使用
     */
    @Column({
        name: 'del',
        default: 0
    })
    del: number

    /**
     * 用户是否已经删除 0: 未删除  1: 已删除
     */
    @Column({
        name: 'uses',
        default: 0
    })
    uses: number

    @Column({
        name: 'create_time'
    })
    createTime: string

    @Column({
        name: 'update_time'
    })
    updateTime: string
}


export default BotTronAddrModel
