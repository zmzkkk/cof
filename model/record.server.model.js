/**
 * 聊天记录集合
 * 有些单聊的保存,用户查看后 删除 
 */
var mongoose = require("../include/mongoose.js");
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    from:String, //发消息的人，
    to:String, //发给某人
    msg:String,//消息内容
    add_time:Date, //消息发送时间
    del_key:String,//可以操作删除的KEY 

});
recordSchema.index({from:1,to:1});


module.exports = mongoose.model('records',recordSchema);