var express        = require("express"),
    router         = express.Router(),
    passport       = require("passport"),
    donor          = require("../models/donor"),
    hospital       = require("../models/hospital"),
    LocalStrategy  = require("passport-local").Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    bodyParser     = require('body-parser');
    request        = require("request");

require('../config/passport')(passport);

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
router.get('/registerHospital',function(req,res){
    res.render('registerHospital');
});

//Register Route
router.post('/register',
    passport.authenticate('local-signup', {
    successRedirect : '/profile', 
    failureRedirect : '/',
    failureFlash :true    
     })
);
router.post('/registerHospital',
    passport.authenticate('local-signup-hospital', {
    successRedirect : '/profileHospital', 
    failureRedirect : '/',
    failureFlash :true    
})
);

//Show login form
router.get('/login', function(req, res){
    res.render('login'); 
 });
 router.get('/loginHospital', function(req, res){
    res.render('loginHospital'); 
 });
 
 //Login Route
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', 
    failureRedirect : '/', 
    failureFlash :true
    
    
}));
router.post('/loginHospital', passport.authenticate('local-login-hospital', {
    successRedirect : '/profileHospital', 
    failureRedirect : '/', 
    failureFlash :true
    
    
}));
router.get('/facebook', passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
}));


router.get('/facebook/callback',passport.authenticate('facebook', {
    successRedirect : '/profileFacebook',
    failureRedirect : '/'
}));

//Logout route
router.get("/logout", function(req, res){
    req.logout();
    //console.log("success", "LOGGED YOU OUT!");
    req.flash("success", "LOGGED YOU OUT!");
    res.redirect("/");
 });

 module.exports = router;
