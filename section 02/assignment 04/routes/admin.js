const path = require('path');

const express = require('express');

const dir = require('../help/path');

const router = express.Router();

const users = [];

router.get('/add-user', (req, res, next) => {
    res.render('add-user', { pageTitle: 'Add New User', path: '/admin/add-user'});
});

router.post('/add-user', (req, res, next) => {
    users.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.users = users;