var express = require('express');
var router = express.Router();
var chat = require(global.modelPath+'/chat.server.model.js');
var chatUser = require(global.modelPath+"/chatUser.server.model.js");

router.get('/', function(req, res, next) {

});

/**
 * 查找这个点有没有被人占用
 */
router.get('/info', function(req, res) {
  var x = req.query.x;
  var y = req.query.y;
  res = {};
  res.code = -1;
  if(x && y){
    chat.find({loc:[x,y]},function(err,doc){
      if(doc){
        //找到了，
        res.code = 1;
        res.data = doc; 
      }
    });
  }
  res.json(res);
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
foute.get('/add',function(req,res){
  chat.addChat(req.userInfo.user_id,req.query.loc,req.query.name,function(cbRes){
    res.json(cbRes);
  });
});



module.exports = router;
