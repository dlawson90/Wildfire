
var express = require('express');
var router = express.Router();

var Order = require('../models/order');



// KITCHEN

//  get kitchen page
router.get('/kitchen', isLoggedIn, function(req, res){
    // get all orders from database that are pending
    Order.find({status: "pending"}, function(error, docs){
        // set returned results to products
        var orders = docs;
        // render waiter view and send products as an array
        res.render('kitchen', { orders });
    });
});

// Kitchen - new order created
router.post('/kitchen', isLoggedIn, function(req, res){
    
    // data sent from order form
    var orderForm = req.body;

    // assign keys and values from returned object that form sends and save as array
    const productNames = Object.keys(req.body);
    const productQuant = Object.values(req.body);
    
    // empty to array to store array of ordered products
    var orderedItems = [];

    // loop through product name array and create a new object for each item
    for(var i = 0; i < productNames.length-1; i++){
        if(productQuant[i] > 0){
            var product = {
                productName: productNames[i],
                quantity: productQuant[i]
            }
            // add newly created object to array
            orderedItems.push(product);
        }
    }

    var order = {
        orderDate: new Date(),
        tableNum: orderForm.tableNum,
        userID: req.user.id,
        total: 0.00,
        orderDetail: orderedItems,
        status: "pending",
        discount: 0
    }
    
    var newOrder = new Order(order);

    newOrder.save(function(error){
        if(error){
            console.log(error);
        } else {
            res.redirect('/waiter');
        }
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