import ButtonUtils from "../../commons/button/ButtonUtils";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";

/**
 * 钱包
 * 主要控制一些公共方法按钮之类的东西
 */
class WalletController {

    /**
     * 前往个人中心
     */
    public static BackUserCenter = {
        text: '↪️ 前往个人中心',
        query: 'center_btn'
    }

    /**
     * 返回首页
     */
    public static BackHome = {
        text: '↩️ 返回',
        query: 'backhome'
    }

    /**
     * 关闭计算器
     */
    public static CloseComputer = {
        text: '✖️ 关闭',
        query: 'close_computer'
    }

    /**
     * 保存密码
     */
    public static SaveUserPwd = {
        text: "✏️ 提交",
        query: "update_pwd_btn"
    }

    /**
     * 保存密码
     */
    public static CompareUserPwd = {
        text: "✏️ 确定密码",
        query: "compare_pwd_btn"
    }

    /**
     * 计算器清空
     */
    public static ComputeClearDel = [{
        text: "关闭",
        query: "close_computer"
    }, {
        text: "0",
        query: "num_0"
    }, {
        text: "删除",
        query: "delete"
    }]

    /**
     * 首页按钮组
     */
    public static HomeBtns = [
        [
            {
                text: '💰️ 充值',
                query: StartWalletEnum.CHONGZHI
            },
            {
                text: '💸 提现',
                query: StartWalletEnum.TIXIAN
            }
        ],
        [
            {
                text: '↪️ 转账',
                query: StartWalletEnum.ZHUANZHANG
            },
            {
                text: '↩️ 收款',
                query: StartWalletEnum.SHOUKUANG
            }
        ],
        [
            {
                text: '🧧 红包',
                query: StartWalletEnum.HONGBAO
            },
            {
                text: '🥯 闪兑',
                query: StartWalletEnum.SHANGDUI
            }
        ],
        [
            {
                text: '🏘️ 个人中心',
                query: StartWalletEnum.USERCENTER,
            }
        ]
    ]

    /**
     * 个人中心按钮组
     */
    public static UserHomeBtns = [
        [
            {
                text: '💰️ 我的账单',
                query: WalletUserCenterEnum.BACCOUNT
            },
            {
                text: '💸 提币历史',
                query: WalletUserCenterEnum.TBLS
            }
        ],
        [
            {
                text: '🥯 彩金转化',
                query: WalletUserCenterEnum.CTRXZH
            },
            {
                text: '🥯 领取邀请返利',
                query: WalletUserCenterEnum.YQFL
            },
            {
                text: '🥯 首充返利',
                query: WalletUserCenterEnum.SCFL
            }
        ],
        [
            {
                text: '💰️ 小额免密',
                query: WalletUserCenterEnum.XEMM
            },
            {
                text: '🍻 邀请好友',
                query: WalletUserCenterEnum.YQHY
            }
        ],
        [
            {
                text: '🛄 设置提现地址',
                query: WalletUserCenterEnum.SZTXDZ,
            }
        ], [
            {
                text: '🏘️ 主菜单',
                query: WalletUserCenterEnum.HOME,
            }
        ],[
            {
                text: '🏘️ 测试',
                url: 'https://t.me/VertexPaybot?start=withdraw'
            }
        ]
    ]

    /**
     * 创建返回按钮和到个人中心
     */
    public static createBackDoubleBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                WalletController.BackHome,
                {
                    text: '🛄 设置提现地址',
                    query: WalletUserCenterEnum.SZTXDZ,
                }
            ]
        ])
    }

    /**
     * 返回和财务
     */
    public static createBackClientBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                WalletController.BackHome,
                {
                    text: '🛄 客服财务',
                    url: 'https://t.me/Yhclub01'
                }
            ]
        ])
    }

    /**
     * 财务审核按钮
     */
    public static createMarkClientBtn = (tgId:string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '✅标记已打款',
                    query: 'bjydk'+tgId
                },
                {
                    text: '\uD83D\uDEAB异常退回',
                    query: 'txycth'+tgId
                }
            ]
        ])
    }

    /**
     * 创建返回按钮
     */
    public static createBackBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                WalletController.BackHome
            ]
        ])
    }
    /**
     * 创建空按钮
     */
    public static createEmptyBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
            ]
        ])
    }

}

export default WalletController
