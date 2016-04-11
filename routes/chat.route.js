var express = require('express');
var router = express.Router();
var chat = require(global.modelPath+'/chat.server.model.js');
var chatUser = require(global.modelPath+"/chatUser.server.model");

router.get('/', function(req, res, next) {
  res.end("df");
});

/**
 * 查找这个点有没有被人占用
 */
router.get('/info', function(req, res) {
  var r = {};
  var pois = JSON.parse(req.query.pois);

  r.code = -1;
  if(pois.point.lng){
    chat.find({loc:[pois.point.lng,pois.point.lat]},function(err,doc){
      if(doc){
        r.code = 1;
        r.chatInfo = doc; 
      }
    });
  }
  res.jsonp(r);
});

/**
 * 我的聊天室
 * 我创建的，和我加入的
 */
router.get('/list',function(req,res){
  chatUser.findMy(req.userInfo.user_id,function(doc){
    if(!doc){
      doc = [];
    }
    res.json(doc);
  });
});

/**
 * 抢占聊天室
 */
router.get('/add',function(req,res){
  chat.addChat(req.userInfo.user_id,req.query.loc,req.query.name,function(cbRes){
    res.json(cbRes);
  });
});



module.exports = router;
