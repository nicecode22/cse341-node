const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    User.findById('61f5e0f6effd5bb4844b680a')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user =user;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogOut = (req, res, next) => {
    req.session.destroy((err) => {
            console.log(err);
        res.redirect('/');
    });
};