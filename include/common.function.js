var config = require(global.includePath+'/config');

var fnc = {
  url:function(path){
    return config.domin+'/'+path;
  }
};

module.exports = function(app){
  app.use(function(req, res, next) {
    req.fnc = fnc;
    next();
  });  
};
