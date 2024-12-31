/**
 * 红包相关处理
 */
import {Context} from "telegraf";
import messageUtils from "../../../commons/message/MessageUtils";
import MessageUtils from "../../../commons/message/MessageUtils";
import ButtonUtils from "../../../commons/button/ButtonUtils";
import StartWalletEnum from "../../../type/walletEnums/StartWalletEnum";
import ButtonCommonMap from "../../../commons/button/ButtonCommonMap";
import WalletType from "../../../type/WalletType";
import UserModel from "../../../models/UserModel";
import MessageTipUtils from "../../../commons/message/MessageTipUtils";
import computeUtils from "../../../commons/ComputeUtils";
import ComputeUtils from "../../../commons/ComputeUtils";
import {clearTimeout} from "timers";
import CommandController from "../../../botGame/gameController/CommandController";
import CommonEnumsIndex from "../../../type/CommonEnumsIndex";
import {addLockByCtx} from "../../../config/redislock";
import {queryRunner} from "../../../config/database";
import WalletRedPacketRedis from "./WalletRedPacketRedis";
import ContextUtil from "../../../commons/ContextUtil";



class WalletRedPacket {

    private readonly ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    /**
     * 点击红包按钮触发 - 跳转到添加红包页面
     */
    public addRedPacket = async () => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '请在下面按钮操作您的红包：',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: ButtonCommonMap.addBtnContent,
                        query: StartWalletEnum.HONGBAO_ADD
                    }
                ],
                [
                    {
                        text: ButtonCommonMap.backBtnContent,
                        query: StartWalletEnum.CLOSE_COMPUTER
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        return true
    }

    /**
     * 点击添加红包按钮触发 - 跳转到选择货币页面
     */
    public selectWallType = async () => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '请在下面按钮操作您的红包：',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: 'USDT',
                        query: StartWalletEnum.HONGBAO_WALLET_USDT
                    }, {
                        text: "TRX",
                        query: StartWalletEnum.HONGBAO_WALLET_TRX
                    }
                ],[
                    {
                        text: ButtonCommonMap.backOne,
                        query: StartWalletEnum.HONGBAO_CANCEL_1
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        await new WalletRedPacketRedis().saveInit(this.ctx)
        return true
    }

    /**
     * 点击选择红包金额类型按钮触发 - 跳转到选择红包类型页面
     */
    public selectRedPacketType = async (wallType: WalletType) => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '\uD83E\uDDE7 请选择发送类型：',
            new ButtonUtils().createCallbackBtn([
                    [
                        {
                            text: '随机包',
                            query: StartWalletEnum.HONGBAO_TYPE_RENDOM
                        }, {
                            text: "均分包",
                            query: StartWalletEnum.HONGBAO_TYPE_MIDDLE
                        }
                    ], [
                        {
                            text: ButtonCommonMap.backOne,
                            query: StartWalletEnum.HONGBAO_CANCEL_2
                        }
                    ]
            ]).reply_markup.inline_keyboard
        )
        return new WalletRedPacketRedis(0, wallType).saveWalletType(this.ctx, wallType)
    }

    /**
     * 点击红包类型触发 - 跳转到红包金额输入页面
     * @param redPacketType: 红包类型
     *      0: 均分包
     *      1: 随机包
     */
    public inputMoney = async (redPacketType: number) => {
        await new MessageUtils().removeMessage(this.ctx)
        await new MessageUtils().sendTextReply(
            this.ctx,
            '\uD83D\uDCA1 请回复你要发送的总金额()? 例如: 8.88',
            new ButtonUtils().createCallbackBtn([
                [
                    {
                        text: "\uD83D\uDEAB取消",
                        query: StartWalletEnum.HONGBAO_CANCEL_1
                    }
                ]
            ]).reply_markup.inline_keyboard
        )
        return new WalletRedPacketRedis().saveMiddleType(this.ctx, redPacketType)
    }

    /**
     * 输入红包金额结束 - 发送输入红包数量按钮
     */
    public sendInputLength = async (money: string) => {
        let result = await new WalletRedPacketRedis().saveMoney(this.ctx, money)
        if (result) {
            await new MessageUtils().sendTextReply(
                this.ctx,
                '\uD83D\uDCA1 请回复你要发送的数量()? 例如: 10',
                new ButtonUtils().createCallbackBtn([
                    [
                        {
                            text: "\uD83D\uDEAB取消",
                            query: StartWalletEnum.HONGBAO_CANCEL_1
                        }
                    ]
                ]).reply_markup.inline_keyboard
            )
        }
        return false
    }

    /**
     * 输入红包数量输入结束 - 返回确认支付按钮
     */
    public sendPayButton = async (length: number) => {
        let isSave = await new WalletRedPacketRedis().saveLength(this.ctx, length)
        if (!isSave) {
            return false
        }
        let result = await new WalletRedPacketRedis().getRedisData(this.ctx)
        if (result) {
            await new MessageUtils().sendTextReply(
                this.ctx,
                `\uD83D\uDCA1 发送一个红包/n支付金额${result.money}${result.type == 0? '随机': '均分'}${new CommonEnumsIndex().getWalletTypeStr(result.walletType)}`,
                new ButtonUtils().createCallbackBtn([
                    [
                        {
                            text: "确认支付",
                            query: StartWalletEnum.HONGBAO_TYPE_PAY
                        }, {
                            text: "\uD83D\uDEAB取消",
                            query: StartWalletEnum.HONGBAO_CANCEL_1
                        }
                    ]
                ]).reply_markup.inline_keyboard
            )
        }
        return false
    }

    /**
     * 确认支付
     */
    public startPay = async () => {
        await addLockByCtx(this.ctx,async () => {
            await queryRunner.startTransaction()
            let userModel = await queryRunner.manager.createQueryBuilder()
                .where('tg_id = :tgId', {
                    tgId: ContextUtil.getUserId(this.ctx)
                })
                .getOne()
            if (!userModel) {
                return false
            }
            let result = await new WalletRedPacketRedis().startPay(this.ctx, userModel)
            if (result) {
                // 判定是否需要输入密码
                // 密码验证通过、红包进行持久化存储
                return await new WalletRedPacketRedis().saveLocalData(this.ctx)
            }
            return false
        }, async () => {
            console.log('保存红包失败')
        })
    }
}



export default WalletRedPacket
