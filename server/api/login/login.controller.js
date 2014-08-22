'use strict';

var _ = require('lodash');
var Users = require('../signup/signup.model').users;
//var signup = require('./signup.model');

// Get list of things
exports.index = function(req, res) {
    if (req.session.userid) {
        res.redirect('/home'); 
        return;
    } 
    res.render('login');
};


exports.validate = function(req, res) {
	var data = req.body;
    console.log(data,req.cookies.cokkieName,req.session);
    var cookie = req.cookies.cokkieName;
	var queryObj = {'email': data.email};
    var rememberMe = data.rememberMe || false;
    Users.findOne(queryObj, function (err, doc) {
   		console.log(err, doc);
        if (doc == undefined){
            return res.json(200, {success : false, error: 'EMAIL_NOT_EXISTS', msg: "Email id doesn't exist. Please signup first to login"});
        }
        if (doc.password != data.password){
            return res.json(200, {success : false, error: 'NOT_MATCH', msg: "Wrong combination of email and password"}); 
        }
        if (!doc.isValidated) {
            return res.json(200, {success : false, error: 'NOT_VERIFIED', msg: "Email id has not been verfied. Please verify your email id by clicking the link sent to you on " + doc.email}); 
        }
        else{                
            console.log('user authenticated  via login ');
            req.session.userid = doc._id;
            if (rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            }
            req.session.cookie.expires = false;
            return res.json(200, {success: true});
        }
    });
};

exports.delete = function(req, res) {
    console.log(req.body);
    req.session.destroy(function(err){
        if (!err) {
            res.send(200);
        }
        else {
            handleError(err);
        }
    });
};

function handleError(err, res) {
    return res.send(500, err);
}