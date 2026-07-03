const http = require("http"); //requiring the cor node module

const server = http.createServer((req, res) => {
  res.end("hello world by nodejs");
});

server.listen(3000);
