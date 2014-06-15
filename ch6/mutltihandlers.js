var connect = require('connect');


function hello(req,res,next) {
  if(req.url.match(/^\/hello/)) {
    res.end('Hello World\n');
  } else {
    next();
  }
};

var db = {
  users: [
    { name: 'tobi'},
    { name: 'loki'},
    { name: 'jane'}
  ]
};

function users(req, res, next) {
  var match = req.url.match(/^\/user\/(.+)/);
  if (match) {
    var user =  db.users[match[1]];
    if(user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      var err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
};

function pets(req, res, next) {
  if(req.url.match(/^\/pets\/(.+)/)) {
    foo();
  } else { next(); }
};

function errorHandler(err, req ,res, next) {
  console.log(err.stack);
  res.setHeader('Content-Type', 'application/json');
  if(err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'internal server error'}));
  }
};

function errorPage(err, req, res, next) {
  console.log(err.stack);
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Internal Application Error');
};

var api = connect()
  .use(users)
  .use(pets)
  .use(errorHandler);

var app = connect()
  .use(hello)
  .use('/api', api)
  .use(errorPage)
  .listen(3000);
