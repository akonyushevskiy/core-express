var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function(err) {
	"use strict";

	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message =
				err.errors[errName].message;
		}
	}
	return message;
};

/**
 * Creates user
 * @param req
 * @param res
 * @param next
 */
exports.create = function(req, res, next) {
	"use strict";

	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			console.error(err);
			return next(err);
		} else {
			res.json(user);
		}
	});
};

/**
 * List of all users
 * @param req
 * @param res
 * @param next
 */
exports.list = function(req, res, next) {
	"use strict";

	User.find({}, '-password -salt', function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

/**
 * Returns user's json (after usersByID middleware)
 * @param req
 * @param res
 */
exports.read = function(req, res) {
	"use strict";

	res.json(req.user);
};

/**
 * finds one user by id middleware (used before read and update)
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.userByID = function(req, res, next, id) {
	"use strict";

	User.findOne({
		_id: id
	}, '-password -salt', function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};

/**
 * Updates user by ID
 * @param req
 * @param res
 * @param next
 */
exports.update = function(req, res, next) {
	"use strict";

	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});

};

/**
 * Removes user by ID
 * @param req
 * @param res
 * @param next
 */
exports.delete = function(req, res, next) {
	"use strict";

	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	});
};

exports.signup = function(req, res, next) {
	"use strict";

	if (!req.user) {
		var user = new User(req.body),
			message = null;

		user.provider = 'local';

		user.save(function(err) {

			if (err) {

				var message = getErrorMessage(err);

				req.flash('errorSignup', message);
				return res.redirect('/');
			}

			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	"use strict";

	req.logout();
	res.redirect('/');
};
