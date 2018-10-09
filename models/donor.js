var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bcrypt                = require('bcrypt-nodejs');

var donorSchema = mongoose.Schema({
        local: 
        {
            username : String,
            password : String,
        },
        name : String,
        email : String,
        confirmPassword : String,
        dob : Date,
        gender : String,
        bloodGroup : String,
        dateOfLastDonation : Date,
        city : String,
        contactNumber : String,
        address : String
});

//Hashing Password
donorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if password is valid
donorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('donor', donorSchema);