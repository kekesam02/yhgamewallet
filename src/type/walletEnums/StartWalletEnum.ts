/**
 * 钱包枚举类型
 */
enum StartWalletEnum {

    /**
     * 返回首页
     */
    BACKHOME = 'backhome',

    /**
     * 关闭当前消息
     */
    CLOSE_MESSAGE = 'CLOSE_MESSAGE',

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
     * 红包
     */
    HONGBAO_INFO = 'hongbao_look_info_',

    /**
     * 红包查看全部红包列表 _后面是查询的页数
     */
    HONGBAO_LIST_ALL = 'HONGBAO_LIST_ALL_',

    /**
     * 红包查询进行中的红包列表
     */
    HONGBAO_LIST_PROGRESS = 'HONGBAO_LIST_PROGRESS_',

    /**
     * 查看已结束的红包数据列表列表
     */
    HONGBAO_LIST_END = 'HONGBAO_LIST_END_',

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
     * 红包 - 设置 开启/关闭 会员红包功能
     *      _hbId_0 关闭
     *      _hbId_1 开启
     */
    HONGBAO_VIP_ = 'hongbaoVip_',

    /**
     * 红包 - 设置验证码红包 开启/关闭 验证码验证功能
     *      _hbId_0 关闭
     *      _hbId_1 开启
     */
    HONGBAO_VERIFY = 'hongbaoVerify_',

    /**
     * 红包 - 流水红包 开启/关闭 流水红包功能
     *      _hbId_0 关闭
     *      _hbId_1 开启
     */
    HONGBAO_WATER = 'hongbaoWater_',

    // 流水红包时间类型
    HONGBAO_WATER_TIME = 'hongbaoWaterTime_',

    /**
     * 红包 - 点击验证码数字触发
     */
    HONGBAO_VERIFY_BTN = 'hongbaoVerifyBtn_',

    /**
     * 闪兑
     */
    SHANGDUI = 'shandui_btn',

    /**
     * 闪兑 - TRX -> USDT
     */
    SHANGDUI_TRX_USDT = 'SHANGDUI_USDT',

    /**
     * 闪兑 - USDT -> TRX
     */
    SHANGDUI_USDT_TRX = 'SHANGDUI_TRX',

    /**
     * 个人中心
     */
    USERCENTER = 'center_btn',

    /**
     * 修改密码
     */
    UPDATEPWDBTN = 'update_pwd_btn',

    /**
     * 验证密码
     */
    VALIDATORPWDBTN = 'validator_pwd_btn',

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
