const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const third = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

third.use(bodyParser.urlencoded({extended: false}));
third.use(express.static(path.join(__dirname, 'public')));

third.use('/admin', adminRoutes);
third.use(shopRoutes);

third.use((req, res, next ) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
third.listen(3000); 