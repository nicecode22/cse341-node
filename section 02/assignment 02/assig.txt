const express = require('express');

const assig = express();

//assig.use('/', (req, res, next) => {
//    console.log("This is working");
//    next();
//});
assig.use('/users', (req, res, next) => {
    console.log("This is working");
    res.send('<h1>This is /users middleware</h1>');
});
assig.use('/', (req, res, next) => {
    console.log("This is working too");
    res.send("<h1>This is the / middleware</h1>");
});

assig.listen(3000);