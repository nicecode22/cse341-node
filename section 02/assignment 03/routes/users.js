const path = require('path');

const express = require('express');

const dir = require('../help/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'assignment 03', 'views', 'users.html'));
});

module.exports = router;