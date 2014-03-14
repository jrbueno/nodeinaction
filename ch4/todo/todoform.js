var http = require('http');
var url = require('url');
var items = [];

function show(res) {
	var html = '<html><head><title>Todo List</title></head><body>'
					+ '<h1>Todo List</h1>'
					+ '<ul>'
					+ items.map(function(item) {
							return '<li>' + item + '</li>'
						}).join('')
					+ '</ul>'
					+ '<form method="post" action="/">'
					+ '<p><input type="text" name="item" /></p>'
					+ '<p><input type="submit" value="Add Item" /></p>'
					+ '</form></body></html>';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}

function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Not Found');
}

function badRequest(req, res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bad Request');
}

var qs = require('querystring');
function add(req, res) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk) { body += chunk });
	req.on('end', function() {
		var obj = qs.parse(body);
		items.push(obj.item);
		show(res);
	});
}

function remove(req, res) {
	var path = url.parse(req.url).pathname;
	var index = parseInt(path.slice(1), 10);
  if(isNaN(index)) {
		res.statusCode = 400;
    res.end('Invalid item id');
  } else if (!items[index]) {
    res.statusCode = 404;
    res.end('Item not found');
  } else {
    items.splice(index,1);
    res.end('OK\n');
	}
}

var server = http.createServer(function(req, res) {
	if('/' == req.url) {
		switch (req.method) {
			case 'GET':
				show(res);
				break;
			case 'POST':
				add(req, res);
				break;
			case 'DELETE':
				del(req,res);
				break;
			default:
				badRequest(res);
		}
	} else {
		notFound(res);
	}
});

server.listen(3000);

