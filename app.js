//Importing modules
var express               = require('express'),
    app                   = express(),
    mongoose              = require('mongoose'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    LocalStrategy         = require("passport-local").Strategy,
    session               = require("express-session"),
    donor                 = require('./models/donor.js'),
    flash                 = require('connect-flash'),
    methodOverride        = require("method-override"),
    middleware            = require('./middleware/index');

//Requiring routes
var authRoutes    = require("./routes/auth"),
    editRoutes    = require("./routes/edit"),
    searchRoutes  = require("./routes/search");
 
//Connecting database
mongoose.connect('mongodb://bloob_buddy:blood123@ds223653.mlab.com:23653/blood_buddy', {useNewUrlParser: true});

//Configuration
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(require("express-session")({
    secret : "secret page",
    resave : false,
    saveUninitialized : false
}));
app.use(methodOverride('_method'));
//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
    });


app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/edit", editRoutes);



//ROUTES
app.get('/',function(req,res){
    res.render('home');
});

app.get('/home',function(req,res){
    res.render('home');
});

app.get('/profile',middleware.isLoggedIn,function(req,res){
    res.render('profile',{donor : req.user});
});

app.listen('8080',function(){
    console.log('Server Started');
});
