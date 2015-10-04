var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	"use strict";

	passport.use(new LocalStrategy({
		usernameField : 'email'
	},function(username, password, done) {

		User.findOne({
			email: username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			return done(null, user);
		});
	}));
};