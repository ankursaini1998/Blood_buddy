var express = require("express"),
    router  = express.Router(),
    hospital = require("../models/hospital"),
    request = require("request");

    router.use(function(req, res, next){
        res.locals.currentUser = req.user;
            next();
    });

// Show edit form
router.get('/',function(req,res){
    res.render('editHospital',{hospital : req.user});
});

//Handling edit logic
router.post('/',function(req,res){
    var updatedHospital = new hospital(); 
    updatedHospital.local.username    = req.user.local.username;
    updatedHospital.local.password = updatedHospital.generateHash(req.body.password);
    updatedHospital.name = req.user.name;
    updatedHospital.email = req.body.email;
    updatedHospital.confirmPassword = req.body.confirmPassword;
    updatedHospital.city = req.body.city;
    updatedHospital.contactNumber = req.body.contactNumber;
    updatedHospital.address = req.body.address;
    updatedHospital.userType = req.body.userType;
    updatedHospital._id = req.user._id;
    console.log(req.user,req.user.local.username,updatedHospital,req.user._id);
    
    hospital.findByIdAndUpdate(req.user._id,{$set: updatedHospital}, {upsert:true}, function(err, updated){
        if (err) console.log(err);
        //check - console.log(updated);
        req.flash('success','Updated Successfully!');
        res.redirect('/profileHospital');
    });

});

module.exports = router;