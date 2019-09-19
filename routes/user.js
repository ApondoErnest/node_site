//send us message
exports.messageus = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.yourname;
      var email= post.youremail;
      var text= post.yourtext;
      //var lname= post.last_name;
     // var mob= post.mob_no;

      var sql = "INSERT INTO `messages`(`name`,`email`,`words`) VALUES ('" + name + "','" + email + "','" + text + "')";

      var query = db.query(sql, function(err, result) {

         message = "Your Message has been sent! Wait for soonest reply";
         res.render('index.ejs',{message: message});
      });

   } else {
      res.render('index.ejs');
   }
};

//contact for transaction
exports.contactform = function(req, res){
   message = '' ;
   if(req.method == "POST"){
      var post = req.body;
      var fname= post.firstname;
      var lname= post.lastname;
      var uemail= post.email;
      var phone_n= post.phone;
      //var files= post.document;
      var text= post.message;
     // console.log(text);
       var sql = "INSERT INTO `command`(`first_name`, `last_name`,`user_email`, `mob_no`, `message`) VALUES ('" + fname + "','" + lname + "', '" + uemail + "', '" + phone_n + "', '" + text + "')";
       var query = db.query(sql, function(err, result) {

         message = "Your Message has been sent! Wait for soonest reply";
         res.render('contactform.ejs',{message: message});
      });
   }else {
      res.render('contactform.ejs');
   }
};

//deliver shop page
exports.shop = function(req, res){
   message = '' ;
   res.render('shop.ejs',{message: message});
}

//deliver about page
exports.about = function(req, res){
   message = '' ;
   res.render('about.ejs', {message: message});
}; 

//deliver contact_us page
exports.contact = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.yourname;
      var email= post.youremail;
      var mob = post.number;
      var text= post.subject;
      var msge = post.message;
      //var lname= post.last_name;
     // var mob= post.mob_no;
     // console.log(name);
      var sql = "INSERT INTO `contacts`(`name`,`email`,`phone`, `subject`, `message`) VALUES ('" + name + "','" + email + "', '" + mob+ "','" + text + "','" + msge + "')";

      var query = db.query(sql, function(err, result) {

         message = "Your Message has been sent! Wait for soonest reply";
         res.render('contact.ejs',{message: message});
      });

   }else{
   res.render('contact.ejs', {message: message});
}
}; 

//momo module

exports.momo = function(req, res){
   message = '' ;
   res.render('momo.ejs', {message: message});
};
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, name, email, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('login',{message: message});
   }
  // res.render('login.ejs',{message: message});        
};
//-----------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var email= post.your_email;
      var mob= post.mob_no;

      var sql = "INSERT INTO `users`(`name`,`email`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + email + "','" + mob + "','" + name + "','" + pass + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created. Login to your account!";
         res.render('signup.ejs',{message: message});
      });

   }else{
      res.render('signup.ejs', {message: message});
   }
}
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};

