var express        = require("express"),
    router         = express.Router(),
    passport       = require("passport"),
    donor          = require("../models/donor"),
    LocalStrategy  = require("passport-local").Strategy,
    request = require("request");

router.use(function(req, res, next){
    res.locals.currentUser = req.user;
        next();
});
//Passport Configuration
router.use(passport.initialize());
router.use(passport.session());

//Local Strategy for Register
passport.use('local-signup', new LocalStrategy({passReqToCallback : true},function(req, username, password, done){
    process.nextTick(function() {
    donor.findOne({ 'local.username':username },function(err,user){
        if (err)
            return done(err);
        if (user){
            console.log("User exists already");
            return done(null, false);
        } 
        else
        {
            var newDonor  = new donor();
            newDonor.local.username    = username;
            newDonor.local.password = newDonor.generateHash(password);
            newDonor.name = req.body.name;
            newDonor.email = req.body.email;
            newDonor.confirmPassword = req.body.confirmPassword;
            newDonor.dob = req.body.dob;
            newDonor.gender = req.body.gender;
            newDonor.bloodGroup = req.body.bloodGroup;
            newDonor.dateOfLastDonation = req.body.dateOfLastDonation;
            newDonor.city = req.body.city;
            newDonor.contactNumber = req.body.contactNumber;
            newDonor.address = req.body.address;

            newDonor.save(function(err,created){
                if (err)
                    throw err;
                console.log("Registered Successfully!");
                console.log("hi    " + created.name);
                return done(null, newDonor);
            });
        }
    });    
});
}));

//Local Strategy for Login
passport.use('local-login', new LocalStrategy({passReqToCallback:true},function(req, username, password, done){ 
donor.findOne({ 'local.username':username },function(err,donor){
    if (err)
        return done(err);

    if (!donor){
        console.log("Wrong Username!");
        return done(null, false);
    }
    if (!donor.validPassword(password)){
        console.log("Wrong Password!");
        return done(null, false);
    } 
    console.log("Logged in Successfully!");
    console.log("Hi  " + donor.name);
    return done(null, donor);
});
}));

//Serializing User for the session
passport.serializeUser(function(donor, done) {
    done(null, donor.id);
});

//Deserializing User
passport.deserializeUser(function(id, done) {
    donor.findById(id, function(err, donor) {
        done(err, donor);
    });
});


//Show register page
router.get('/register',function(req,res){
    res.render('register');
});

//Register Route
router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/profile', 
    failureRedirect : '/auth/register',
    failureFlash : true 
}));

//Show login form
router.get('/login', function(req, res){
    res.render('login'); 
 });
 
 //Login Route
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', 
    failureRedirect : '/auth/login', 
    failureFlash : true 
}));

//Logout route
router.get("/logout", function(req, res){
    req.logout();
    console.log("success", "LOGGED YOU OUT!");
    res.redirect("/auth/login");
 });

 module.exports = router;
