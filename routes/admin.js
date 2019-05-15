var express = require('express');
var router = express.Router();

var Order = require('../models/order');
var Product = require('../models/product');

// Admin
//get product table
router.get('/admin', [isLoggedIn, isAdmin], function(req, res){
    Product.find({}, function(err, docs){
        var products = docs;
        res.render('admin', {products})
    });
});

//post new product to table
router.post('/admin', [isLoggedIn, isAdmin], function(req, res) {
    
    // Get data from form and save a new object
    var product = {
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category
    };

    // create object ready for database
    var newProduct = new Product(product);

    // save to database
    newProduct.save(function(error){
        if(error){
            console.log(error);
        } else {
            res.redirect('/admin');
        }
    });
});

//delete a product from the table
router.delete('/admin/:id', [isLoggedIn, isAdmin], function(req, res) {
    Product.findByIdAndDelete(req.params.id, err=>{
       if(err){
           console.log(err);
       }else{
           res.redirect("/admin");
       }
    });
});

//update a product on the table
router.put('/admin', [isLoggedIn, isAdmin], function(req, res) {
    const data = req.body;
    data.forEach( product =>{
       Product.findByIdAndUpdate(product.id,product.data, err=>{
           if(err){
               console.log(err);
           }else{
           }
       })
    });
    res.status(200);
    res.json({});
});

// update order to complete
router.put('/admin/:id', isLoggedIn, function(req, res){
   
    // get id of order from URL
    var orderId = req.params.id;
    var total = req.body.total;

    // find order using id
    Order.find({_id: orderId}, function(error, docs){
        
        var order = docs[0];

        // set order status
        order.status = 'completed';
        order.total = total;

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

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.username == 'admin'){
        return next();
    }
    res.redirect('/waiter');
}

module.exports = router;