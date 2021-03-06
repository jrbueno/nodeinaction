var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var entries = require('./routes/entries');
var api = require('./routes/api');
var messages = require('./lib/messages');
var Entry = require('./lib/entry');
var user = require('./lib/middleware/user');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'josebueno'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api.auth);
app.use(user);
app.use(messages);

//Routes
app.get('/post', entries.form);
app.post('/post',
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  entries.submit
);
//app.get('/users', users);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/:page?', page(Entry.count, 5), entries.list);

//API Routes
app.get('/api/user/:id', api.user);
app.get('/api/entries/:page?', page(Entry.count), api.entries);
app.post('/api/entry', entries.submit);

if (process.env.ERROR_ROUTE) {
  app.get('/dev/error', function (req, res, next) {
    var err = new Error('database connection failed');
    err.type = 'database';
    next(err);
  });
}

app.use(routes.notFound);
app.use(routes.error);
/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     if(req.remoteUser){
//       res.status(err.status || 500);
//       res.json({
//         message: err.message,
//         stacktrace: err.stack
//       });
//     } else {
//       res.status(err.status || 500);
//       res.render('error', {
//           message: err.message,
//           error: err
//       });
//     }
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   if(req.remoteUser){
//     res.status(err.status || 500);
//     res.json({
//       message: err.message
//     });
//   } else {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
//   }
// });


module.exports = app;
