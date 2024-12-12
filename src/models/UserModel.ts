import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


/**
 * 用户对象 bot_user
 */
@Entity({
    name: 'bot_user'
})
class UserModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tg_id: string
}


export default UserModel
