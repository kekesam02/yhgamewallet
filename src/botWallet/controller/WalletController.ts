import ButtonUtils from "../../commons/button/ButtonUtils";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";

/**
 * 钱包
 * 主要控制一些公共方法按钮之类的东西
 */
class WalletController {

    /**
     * 返回首页
     */
    public static BackHome = {
        text: '↩️ 返回',
        query: 'backhome'
    }

    /**
     * 保存密码
     */
    public static SaveUserPwd = {
        text: "✏️ 保存密码",
        query: "update_pwd_btn"
    }

    /**
     * 计算器清空
     */
    public static ComputeClearDel = [{
        text: "清空",
        query: "clear"
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
     * 创建返回按钮
     */
    public createBackBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                WalletController.BackHome
            ]
        ])
    }

}

export default WalletController
