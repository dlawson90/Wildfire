
var express = require('express');
var router = express.Router();

var Order = require('../models/order');
var Product = require('../models/product');;

// Counter
router.get('/counter', isLoggedIn, function(req, res){
    Order.find({status: "awaiting payment"}, function(error, docs){
        
        if(error){
            console.log(error);
        } else {
            // set returned results to products
            var orders = docs;

            Product.find({}, function(error, docs){
                if(error){
                    console.log(error);
                } else {
                    
                    var prices = [];
                    
                    for(var i = 0; i < docs.length; i++){
                        var product = {
                            productName: docs[i].productName,
                            price: docs[i].price.value
                        };
                        prices.push(product);                       
                    }
                    // render waiter view and send products as an array
                    res.render('counter', { orders, prices });
                }
            });
            
        }
    });
});

router.put('/counter/:id', isLoggedIn, function(req, res){
   
    // get id of order from URL
    var orderId = req.params.id;

    // find order using id
    Order.find({_id: orderId}, function(error, docs){
        
        var order = docs[0];

        // set order status
        order.status = 'awaiting payment';

        // update order in database
        Order.findByIdAndUpdate(orderId, order, function(error){
            if(error){
                console.log(error);
            } else {
                res.redirect('/kitchen');
            }
        });
    });
});

router.put('/counter/:id/discount', isLoggedIn, function(req, res){
   
    // get id of order from URL
    var orderId = req.params.id;

    // get value of discount from form
    var discount = req.body.discount;

    // find order using id
    Order.find({_id: orderId}, function(error, docs){
        
        var order = docs[0];

        // set order status
        order.discount = discount;

        // update order in database
        Order.findByIdAndUpdate(orderId, order, function(error){
            if(error){
                console.log(error);
            } else {
                res.redirect('/counter');
            }
        });
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