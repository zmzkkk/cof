var config = require(global.includePath+'/config');
var sha1 = require('sha1');
var fnc = {
  url:function(path){
    return config.domin+'/'+path;
  },
  //len  不能大于 160
  randStr:function(len){
    var str = sha1(new Date().getTime());
    str = str.substr(parseInt(Math.random()*(160-len)),len);
    str = sha1(str);
    str = str.substr(parseInt(Math.random()*160-len),len);
    return str;
  }
};

module.exports = function(app){
  app.use(function(req, res, next) {
    req.fnc = fnc;
    next();
  });  
};
