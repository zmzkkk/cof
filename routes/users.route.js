var express = require('express');
var router = express.Router();
var config = require(global.includePath+'/config.js');
var http = require('http');
var sha1 = require('sha1');
/* GET users listing. */
router.get('/', function(req, res, next) {
 //console.log(app);
 // console.log(req.query.code);

 res.render('users', { title: '聊天' });
});






















router.get("/login_wx",function(req,res,next){
  // var state = req.query.call_back;
  var redirectUri =  req.fnc.url('users/wx_redirect');
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.weixin.appid+'&redirect_uri='+redirectUri+'&response_type=code&scope=snsapi_base&state='+req.query.call_back+'#wechat_redirect';
  console.log(url);
  res.redirect(301,url);
});

router.get("/wx_redirect",function(req,res,next){
  var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+config.weixin.appid+'&secret='+config.weixin.appScret+'&code='+req.query.code+'&grant_type=authorization_code';
  var call_back = req.query.state;
  state = decodeURIComponent(state);
  http.get(url, function(res){
      res.setEncoding("utf-8");
      var resData = [];
      res.on("data", function(chunk){
          resData.push(chunk);
      })
      .on("end", function(){
          //console.log(resData.join(""));
          resData = resData.join("");
          if(resData.openid){
            //写入mongodb
            var user = require(global.modelPath+"/user.server.model");
            user.find({wx_openid:resData.openid},function(err,doc){
              if(!doc){
                var u = new user({
                  wx_openid:resData.openid,
                  add_time:new Date(),
                });
                u.save(function(err){
                  if(err){
                    console.log(err);
                  }else{
                    resData.user_id = u._id;
                  }
                });
              }
            });
            //成功了，写cookie;
            var time = new Date().getTime();
            var cookieValue = resData.openid+"|"+resData.user_id+'|'+time+"|"+sha1(resData.openid+resData.user_id+time+config.sha1Key);
            res.cookie('wx_user',cookieValue,{maxAge:1000*3600*24*30});
            if(!call_back){
              call_back = '/wx/';
            }
            res.redirect(301,call_back);
          }
      });
  });
});
module.exports = router;
