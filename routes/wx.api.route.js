var config = require(global.includePath+"/config.js");

var wechat = require('wechat-enterprise');


module.exports = function(app){
  // app.use(connect.cookieParser());
  // app.use(connect.session({secret: config.sha1Key, cookie: {maxAge: 60000}}));
  var wx_config = {
    token: config.weixin.tooken,
    encodingAESKey: config.weixin.EncodingAESKey,
    corpId: config.weixin.appid
  };

  // var obj = wechat.text(function(info, req, res, next){
  //   // if (info.Content === '=') {
  //   //   var exp = req.wxsession.text.join('');
  //   //   req.wxsession.text = '';
  //   //   res.reply(exp);
  //   // } else {
  //   //   req.wxsession.text = req.wxsession.text || [];
  //   //   req.wxsession.text.push(info.Content);
  //   //   res.reply('收到' + info.Content);
  //   // }
  // });

  var obj  = wechat.text(function (info, req, res, next) {
    if(info.Content.toLowerCase()=='h' || info.Content.toLowerCase()=='help' ||info.Content.toLowerCase()=='帮助'){
      var openid = info.FromUserName;
      var commentUrl = req.fnc.url('comment/');
      commentUrl +='?openid='+openid;
      var content = '<p><a href="'+commentUrl+'">点评系统</a></p>'+"\n";
      content +='<p><a href="'+req.fnc.url(''+'?openid='+openid)+'">攻城略地</a></p>';

      res.reply({type: "text", content: content});
    }else{
      res.reply({type: "text", content: '请问有什么可以帮你的，输入help，h，或者帮助可以查看命令'});
    }
  });

  obj  = obj.event(function (info, req, res, next) {
    console.log(info);
  });

  app.use('/api', wechat(wx_config,obj));
}



