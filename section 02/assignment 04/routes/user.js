const path = require('path');

const express = require('express');

const dir = require('../help/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const users = adminData.users;
    res.render('users', {
        prods: users, 
        pageTitle: 'All Users', 
        path: '/', 
        hasUsers: users.length > 0, 
        activeUser: true,
        mainCSS: true
    });
});

module.exports = router;