const express = require('express');
const {check, body} = require('express-validator/check');

const authController = require('../controllers/auth')

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup', 
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            if (value === 'mmczaho@gmail.com') {
                throw new Error('This email is forbidden.');
            }
            return true;
        }), 
        body('password', 'Please enter a valid password').isLength({min: 5}).isAlphanumeric(),
    authController.postSignup
);

router.post('/logout', authController.postLogOut);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPass);

router.post('/password', authController.postNewPass);

module.exports = router;