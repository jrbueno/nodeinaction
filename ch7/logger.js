var connect = require('connect');
var url = require('url');
var fs = require('fs');

var app = connect();

connect.logger.token('query-string', function (req, res) {
  return url.parse(req.url).query;
});

var log = fs.createWriteStream('./logfile.log', { flags: 'a'});

// app.use(connect.logger(':query-string'));
app.use(connect.logger({ format: ':method :url', stream: log, immediate: true }));
//app.use('/error', error);


app.listen(3000);
