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
    //非空判断
    isNotNull: function(obj) {
        var _arr = ['undefined', 'null'],
            _flag = true;
        if (obj !== 0 && (!obj || _arr.indexOf(obj) !== -1)) {
            _flag = false;
        } else {
            _flag = !app.isNullObj(obj);
        }
        return _flag;
    }
}
