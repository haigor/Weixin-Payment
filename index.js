/**
 * @author Peter.D.Wang
 * @date 2016-03-08
 * @description 微信支付流程相关方法
 */
var tools = require('./lib/tools');

module.exports = {
    unifiedOrder: function(options, _timeout) {
        var _url = 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            info = {
                status: true,
                msg: ''
            };
        _timeout = _timeout || 6;
        //检测必填参数
        if (!tools.isNotNull(options.out_trade_no)) {
            throw ('缺少统一支付接口必填参数out_trade_no！');
        } else if (!tools.isNotNull(options.body)) {
            throw ('缺少统一支付接口必填参数body！');
        } else if (!tools.isNotNull(options.total_fee)) {
            throw ('缺少统一支付接口必填参数total_fee！');
        } else if (!tools.isNotNull(options.trade_type)) {
            throw ('缺少统一支付接口必填参数trade_type！');
        } else if (!tools.isNotNull(options.appid)) {
            throw ('缺少统一支付接口必填参数appid！');
        } else if (!tools.isNotNull(options.mchid)) {
            throw('缺少统一支付接口必填参数mchid！');
        } else if (!tools.isNotNull(options.notify_url)) {
            throw('缺少统一支付接口必填参数notify_url！');
        } else if (!tools.isNotNull(options.spbill_create_ip)) {
            throw('缺少统一支付接口必填参数spbill_create_ip！');
        }

        //检测关联参数

        return info;
    }

}