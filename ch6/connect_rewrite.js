var connect = require('connect'),
    url = require('url');

var app = connect();

var path = url.parse(req.url).pathname;

function findPostIdBySlug(match, cb){
  console.log(match);
  cb(null, 1);
};

function rewrite(req, res, next){
  var match = path.match(/^\/blog\/posts\/(.+)/);
  if(match) {
    findPostIdBySlug(match[1], function(err, id){
      if(err) return next(err);
      if(!id) return next(new Error('User not Found!'));
      req.url = '/blog/posts/' + id;
      next();
    });
  } else { next(); }
};

app.use(rewrite).use(showPost).listen(3000);
