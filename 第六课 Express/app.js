const Express = require('express');
const path = require('path');
const app = Express();

// 设置静态目录  
app.use(Express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  return res.send('hello world！')
})

app.get('/user', (req, res) => {
  return res.send('国庆节快乐!')
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