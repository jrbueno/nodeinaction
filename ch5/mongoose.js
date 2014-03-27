var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');

var Schema = mongoose.Schema;
var Tasks = new Schema({
  project: String,
  description: String
});

mongoose.model('Task', Tasks);

var Task = mongoose.model('Task');
/*
var task = new Task();
task.project = 'Bikesched';
task.description = 'Paint the bikesched red.';
task.save(function(err) {
  if (err) throw err;
  console.log('Task saved');
});

Task.update(
  {_id: '5333a4a06f1d9cf1e0d8c27e'},
  {description: 'paint the bikesched green'},
  {multi: false},
  function(err, rows_updated) {
    if (err) throw err;
    console.log('Updated');
  }
);

*/
Task.find({'project': 'Bikesched'}, function(err, tasks) {
  for(var i = 0; i < tasks.length; i++) {
    console.log('ID:' + tasks[i]._id);
    console.log(tasks[i].project);
    console.log(tasks[i].description);
  }
});

Task.findById('5333a4a06f1d9cf1e0d8c27e', function(err, task) {
  //if (err) throw err;
  if(task) task.remove();
});


