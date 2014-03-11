var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
	console.log("Welcome " + id);
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {
		if(id != senderId) {
			this.clients[id].write(message);
		}
	};
	this.on('broadcast', this.subscriptions[id]);
});

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
		channel.emit('broadcast', id, data);
	});
});

server.listen(8888);
