var config = require("../include/config.js");

var webot = require(global.includePath+'/weixin.js');


module.exports = function(app){

webot.set('hi', "Hi, I'm Webot.");

webot.set('subscribe', {
  pattern: function(info) {
    return info.event === 'subscribe';
  },
  handler: function(info) {
    return 'Thank you for subscribe.';
  }
});
}
