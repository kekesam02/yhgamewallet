import type {Context, Telegraf} from "telegraf";
import WalletBotHtml from '../../../../../html/walletHtml/WalletBotHtml'
import AESUtils from "../../../../../commons/AESUtils";
import UserModel from "../../../../../models/UserModel";
import WalletController from "../../../../controller/WalletController";
import BotWithdrawalAddrModel from "../../../../../models/BotWithdrawalAddrModel";
import redis from "../../../../../config/redis";
import BotPaymentModel from "../../../../../models/BotPaymentModel";
import {addLockByTgId} from "../../../../../config/redislock";
import DateFormatUtils from "../../../../../commons/date/DateFormatUtils";
import PaymentTypeEnum from "../../../../../type/PaymentTypeEnum";
import WalletType from "../../../../../type/WalletType";
import {queryRunner} from "../../../../../config/database";
import WalletHandleMethod from "../WalletHandleMethod";
import walletUserCenterMethod from "../../usercenter/WalletUserCenterMethod";
import WalletUserCenterController from "../../../../controller/WalletUserCenterController";


/**
 * 公共方法处理
 * npm install @img/sharp-darwin-arm64 @img/sharp-libvips-darwin-arm64 @img/sharp-libvips-linux-x64 @img/sharp-libvips-linuxmusl-x64 @img/sharp-linux-x64 @img/sharp-linuxmusl-x64 --force
 * 钱包机器人收到的用户消息处理器
 * 参考博客：https://blog.revincx.icu/posts/telegraf-guide/index.html
 * typeorm官网：https://typeorm.bootcss.com/insert-query-builder
 * 表情查询官网：https://www.emojiall.com/zh-hans/search_results?keywords=%E7%94%A8%E6%88%B7
 * telegraf官网： https://telegraf.js.org/classes/Context.html#replyWithHTML
 * 仓库地址：https://github.com/gaozhihen/yhgame
 */
class WalletHandleTixianMethod {

    /**
     * 提现
     * 代号：tixian_btn
     * @param ctx
     */
    public static startTiXian = async (ctx: Context, cbot: Telegraf<Context>) => {
        // 1：获取telegram的tgId
        var tgId: number = ctx.callbackQuery?.from?.id || 0
        // 2：设置操作
        await redis.set("currentop" + tgId, "tx", 'EX', 60 * 60 * 24)
        // 1：密码确认
        const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
        // 如果密码为空就开始设置密码
        if (!flag) {
            var mark = await redis.get('mark_' + tgId) || '0'
            await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
            return
        }
        // 查询用户信息
        let userId = AESUtils.encodeUserId(tgId?.toString())
        // 查询用户是否存在交易地址
        const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
            .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
        if (!botWithdrawalAddrModel?.addr) {
            await ctx.replyWithHTML("⚠️ 尚未设置提现地址，请点击【设置提现地址】按钮进行设置",WalletController.createTiXianBackBtn())
            return;
        }
        await ctx.replyWithHTML(WalletBotHtml.getTixianHtml(), WalletController.createBackBtn())
    }

    // 提现具体逻辑
    public static startTxHandle = async (text: string, tgId: number, ctx: Context, cbot: Telegraf<Context>) => {
        await addLockByTgId(['tx_lock_' + tgId + ''], async () => {
            // 1：密码确认
            const flag: boolean = await WalletHandleMethod.isLogin(tgId, ctx)
            // 如果密码为空就开始设置密码
            if (!flag) {
                var mark = await redis.get('mark_' + tgId) || '0'
                await WalletHandleMethod.sendPasswordSetupMessage(ctx, "", mark != '1', {inlineMessageId: "0"})
                return
            }

            // 查询用户信息
            let userId = AESUtils.encodeUserId(tgId?.toString())
            // 查询用户是否存在交易地址
            const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
                .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
            if (!botWithdrawalAddrModel?.addr) {
                await ctx.replyWithHTML("⚠️ 尚未设置提现地址，请点击【设置提现地址】按钮进行设置",WalletController.createTiXianBackBtn())
                return;
            }

            // 2: 判断是否提现开头
            if (!text.startsWith('提现')) {
                await ctx.replyWithHTML("⚠️ 请输入正确的提现格式：提现+金额\n比如：提现10或者提现 10")
                return
            }

            // 获取提现金额
            const price = parseFloat(text.replaceAll('提现', '').trim())
            if (!price.isMoney()) {
                await ctx.replyWithHTML("⚠️ 请输入提现金额，必须是正整数！")
                return
            }

            if (price < 10) {
                await ctx.replyWithHTML("⚠️ 最低提现10u！")
                return
            }

            // 查询用户信息
            let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
            // 查询用户余额
            if (botUser) {
                const userUsdt = parseFloat(botUser.USDT)
                const shengyuUsdt = userUsdt - price
                // 用户的余额 - 提现的余额 如果小于1，说明不够，因为手续费需要1U
                if (shengyuUsdt < 1) {
                    await ctx.replyWithHTML("⚠️ 账户余额不足！")
                    return
                }
                try {
                    // 查询用户是否存在交易地址
                    const botWithdrawalAddrModel = await BotWithdrawalAddrModel.createQueryBuilder("t1")
                        .where('tg_id = :tgId and del = 0', {tgId: userId}).getOne()
                    if (!botWithdrawalAddrModel?.addr) {
                        await ctx.replyWithHTML("⚠️ 交易异常，提现地址不存在！")
                        return
                    }

                    try {
                        await queryRunner.startTransaction()
                        // 修改用户余额
                        await queryRunner.manager.update(UserModel, {
                            id: botUser.id
                        }, {
                            USDT: shengyuUsdt + ''
                        })
                        // 申请时间
                        var applyTime = DateFormatUtils.CurrentDateFormatString()
                        const chatId = ctx?.chat?.id + '' || '';
                        // 开始新增订单
                        const botPayment = await queryRunner.manager.save(BotPaymentModel, {
                            tgId: botUser.tgId,
                            uid: botUser.id,
                            username: botUser.userName,
                            nickname: botUser.nickName,
                            balanceBefore: userUsdt + '',
                            balanceAfter: shengyuUsdt + '',
                            paymentType: PaymentTypeEnum.TX_SQ.value,
                            paymentTypeName: PaymentTypeEnum.TX_SQ.name,
                            operateType: 0,
                            paymentTypeNumber: botWithdrawalAddrModel?.addr,
                            paymentAmount: (price - 1) + '',
                            paymentRealAmount: price + '',
                            walletType: WalletType.USDT,
                            applyTime: applyTime,
                            chatId: chatId,
                            status:0,// 申请中
                            description:"正在发起提现操作，提现金额是【"+price+"】等待审核中..."
                        })
                        await queryRunner.commitTransaction()

                        let result = "没有异常"
                        let fenkongArr = []
                        if(botUser.riskManagement == 0) {
                            //判断是否为异常用户 ----------------如果一个充值地址被多个用户使用，说明这个用户用了小号
                            var userByLinks = await UserModel.createQueryBuilder()
                                .where('recharge_link = :rechargeLink and del = 0', {'rechargeLink': botUser.rechargeLink})
                                .getMany()
                            if (userByLinks && userByLinks.length > 1) {
                                for (let userByLink of userByLinks) {
                                    fenkongArr.push(userByLink.userName)
                                    await UserModel.createQueryBuilder().update()
                                        .set({riskManagement: 1}).where("id=:id", {id: userByLink.id}).execute()
                                }
                                result = "风控用户(存在一个充值地址两个账号分别是："+fenkongArr.join('、')+")"
                            }
                        }else{
                            result = "风控用户"
                        }

                        // 或者一个用户多个提现地址

                        // 统计相关
                        var sumPriceArr = await BotPaymentModel.createQueryBuilder("t1")
                            .select(['t1.payment_type as ptype',  'SUM(t1.payment_amount) as num'])
                            .where('t1.user_id = :tgId and t1.del = 0 and t1.wallet_type = 1', {tgId: botUser.tgId})
                            .groupBy("t1.payment_type").execute()

                        var botPayMentObj: any = {
                            'm_1': 0,
                            'm_2': 0,
                            'm_3': 0,
                            'm_4': 0,
                            'm_5': 0,
                            'm_6': 0,
                            'm_7': 0,
                            'm_8': 0,
                            'm_9': 0,
                            'm_10': 0,
                            'm_11': 0,
                            'm_12': 0,
                            'm_13': 0,
                            'm_14': 0,
                            'm_15': 0,
                            'm_16': 0,
                            'm_17': 0,
                            'm_18': 0,
                            'm_19': 0,
                            'm_101': 0,
                            'm_201': 0,
                        }

                        if (sumPriceArr && sumPriceArr.length > 0) {
                            for (let i = 0; i < sumPriceArr.length; i++) {
                                botPayMentObj['m_' + sumPriceArr[i]?.ptype?.toString()] = sumPriceArr[i].num || 0
                            }
                        }

                        const tixian = "⌛️ 请等待，需要财务处理\n\n" +
                            "用户：<a href=\"tg://user?id=" + tgId + "\">@" + botUser?.userName + "</a>\n" +
                            "用户名 : <code>" + botUser?.userName + "</code>\n" +
                            "申请时间 : " + applyTime + "\n" +
                            "提现金额 : " + (price || 0) + "\n" +
                            "实际金额 : " + ((price - 1) || 0) + "\n" +
                            "提现地址(点击复制) : <code>" + AESUtils.decodeAddr(botWithdrawalAddrModel?.addr || '') + "</code>\n" +
                            "货币类型 : USDT\n" +
                            "备注 : " + botUser.notes + "\n" +
                            "是否异常用户 : " + result + "\n\n" +
                            "➖➖➖➖➖其他信息➖➖➖➖➖\n" +
                            "上注流水 :  " + (botPayMentObj['m_2'] || 0) + "\n" +
                            "中奖流水 :  " + (botPayMentObj['m_5'] || 0) + "\n" +
                            "充值总额 :  " + (botPayMentObj['m_1'] || 0) + "\n" +
                            "反水总额 :  " + (botPayMentObj['m_4'] || 0) + "\n" +
                            "已提现流水 :  " + (botPayMentObj['m_8'] || 0) + "\n" +
                            "申请提现流水 :  " + (botPayMentObj['m_3'] || 0) + "\n" +
                            "彩金转化流水 :  " + (botPayMentObj['m_9'] || 0) + "\n" +
                            "转账支出流水 :  " + (botPayMentObj['m_10'] || 0) + "\n" +
                            "转账收入流水 :  " + (botPayMentObj['m_11'] || 0) + "\n" +
                            "红包支出流水 :  " + (botPayMentObj['m_12'] || 0) + "\n" +
                            "红包收入流水 :  " + (botPayMentObj['m_13'] || 0) + "\n" +
                            "每日首充返利流水 :  " + (botPayMentObj['m_16'] || 0) + "\n" +
                            "开业豪礼 :  " + (botPayMentObj['m_17'] || 0) + "\n" +
                            "每日首充返利流水 :  " + (botPayMentObj['m_16'] || 0) + "\n"

                        // 6: 财务消息
                        var userVipModels = await new UserModel().findUserModeVip();
                        if(userVipModels && userVipModels.length > 0) {
                            for (let i = 0; i < userVipModels.length; i++) {
                                await ctx.telegram.sendMessage(AESUtils.decodeUserId(userVipModels[i].tgId), tixian, {
                                    parse_mode: "HTML",
                                    reply_markup: WalletController.createMarkClientBtn(botPayment.id + "").reply_markup
                                })
                            }
                        }

                        // 7: 发送消息
                        await ctx.replyWithHTML(this.noteOrderTxcg(botUser.USDT, shengyuUsdt, price, botWithdrawalAddrModel?.addr), WalletController.createBackBtn())

                    } catch (e) {
                        await ctx.replyWithHTML('⌛️ 提示：服务器忙，请稍后在试')
                        await queryRunner.rollbackTransaction()
                    }
                } catch (e) {
                    return ctx.replyWithHTML('⌛️ 亲操作慢点，休息一会在操作!')
                }
            }
        }, async () => {
            await ctx.replyWithHTML('⌛️ 亲，操作慢点，休息一会在操作!')
        })
    }

    /**
     * 财务标记打款
     * @param ctx
     */
    public static startMarkTixian = async (tgId: string, msg: string, ctx: Context, ubot: Telegraf<Context>) => {
        var payMentId = msg.replaceAll("bjydk", '')
        if (payMentId) {
            // 开始修改订单状态
            var botPayment = await BotPaymentModel.createQueryBuilder().where("id=:id", {id: payMentId}).getOne()
            // 获取用户提现的金额
            if (botPayment) {
                // 如果审核已经通过，就无须在操作了
                if (botPayment.paymentType == PaymentTypeEnum.TX_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过打款业务，不要重复操作!")
                    return;
                }

                if (botPayment.paymentType == PaymentTypeEnum.TK_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过退款操作，不要重复操作!")
                    return;
                }

                var passTime = DateFormatUtils.CurrentDateFormatString()
                // 开始修改状态
                await BotPaymentModel.createQueryBuilder().update(BotPaymentModel)
                    .set({
                        paymentType: PaymentTypeEnum.TX_DKJL.value,
                        paymentTypeName: PaymentTypeEnum.TX_DKJL.name,
                        passTgid: ctx.botInfo.id + '',
                        passUsername: ctx.botInfo.username,
                        passNickname: ctx.botInfo.first_name,
                        passTime: passTime,
                        status:1,// 已完成
                        description:"提现一笔金额【"+botPayment.paymentAmount+"】已完成",
                        version:()=>{
                            return 'version + 1'
                        }
                    })
                    .where("id=:id and version = :version", {id: botPayment.id,version:botPayment.version})
                    .execute()
                const addr = AESUtils.decodeAddr(botPayment.paymentTypeNumber) || ''
                const html: string = "\uD83D\uDCE3尊敬的用户：" + botPayment?.nickname + "您好！\n" +
                    "\uD83D\uDCE3财务已确认打款，请查收\n" +
                    "\uD83D\uDCE3温馨提示，提现手续费usdt为1u，TRX为实时等额汇率\n" +
                    "\uD83D\uDCE31号公馆祝您赌运昌隆\uD83C\uDF8A\n" +
                    "\uD83D\uDD3A实际提现：" + (botPayment?.paymentRealAmount || 0) + "、手续费：1U\n" +
                    "\uD83D\uDD3A到账金额：" + (botPayment?.paymentAmount || 0) + "\n" +
                    "\uD83D\uDD3A还剩余额：" + (botPayment?.balanceAfter || 0) + "\n" +
                    "\uD83D\uDD3A申请时间：" + botPayment.applyTime + "\n" +
                    "\uD83D\uDD3A打款时间：" + passTime + "\n" +
                    "\uD83D\uDD3A货币类型：USDT" + "\n" +
                    "\uD83D\uDD3A提现地址：" + addr

                // 5:给申请人发消息
                await ubot.telegram.sendMessage(tgId, html, {
                    parse_mode: "HTML",
                    reply_markup: WalletController.createBackBtn().reply_markup
                })
                // 6: 编辑回复的按钮
                await ctx.editMessageReplyMarkup(WalletController.createSuccessBtn(botPayment.username).reply_markup)
            }
        }
    }

    /**
     * 财务异常驳回
     * @param ctx
     */
    public static startRefuseTixian = async (tgId: string, msg: string, ctx: Context, ubot: Telegraf<Context>) => {
        var payMentId = msg.replaceAll("txycth", '')
        if (payMentId) {
            // 开始修改订单状态
            var botPayment = await BotPaymentModel.createQueryBuilder().where("id=:id", {id: payMentId}).getOne()
            // 获取用户提现的金额
            if (botPayment) {
                if (botPayment.paymentType == PaymentTypeEnum.TK_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过退款业务，不要重复操作!")
                    return;
                }
                // 如果审核已经通过，就无须在操作了
                if (botPayment.paymentType == PaymentTypeEnum.TX_DKJL.value) {
                    await ctx.replyWithHTML("⚠️ 已操作过打款业务，不要重复操作!")
                    return;
                }

                try {
                    await queryRunner.startTransaction()
                    // 给用户增加余额
                    queryRunner.manager.update(UserModel, {
                        tgId: botPayment.tgId
                    }, {
                        USDT: () => {
                            return "usdt + " + botPayment?.paymentRealAmount
                        }
                    })
                    var refuseTime = DateFormatUtils.CurrentDateFormatString()
                    queryRunner.manager.update(BotPaymentModel, {
                        id: botPayment.id
                    }, {
                        paymentType: PaymentTypeEnum.TK_DKJL.value,
                        paymentTypeName: PaymentTypeEnum.TK_DKJL.name,
                        passTgid: ctx.botInfo.id + '',
                        passUsername: ctx.botInfo.username,
                        passNickname: ctx.botInfo.first_name,
                        passTime: refuseTime,
                        status:2,// 被拒绝
                        description:"提现一笔金额【"+botPayment.paymentAmount+"】被拒"
                    })

                    const addr = AESUtils.decodeAddr(botPayment.paymentTypeNumber) || ''
                    const html: string = "\uD83D\uDCE3尊敬的用户：" + botPayment?.nickname + "您好！\n" +
                        "\uD83D\uDCE3财务异常退回金额\n" +
                        "\uD83D\uDCE3温馨提示，请核对地址后重新提交，如有疑问请联系财务\n" +
                        "\uD83D\uDCE31号公馆祝您赌运昌隆\uD83C\uDF8A\n\n" +
                        "\uD83D\uDD3A退回金额：" + (botPayment?.paymentRealAmount || 0) + "\n" +
                        "\uD83D\uDD3A退之前余额：" + (botPayment?.balanceAfter || 0) + "\n" +
                        "\uD83D\uDD3A退之后余额：" + (botPayment?.balanceBefore || 0) + "\n" +
                        "\uD83D\uDD3A申请时间：" + botPayment.applyTime + "\n" +
                        "\uD83D\uDD3A退回时间：" + refuseTime + "\n" +
                        "\uD83D\uDD3A货币类型：USDT" + "\n" +
                        "\uD83D\uDD3A地址：" + addr
                    // 给申请人发消息
                    await ubot.telegram.sendMessage(tgId, html, {
                        parse_mode: "HTML",
                        reply_markup: WalletController.createBackBtn().reply_markup
                    })
                    // 6: 编辑回复的按钮
                    await ctx.editMessageReplyMarkup(WalletController.createFailBtn(botPayment.username).reply_markup)
                    await queryRunner.commitTransaction()
                } catch (e) {
                    await queryRunner.rollbackTransaction()
                    await ctx.replyWithHTML('提示：服务器忙，请稍后在试')
                }
            }
        }
    }

    public static noteOrderTxcg = (ye: string, shengyuUsdt: number, je: number, address: string | undefined) => {
        var html =
            "✅ 提现成功，等待客服确认到账！\n\n" +
            "\uD83D\uDD3A提现金额：" + je + "U\n" +
            "\uD83D\uDD3A实际到账金额：" + (je - 1) + "U，手续费：1U\n" +
            "\uD83D\uDD3A提之前余额：" + ye + " USDT\n" +
            "\uD83D\uDD3A提之后余额：" + shengyuUsdt + " USDT\n" +
            "\uD83D\uDD3A申请时间：" + DateFormatUtils.CurrentDateFormatString() + "\n" +
            "\uD83D\uDD3A提现地址：" + AESUtils.decodeAddr(address || '') + "\n" +
            "\uD83D\uDD3A货币类型：USDT"
        return html;
    }
}


export default WalletHandleTixianMethod
