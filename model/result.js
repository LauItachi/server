exports.createResult = function(success, data) {
    let result = {};
    result.success = success;
    result.data = data;
    return result;
};
exports.format = function (code, message, result) {
    return {code: code, message: message, result: result};
};
// 格式化响应内容
