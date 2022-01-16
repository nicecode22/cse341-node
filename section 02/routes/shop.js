const path = require('path');

const express = require('express');

const dir = require('../help/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    res.sendFile(path.join(dir, 'views', 'shop.html'));
});

module.exports = router;