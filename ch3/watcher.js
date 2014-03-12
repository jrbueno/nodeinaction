function Watcher(watchDir, processDir) {
	this.watchDir = watchDir;
	this.processDir = processDir;
}

var events = require('events'),
		util = require('util');

// Make Watcher Class inherit from EventEmitter
util.inherits(Watcher, events.EventEmitter);


var fs = require('fs'),
		watchDir = './watch',
		processDir = './done';

Watcher.prototype.watch = function() {
	var watcher = this;
	fs.readdir(this.watchDir, function(err, files) {
		if (err) throw err;
		for(var index in files)  {
			watcher.emit('process', files[index]);
		}
	})
}

Watcher.prototype.start = function() {
	var watcher = this;
	fs.watchFile(watchDir, function() {
		watcher.watch();
	})
}


var w = new Watcher(watchDir, processDir);

w.on('process', function process(file) {
	console.log('processing: ' + file);
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processDir + '/' + file.toLowerCase();
	
	fs.rename(watchFile, processedFile, function(err) {
		if(err) throw err;
	});
});

w.start();
