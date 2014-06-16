var connect = require('connect');

var app = connect();

app.use(connect.bodyParser());


// app.use(function (req,res) {
//   res.end('Registered new user: ' + req.body.username);
// }).listen(3000);


app.use(function (req, res) {
  console.log(req.body);
  console.log(req.files);
  res.end('Thanks');
}).listen(3000);
