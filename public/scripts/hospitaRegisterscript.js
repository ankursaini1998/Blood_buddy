$(document).ready(function(){
    //check duplicate usernammes
    $("#username").focusout(function() {
        var username=$( "#username" ).val();
        console.log(username);

      if(username!=null)
      $.post( "/home/hospitalUsernameTest", { username: username }, function( data ) {
         // console.log("good hello");
       if(username==data.username)
       {
       alert("user alredy exists");
       $( "#username" ).val("");
       } 
      
     
       }, "json");
    });

    //confirms password..
         $( "#form" ).submit(function( event ) {
             var cpass=$( "#confirmPassword" ).val();
             var pass=$( "#password" ).val();
                 if (cpass != pass  ) 
                 {
                   alert("password do not match");
                   $( "#password" ).val("");
                   $( "#confirmPassword" ).val("");
                  event.preventDefault();
                 }
         });

         //check duplicate email
         $("#email").focusout(function() {

            var email=$( "#email" ).val();
            if(email!=null)
            $.post( "/home/hospitalEmailTest", { email: email }, function( data ) {
             if(email==data.email)
             {
             alert("email alredy rgistered");
             $( "#email" ).val("");
             } 
           
             }, "json");
          });
          $("#phoneNumber").focusout(function() {

            var phoneNumber=$( "#phoneNumber" ).val();
            console.log(phoneNumber);
            if(phoneNumber.length!=10)
            alert("invalid numbers");
            for (let index = 0; index < phoneNumber.length; index++) {
                if(Number.isNaN(phoneNumber[index])==true)
               { 
                   console.log(Number.isNaN(phoneNumber[index]));
                   alert("invalid number");
                   break;
               }
                
            }
        });
});