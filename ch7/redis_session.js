var connect = require('connect'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session);

var app = connect();

app.use(connect.favicon());
app.use(connect.cookieParser('keyboard cat'));
app.use(connect.session({ store: new RedisStore({ prefix: 'sid'})}));
app.use(function(req, res, next){
  var sess = req.session;
  if(sess.views) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.write('<p>httpOnly: ' + sess.cookie.httpOnly + '</p>');
    res.write('<p>path: ' + sess.cookie.path + '</p>');
    res.write('<p>domain: ' + sess.cookie.domain + '</p>');
    res.write('<p>secure: ' + sess.cookie.secure + '</p>');
    sess.views++;
    res.end();
  } else {
    sess.views = 1;
    res.end('Welcome to the session demo. Refresh!');
  }
});

app.listen(3000);

