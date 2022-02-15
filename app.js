const path = require('path');
const PATH = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cmStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error404');
const User = require('./models/user');
const MONGODB_URL = 'mongodb+srv://nicecode22:mmczaho947@cluster0.avaa3.mongodb.net/shop?'

const app = express();
const store = new cmStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//const { cmStore } = require('connect-mongodb-session');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false, 
        store: store 
    })
    );

    app.use(csrfProtection);
    app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        if(!user) {
            return next();
        }
        req.user = user;
        next();
    })
    .catch(err =>  {
        throw new Error(err);
    });
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500', errorController.get500);
app.use(errorController.getErrorPage);
app.use((error, req, res, next) => {
    res.redirect('/500');
});

mongoose
    .connect(
        MONGODB_URL
    )
    .then(result => {
        app.listen(PATH);
    })
    .catch(err => {
        console.log(err)
    });
