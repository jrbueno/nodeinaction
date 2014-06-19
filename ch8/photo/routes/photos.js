var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

var photos = [];

photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
  name: 'Ryan Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg'
});


exports.list = function (req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  });
};

exports.form = function (req, res) {
  res.render('photos/upload', {
    title: 'Photo Upload'
  });
};

exports.submit = function (dir) {
  return function (req, res, next) {
    console.log(req.files);    
    //console.log(req.body);
    var img = req.files.photoimage;
    var name = req.body.photoname || img.name;
    var path = join(dir, img.name);

    fs.rename(img.path, path, function (err) {
      if (err) return next(err);

      Photo.create({
        name: name,
        path: img.name
      }, function (err) {
        if(err) return next(err);
        res.redirect('/');
      });
    });
  };
};
