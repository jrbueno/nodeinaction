var Currency = require('./currency');
/* var csd = 0.91; */
var currency = new Currency(0.91);

console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.canadianToUS(50));
