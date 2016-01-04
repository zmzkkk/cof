
var mongoose = require('./include/mongoose.js');
var chat = require('./model/chat.server.model.js');


chat.addChat("dfd",[30,30],"test",function(res){
  console.log(res);
});


// console.log(new chat());

// chat.find({loc:[30.011086042504758,30.002965877763927]},function(err,doc){
//   console.log(doc);
// });



// chat.find({'loc':{$geoWithin:{$centerSphere:[[30,30],3/6371]}}},function(err,doc){
//   if(err){
//     console.log(err);
//     process.exit();
//   }else{
//     console.log(doc);
//     process.exit();
//   }
// }).limit(10);


// for(var i=0;i<9999;i++){
//   var l = new chat();  //model 对像
//   var x = 1*Math.random()+30;
//   var y = 1*Math.random()+30;
//   l.loc=[x,y];

//   l.save(function(err){
//     //console.log("save");
//     if(err){
//       console.log(err);
//       process.exit();
//     }else{
//       console.log("success");
//     }
//   });

// }

// setTimeout(function(){process.exit();},1);

// Location.find({},function(err,doc){
//   console.log(doc);
//   process.exit();
// });

console.log("process.exit()");
//process.exit(); 