/**
 * 工具类
 */
var crypto = require('crypto');
var xml2js = require('xml2js');
var request = require('sync-request');

var app = {
    isNullObj: function(obj) {
        for (var o in obj) {
            return false;
        }
        return true;
    },
    getASCIIStr: function(options) {
        var _arr = new Array(),
            _str = '';
        for (var item in options) {
            _arr.push(item);
        }
        _arr.sort();
        for (var i in _arr) {
            _str += ((i === '0') ? '' : '&') + _arr[i] + '=' + options[_arr[i]];
        }
        return _str;
    }
}

module.exports = {
    /**
     *
     * 非空判断
     * @param obj 为任意类型
     */
    isNotNull: function(obj) {
        var _arr = ['undefined', 'null'],
            _flag = true;
        if (obj !== 0 && (!obj || _arr.indexOf(obj) !== -1)) {
            _flag = false;
        } else {
            _flag = !app.isNullObj(obj);
        }
        return _flag;
    },
    /**
     *
     * 产生随机字符串，不长于32位
     * @param int $length
     * @return 产生的随机字符串
     */
    getNonceStr: function(len) {　　
        len = len || 32;　　
        var tpchars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1';　　
        var maxPos = tpchars.length;　　
        var rstr = '';　　
        for (i = 0; i < len; i++) {
            rstr += tpchars.charAt(Math.floor(Math.random() * maxPos));　　
        }　　
        return rstr;
    },
    /**
     * 生成统一下单签名
     * @param  Object options 需要进行发送或接受的数据对象
     * @return 加密之后的签名
     */
    getSign: function(options, key) {
        var _sign = '';
        //第一步：对参数按照key=value的格式，并按照参数名ASCII字典序排序
        var str = app.getASCIIStr(options);
        //第二步: 拼接API密钥
        str += '&key=' + key;
        str = crypto.createHash('md5').update(str);
        _sign = crypto.digest('hex').toUpperCase();
        return _sign;
    },
    /**
     * js对象转为xml字符串(暂时只支持简单的一级对象)
     * @param  Object options 需要格式化的对象
     * @return xml字符串
     */
    beanToXml: function(options) {
        var _xml = '<xml>';
        for (var item in options) {
            _xml += '<' + item + '><![CDATA[' + options[item] + ']]></' + item + '>';
        }
        return _xml + '</xml>';
    },
    /**
     * xml转json
     * @param xml 需要转变的xml
     * @param cb 回调处理函数
     */
    xmlToBean: function(xml, res, cb) {
        xml2js.parseString(str, {
            explicitArray: false
        }, function(err, result) {
            if (err) {
                console.log(err);
                return {
                    status: false,
                    msg: err
                };
            }
            console.log('=' + JSON.stringify(result));
            cb(result.xml, res);
        });
    },
    request: function(options, url, method, cb, req, res) {
        var _request = request(method, url, options);
        cb(_request.getBody('utf-8'), req, res);
    }
}