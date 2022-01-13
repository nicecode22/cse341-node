const fs = require('fs');

const requestHandler = ((req, res) => {
    const url = req.url;
    //const method = req.method;
    if (url === '/' ) {//&& method === 'POST') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Greeting Text</title></head>');
        res.write('<body><h1>Welcome to my first week prove</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Create</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Dummy List</title></head>');
        res.write('<body><ul><li>Apple</li><li>Banana</li><li>Carrot</li><li>Dandelion</li><li>Elephant</li></ul></body>');
        res.write('</html>');
        return res.end();
        };
        //I missed this part
        if (url === '/create-user') {
            const body = [];
            req.on('data', chunk => {
                body.push(chunk);
            });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            });
            //fs.writeFile('users.txt', user, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
                }
            });  
module.exports = requestHandler;