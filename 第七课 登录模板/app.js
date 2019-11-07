const Express = require('express');
const path = require('path');
const app = Express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expSession = require('express-session');
const { myQuery } = require('./models/mysql');
const { uuid36, encrypt, decrypt } = require('./models/crypto');
const config = require('./config');

// 设置静态目录
app.use(Express.static(path.join(__dirname, '/public')));

// 前端路由
const frontRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

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

// 配置cookie和session
app.use(cookieParser());
app.use(expSession({
  key: config.cookie.key, // 设置cookie中保存sessionId的字段名
  secret: config.cookie.secret, // 通过secret值计算hash值
  resave: config.cookie.resave, // 强制更新session值
  saveUninitialized: config.cookie.saveUninitialized, // 初始化cookie值
  cookie: {
    maxAge: config.cookie.maxAge
  }
}));



app.use('/', frontRouter);
app.use('/admin', adminRouter);



// app.get('/index', (req, res) => {
//   res.render('index', { title: 'welcome my site！' });
// })


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