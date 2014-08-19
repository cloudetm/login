'use strict';

var _ = require('lodash');
var util = require('../helper/util');
var Model = require('./signup.model');
var config = require('../helper/common').config;
var Users = Model.users;
var resetLinks = Model.resetLinks;
var mailer = require('../helper/email');
var encryptor = require('../helper/crypt');
var url = require('url');

function validateSignupDetails(body) {
	var name = body.name;
	var email = body.email;
	var password = body.password;
	if (util.validateText(name) &&
		util.validateEmail(email) &&
		util.validatePassword(email))
	{
		return true;
	} else {
		return false;
	}

}

var dispatchEmailForValidation = function(userDetails, callback) {
	var receiverEmail = userDetails.email;
	var emailHash = userDetails.emailHash;
	var linkToSend = "http://localhost:9000/signup/validate?h=" + emailHash;
	var senderEmail = config.email.user;
	var message = "Welcome to login demo.\n please click the following link to validate your email." + linkToSend+ "\n\n Thanks.";
	var mailOptions = {
	    from: senderEmail,
	    to: receiverEmail,
	    subject: "Validate your email ",
	    text: message
	}
	mailer.send(mailOptions, callback);
}

var dispatchEmailForForgotPassword = function(emailDetail, callback) {
	var receiverEmail = emailDetail.email;
	var emailHash = emailDetail.emailHash;
	var linkToSend = "http://localhost:9000/signup/reset?h=" + emailHash;
	var senderEmail = config.email.user;
	var message = "To reset password.\n please click the following link." + linkToSend+ "\n\n Thanks.";
	var mailOptions = {
	    from: senderEmail,
	    to: receiverEmail,
	    subject: "Validate your email ",
	    text: message
	}
	mailer.send(mailOptions, callback);
}

// Get list of things
exports.index = function(req, res) {
    res.render('signup');
};

exports.create = function(req, res) {
	var body = req.body;
	var email = body.email;
	if (validateSignupDetails(body)){
		var queryObj = {'email': email};
		Users.count(queryObj, function(err, count){
			if(err) { return handleError(res, err); }
			if (count > 0) {
				res.json(200, {status: 'error', errorCode: 'ALREADY_EXISTS', msg: "email id already exists"});
			} else {
				var userDetails = req.body;
				userDetails.emailHash = encryptor.encrypt(email);
				Users.create(userDetails, function(err, userDetail) {
			       if(err) { return handleError(res, err); }
			       console.log(userDetail);
			       dispatchEmailForValidation(userDetail, function(error, response){
					    if(error) {
					    	console.log(error)
					    }
					    else {
			       			res.send(200, {status: 'OK'});
					    	console.log("mail send", response);
				    	}
			   		});
				});
			}
		});
	} else {
		res.json(200, {status: 'error', errorCode: 'WRONG_FORMAT', msg: "Wrong format for input values"});
	}
};

exports.validateEmail = function(req, res){
	
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var emailHash = query.h;
	console.log(emailHash);
	if (emailHash) {
		Users.findOne({'emailHash': emailHash}, function(err, doc){
			console.log(doc);
			if (doc && doc.emailHash) {
				console.log(doc);
				res.render('validEmail', {name : doc.name, layout: false});
			} 
			else {
				res.render("timeoutHash", {layout: false});
			}
		}); 
	} else {
		handleError(res, err);
	}

};

exports.forgotSendMail = function(req, res) {
	var body = req.body;
	var email = body.email.trim();
	console.log(body);
	if (email.length === 0) {
		return;
	}
	var emailHash = encryptor.randomHash();
	var resetRequestTime = Date.now();
	var timeout =  2 * 60 * 60 * 1000;
	var emailDetails = {
		email: email,
		emailHash: emailHash,
		resetRequestTime: resetRequestTime,
		timeout : timeout
	};
	resetLinks.create(emailDetails, function(err, emailDetail) {
       if(err) { return handleError(res, err); }
       console.log(emailDetail);
       dispatchEmailForForgotPassword(emailDetail, function(error, response){
		    if(error) {
		    	console.log(error)
		    }
		    else {
       			res.render('resetRequestReply', {email: email, layout:'message'});
		    	console.log("forgot password reset mail send", response);
	    	}
   		});
	});
}

exports.reset = function(req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var emailHash = query.h;
	console.log(emailHash);
	if (emailHash) {
		resetLinks.findOne({'emailHash': emailHash}, function(err, doc){
			console.log(doc);
			if (doc && doc.emailHash) {
				var currentTime = Date.now();
				var timeElapsed = currentTime - doc.resetRequestTime;
				if (timeElapsed < doc.timeout) {
					res.render("resetform", {emailHash: emailHash, layout: "message"});
					return;
				}
			} 
			res.render("forgottimeout", {layout: "message"});
		}); 
	} else {
		handleError(500, "emailHash not found in reset request in signupController");
	}
}

exports.updatePassword = function(req, res){

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var emailHash = query.h;

	var body = req.body;
	var oldpassword = body.oldpassword.trim();
	var newpassword1 = body.newpassword1.trim();
	var newpassword2 = body.newpassword2.trim();

	console.log(emailHash, body);

	if (emailHash) {
		resetLinks.findOne({'emailHash': emailHash}, function(err, doc){
			console.log(doc);
			if (doc && doc.emailHash) {
				var currentTime = Date.now();
				var timeElapsed = currentTime - doc.resetRequestTime;
				console.log(timeElapsed, doc.timeout);
				if (timeElapsed < doc.timeout) {
					Users.update({'email': doc.email, 'password': newpassword1}, function(err, numberAffected, rawResponse){
						if (err) {
							handleError(500, err);
						}
						if (numberAffected > 0) {
							res.render('passwordUpdated', {layout:'message'});
						}
						return;
					}); 
				} 
				else {
					res.render("forgottimeout", {layout: "message"});
				}
			}
			else {
				res.render("forgottimeout", {layout: "message"});

			} 
		}); 
	} else {
		handleError(500, "emailHash not found in updatePassword in signupController");
	}
};

exports.forgot = function(req,res) {
    res.render('forgot', {layout:false});
};

function handleError(res, err) {
    return res.send(500, err);
}