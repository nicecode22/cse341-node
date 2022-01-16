const path = require('path'); //

const express = require('express'); //
//const bodyParser = require('body-parser');

const third = express(); //

const adminRoutes = require('../assignment 03/routes/admin'); //


third.use(express.static(path.join(__dirname, 'public'))); //

third.use('/admin', adminRoutes); //

third.listen(3000); 