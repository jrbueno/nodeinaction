var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile () {
  fs.exists(configFilename, function(exists) {
    if(!exists)
      return next(new Error('Missing RSS File: ' + configFilename));
    next(null, configFilename);
  });
}

function readRSSFile (configFilename) {
  fs.readFile(configFilename, function(err, feedlist) {
    if(err) return next(err);

    feedlist = feedlist
                .toString()
                .replace(/^\s+|\s+$/g, '')
                .split('\n');
    var random = Math.floor(Math.random() * feedlist.length);
    next(null, feedlist[random]);
  });
}

function downloadRSSFeed (feedurl) {
  request({uri: feedurl}, function(err, res, body) {
    if(err) return next(err);
    if(res.statusCode != 200)
      return next(new Error('Abnormal response status code: ' + statuscode.toString()));

    next(null, body);
  });
}

function parseRSSFeed (rss) {
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  if(!handler.dom.items.length)
    return next(new Error('no RSS items found'));

  var item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

// Serial Array to control flow of task execution
var tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
];

function next(err, result) {
  if(err) throw err;

  var currentTask = tasks.shift();

  if(currentTask) {
    currentTask(result);
  }
}

next();
