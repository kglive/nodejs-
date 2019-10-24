const Express = require('express');
const path = require('path');
const app = Express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { myQuery } = require('./models/mysql');
const { uuid36, encrypt, decrypt } = require('./models/crypto');

// 设置静态目录
app.use(Express.static(path.join(__dirname, '/public')));


app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs());
app.engine('hbs', exphbs.create({
  // 布局目录是相对于 setting views 目录的 layouts 目录 （默认）
  layoutsDir: '',
  // 配置布局主文件
  defaultLayout: 'main',
  // 修改模板文件后缀名；后缀名修改之后，对应的engine名称也要跟着改变
  extname: '.hbs',
  // 配置部分模板目录 相对于 setting views 目录的 partials 目录 （默认）
  partialsDir: '',
  // 段落使用
  helpers: {
    section (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}).engine);

app.set('view engine', 'hbs');


// 解析网络请求参数 parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// application/json
app.use(bodyParser.json());

// 视图渲染登录页面
app.get('/', (req, res) => {
  res.render('login', { title: '用户登录', layout: false});
})
// 登录动作
app.post('/login', (req, res) => {
  console.log('后台接收到的数据', req.body.username)
  // myQuery("select * from ??", ['user']).then(data => {
  //   console.log('查询成果', data)
  // }).catch(err => {
  //   console.log('查询错误', err.message)
  // })
  myQuery('select * from `user` where username=?', [req.body.username]).then(data => {
    console.log('查询结果', data, data[0].password)// 结果是一个数组
    // 解密判断密码是否一致
    console.log(decrypt(data[0].password))
    if (decrypt(data[0].password) === req.body.password) {
      // 返回登录成功
      return res.send('登录成功')
    } else {
      return res.send('登录失败， 密码错误')
    }
  }).catch(err => {
    // TODO 错误处理
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
})

/**
 * 渲染注册页面
 */
app.get('/register', (req, res) => {
  res.render('register', { title: '用户注册', layout: false });
});

/**
 * 注册动作
 */
app.post('/register', (req, res) => {
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

app.get('/index', (req, res) => {
  res.render('index', { title: 'welcome my site！' });
})


// 404页面
app.use((req, res, next) => {
  res.type('text/plain').status(404).send('404-Not Found');
  next();
})

// 500
app.use((error, req, res, next) => {
  console.log('服务器报错', error);
  return res.status(500).send('500 - Server Error');
})

app.listen(5000, () => {
  console.log('Server Start on http://127.0.0.1:5000')
})