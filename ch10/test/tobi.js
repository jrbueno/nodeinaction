var tobi = require('tobi');
var browser = tobi.createBrowser(3000), '127.0.0.1');

browser.get('/', function (res, $) {
  $('form')
    .fill({description: 'Floss the cat'})
    .submit(function (res, $) {
      $('d:nth-child(3)').text().should.equal('Floss the cat');
    });
});


// var tobi = require('tobi');
// var app = require('./app');
// var browser = tobi.createBrowser(app);
//
// browser.get('/about', function(res, $){
//   res.should.have.status(200);
//   $('div').should.have.one('h1', 'About');
//   app.close();
// });
