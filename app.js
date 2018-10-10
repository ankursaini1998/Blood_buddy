//Importing modules
var express               = require('express'),
    app                   = express(),
    mongoose              = require('mongoose'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    LocalStrategy         = require("passport-local").Strategy,
    cookieParser          = require("cookie-parser"),
    session               = require('express-session'),
    flash                 = require('connect-flash'),
    donor                 = require('./models/donor.js'),
    middleware            = require('./middleware/index');
    require('./config/passport')(passport);

//Requiring routes
var authRoutes    = require("./routes/auth"),
    editRoutes    = require("./routes/edit"),
    searchRoutes  = require("./routes/search");
 
//Connecting database
mongoose.connect('mongodb://bloob_buddy:blood123@ds223653.mlab.com:23653/blood_buddy', {useNewUrlParser: true});

//Configuration
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false})); 
app.use(cookieParser());
app.use(session({
    secret: 'asecretmessage',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
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
