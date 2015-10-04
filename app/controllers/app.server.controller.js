exports.render = function(req, res) {
	"use strict";
	if(!req.user){
		res.redirect('/');
		return false;
	}

	res.render('app', {
		title : req.app.locals.title,
		user : {
			id : req.user.id,
			isAdmin : req.user.isAdmin,
			balance : req.user.balance,
			fullName : req.user.fullName,
			email : req.user.email,
			firstName : req.user.firstName,
			lastName : req.user.lastName
		}
	});
};