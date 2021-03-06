var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type : String,
		trim : true,
		unique : true,
		required : 'Username required'
	},
	firstName: String,
	lastName: String,
	email: {
		type : String,
		unique : true,
		required : true,
		match: /.+\@.+\..+/
	},
	password: {
		type : String,
		required : true,
		minLength : [
			function(password) {
				"use strict";
				return password && password.length > 5;
			},
			'Password should be longer'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	created : {
		type : Date,
		default: Date.now
	},
	isAdmin : {
		type : Boolean,
		default : false
	}
});

UserSchema.virtual('fullName')
	.get(function() {
		"use strict";

		return this.firstName + ' ' + this.lastName;
	})
	.set(function(fullName) {
		"use strict";

		var splitName = fullName.split(' ');
		this.firstName = splitName[0] || '';
		this.lastName = splitName[1] || '';
	});

UserSchema.pre('save', function(next) {
	"use strict";

	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	"use strict";

	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	"use strict";

	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	"use strict";

	var _this = this,
		possibleUsername = username + (suffix || '');

	_this.findOne({username: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				} else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			} else {
				callback(null);
			}
		});
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);
