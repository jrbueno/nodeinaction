var connect = require('connect');
var server = connect()
var app = require('./expressjs');
server.use(connect.vhost('expressjs.dev', app));
server.listen(3000);
