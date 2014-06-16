var connect = require('connect');
var app = connect();

////Cookies (unsigned and signed)
// app.use(connect.cookieParser('josebueno'))
// app.use(function (req,res) {
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.end('hello\n');
//
// }).listen(3000);


// outgoing cookies
app.use(function (req,res) {
  res.setHeader('Set-Cookie', 'foo=bar');
  res.setHeader('Set-Cookie', 'tobi=ferret; Expires=Tues, 17 Jun 2014 10:00 GMT');
  res.end();
}).listen(3000);
