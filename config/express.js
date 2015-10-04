var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function() {
	"use strict";

	var app = express();

	app.locals.title = "Express application";
	app.locals.port = '3001';

	/*
	    Middleware
	 */
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	/*
	    Session
	 */
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	app.use(cookieParser());

	/*
		Views
	*/
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	/*
	    Static files
	 */
	app.use(express.static('./build'));


	/*
		Flash
	 */
	app.use(flash());

	/*
		Passport
	*/

	app.use(passport.initialize());
	app.use(passport.session());


	/*
		Routes
	 */

	require('../app/routes/application.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);


	/*
		Helpers
	 */
	require('../app/helpers/helpers.js')(app);
	return app;
};