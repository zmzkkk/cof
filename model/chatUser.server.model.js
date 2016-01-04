/**
 * 聊天室下面有什么用户
 * 
 */
var mongoose = require("../include/mongoose.js");
var Schema = mongoose.Schema;
var chat = require(global.modelPath+"/chat.server.model");

var m = new Schema({
  chat_id:String, //聊天室的objectId
  user_id:String,//用户ID
  number:Number,//第几个加入聊天室的人
  add_time:{type:Date,default:Date.now()},//加入时间

});
m.index({chat_id:1});

m.statics.findMy = function(user_id,cb){
  this.find({user_id:user_id},function(err,doc){
    if(doc){
      var chatIdArr = [];
      for(i in doc){
        chatIdArr.push(doc[i]['chat_id']);
      }
      if(chatIdArr){
        chat.find({'_id':{$in:}},function(err,chatArr){
          if(chatArr){
            for(i in doc){
              for(c in chatArr){
                if(chatArr[c]['_id']==doc[i]['chat_id']){
                  doc[i].chatInfo = chatArr[c]['_id'];
                }
              }
            }
            cb(doc);
          }
        });
      }
    }
  }).limit(100).sort(number:-1);
}

module.exports = mongoose.model('chat_user',m);