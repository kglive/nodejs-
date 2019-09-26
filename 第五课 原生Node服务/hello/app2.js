const http = require('http');
const fs = require('fs');

const appServer = http.createServer((req, res) => {
    let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            serverStaticFile(res, '/html/index.html', 'text/html');
            break;
        case '/user':
            res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
            res.end('个人中心');
            break;
        case '/img/header.jpg':
            serverStaticFile(res, '/public/header.jpg', 'image/jpeg');
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

function serverStaticFile (res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname+path, (err, data) => {
        if (err) {
            res.writeHead(500, {"Content-Type": 'text/plain'});
            res.end('500 - Server Error');
        } else {
            res.writeHead(responseCode, {
                "Content-Type": contentType
            });
            res.end(data);
        }
    })
}