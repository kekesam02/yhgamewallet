import UserModel from "../models/UserModel";

/**
 * 用户相关查询服务
 */
class UserService {

    /**
     * 获取用户列表
     * @private
     */
    public getUserList = async (): Promise<Array<UserModel>> => {
        // 返回用户数据
        // let result = await db.query('select * from bot_user')
        let usermodel = new UserModel()
        usermodel.id = 15
        let result = await UserModel.getRepository().createQueryBuilder("u")
            .where("u.id = :id",{id:15}).getMany();
        console.log('请求到的数据')
        // console.log('数据库请求结果 ', result[0])
        return new Promise<Array<UserModel>>((resolve, reject) => {
            // resolve([result[0]])
            resolve([result[0]])
        })

    }
}


export default UserService
