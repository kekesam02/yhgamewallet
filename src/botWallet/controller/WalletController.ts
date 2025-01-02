import ButtonUtils from "../../commons/button/ButtonUtils";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";
import WalletRedPacketInner from "../service/handle/hongbao/WalletRedPacketInner";
import WalletConfig from "../WalletConfig";
import {getConfig} from "../../config/config";

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
     * 取消
     */
    public static CancelAndBackHome = {
        text: '\uD83D\uDEAB 取消',
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
     * 验证密码
     */
    public static ValidatorUserPwd = (tgId: string | undefined, msgId: string | undefined, money: string | undefined, operator: string | undefined) => {
        return {
            text: "✏️ 提交验证",
            query: "vpb_" + msgId + "_" + money + "_" + operator + '_' + tgId
        }
    }

    /**
     * 转账的确认密码安全
     */
    public static createZhuanzhangPwdBtn = (tgId: string, msgId: string, money: string, operator: string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '\uD83D\uDCB0验证安全密码',
                    url: WalletConfig.walltPayBotInlineURL + msgId + "_" + money + "_" + operator + "_" + tgId
                }
            ]
        ])
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
        ], [
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
    public static createBackClientBtn = (username: string = '') => {
        return new ButtonUtils().createCallbackBtn([
            [
                WalletController.BackHome,
                {
                    text: '🛄 客服财务',
                    url: WalletConfig.MEURL + username
                }
            ]
        ])
    }

    /**
     * 财务审核按钮
     */
    public static createMarkClientBtn = (botPaymentId: string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '✅标记已打款',
                    query: 'bjydk' + botPaymentId
                },
                {
                    text: '\uD83D\uDEAB异常退回',
                    query: 'txycth' + botPaymentId
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
     * 创建转账返回按钮
     */
    public static createZhuanzhangSwitchBtn = (query: string) => {
        return new ButtonUtils().createInlineKeySwitchBoard([
            [
                {
                    text: '选择收款人',
                    switch_inline_query: query
                }
            ],
            [
                WalletController.CancelAndBackHome
            ]
        ])
    }

    /**
     * 创建收款按钮
     */
    public static createShouKuanSwitchBtn = (query: string) => {
        return new ButtonUtils().createInlineKeySwitchBoard([
            [
                {
                    text: '选择付款人',
                    switch_inline_query: query
                }
            ],
            [
                WalletController.CancelAndBackHome
            ]
        ])
    }

    /**
     * 创建添加红包完成后的按钮
     */
    public static createSendHbBtn = (hbId: string) => {
        return new ButtonUtils().createInlineKeySwitchBoard([
            [
                {
                    text: '\uD83D\uDC49再发一个',
                    query: StartWalletEnum.HONGBAO_CANCEL_1
                }, {
                text: '\uD83E\uDDE7发送红包',
                switch_inline_query: WalletRedPacketInner.InnerKey + hbId
            }
            ], [
                {
                    text: '✏️设置备注',
                    query: StartWalletEnum.HONGBAO_TYPE_REMARK + hbId
                }, {
                    text: '⚙️设置条件',
                    query: StartWalletEnum.HONGBAO_TYPE_CONDITION + hbId
                }
            ]
        ])
    }

    /**
     * 领取红包底部的俩个按钮
     */
    public static receiveHbBtn = (hbId: string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '🧧 领取红包',
                    query: StartWalletEnum.HONGBAO_RECEIVE + hbId
                },{
                    text: '\uD83D\uDCB0 钱包',
                    url: getConfig().botConfig.WalletUrl
                }
            ]
        ])
    }


    /**
     * 创建审核通过
     */
    public static createSuccessBtn = (username:string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '✅ 操作成功，点击联系用户',
                    url: WalletConfig.MEURL + username
                }
            ]
        ])
    }

    /**
     * 创建拒绝
     */
    public static createFailBtn = (username: string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '⚠️ 已拒绝，点击联系用户',
                    url: WalletConfig.MEURL + username
                }
            ]
        ])
    }

    /**
     * 转账的点击按钮
     */
    public static createZhuanzhangSKBtn = (botPaymentId: string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '\uD83D\uDCB0收款',
                    query: "shoukuanzk" + botPaymentId
                }
            ]
        ])
    }


    /**
     * 点击收款按钮
     */
    public static createZhuanzhangSureBtn = (username:string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '✅ 已收款成功',
                    url: WalletConfig.MEURL + username
                }
            ]
        ])
    }


    /**
     * 取消转账
     */
    public static createCallbackCancleBtn = (username: string = '') => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '↩️ 返回',
                    url: WalletConfig.walltPayBotLoginURL
                }
            ]
        ])
    }


    /**
     * 创建空按钮
     */
    public static createEmptyBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            []
        ])
    }

}

export default WalletController
