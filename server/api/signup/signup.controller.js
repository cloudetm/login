'use strict';

var _ = require('lodash');
var util = require('../helper/util');
var Users = require('./signup.model');
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

var dispatchEmail = function(userDetail) {
	mailer.send(userDetail);
}

// Get list of things
exports.index = function(req, res) {
    res.render('signup');
//    Thing.find(function (err, things) {
//        if(err) { return handleError(res, err); }
//        return res.json(200, things);
//    });
};

//// Get a single thing
//exports.show = function(req, res) {
//    Thing.findById(req.params.id, function (err, thing) {
//        if(err) { return handleError(res, err); }
//        if(!thing) { return res.send(404); }
//        return res.json(thing);
//    });
//};
//
// Creates a new thing in the DB.
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
			       dispatchEmail(userDetail);
			       // res.send(200, {status: 'OK'});
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
	if (emailHash) {
		Users.find({'emailHash': emailHash}, function(err, doc){
			if (doc && doc.emailHash) {
				console.log(doc);
				res.render('validEmail', {name : doc.name});
			}
		}); 
	} else {
		res.render("404");
	}

};


function handleError(res, err) {
    return res.send(500, err);
}