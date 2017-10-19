var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users',function(req,res){
  res.send('hai users');
});

router.post('/user_invite',function(req,res){

  if(req.body.email && req.body.role)   //need to check the persons role
  {
res.send("okk");
  }
  else
  {
    res.send('please mention email and role');
  }

})


module.exports = router;
