const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Linux Server - MERN Web Application Running!');
});

server.listen(PORT, () => {
  console.log(`Server HTTP đang chạy tại port ${PORT}`);
});