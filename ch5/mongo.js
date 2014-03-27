var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});

var client = new mongodb.Db('mydatabase', server, {w: 1});

client.open(function(err) {
  if (err) throw err;
  client.collection('test_insert', function(err, collection) {
    if (err) throw err;
    console.log('perform queries');
    /*
    collection.insert(
      {
        "title": "i like cake",
        "body": "it is quite good"
      },
      { safe: true },
      function(err, documents) {
        if (err) throw err;
        console.log('Doc Id: ' + documents[0]._id);
      }
    );
    var _id = new client.bson_serializer.ObjectID('53339e85a46e81eadf583954');

    collection.update(
      {_id: _id},
      {$set: {"title": "I ate too much cake"}},
      {safe:true},
      function(err) {
        if (err) throw err;
      }
    );
    */
    collection.find().toArray(
      function(err, results) {
        if (err) throw err;
        console.log(results);
      });
  });
});


