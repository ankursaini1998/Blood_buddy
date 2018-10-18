var express = require("express"),
    router  = express.Router(),
    donor = require("../models/donor"),
    request = require("request");

    router.use(function(req, res, next){
        res.locals.currentUser = req.user;
            next();
    });

// Show edit form
router.get('/',function(req,res){
    res.render('edit',{donor : req.user});
});

//Handling edit logic
router.post('/',function(req,res){
    var updatedDonor = new donor(); 
    updatedDonor.local.username    = req.user.local.username;
    updatedDonor.local.password = updatedDonor.generateHash(req.body.password);
    updatedDonor.name = req.user.name;
    updatedDonor.email = req.body.email;
    updatedDonor.confirmPassword = req.body.confirmPassword;
    updatedDonor.dob = req.body.dob;
    updatedDonor.gender = req.body.gender;
    updatedDonor.bloodGroup = req.body.bloodGroup;
    updatedDonor.dateOfLastDonation = req.body.dateOfLastDonation;
    updatedDonor.city = req.body.city;
    updatedDonor.contactNumber = req.body.contactNumber;
    updatedDonor.address = req.body.address;
    updatedDonor.userType = req.body.userType;
    updatedDonor.activeStatus = req.body.activeStatus;
    updatedDonor._id = req.user._id;
    console.log(req.user,req.user.local.username,updatedDonor,req.user._id);
    
    donor.findByIdAndUpdate(req.user._id,{$set: updatedDonor}, {upsert:true}, function(err, updated){
        if (err) console.log(err);
        //check - console.log(updated);
        req.flash('success','Updated Successfully!');
        res.redirect('/profile');
    });

});

module.exports = router;