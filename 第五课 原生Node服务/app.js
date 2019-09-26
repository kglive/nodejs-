const http = require('http');

const app = http.createServer((request, response) => {
  // request.url
  response.writeHead(200, {"Content-Type": 'text/plain;charset=utf-8'});
  response.end('大家好 world！');
});

app.listen(5000, () => {
  console.log('服务器启动了')
})