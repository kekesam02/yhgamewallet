import ButtonUtils from "../../commons/button/ButtonUtils";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import WalletUserCenterEnum from "../../type/walletEnums/WalletUserCenterEnum";
import WalletRedPacketInner from "../service/handle/dashbord/hongbao/WalletRedPacketInner";
import WalletConfig from "../WalletConfig";
import {getConfig} from "../../config/config";
import BotHb from "../../models/BotHb";

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
                text: '💰 提现',
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
                text: '💰 提币历史',
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
            }
        ],
        [
            {
                text: '🔑 小额免密',
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
                    text: '✅ 标记已打款',
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
     * 财务审核按钮
     */
    public static createPayBotButton = (payTgId: string,tgId:string,money:string,orderId:string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '✅ 确认支付',
                    query: 'skqrzf' + payTgId+","+money+","+tgId+","+orderId
                },
                {
                    text: '\uD83D\uDEAB取消支付',
                    query: 'skqxzf' + payTgId+","+money+","+tgId+","+orderId
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
    public static createZhuanzhangSwitchBtn = (query: string,operator:string) => {
        return new ButtonUtils().createInlineKeySwitchBoard([
            [
                {
                    text: '选择收款人',
                    switch_inline_query: query
                }
            ],
            [
                {
                    text: '\uD83D\uDEAB 取消',
                    query: 'model_backhome' + operator
                }
            ]
        ])
    }

    /**
     * 创建收款余额不足的充值按钮
     */
    public static createSkChongzhiBtn = () => {
        return new ButtonUtils().createInlineKeySwitchBoard([
            [
                {
                    text: '⚠️ 点我充值',
                    url: WalletConfig.walltPayBotChongZhiURL
                }
            ]
        ])
    }

    /**
     * 创建收款按钮
     */
    public static createShouKuanSwitchBtn = (query: string,operator:string) => {
        return new ButtonUtils().createInlineKeySwitchBoard([
            [
                {
                    text: '选择付款人',
                    switch_inline_query: query
                }
            ],
            [
                {
                    text: '\uD83D\uDEAB 取消',
                    query: 'model_backhome' + operator
                }
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
            ], [
                {
                    text: '❌关闭',
                    query: StartWalletEnum.CLOSE_MESSAGE
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
                    url: WalletConfig.walltPayBotURL
                }
            ]
        ])
    }

    /**
     * 生成设置红包领取条件按钮
     */
    public static createConditionBtn = (botHb: BotHb) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '\uD83D\uDD10验证码',
                    query: botHb.conditonsyzm == 1
                        ? StartWalletEnum.HONGBAO_VERIFY + botHb.hbId + '_0'
                        : StartWalletEnum.HONGBAO_VERIFY + botHb.hbId + '_1'
                }, {
                    text: botHb.conditonsyzm == 1? '\uD83D\uDFE2已开启': '⚪️未开启',
                    query: botHb.conditonsyzm == 1
                        ? StartWalletEnum.HONGBAO_VERIFY + botHb.hbId + '_0'
                        : StartWalletEnum.HONGBAO_VERIFY + botHb.hbId + '_1'
                }
            ], [
                {
                    text: '\uD83D\uDC8E会员红包',
                    query: botHb.conditonshy == 1
                        ? StartWalletEnum.HONGBAO_VIP_ + botHb.hbId + '_0'
                        : StartWalletEnum.HONGBAO_VIP_ + botHb.hbId + '_1'
                }, {
                    text: botHb.conditonshy == 1? '\uD83D\uDFE2已开启': '⚪️未开启',
                    query: botHb.conditonshy == 1
                        ? StartWalletEnum.HONGBAO_VIP_ + botHb.hbId + '_0'
                        : StartWalletEnum.HONGBAO_VIP_ + botHb.hbId + '_1'
                }
            ], [
                {
                    text: '\uD83D\uDCA6流水红包',
                    query: botHb.conditonsls == 1
                        ? StartWalletEnum.HONGBAO_WATER + botHb.hbId + '_0'
                        : StartWalletEnum.HONGBAO_WATER + botHb.hbId + '_1'
                }, {
                    text: botHb.conditonsls == 1? '\uD83D\uDFE2已开启': '⚪️未开启',
                    query: botHb.conditonsls == 1
                        ? StartWalletEnum.HONGBAO_WATER + botHb.hbId + '_0'
                        : StartWalletEnum.HONGBAO_WATER + botHb.hbId + '_1'
                }
            ],
            [
                {
                    text: "\uD83D\uDEAB取消",
                    query: StartWalletEnum.HONGBAO_INFO + botHb.hbId
                }
            ]
        ])
    }

    /**
     * 流水红包时间选择
     */
    public static waterHBTimeBtn = (hbId: string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '今日',
                    query: StartWalletEnum.HONGBAO_WATER_TIME + hbId + '_' + 0
                }, {
                    text: '近七天',
                    query: StartWalletEnum.HONGBAO_WATER_TIME + hbId + '_' + 1
                }, {
                    text: '近30天',
                    query: StartWalletEnum.HONGBAO_WATER_TIME + hbId + '_' + 2
                }, {
                    text: '本月',
                    query: StartWalletEnum.HONGBAO_WATER_TIME + hbId + '_' + 3
                }, {
                    text: '总流水',
                    query: StartWalletEnum.HONGBAO_WATER_TIME + hbId + '_' + 4
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
                    text: '⚠️ 申请已被拒绝',
                    query: '@'+username
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
                    text: '\uD83D\uDCB0 收款',
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
     * 转账超过24小时
     */
    public static createZhuanzhangPeriod24HourBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text:"\uD83D\uDCB0 一号公馆钱包",
                    url: WalletConfig.walltPayBotURL
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
     * 收款的确认支付以后的按钮返回
     */
    public static createSureSuccessBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '✅  支付支付成功，点击返回',
                    url: WalletConfig.walltPayBotURL
                }
            ]
        ])
    }

    /**
     * 收款的确认支付以后的按钮返回
     */
    public static createSureErrorBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '⚠️ 不要重复支付，点击返回',
                    url: WalletConfig.walltPayBotURL
                }
            ]
        ])
    }

    /**
     * 提现按钮
     */
    public static createTiXianBackBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '🏘️ 主菜单',
                    query: WalletUserCenterEnum.HOME,
                },
                {
                    text: '🛄 设置提现地址',
                    query: WalletUserCenterEnum.SZTXDZ,
                }
            ]
        ])
    }

    /**
     * 设置成功提现地址
     */
    public static createSettingTxBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '🏘️ 主菜单',
                    query: WalletUserCenterEnum.HOME,
                },
                {
                    text: '💰 开始提现',
                    query: StartWalletEnum.TIXIAN
                }
            ]
        ])
    }

    /**
     * 提示等待客服审核
     */
    public static createStatusTxBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '等待客服审核',
                    query: 'await'
                }
            ]
        ])
    }

    /**
     * 等待对方收款
     */
    public static createStatusWaitTextBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '等待对方收款',
                    query: 'wait'
                }
            ]
        ])
    }


    /**
     * 等待对方支付
     */
    public static createStatusWaitPayBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '等待对方支付',
                    query: 'wait'
                }
            ]
        ])
    }


    /**
     * 等待对方支付
     */
    public static createStatusWaitSurePayBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '等待支付',
                    query: 'wait'
                }
            ]
        ])
    }


    /**
     * 创建返回按钮
     */
    public static createModelBackBtn = (operator:string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '↩️ 返回',
                    query: 'model_backhome' + operator
                }
            ]
        ])
    }

    /**
     * 创建返回按钮-带客服
     */
    public static createModelClientBackBtn = (operator:string) => {
        return new ButtonUtils().createCallbackBtn([
            [
                {
                    text: '↩️ 返回',
                    query: 'model_backhome' + operator
                },
                {
                    text: '🛄 联系客服',
                    url: WalletConfig.CLIENT_URL
                }
            ]
        ])
    }

    /**
     * 返回一号公馆
     */
    public static createHomeBackEmptyBtn = () => {
        return new ButtonUtils().createCallbackBtn([
            [{
                text:"\uD83D\uDCB0 一号公馆钱包",
                url: WalletConfig.walltPayBotURL
            }]
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
