/**
 * @author Peter.D.Wang
 * @date 2016-03-08
 * @description 微信支付流程相关方法
 */
var tools = require('./lib/tools');

module.exports = {
    unifiedOrder: function(options, _timeout) {
        var _url = 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            info = { status: true, msg: '' };
        _timeout = _timeout || 6;
        if (!tools.isNotNull(options.out_trade_no)) {
            info.status = false;
            info.msg = '缺少统一支付接口必填参数out_trade_no！';
        } else if (!tools.isNotNull(options.body)) {
            info.status = false;
            info.msg = '缺少统一支付接口必填参数body！';
        }
        return info;
    }

}
