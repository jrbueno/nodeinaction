var Currency = function(csd) {
	this.canadianDollar = csd;
}

Currency.prototype.roundTwoDecimals = function(amt) {
	return Math.round(amt * 100) / 100;
};

Currency.prototype.canadianToUS = function(canadian) {
	return this.roundTwoDecimals(canadian * this.canadianDollar);
};

Currency.prototype.USToCanadian = function(usd) {
	return this.roundTwoDecimals(usd / this.canadianDollar);
};

module.exports = Currency;
