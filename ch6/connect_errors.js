var connect = require('connect');

function errorHandler(){
  var env = process.env.NODE_ENV || 'development';
  return function(err,req,res,next) {
    res.statusCode = 500;
    switch(env) {
      case 'development':
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        console.log(err);
        break;
      default:
        res.end('Server Error');
        break;
    }
  };
}

connect()
  .use(function hello(req,res){
    foo();
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  })
  //.use(router(require('./router/user')))
  //.use(router(require('./router/blog')))
  //.use(router(require('./router/admin')))
  .use(errorHandler())
  .listen(3000);
