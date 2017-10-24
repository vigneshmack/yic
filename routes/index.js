var express = require('express');
var router = express.Router();
var session = require("express-session");
router.use(session({
    secret: 'yicauthprivate',
    cookie:{maxAge:60*60*24*1000},
    resave: false,
    saveUninitialized: false
}));
var io=require('../bin/www');

//var _db=require('./mongo');

var id=require('idgen');



var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var  m=require('mongodb');

var url="mongodb://yic:alwaysforward1.@ds040837.mlab.com:40837/yic"; //keep it safe

var mc=m.MongoClient;
var _db;


mc.connect(url,function(err,db){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("DB connected");
        _db=db;
    }
});







function send_invite(email,url)                                     //sending email invite
{
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'yic.jci3.1@gmail.com',
            pass: 'alwaysforward1.'
        }
    }));
    var link="http://yic3.herokuapp.com/signup_autho?email="+email+"&id="+url;
    transporter.sendMail({
        from: "yic.jci3.1@gmail.com",
        subject:"Invitation for YIC" ,
        to: email,
        html : "<!DOCTYPE HTML>\n" +
        "<html>\n" +
        "    <head>\n" +
        "    </head>\n" +
        "    <body style=\"padding:5px;margin:1px;\">\n" +
        "        <div style=\"background-color: aliceblue;\">\n" +
        "        <div style=\"background-color: aliceblue;width:98%;height:100%;padding:10px\">\n" +
        "            <center>\n" +
        "                <img src=\"http://yic3.herokuapp.com/assets/images/logo-yic.png\" style=\"width:70px;height:40px\"/>\n" +
        "                <p><strong>Young Innovators Club</strong></p>\n" +
        "            </center>\n" +
        "        </div>\n" +
        "        <div style=\"background-color:aliceblue;font-family: 'Open Sans', sans-serif;\">\n" +
        "            <p style=\"margin-left:2%\">Dear Invitee,</p>\n" +
        "            <p style=\"margin-left:5%;margin-right:5%\">Young Innovators Club (YIC) are pleased to invite you to join our club as a member. With YIC membership you would get access to all the projects and initiatives currently in progress at YIC. Additionally, registering yourself with YIC will enable you to further gain access to discuss with mentors and receive their guidance and also allow you to post blogs and forum replies.</p>\n" +
        "        </div>\n" +
        "        <div style=\"background-color:aliceblue;width:98%;height:100%;padding:10px\">\n" +
        "            <center><a href=\""+link+"\" style=\"font-family: 'PT Sans', sans-serif;display:inline-block;padding:10px 20px;background-color:deepskyblue;text-decoration: none;color:aliceblue\">Accept Invitation</a></center>\n" +
        "        </div>\n" +
        "        <div style=\"background-color:aliceblue;width:98%;height:100%;padding:10px;font-family: 'Open Sans Condensed', sans-serif;\">\n" +
        "            <center><p>That’s it – you’re all set! If you have any questions or concerns, reach out to the YIC Support Team by emailing yic.jci3.1@gmail.com </p></center>\n" +
        "        </div>\n" +
        "        </div>\n" +
        "    </body>\n" +
        "</html>"
    }, function(error, info) {
        if (error) {
            return console.log(error);
        }
        else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            console.log("Mail sent successfully");

        }
        });




}

var yic_id=function()
{

    var collect= _db.collection("yic_details");
    collect.find({_id:"yic101"}).forEach(function(x)
    {
       var count=x.yic_members;
    });
    var date=new Date();
    var year=date.getFullYear().toString();
    var digit=year.substring(2,4);
    var nodigits=count.toString().length();
    var userid=""
    if(nodigits===1)
    {
         userid=digit+"YIC"+"000"+count++;
    }
    else if(nodigits===2)
    {
         userid=digit+"YIC"+"00"+count++;
    }
    else if(nodigits===3)
    {
         userid=digit+"YIC"+"0"+count++;
    }
    else
    {
        userid=digit+"YIC"+count++;
    }

//    count++;

    //var h=_db.collection("yic_details");
    //h.updateOne({_id:"yic101"},{$set:{yic_members:count}});


return userid;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YIC' });
});

router.get('/users',function(req,res){
  res.render('users',{title:'YIC'});
});


router.post('/user_invite',function(req,res){
                                                  //need to check the session
  //if(req.body.email!=="" && req.body.role!=="")   //need to check the persons role
  //{
      var gid = id(15);
var yicid=yic_id();
      var h=_db.collection('email');

      var cursor=h.find({_id:req.body.email});

      cursor.count(function (err,c){
         if(err){
             console.log(err);
         }
           else
         {
             if(c==1)
             {
                 res.send("user already invited");
             }
             else
             {
               var data={
                     _id:req.body.email,
                     id:gid,
                   name:req.body.name,
                     role:req.body.role,
                   up:"n",
                   yic_id:yicid
                 };
                 var h=_db.collection('email');
                 h.insertOne(data,function(err){
                     if(err)
                     {
                         console.log(err);
                     }
                     else
                     {
                         console.log("user invited:"+req.body.email+" id:"+gid);
                    send_invite(req.body.email,gid);
                     }
                 });
             }
         }
  });

  //}
  //else
  //{

  //}
    });


router.get('/signup_autho',function(req,res){

    if(req.query.id!==undefined) {
        var h = _db.collection("email");
         var cursor=h.find({_id: req.query.email,id:req.query.id});
          cursor.count(function(err,c){
              if(err)
              {
                  console.log(err)
              }
              else
              {
                  if(c==1)
                  {
                      var h=_db.collection("email");
                      h.find({_id:req.query.email}).forEach(function(x){
                          if(x.up==="n")
                          {
                              var ses=req.session;
                              ses.user_valid="y";

                              console.log("user visited "+req.query.email);
                            /*  var h=_db.collection("email");
                              var role="";
                              h.find({_id:req.query.email,id:req.query.id}).forEach(function(x){
                                  role=x.role;
                              });*/

                            //  res.redirect("/signup?id="+req.query.id);  //email="+req.query.email+"&role="+role);
                                res.render("signup",{id:req.query.id});

                          }
                      else
                          {
                              res.send("Invalid credential access :(");
                          }
                      })
                                        }
                  else
                      res.send("Invalid credential access :(");
              }
          });
    }

});

router.get("/signup",function(req,res) {
    var ses=req.session;


    if(ses.user_valid==="y")
    {

res.render("signup");
    }
    else
    {
        res.send("Invalid signup");
    }


})

router.post('/signup_user',function(req,res){
    var ses=req.session;
    if(ses.user_valid==="y")
    {

        var h=_db.collection("email");
        console.log(req.body.id);
        var email='';
        h.find({id:req.body.id}).forEach(function(x){
            console.log("check");
         email=x.email;
         name=x.name;
         role=x.role;
        });



        var data={

            email:email,
            name:name,
            role:role,
            password:req.body.password
        };


         h=_db.collection("users");

        h.insertOne(data);

        h=_db.collection('email');
     h.updateOne({_id:email},{$set:{up:"y"}});

    res.send("success");
    }
});

router.post('/login',function(req,res)
{
    ses.alive=0;
    var password=req.body.password;
    var collection2= _db.collection("email");
    collection2.find({_id:req.body.email},function(err,ok)
    {
        if(ok)
        {

            ses.alive=1;
            res.render('dashboard');
        }
        else
        {
            console.log("go to loginpage");
            res.render('index');
        }
    });
});

//added by bv
router.get('/home',function(req,res)
{
    res.render("home",{title:'YIC'});
});
router.get('/dashboard',function (req,res)
{
   res.render("dashboard",{title:'YIC'});
});
router.get('/projects',function (req,res)
{
    res.render("projects",{title:'YIC'});
});
router.get('/events',function (req,res)
{
    res.render("events",{title:'YIC'});
});
router.get('/collages',function (req,res)
{
    res.render("collages",{title:'YIC'});
});

router.get('/settings',function (req,res)
{
    res.render("settings",{title:'YIC'});
});

router.get('/profile',function (req,res)
{
    res.render("profile",{title:'YIC',profile_name:"vignesh baskar"});
});

module.exports = router;
