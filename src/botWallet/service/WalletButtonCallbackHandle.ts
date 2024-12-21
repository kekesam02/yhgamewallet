import {UpdateType} from "telegraf/typings/telegram-types";
import {Context} from "telegraf";
import StartWalletEnum from "../../type/walletEnums/StartWalletEnum";
import AESUtils from "../../commons/AESUtils";
import UserModel from "../../models/UserModel";
import BotTronAddrModel from "../../models/BotTronAddr";


/**
 * 钱包回调
 */
class WalletButtonCallbackHandle {
    public static listenerMessage = async (ctx: Context) => {
        console.log('callback_query回调', ctx)
        let update: any = ctx?.update
        let callbackStr: string = update.callback_query?.data

        // 获取telegram的tgId
        var tgId: number = ctx.message?.from?.id || 0
        var firstName: string = ctx.message?.from?.first_name || ''
        var username: string = ctx.message?.from?.username || ''

        switch (callbackStr) {
            case StartWalletEnum.CHONGZHI:
                // 查询用户信息
                let userId = AESUtils.encodeUserId(tgId?.toString())
                // 根据tgId查询用户是否存在。
                let botUser = await UserModel.createQueryBuilder().where('tg_id = :tgId', {tgId: userId}).getOne()
                var link:string | undefined = '';
                //获取专属充值连接，先查询是否有充值连接，没有的话就拿充值链接并且赋值
                if (!botUser){
                    let botTronAddrModel = await BotTronAddrModel.createQueryBuilder()
                        .where("uses = :uses", {uses:0}).limit(0).offset(1).getOne()
                    link = botTronAddrModel?.addr;
                    // 如果用户不存在就添加用户，把交易地址赋值给他
                    await UserModel.createQueryBuilder().insert().into(UserModel).values({
                        tgId: userId,
                        nickName: firstName,
                        userName: username,
                        vip: 0,
                        promotionLink: '',
                        rechargeLink: link
                    }).execute();
                    // 并且标识交易地址为使用
                    await BotTronAddrModel.createQueryBuilder().update().set({uses:1}) .where("id=:id",{'id':botTronAddrModel?.id}).execute()
                    //加入到监听
                    // MCoinRechargeAddrPool mCoinRechargeAddrPool = new MCoinRechargeAddrPool();
                    // mCoinRechargeAddrPool.setAddress(link);
                    // mCoinRechargeAddrPool.setPrivateKey("");
                    // mCoinRechargeAddrPool.setCurrency("USDT");
                    // mCoinRechargeAddrPoolService.save(mCoinRechargeAddrPool);
                }else {
                    // //没有支付链接
                    // if (Objects.isNull(userById.getRechargeLink())){
                    //     BotTronAddr botTronAddr = botTronAddrService.lambdaQuery()
                    //         .eq(BotTronAddr::getUses, CommonEnums.ZERO)
                    //         .list().get(0);
                    //     link=botTronAddr.getAddr();
                    //     botUserService.updateUserLink(tgId,link);
                    //     botTronAddrService.lambdaUpdate().eq(BotTronAddr::getId,botTronAddr.getId())
                    //         .set(BotTronAddr::getUses,CommonEnums.ONE).update();
                    //     //加入到监听
                    //     MCoinRechargeAddrPool mCoinRechargeAddrPool = new MCoinRechargeAddrPool();
                    //     mCoinRechargeAddrPool.setAddress(link);
                    //     mCoinRechargeAddrPool.setPrivateKey("");
                    //     mCoinRechargeAddrPool.setCurrency("USDT");
                    //     mCoinRechargeAddrPoolService.save(mCoinRechargeAddrPool);
                    // }else {
                    //     link= userById.getRechargeLink();
                    // }
                }

                //封装数据
//            String botParameter = BotEncapsulateTextWallet.sendMsgZflj();
//            //发送支付信息
//            botEncapsulation.sendMenu(tgId,botParameter,bot);
                //封装数据
                //取消上一次消息
                // if (Objects.nonNull(callbackQueryId)){
                //     botEncapsulation.delSend(callbackQueryId,bot);
                //     // 删除上一个消息
                //     botEncapsulation. deleteMessage(chatId, messageId,bot);
                // }
                // String s = AESUtil.jieAESAddr(link);
                // BotParameter entertained = BotEncapsulateTextWallet.entertained(s);
                // //获取图片
                // InputStream inputStream = QRCodeGenerator.zfTp(s);
                // //发送支付链接
                // botEncapsulation.sendMenuImage(tgId,inputStream,entertained.getHtml(),entertained.getKeyboardMarkup(),bot);

                console.log("CHONGZHI")
                break
            case StartWalletEnum.TIXIAN:
                console.log("TIXIAN")
                break
            case StartWalletEnum.ZHUANZHANG:
                console.log("ZHUANZHANG")
                break
            case StartWalletEnum.SHOUKUANG:
                console.log("SHOUKUANG")
                break
            case StartWalletEnum.HONGBAO:
                console.log("HONGBAO")
                break
            case StartWalletEnum.SHANGDUI:
                console.log("SHANGDUI")
                break
            case StartWalletEnum.USERCENTER:
                console.log("USERCENTER")
                break
        }
    }

    /**
     * 开始定位球游戏
     */
    public static startBall = () => {
        console.log('开始定位球游戏')
    }
}




export default WalletButtonCallbackHandle
