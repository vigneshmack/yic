var express = require('express');
var router = express.Router();
var io=require('../bin/www');

var _db=require('./mongo');

var support=require('./support');





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users',function(req,res){
  res.render('users',{title:'Express'});
});



router.post('/user_invite',function(req,res){
                                                      //need to check the session
  if(req.body.email!=="" && req.body.role!=="")   //need to check the persons role
  {
      support.email_invite();
      res.send("okay");
  }
  else
  {
    res.send(req.query.email);
  }

});



module.exports = router;
