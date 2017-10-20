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



router.post('/user_invite',function(req,res){

  if(req.body.email!=="" && req.body.role!=="")   //need to check the persons role
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
      var link="http://yic3.herokuapp.com/";
      transporter.sendMail({
          from: "sampleprogrammers@gmail.com",
          subject:"Invitation for YIC" ,
          to: req.body.email,
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
          console.log('Message %s sent: %s', info.messageId, info.response);
          console.log("Mail sent successfully");
      });
      res.send("okay");
  }
  else
  {
    res.send(req.query.email);
  }

});



module.exports = router;
