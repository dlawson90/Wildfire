var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Product = require('../models/product');
var Order = require('../models/order');

// Index
router.get('/', function(req, res){
    res.render("index");
});


// Printer
router.post('/printer/:id', isLoggedIn, function(req, res){
    // get all orders from database with corresponding id
    var id=req.params.id;
    Order.find({_id: id}, function(error, docs){
        // set returned results to products
        var order = docs;

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
                    res.render('printer', { order, prices });
                }
            });
    });


});

// AUTHENICATION
//////////////////////////////////////////////////////

// Login
router.post('/login', passport.authenticate("local",
    {
        successRedirect: "/waiter",
        failureRedirect: "/"
    }), function(req, res){
});

// Register
router.post('/register', function(req, res){

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(error, user){
        if(error){
            console.log(error);
            return res.render("index");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/waiter");
        });
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect("/");
});

// send currentUser var to all routes
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
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