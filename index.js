/**
 * @author Peter.D.Wang
 * @date 2016-03-08
 * @description 微信支付流程相关方法
 */
var tools = require('./lib/tools');
var app = {
    pr: function(json, res) {
        if (json.return_code === 'SUCCESS' && json.return_code === 'SUCCESS') {
            res.json({
                "appId":
                json.appid, //公众号名称，由商户传入
                    "timeStamp":
                new Date().getTime(), //时间戳，自1970年以来的秒数
                    "nonceStr":
                tools.getNonceStr(), //随机串
                    "package":
                "prepay_id=" + json.prepay_id,
                    "signType":
                "MD5", //微信签名方式：
                "paySign":
                json.sign //微信签名
            });
        }else{
            res.json(json);
        }
    },
    qor:function(json,res){
        if (json.return_code === 'SUCCESS' && json.return_code === 'SUCCESS') {
            res.json(json);
        }else{
            res.json(json);
        }
    },
    cor:function(json,res){
        if (json.return_code === 'SUCCESS' && json.return_code === 'SUCCESS') {
            res.json(json);
        }else{
            res.json(json);
        }
    }
}

module.exports = {
    /**
     * 统一下订单
     */
    unifiedOrder: function(options, key) {
        var _url = 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            info = {
                status: true,
                msg: ''
            },
            _options = {},
            _method = 'POST',
            _request={};
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
        } else if (!tools.isNotNull(options.mch_id)) {
            throw ('缺少统一支付接口必填参数mch_id！');
        } else if (!tools.isNotNull(options.notify_url)) {
            throw ('缺少统一支付接口必填参数notify_url！');
        } else if (!tools.isNotNull(options.spbill_create_ip)) {
            throw ('缺少统一支付接口必填参数spbill_create_ip！');
        } else if (!tools.isNotNull(key)) {
            throw ('缺少统一支付接口必填参数key！');
        }

        //关联参数
        if (options.trade_type === "JSAPI" && tools.isNotNull(options.openid)) {
            throw ("统一支付接口中，缺少必填参数openid！trade_type为JSAPI时，openid为必填参数！");
        }
        if (options.trade_type === "NATIVE" && tools.isNotNull(options.product_id)) {
            throw ("统一支付接口中，缺少必填参数product_id！trade_type为JSAPI时，product_id为必填参数！");
        }
        options.nonce_str = tools.getNonceStr();
        options.sign = tools.getSign(options);
        //转为xml字符串
        _options.body = tools.beanToXml(options);
        _request = request(_method, _url, _options);
        tools.xmlToBean(_request.getBody('utf-8'), res, app.pr);
    },
    /**
     * 订单查询
     */
    orderquery: function(options) {
        var _xml = '',
        _url ='https://api.mch.weixin.qq.com/pay/orderquery',
        _method ='POST',
            _options = {},
            _request={};
        //检测必填参数
        if (!tools.isNotNull(options.appid)) {
            throw ('缺少订单查询接口必填参数appid！');
        } else if (!tools.isNotNull(options.mch_id)) {
            throw ('缺少订单查询接口必填参数mch_id！');
        } else if (!tools.isNotNull(options.transaction_id) && !tools.isNotNull(options.out_trade_no)) {
            throw ('缺少订单查询接口参数transaction_id和out_trade_no二选一！');
        }
        options.nonce_str = tools.getNonceStr();
        options.sign = tools.getSign(options);
        _options.body = tools.beanToXml(options);
        _request = request(_method, _url, _options);
        tools.xmlToBean(_request.getBody('utf-8'), res, app.qor);
    },
    /**
     * 关闭订单
     */
    closeorder: function(options) {
        var _xml = '',
        _url ='https://api.mch.weixin.qq.com/pay/closeorder',
        _method ='POST',
            _options = {},
            _request={};
        //检测必填参数
        if (!tools.isNotNull(options.appid)) {
            throw ('缺少关闭订单接口必填参数appid！');
        } else if (!tools.isNotNull(options.mch_id)) {
            throw ('缺少关闭订单接口必填参数mch_id！');
        } else if (!tools.isNotNull(options.transaction_id)) {
            throw ('缺少关闭订单接口参数transaction_id！');
        }
        options.nonce_str = tools.getNonceStr();
        options.sign = tools.getSign(options);
        _options.body = tools.beanToXml(options);
        _request = request(_method, _url, _options);
        tools.xmlToBean(_request.getBody('utf-8'), res, app.cor);
    }

}