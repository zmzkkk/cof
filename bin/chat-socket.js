module.exports = function(server){

   
io = require('socket.io').listen(server);
var roomUser = {};
//设置日志级别
io.set('log level', 1); 

//WebSocket连接监听
io.on('connection', function (socket) {

  // 获取用户当前的url，从而截取出房间id
  var url = socket.request.headers.referer;
  var split_arr = url.split('/');
  var roomid = split_arr[split_arr.length-1] || 'index';
  var user = '';

  socket.emit('open');//通知客户端已连接

  // 打印握手信息
  // console.log(socket.handshake);

  // 构造客户端对象
  var client = {
    socket:socket,
    name:false,
    color:getColor()
  }
  socket.on('join', function (username) {
     user = username;
    // 将用户归类到房间
    if (!roomUser[roomid]) {
        roomUser[roomid] = [];
    }
    roomUser[roomid].push(user);
    socket.join(roomid);
    socket.to(roomid).emit('sys', user + '加入了房间');
    socket.emit('sys',user + '加入了房间');
});
  
  // 对message事件的监听
  socket.on('message', function(msg){
      var obj = {time:getTime(),color:client.color};
      obj['text']=msg;
      obj['author']=client.name;
      obj['type']='message';
      console.log(client.name + ' say: ' + msg);

      if (roomUser[roomid].indexOf(user)< 0) {  
        return false;
      }
      socket.to(roomid).emit('new message', msg,user);
      // 广播向其他用户发消息
      socket.broadcast.emit('message',obj);
    });

    //监听出退事件
    socket.on('disconnect', function () {  
        // 从房间名单中移除
        socket.leave(roomid, function (err) {
            if (err) {
                log.error(err);
            } else {
                var index = roomUser[roomid].indexOf(user);
                if (index !== -1) {
                    roomUser[roomid].splice(index, 1);
                    socket.to(roomid).emit('sys',user+'退出了房间');
                } 
            }
        });
    });
});






var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

var getColor=function(){
  var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                'orange','blue','blueviolet','brown','burlywood','cadetblue'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
}



}
