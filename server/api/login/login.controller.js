'use strict';

var _ = require('lodash');
var Users = require('../signup/signup.model');
//var signup = require('./signup.model');

// Get list of things
exports.index = function(req, res) {
    res.render('login');
};


exports.validate = function(req, res) {
	var data = req.body;
    console.log(data,req.cookies.cokkieName,req.session);
    var cookie = req.cookies.cokkieName;
	var queryObj = {'email': data.email, 'password': data.password};
    Users.findOne(queryObj, function (err, doc) {
   		console.log(err, doc);
        if (doc == undefined){
            return res.json(200, {success : false, error: 'NOT_MATCH', msg: "credentails don't match"}); 
        }else{                
            console.log('user authenticated ');
            req.session.userid = doc._id;
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