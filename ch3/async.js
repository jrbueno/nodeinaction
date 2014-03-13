function asyncFunction(callback) {
  setTimeout(callback, 200);  
}

var color = 'blue';

/*
 * Async with Delay will print green
 *
asyncFunction(function() {
  console.log('The color is ' + color);
});
*/

/*
 * Anonymous function wrap to create a closure.
*/
(function(color) {
  asyncFunction(function() {
    console.log('The color is ' + color);
  })
})(color);

color = 'green';


