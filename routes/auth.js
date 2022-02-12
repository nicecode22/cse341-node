const express = require('express');
const {check, body} = require('express-validator/check');
const User = require('../models/user');

const authController = require('../controllers/auth');
const { promiseImpl } = require('ejs');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password', 'Please enter a valid password')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim()
], 
authController.postLogin);

router.post(
    '/signup', 
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            // if (value === 'mmczaho@gmail.com') {
            //     throw new Error('This email is forbidden.');
            // }
            // return true;
            return User.findOne({email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail exists already, please pick another one');
                }
            });
        })
        .normalizeEmail(), 
    body('password', 'Please enter a valid password').isLength({min: 5}).isAlphanumeric().trim(),
    body('confirmPassword').trim().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('This password do not match');
        }
        return true;
    }),
    authController.postSignup
);

router.post('/logout', authController.postLogOut);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPass);

router.post('/password', authController.postNewPass);

module.exports = router;