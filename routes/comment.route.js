var express = require('express');
var router = express.Router();
var config = require(global.includePath+"/config");

var wechatApi = require('wechat-api');

var wxApi = new wechatApi(config.weixin.appid, config.weixin.appScret);


// router.get('/*',function(req, res, next){

//   next();
// });

router.get('/', function(req, res, next) {
  var openid = req.query.openid;
  req.session.id = openid;
  req.session.openid = openid;
  //查询数据库，确定有没有用户，如果没有的话，就写入新的
  res.redirect(301,req.fnc.url('comment/index'));
});

router.get('/index',function(req,res,next){
  req.tkd.title = '点';
  req.templateData = req.tkd;  
 var param = {
   debug: true,
   jsApiList: ['getLocation'],
   url: req.fnc.url('comment/index'),
  };
  console.log(param);

  wxApi.getJsConfig(param, function(err,result){
    if(!err){
      req.templateData.wxJsConfig = result;
      // templateData.wxJsConfig
      console.log(result);
      console.log(req.templateData.wxJsConfig);
      console.log(wxApi);
      res.render('comment_index',req.templateData);
    }else{
      console.log(err);
    }

  });

  // console.log("ddd");
  
});

/**
 * 添加评论
 */
router.get('/add',function(req,res,next){
  
});




module.exports = router;
