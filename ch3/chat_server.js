var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
	var welcome = "Welcome " + id
							+ ' Guests Online: ' + this.listeners('broadcast').length;
	client.write(welcome + '\n');

	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {
		if(id != senderId) {
			this.clients[id].write(message);
		}
	};
	this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
		this.removeListener('broadcast', this.subscriptions[id]);
		this.emit('broadcast', id, id + ' has left the chat.\n');
});

channel.on('shutdown', function() {
		this.emit('broadcast', '', 'Chat has shut down.\n');
		this.removeAllListeners('broadcast');
});

channel.setMaxListeners(50);

var server = net.createServer(function(client) {
	var id = client.remoteAddress + ':' + client.remotePort;

	// book says to use this code but the event won't fire as its in the past.
	// Omit code and let the creation of the server fire the join

	//client.on('connect', function() {
	//	console.log("trying to emit join");
		channel.emit('join', id, client);
	//});

	client.on('data', function(data) {
		data = data.toString();
		if(data == 'shutdown\r\n')
		{
			channel.emit('shutdown');
		}
		channel.emit('broadcast', id, data);
	});
	
	client.on('close', function() {
		channel.emit('leave', id);
	});
});

server.listen(8888);
