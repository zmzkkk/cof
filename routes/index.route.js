var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
router.get('/', function(req, res, next) {
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
	res.render('index', req.tkd);
});

module.exports = router;
