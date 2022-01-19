const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expHbs = require('express-handlebars');

const app = express();

app.engine('hbs', expHbs({
    layoutsDir: 'views/layout/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'style')));

app.use('/admin', adminData.routes);
app.use(userRoutes);

app.use((req, res, next ) => {
    res.status(404).render('error',  {pageTitle: 'Page Not Found'});
});

app.listen(3000);   
