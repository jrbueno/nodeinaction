var connect = require('connect');

var app = connect();

app.use(connect.query());
app.use(function (req, res, next) {
  //res.setHeader('Content-Type', 'application/json');
  console.log(JSON.stringify(req.query));
}).listen(3000);
