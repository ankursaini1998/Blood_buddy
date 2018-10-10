var LocalStrategy   = require('passport-local').Strategy,
    donor           = require('../models/donor'),
    flash           = require('connect-flash');

module.exports = function(passport) {
    
//Local Strategy for Register
passport.use('local-signup', new LocalStrategy({passReqToCallback : true},function(req, username, password, done){
    process.nextTick(function() {
    donor.findOne({ 'local.username':username },function(err,user){
        if (err)
            return done(err);
        if (user){
            console.log("User exists already");
            return done(null, false,req.flash("error", 'This Username is already taken.'));
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
                console.log("hi " + created.name);
                return done(null, newDonor,req.flash("success", "Successfully Signed Up! Welcome " + req.body.username));
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
        //console.log("Wrong Username!");
        return done(null, false, req.flash("error", 'User does not exist.'));
    }
    if (!donor.validPassword(password)){
        //console.log("Wrong Password!");
        return done(null,false, req.flash("error", 'Oops! Wrong password.'));
    } 
    console.log("Logged in Successfully!");
    console.log("Hi  " + donor.name);
    return done(null, donor,req.flash("success", "Successfully Logged In! Welcome " + req.body.username));
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
}
