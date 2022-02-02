const express = require('express');

const auth = require('../controllers/auth')

const router = express.Router();

router.get('/login', auth.getLogin);

router.post('/login', auth.postLogin);

module.exports = router;