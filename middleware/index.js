

module.exports = 
{
    isLoggedIn : function(req, res, next){
        if (req.isAuthenticated())
            return next();
        console.log("Log In First");
        res.redirect('/home');
    }
};