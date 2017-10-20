var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var io=require('../bin/www');

var _db=require('./mongo');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users',function(req,res){
  res.render('users',{title:'Express'});
});



router.get('/user_invite',function(req,res){

  if(req.params.email!=="" && req.params.role!=="")   //need to check the persons role
  {
      var transporter = nodemailer.createTransport(smtpTransport({
          service: 'Gmail',
          host: 'smtp.gmail.com',
          port: 465,
          auth: {
              user: 'sampleprogrammers@gmail.com',
              pass: 'sampleprogrammers1.1.'
          }
      }));
      var link="https://www.tutorialspoint.com/mongodb/";
      transporter.sendMail({
          from: "sampleprogrammers@gmail.com",
          subject:"mongodb tutorials" ,
          to: "vignesh.mack03@gmail.com",
          html : "Hello"+"vignesh <br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
      }, function(error, info) {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
          console.log("Mail sent successfully");
      });
   res.send("okk");

  }
  else
  {
    res.send(req.query.email);
  }

});



module.exports = router;
