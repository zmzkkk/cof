var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var user = require(global.modelPath+"/user.server.model");


router.get('/', function(req, res, next) {
  var openid = req.query.openid;
  req.session.id = openid;
  req.session.openid = openid;
  //var u = new user();
  //查询数据库，确定有没有用户，如果没有的话，就写入新的
  if(openid){
    user.addUser(openid,function(result){
    	if(result.code==1){
    		
    	}
    	res.redirect(301,req.fnc.url('index'));
    })
  }else{
    next();
  }
});

router.get('/index', function(req, res, next) {
	// console.log(req.query);
	
        
 //  var signature = req.query.signature;
 //  var timestamp = req.query.timestamp;
 //  var nonce = req.query.nonce;
    		
	// var token = 'zmzmingfengliaotian';
	// var  tmpArr = [token, timestamp, nonce];
 //    // use SORT_STRING rule
	// tmpArr.sort();
	// tmpStr = tmpArr.join("");
	// tmpStr = sha1( tmpStr );
	
	// if( tmpStr == signature ){
	// 	res.send(req.query.echostr);
	// }else{
	// 	res.send("error");
	// }	
	// res.send(sha1("ddd"));
	//  next();

	//res.send({ddsd:"fsfsd"});

	//console.log(req.cookies)

	//获取用户信息
	var data = req.templateData;
	res.render('index', data);
});

module.exports = router;
