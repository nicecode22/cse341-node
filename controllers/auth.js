const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
}
exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign Up',
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email');
                return res.redirect('/login');
            }
            bcryptjs
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user =user;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                }
                req.flash('error', 'Invalid password');
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/login')
            });
        })
        .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email, })
    .then(userDoc => {
        if (userDoc) {
            req.flash('error', 'This email already exist, please try another');
            return res.redirect('/signup');
        }
        return bcryptjs
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: {items: []}
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: 'mmczaho@gmail.com',
                subject: 'Signup succeded',
                html: '<h1>You succesfully sign up</h1>'
            });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postLogOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};