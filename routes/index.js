var express = require('express');
var router = express.Router();
var io=require('../bin/www');

var _db=require('./mongo');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users',function(req,res){
  res.send('hai users');
});



router.get('/user_invite',function(req,res){

  if(req.params.email!=="" && req.params.role!=="")   //need to check the persons role
  {

res.send("okk");

  }
  else
  {
    res.send(req.query.email);
  }

})



module.exports = router;
