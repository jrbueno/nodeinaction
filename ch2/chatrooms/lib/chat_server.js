var socketio = require('socket.io')
, guestNumber   = 1
, nickNames     = {}
, namesUsed    = []
, currentRoom   = {};

exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    socket.join('Lobby');
    currentRoom[socket.id] = 'Lobby';
    socket.emit('joinResult', {room: 'Lobby'});
    socket.broadcast.to('Lobby').emit('message', {
      text: 'Welcome!'
    });

    guestNumber = assignGuestName(
      socket,
      guestNumber,
      nickNames,
      namesUsed
    );

    handleMessageBroadcasting(socket,nickNames);
    handleNameChangeAttempts(socket,nickNames,namesUsed);
    handleRoomJoining(socket);

    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.manager.rooms);
    });

    handleClientDisconnection(socket,nickNames,namesUsed);

  });
}

function assignGuestName(socket,guestNumber,nickNames,namesUsed){
  var name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });

  namesUsed.push(name);
  return guestNumber + 1;
}


function handleNameChangeAttempts(socket,nickNames,namesUsed) {
  socket.on('nameAttempt', function(name) {
    if(name.indexOf('Guest') == 0){
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    } else {
      if(namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        namesUsed.push(name);
        nickNames[socket.id] = name;
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' is now known as ' + name + '.'
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use.'
        });
      }
    }
  });
}

function handleMessageBroadcasting(socket,nickNames){
  socket.on('message', function(message){
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  });
}

function handleRoomJoining(socket){
  socket.on('join', function(room){
    socket.leave(currentRoom[socket.id]);
    socket.join(room.newRoom);
    currentRoom[socket.id] = room.newRoom;
    socket.emit('joinResult', {room: room.newRoom });
  });
}

function handleClientDisconnection(socket,nickNames,namesUsed){
  socket.on('disconnect', function(){
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}
