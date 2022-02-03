const express = require('express');

const auth = require('../controllers/auth')

const router = express.Router();

router.get('/login', auth.getLogin);

router.post('/login', auth.postLogin);

router.post('/logout', auth.postLogOut);

module.exports = router;