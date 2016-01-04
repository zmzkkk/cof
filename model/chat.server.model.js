/**
 * 聊天室 集合
 * @type {[type]}
 */
var mongoose = require("../include/mongoose.js");
var Schema = mongoose.Schema;

var m = new Schema({
    name:String,
    loc:[Number,Number],
    user_id:{type:String,default:0},  //聊天室 所属于用户
    add_time:Date, 
    people:{type:Number,default:1}, //人数
    level:{type:Number,default:1},  //等级
    max_people:{type:Number,default:500}, //最大人数

});
//索引
m.index({loc: "2dsphere",user_id:1}, {unique: true});

/**
 * 抢占一个 聊天室
 */
m.statics.addChat = function(user_id,loc,name,cb){
  cbRes = {};
  this.find({loc:loc},function(err,doc){
    cbRes['code'] = -1;
    if((doc.length)<=0){//没找到就可以加入
      //集合名
      console.log("dddd");
      var db = mongoose.model('chats',m);
      var d = new db();
      d.name=name;
      d.loc=loc;
      d.user_id = user_id;
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



//导出
module.exports = mongoose.model('chats',m);