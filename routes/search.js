var express = require("express"),
    router  = express.Router(),
    donor = require("../models/donor"),
    request = require("request");

 
//Show Search page
router.get("/",function(req,res)
{
    res.render("search_donor");
});

//Handle Search Logic
router.post("/",function(req,res)
{
    var donors = [];
    if(req.body.bloodGroup == "0")
    {
        donor.find({"city":req.body.city}).select().exec(function (err, donorList) {
            if (err) 
               return handleError(err); 
            res.render("displayDonor",{ donors:donorList});         
       });
    }
    else 
    {
        donor.find({"city":req.body.city}).where('bloodGroup').equals(req.body.bloodGroup ).select().exec(function (err, donorList) {
            if (err)
                 return handleError(err);
            res.render("displayDonor",{ donors:donorList});  
                  
        });       
    }
});

module.exports = router;