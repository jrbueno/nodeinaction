// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;

exports.notFound = function (req, res) {
  res.status(404).format({
    html: function () {
      res.render('404');
    },
    json: function () {
      res.send({ message: 'Resource not found' });
    },
    xml: function () {
      res.write('<error>\n');
      res.write('  <message>Resource not found</message>\n');
      res.end('</error>\n');
    },
    text: function () {
      res.send('Resource not Found!\n');
    }
  });
};

exports.error = function (err, req, res, next) {
  console.log(err.stack);
  var msg;

  switch (err.type) {
    case 'database':
      msg = 'Server Unavailable';
      res.statusCode = 503;
      break;
    default:
      msg = 'Internal Server Error';
      res.statusCode = 500;
  }
  res.format({
    html: function () {
      res.render('5xx', { msg: msg, status: res.statusCode });
    },
    json: function () {
      res.send({ error: msg });
    },
    text: function () {
      res.send(msg + '\n');
    }
  });
};
