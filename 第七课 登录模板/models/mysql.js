const mysql = require('mysql');
const { DB } = require('../config');

let dbp = mysql.createPool({
  host: DB.host,
  port: DB.port,
  user: DB.user,
  password: DB.password,
  database: DB.database,
  connectionLimit: DB.maxConnection
});

// select * from ? where id=?    ['user', 1]
// select id,username from user where id='132'
// ?? 列名/表明
// ? 
function myQuery (sqlstatement, args) {
  return new Promise((resolve, reject) => {
    // 从创建的链接池中获取一个连接，待使用
    dbp.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sqlstatement, args, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      }
      // 连接使用完，必须释放，否则连接数一满就会造成堵塞，连接超时
      connection.release();
    })
  });
}


module.exports = {
  myQuery
};
