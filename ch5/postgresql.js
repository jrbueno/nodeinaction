//npm install pg
var pg = require('pg');
var conString = 'tcp://myuser:password@localhost:5432/database';

var client = new pg().Client(conString);
client.connect();

//Simple insert
client.query('insert into users (name) values ("mike"');

//Insert with placeholders
client.query(
	"insert into users " +
	" (name, age) values ($1, $2) ",
	['Mike', 39]
);


//insert with PK Return
client.query(
	"insert into users " + 
	"(name, age) values ($1,$2) " +
	"returning id",
	['Mike',39],
	function(err, result) {
		if(err) throw err;
		console.log('Inserted ID is: ' + result.rows[0].id);
	}
);


//Querying Data
var query = client.query(
	"Select * from users where age > $1",
	[40]
);

query.on('row', function(row) {
	console.log(row.name);
});

query.on('end', function() {
	client.end();
});


