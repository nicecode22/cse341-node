const path = require('path');

const express = require('express');

const dir = require('../help/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(dir, 'views', 'shop.html'));
});

module.exports = router;