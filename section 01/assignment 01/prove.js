const http =require('http');
const routes = require('./routes-two');

const server = http.createServer(routes);

server.listen(3000);


