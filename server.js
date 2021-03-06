//Environment default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Server code
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport'),
	db = mongoose(),
	app = express(),
	passport = passport(),
	server = app.listen(app.locals.port);;




console.log(process.env.NODE_ENV);
console.log('Server running at http://localhost:' + app.locals.port + '/ at ' + process.env.NODE_ENV + ' environment');

module.exports = server;

