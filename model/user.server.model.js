var mongoose = require("../include/mongoose.js");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    wx_openid:{type:String},
    add_time:{type:Date,default:Date.now()},

});
userSchema.index({wx_openid:1},unique:true);
module.exports = mongoose.model('user',userSchema);