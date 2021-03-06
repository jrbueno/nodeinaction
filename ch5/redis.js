var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function(err) {
  console.log('Error: ' + err);
});

client.set('color', 'red', redis.print);
client.get('color', function(err, value) {
  if(err) throw err;
  console.log('Got: ' + value);
});

client.hmset('camping', {
  'shelter': '2-person tent',
  'cooking': 'campstove'
}, redis.print);

client.hmget('camping','cooking', function(err, keys) {
  if (err) throw err;
  keys.forEach(function(key, i) {
    console.log(' ' + key);
  });
});

client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, function(err, items) {
  if (err) throw err;
  items.forEach(function(item, i) {
    console.log(' ' + item);
  });
});

client.sadd('ips', '204.10.37.96', redis.print);
client.sadd('ips', '204.10.37.96', redis.print);
client.sadd('ips', '72.10.37.96', redis.print);
client.smembers('ips', function(err, members) {
  if (err) throw err;
  console.log(members);
})
