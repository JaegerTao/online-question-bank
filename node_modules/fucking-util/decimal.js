'use strict';

const Decimal = function(n) {

	return Math.round(n*100);
};

Decimal.normalize = function(n) {

	return n / 100;
};

Decimal.calc = function(opt, n1, n2) {

	let dr = opt === '*' ? n1 * n2 : 
					 opt === '/' ? n1 / n2 : 
					 opt === '-' ? n1 - n2 : 
					 							 n1 + n2 ;

	return Decimal(dr);
};

Decimal.calcWithFloat = function(opt, n1, n2) {

	let dr = Decimal.calc(opt, n1, n2);

	return Decimal.normalize(dr);
};

module.exports = Decimal;