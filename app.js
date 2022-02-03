const path = require('path');
//const PATH = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cmStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error404');
const User = require('./models/user');
const MONGODB_URL = 'mongodb+srv://nicecode22:mmczaho947@cluster0.avaa3.mongodb.net/shop?'

const app = express();
const store = new cmStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

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

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.getErrorPage);

mongoose
    .connect(
        MONGODB_URL
    )
    .then(result => {
        User.findOne().then( user => {
            if (!user) {
                const user = new User({
                    name: 'Mell',
                    email: 'example@nicecode.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });
