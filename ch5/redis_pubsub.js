var net = require('net');
var redis = require('redis');

var server = net.createServer( function(socket) {
  var sub, pub;

  socket.on('connect', function(){
    sub = redis.createClient();
    sub.subscribe('main_chat_room');

    sub.on('message', function(channel, message) {
      socket.write('Channel ' + channel + ': ' + message);
    });

    pub = redis.createClient();
  });

  socket.on('data', function(data) {
    pub.publish('main_chat_room', data);
  });

  socket.on('end', function() {
    sub.unsubscribe('main_chat_room');
    sub.end();
    pub.end();
  });
});

server.listen(3000);
