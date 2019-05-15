const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const favicon = require('express-favicon');

// Connect to the database
mongoose.connect('mongodb://admin:qwerty123@ds147096.mlab.com:47096/wildfire', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
// Favicon
app.use(favicon(__dirname + '/public/images/favicon.png'));

// ROUTES
var indexRoutes = require('./routes/index');
var waiterRoutes = require('./routes/waiter');
var kitchenRoutes = require('./routes/kitchen');
var counterRoutes = require('./routes/counter');
var adminRoutes = require('./routes/admin');

// User Model
var User = require('./models/user');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This is a secret!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());  

// Sends current user to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Use the routes
app.use(indexRoutes);
app.use(waiterRoutes);
app.use(kitchenRoutes);
app.use(counterRoutes);
app.use(adminRoutes);

app.listen(port, () => {
    console.log('Server started: ' + port);
});