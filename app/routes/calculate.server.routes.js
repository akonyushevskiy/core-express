module.exports = function(app) {
	"use strict";

	var calc = require('../controllers/calculate.server.controller');
	app.get('/api/calculate/sum', calc.sum);
};