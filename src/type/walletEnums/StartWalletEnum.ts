/**
 * 钱包枚举类型
 */
enum StartWalletEnum {

    /**
     * 返回首页
     */
    BACKHOME = 'backhome',
    /**
     * 充值
     */
    CHONGZHI = 'chongzhi_btn',

    /**
     * 提现
     */
    TIXIAN = 'tixian_btn',

    /**
     * 转账
     */
    ZHUANZHANG = 'zhuanzhang_btn',

    /**
     * 收款
     */
    SHOUKUANG = 'shoukuan_btn',

    /**
     * 红包
     */
    HONGBAO = 'hongbao_btn',

    /**
     * 点击添加红包按钮回掉参数
     */
    HONGBAO_ADD = 'hongbaoStart',

    /**
     * 点击选择红包金额类型按钮 - usdt
     */
    HONGBAO_WALLET_USDT = 'hongbaoWalletTypeUsdt',

    /**
     * 点击选择红包金额类型按钮 - trx
     */
    HONGBAO_WALLET_TRX = 'hongbaoWalletTypeTrx',

    /**
     * 点击选择红包类型按钮(均分包)
     */
    HONGBAO_TYPE_MIDDLE = 'hongbaoWalletTypeMiddle',

    /**
     * 点击红包类型随机包触发(随机包)
     */
    HONGBAO_TYPE_RENDOM = 'hongbaoWalletTypeRendom',

    /**
     * 红包确认支付按钮触发
     */
    HONGBAO_TYPE_PAY = 'hongbaoWalletTypePay',

    /**
     * 设置红包备注
     */
    HONGBAO_TYPE_REMARK = 'hongbaoWalletTypeRemark_',

    /**
     * 设置红包领取条件
     */
    HONGBAO_TYPE_CONDITION = 'hongbaoWalletTypeCondition_',

    /**
     * 领取红包回调
     */
    HONGBAO_RECEIVE = 'hongbaoReceive_',

    /**
     * 闪兑
     */
    SHANGDUI = 'shandui_btn',

    /**
     * 个人中心
     */
    USERCENTER = 'center_btn',

    /**
     * 修改密码
     */
    UPDATEPWDBTN = 'update_pwd_btn',

    /**
     * 关闭密码
     */
    CLOSE_COMPUTER = 'close_computer',


    /**
     * 红包返回按钮类型 1、回到点击红包按钮第一页
     */
    HONGBAO_CANCEL_1 = 'hongbao_cancel_1',


    /**
     * 红包返回按钮类型 2、回退到红包选择货币页面
     */
    HONGBAO_CANCEL_2 = 'hongbao_cancel_2',


    /**
     * 红包返回按钮类型 3、回退到红包类型页面(选择随机还是均分)
     */
    HONGBAO_CANCEL_3 = 'hongbao_cancel_3'
}


export default StartWalletEnum
