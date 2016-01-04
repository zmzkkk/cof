var config = require(global.includePath+"/config.js");


//判断是否已经有用户 COOKIE ，如果没有的话，就跳到授权页面
var wx_cookie =  function(req,res,next){
  req.tkd=config.tkd;
  var call_back = req.path;
  var userCookie = req.cookies.user_wx;
  if(!userCookie){
    if(req.path.indexOf("/users/")!==0){
      res.redirect(301,'/wx/users/login_wx/?call_back='+call_back);
    }
  }else{
    //验证加密 是否正确 
    var arr = userCookie.split("|");
    //检验时间
    var time = arr[2];
    var nowTime = new Date().getTime();
    if(Math.abs(nowTime-time)<1000*3600*24*30){//小于一个月
      res.cookie('user_wx','');//清空
      res.redirect(301,'/wx/');
    }else{
      var sha = sha1(arr[0]+arr[1]+arr[2]+config.sha1Key);
      if(sha!=arr[3]){
        res.cookie("user_wx",'');
        // res.redirect(301,'/wx/');
        res.redirect(301,'/wx/users/login_wx/?call_back='+call_back);
      }else{
        req.userInfo.user_id = arr[1];
        req.userInfo.wx_openid = arr[0];
      }
    }
  }

  next();
}


module.exports = function(app){

  app.use([wx_cookie]);
  app.use(function(req, res, next) {
    next();
  });

}
