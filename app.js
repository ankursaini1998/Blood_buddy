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
    hospital              = require('./models/hospital.js'),
    middleware            = require('./middleware/index');
    require('./config/passport')(passport);

//Requiring routes
var authRoutes    = require("./routes/auth"),
    editRoutes    = require("./routes/edit"),
    searchRoutes  = require("./routes/search"),
    searchHospRoutes  = require("./routes/searchHospital"),
    editHospRoutes= require("./routes/editHospital");
 
//Connecting database
 mongoose.connect('mongodb://bloob_buddy:blood123@ds223653.mlab.com:23653/blood_buddy', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/blood', {useNewUrlParser: true});


//Configuration
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false})); 
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
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
app.use("/searchHospital", searchHospRoutes);
app.use("/editHospital", editHospRoutes);
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
app.get('/profileFacebook',function(req,res){
    res.render('profileFacebook',{donor : req.user});
});
app.get('/profileHospital',middleware.isLoggedIn,function(req,res){
    console.log("hosp login");
    res.render('profileHospital',{hospital : req.user});
});

app.post("/home/usernameTest",function(req,res){
    var query= donor.findOne({"local.username":req.body.username});
 query.select("local.username");
 query.exec(function (err, person) {
   if (err) return handleError(err);     
   if(person ==null)
   res.send({"username":"-1"});
   else res.send({"username":person.local.username});
});
});


app.post("/home/emailTest",function(req,res){
  var query= donor.findOne({"email":req.body.email});
query.select("email");
query.exec(function (err, person) {
 if (err) return handleError(err);     
 if(person ==null)
 res.send({"email":"-1"});
 else res.send({"email":person.email});
});
});


app.post("/home/hospitalUsernameTest",function(req,res){
    var query= hospital.findOne({"local.username":req.body.username});
    console.log(req.body.username);
 query.select("local.username");
 query.exec(function (err, person) {
   if (err) return handleError(err);     
   if(person ==null)
   res.send({"username":"-1"});
   else res.send({"username":person.local.username});
});
});


app.post("/home/hospitalEmailTest",function(req,res){
  var query= hospital.findOne({"email":req.body.email});
query.select("email");
query.exec(function (err, person) {
 if (err) return handleError(err);     
 if(person ==null)
 res.send({"email":"-1"});
 else res.send({"email":person.email});
});
});

app.listen('8080',function(){
    console.log('Server Started');
});
