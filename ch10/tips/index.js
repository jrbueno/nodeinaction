exports.addPercentageToEach = function (prices, pct) {
  return prices.map(function (total) {
    total = parseFloat(total);
    return total + (total * pct);
  });
}

exports.sum = function (prices) {
  return prices.reduce(function (currentSum, currentValue) {
    return parseFloat(currentSum) + parseFloat(currentValue);
  });
}

exports.percentFormat = function (pct) {
  return parseFloat(pct) * 100 + '%';
}

exports.dollarFormat = function (number) {
  return '$' + parseFloat(number).toFixed(2);
}
