const Express = require('express');
const path = require('path');
const app = Express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { myQuery } = require('./models/mysql');

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
    myQuery('select * from `user` where username=? and password=?', [req.body.username, req.body.password]).then(rows => {
      console.log('查询结果', rows)
      // 返回登录成功
      return res.send('登录成功')
    }).catch(err => {
      // TODO 错误处理
    })
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