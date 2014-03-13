var flow = require('nimble');

/*
setTimeout(function() {
  console.log('i execute first');
  setTimeout(function() {
    console.log('2nd');
    setTimeout(function() {
      console.log('3rd');
    }, 100);
  }, 500);
}, 1000);
*/

flow.series([
  function(callback) {
    setTimeout(function() {
      console.log('1st');
      callback();
    }, 1000);
  },

  function(callback) {
    setTimeout(function() {
      console.log('2nd');
      callback();
    }, 500);
  },

  function(callback) {
    setTimeout(function() {
      console.log('3rd');
      callback();
    }, 100);
  }
]);
