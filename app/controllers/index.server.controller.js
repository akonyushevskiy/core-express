/**
 * Render main page
 * @param req
 * @param res
 */
exports.render = function(req, res) {
	"use strict";

	if(!req.user){
		res.render('index', {
			title : req.app.locals.title,
			infoMessages : req.flash('info'),
			signupMessages : req.flash('errorSignup'),
			signinMessages : req.flash('error'),
			user : req.user || null
		});

	}else{
		res.redirect('/app/');
	}

};