var connect = require('connect');

var app = connect();

app.use(connect.static('public'));

app.listen(3000);
