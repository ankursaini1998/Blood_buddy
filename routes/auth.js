var express        = require("express"),
    router         = express.Router(),
    passport       = require("passport"),
    donor          = require("../models/donor"),
    LocalStrategy  = require("passport-local").Strategy,
    request        = require("request"),
    bodyParser     = require('body-parser');

require('../config/passport')(passport);

router.use(bodyParser.urlencoded({extended:false})); 
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success     = req.flash('success');
    res.locals.error       = req.flash('error');
    next();
});

//Show register page
router.get('/register',function(req,res){
    res.render('register');
});

//Register Route
router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/profile', 
    failureRedirect : '/',
    failureFlash :true
    
}));

//Show login form
router.get('/login', function(req, res){
    res.render('login'); 
 });
 
 //Login Route
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', 
    failureRedirect : '/', 
    failureFlash :true
    
    
}));

//Logout route
router.get("/logout", function(req, res){
    req.logout();
    //console.log("success", "LOGGED YOU OUT!");
    req.flash("success", "LOGGED YOU OUT!");
    res.redirect("/");
 });

 module.exports = router;
