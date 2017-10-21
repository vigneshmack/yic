var  m=require('mongodb');

var url="mongodb://yic:alwaysforward1.@ds040837.mlab.com:40837/yic"; //keep it safe

module.exports=function()
{
var mc=m.MongoClient;


var _db;


mc.connect(url,function(err,db){
    if(err)
    {
        console.log(err);
    }
    else
    {
        _db=db;
        console.log("DB connected");

    }
}
);
return _db;
};
