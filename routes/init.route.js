var config = require(global.includePath+"/config.js");

/*
//判断是否已经有用户 COOKIE ，如果没有的话，就跳到授权页面
var wx_cookie =  function(req,res,next){
  
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
}*/

//从微信 跳过来 WEB 界面 
var wx_user = function(req,res,next){
  // var openid = req.query.openid;
  // console.log(openid);
  next();
}

module.exports = function(app){

//微信 API
require(global.routePath+'/wx.api.route')(app);


//app.use([wx_cookie]);
// app.use([wx_user]);
app.use(function(req, res, next) {
  req.templateData=config.tkd;
  if(req.headers.host.substring(0,3)=='127'){
    req.templateData.baseUrl = '/wx';
  }else{
    req.templateData.baseUrl = '';
  }
  next();
});



app.use('/', require(global.routePath+'/index.route'));
app.use('/users', require(global.routePath+'/users.route'));
app.use('/chat', require(global.routePath+'/chat.route'));

// 点评系统 
app.use('/comment', require(global.routePath+"/comment.route"));

}
