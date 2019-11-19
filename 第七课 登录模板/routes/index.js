/**
 * 网站前端路由
 */
const Express = require('express');
const router = Express.Router();
const { myQuery } = require('../models/mysql');
const { uuid36, encrypt, decrypt } = require('../models/crypto');

// 视图渲染登录页面
router.get('/', (req, res) => {
  return res.redirect('/login');
});
router.get('/login', (req, res) => {
  res.render('login', { title: '用户登录',  layout: false});
});

// 登录动作
router.post('/login', (req, res) => {
  console.log('后台接收到的数据', req.body.username)
  let errors = [];
  if (!req.body.username) {
    errors.push({ type: 'warning', message: '登录用户名不能为空' });
  }
  if (!req.body.password) {
    errors.push({ type: 'warning', message: '登录密码不能为空' });
  }
  if (errors.length > 0) {
    // return res.render('login', { flash: errors, layout: false });
    req.session.flash = errors;
    return res.redirect('/login');
  }
  myQuery('select * from `user` where username=?', [req.body.username]).then(data => {
    // 解密判断密码是否一致
    if (decrypt(data[0].password) === req.body.password) {
      // 返回登录成功
      // return res.send('登录成功')
      // http://127.0.0.1:5000/admin
      let userinfo = {
        id: data[0].id,
        username: data[0].username,
        email: data[0].email,
        sex: data[0].sex
      }
      // 用户信息存储session
      req.session.user = userinfo;
      req.session.flash = [{ type: 'success', message: '登录成功' }];
      res.redirect('/admin');
    } else {
      // return res.send('登录失败， 密码错误')
      
      // return res.render('login', { flash: [{ type: 'warning', message: '登录失败， 密码错误' }], layout: false });
      req.session.flash = [{ type: 'warning', message: '登录失败， 密码错误' }];
      return res.redirect('/login');
    }
  }).catch(err => {
    // TODO 错误处理
    // return res.render('login', { flash: [{ type: 'warning', message: '用户名不存在' }], layout: false });
    req.session.flash = [{ type: 'warning', message: '用户名不存在' }];
    return res.redirect('/login');
  })



  // select * from user where username=req.body.username 
  // 明文密码 select * from user where username=req.body.username and password=req.body.password
  // 密文密码 获取数据库的密文密码
  // 解密数据库里面的密码
  // 比对两个密码是或否一致


  // select * from user where username=req.body.username
  // 数据库里里面的password和用户传过来的password比较
    // rows.password === req.body.password
  // 很大的BUG存在



  // return res.redirect(301, '/index')
});


/**
 * 渲染注册页面
 */
router.get('/register', (req, res) => {
  res.render('register', { title: '用户注册', layout: false });
});

/**
 * 注册动作
 */
router.post('/register', (req, res) => {
  // console.log('后台接收到的注册数据', req.body);
  let { username, password, repassword, sex, email } = req.body;
  // 数据校验
  // 用户名不能为空；密码不能为空；两次密码一致；邮箱格式验证
  if (!username) {
    // TODO 提示用户名不能为空
    // return ;
  }
  if (!password || !repassword) {
    // TODO 提示用户两次密码不能为空
  }
  if (password !== repassword) {
    // TODO 两次密码不一致
  }
  let VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email.match(VALID_EMAIL_REGEX)) {
    // TODO 邮箱格式不正确
  }

  // 整理写入数据库的数据项
  // console.log(uuid36());
  // console.log(encrypt(password));
  myQuery('select * from `user` where email=?', [email]).then(data => {
    console.log(data); // []
    if (!data.length) {
      console.log(uuid36(), username, encrypt(password), email, sex);
      // TODO 没有查出结果
      myQuery('insert into `user` (`id`, `username`, `password`, `email`, `sex`) values(?,?,?,?,?)', [uuid36(), username, encrypt(password), email, sex]).then(data2 => {
        console.log(data2);
        return res.send('注册成功');
      }).catch(error => {
        // TODO 数据库错误处理，注册失败
        return res.send('注册失败');
      })
    } else {
      // TODO 反馈用户，邮箱已经存在
    }
  }).catch(error => {
    // TODO 数据库错误处理
  })
});

module.exports = router;
