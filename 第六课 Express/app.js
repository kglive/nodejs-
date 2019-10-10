const Express = require('express');
const path = require('path');
const app = Express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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



app.get('/', (req, res) => {
  // return res.send('hello world！')
  res.render('index', { name: '马云', age: '18', address: '电子科技大学成都学院' });
})

app.get('/login', (req, res) => {
  console.log('收到前端发来的数据', req.query.username)
})

app.get('/block', (req, res) => {
  // return res.send('国庆节快乐!')
  let data = {
    details: {
      name: '马云',
      age: 18
    },
    likes: [
      {
        name: '支付宝', price: 100
      },
      {
        name: '淘宝', price: 200
      }
    ],
    others: ['达摩院', '中国芯', '蚂蚁金服']
  };
  res.render('block', data)
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