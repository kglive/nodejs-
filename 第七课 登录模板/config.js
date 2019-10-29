module.exports = {
  /* 数据库配置 */
  DB: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cmstest',
    connectionLimit: 10
  },
  cookie: {
    key: 'sid', // cookie字段名称
    secret: '1231sdsd', // cookie加密密钥
    resave: true, // true|false, // 强制刷新cookie
    saveUninitialized: true, // true|false 初始化cookie
    maxAge: 1000 * 60 * 60 * 2, // 设置cookie有效时间（单位ms）， 2小时
  },
  // 数据加解密
  secretKey: 'hahsdya'
}
