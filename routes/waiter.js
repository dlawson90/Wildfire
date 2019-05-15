var express = require('express');
var router = express.Router();

var Product = require('../models/product');

// WAITER

// get waiter page
router.get('/waiter', isLoggedIn, function(req, res){
    // get all products from database
    Product.find({}, function(error, docs){
       // set returned results to products
       var products = docs
       // render waiter view and send products as an array
       res.render('waiter', { products });
   });
});


// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;