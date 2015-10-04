module.exports = function(app){
	"use strict";

	app.locals.formatMoney = formatMoney;
	app.locals.splitGroups = splitGroups;



	/**
	 * Format money with delimeters
	 * @param money - Number
	 * @returns {*}
	 */
	function formatMoney(money){
		money = parseFloat(money)
		var moneyInt = Math.floor(money),
			moneyDecimal = Math.floor((money - Math.floor(money))*100);

		if(moneyDecimal === 0){
			moneyDecimal = '';
		}else{
			if(moneyDecimal < 10){
				moneyDecimal = '.' + moneyDecimal + '0';
			}else{
				moneyDecimal = '.' + moneyDecimal.toString().substr(0, 2);
			}
		}

		return splitGroups(moneyInt, ',') + moneyDecimal;
	}


	/**
	 * Split number by 3 digit
	 * @param n - Number
	 * @param delim - split delimeter
	 * @returns {string}
	 */
	function splitGroups(n, delim) {
		var digits;

		delim = delim || '&nbsp;';

		n = n.toFixed(0);
		digits = n.length > 3 ? n.length % 3 : 0;

		return (digits ? n.substr(0, digits) + delim : '') +
			n.substr(digits).replace(/(\d{3})(?=\d)/g, "$1" + delim);
	}

};