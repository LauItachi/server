const mysql = require('mysql');
const mysqlConf = require('../conf/mysqlConf');
const userSqlMap = require('./userSqlMap');
const pool = mysql.createPool(mysqlConf.mysql);
var log4js = require('log4js');
log4js.configure('./conf/log4js.json');
var log = log4js.getLogger("dev");

module.exports = {
    add: function (user, callback) {
        pool.query(userSqlMap.add, [user.username, user.password], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    list: function (callback) {
        pool.query(userSqlMap.list, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getById: function (id, callback) {
        pool.query(userSqlMap.getById, id, function (error, result) {
            if (error) throw error;
            log.debug(result[0]);
            callback(result[0]);
        });
    },
    getByUserName: function (username, callback) {
        pool.query(userSqlMap.getByUserName, username, function (error, result) {
            if (error) throw error;
            log.debug(result[0]);
            callback(result[0]);
        });
    },
    deleteById: function (id, callback) {
        pool.query(userSqlMap.deleteById, id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update: function (user, callback) {
        pool.query(userSqlMap.update, [user.username, user.password, user.id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    }
};
