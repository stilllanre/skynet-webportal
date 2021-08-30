const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('skynetsw.html')
const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(index);
}

http.createServer(requestListener).listen(3000, "0.0.0.0");