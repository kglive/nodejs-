const http = require('http')
const appServer = http.createServer((req, res) => {
    let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('hello world!');
            break;
        case '/user':
            res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
            res.end('个人中心');
            break;
        default:
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end('Not-Found');
            break;
    }
})
appServer.listen(5000, () => {
    console.log('Server start on 5000 port')
})