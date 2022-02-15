const mongoose = require('mongoose');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validateErrors: []
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', { 
            pageTitle: 'Add Product', 
            path: '/admin/add-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg,
            validateErrors: errors.array()
        });
    }

    const product = new Product({
        _id: new mongoose.Types.ObjectId('6201eae490dc14d25efe7ce2'),
        title: title, 
        imageUrl: imageUrl, 
        price: price, 
        description: description,
        userId: req.user
    });
    product
        .save()
        .then(result => {            
            console.log('Created Product');
            res.redirect('/admin/products');
    })
    .catch(err => {
        // return res.status(500).render('admin/edit-product', { 
        //     pageTitle: 'Add Product', 
        //     path: '/admin/add-product',
        //     editing: false,
        //     hasError: true,
        //     product: {
        //         title: title,
        //         imageUrl: imageUrl,
        //         price: price,
        //         description: description
        //     },
        //     errorMessage: 'Error database',
        //     validateErrors: []
        // });
        res.redirect('/500');
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', { 
                pageTitle: 'Edit Product', 
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: null,
                validateErrors: []
            });
        }) 
        .catch(err =>console.log(err));  
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', { 
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDescription,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validateErrors: errors.array()
        });
    }
    
    Product.findById(prodId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl; 
            product.price = updatedPrice; 
            product.description = updatedDescription; 
            return product.save().then(result => {
                console.log('UPDATED PRODUCT!');
                res.redirect('/admin/products')
            });
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find({userId: req.user._id})
    // .select('title price-_id')
    //     .populate('userId', 'name')
        .then(products => {
            console.log(products);
            res.render('admin/productlist', {
                prods: products, 
                pageTitle: 'Admin Products', 
                path: '/admin/productlist'
            });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({_id: prodId, userId: req.user._id})
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};