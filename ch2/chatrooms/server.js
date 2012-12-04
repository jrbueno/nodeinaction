var http = require('http')
, fs = require('fs')
, path = require('path')
, mime = require('mime')
, cache = {};

function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filepath, fileContents){
  response.writeHead(200, {
	  "content-type": mime.lookup(path.basename(fileContents))
  });
  response.end(fileContents);
}

function serveStatic(response, cache, abspath){
  if(cache[abspath]){
    sendFile(response,abspath,cache[abspath]);
  } else {
    fs.exists(abspath,function(exists){
      if(exists){
        fs.readFile(abspath, function(err,data){
          if(err){
            send404(response);
          } else {
            cache[abspath] = data;
            sendFile(response,abspath,data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, response){
  var filePath = false;
  if(request.url ==  '/'){
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }

  var abspath = './' + filePath;
  serveStatic(response,cache,abspath);
});


server.listen(3000, function(){
  console.log("Server listening on port 3000.");
});
