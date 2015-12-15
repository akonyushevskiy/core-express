module.exports = function(app) {
	"use strict";

	var index = require('../controllers/index.server.controller');
	app.get('/', index.render);
};