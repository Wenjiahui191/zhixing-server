const { MYSQL_CONF } = require("../conf/db");
const mysql = require('mysql')

// 创建链接
const con = mysql.createConnection(MYSQL_CONF)

// 进行链接
con.connect()

// 数据库执行语句
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape:mysql.escape
};