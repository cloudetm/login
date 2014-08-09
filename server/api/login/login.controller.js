'use strict';

var _ = require('lodash');
var Users = require('../signup/signup.model');
//var signup = require('./signup.model');

// Get list of things
exports.index = function(req, res) {
    res.render('login');
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
exports.validate = function(req, res) {
	var data = req.body;
	var queryObj = {'email': data.email, 'password': data.password};
   Users.find(queryObj, function (err, docs) {
   		console.log(err, docs);
        if (!docs.length){
            handleError(err, res);
        }else{                
            console.log('user exists: ');
            res.send(200);
        }
    });
};
//
//// Updates an existing thing in the DB.
//exports.update = function(req, res) {
//    if(req.body._id) { delete req.body._id; }
//    Thing.findById(req.params.id, function (err, thing) {
//        if (err) { return handleError(res, err); }
//        if(!thing) { return res.send(404); }
//        var updated = _.merge(thing, req.body);
//        updated.save(function (err) {
//            if (err) { return handleError(res, err); }
//            return res.json(200, thing);
//        });
//    });
//};
//
//// Deletes a thing from the DB.
//exports.destroy = function(req, res) {
//    Thing.findById(req.params.id, function (err, thing) {
//        if(err) { return handleError(res, err); }
//        if(!thing) { return res.send(404); }
//        thing.remove(function(err) {
//            if(err) { return handleError(res, err); }
//            return res.send(204);
//        });
//    });
//};

function handleError(err, res) {
    return res.send(500, err);
}