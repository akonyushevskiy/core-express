module.exports = function(app) {
	"use strict";

	var index = require('../controllers/index.server.controller'),
		application = require('../controllers/app.server.controller');

	app.get('/', index.render);
	app.get('/app', application.render);
};