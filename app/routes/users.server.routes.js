var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');


module.exports = function(app) {
	"use strict";

	app.route('/signup')
		.post(users.signup);

	app.route('/signin')
		.post(
			passport.authenticate('local', {
				successRedirect: '/',
				failureRedirect: '/',
				failureFlash: true
			})
		);

	app.get('/signout', users.signout);

	app.route('/users')
		.post(users.create)
		.get(users.list);


	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

	app.param('userId', users.userByID);
};