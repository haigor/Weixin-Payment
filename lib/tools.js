/**
 * 工具类
 */

var app = {
    isNullObj: function(obj) {
        for (var o in obj) {
            return false;
        }
        return true;
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
    }
}