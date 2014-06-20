var basicAuth = require('basic-auth-connect');
var User = require('../lib/user');

//write my own middleware around basic-auth instead of using the deprecated basic-auth-connect pkg
exports.auth = basicAuth(User.authenticate);

exports.user = function (req, res, next) {
  User.get(req.params.id, function (err, user) {
    if(err) return next(err);
    if(!user.id) return res.send(404);
    res.json(user);
  });
};
