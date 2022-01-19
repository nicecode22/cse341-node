const path = require('path');

const express = require('express');

const dir = require('../help/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProds: products.length > 0, 
        activeShop: true,
        mainCSS: true
    });
});

module.exports = router;