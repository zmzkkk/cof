var mongoose = require("../include/mongoose.js");
var Schema = mongoose.Schema;

var m = new Schema({
    name:String,
    wx_openid:{type:String},
    add_time:{type:Date,default:Date.now()}
});
m.index({wx_openid:1});


/**
 * 查找用户，如果不存在就插入
 */
m.statics.addUser = function(wx_openid,cb){
  cbRes = {};
  this.find({wx_openid:wx_openid},function(err,doc){
    cbRes['code'] = -1;
    if((doc.length)<=0){//没找到就可以加入
      //集合名
      var db = mongoose.model('user',m);
      var d = new db();
      d.wx_openid=wx_openid;
      d.save(function(err){
        if(!err){
          cbRes['code'] = 1;
        }else{
          console.log(err);
        }
        cb(cbRes);
      });
    }else{
      cb(cbRes);
    }
  });  
}


module.exports = mongoose.model('users',m);