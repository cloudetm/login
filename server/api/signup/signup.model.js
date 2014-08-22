'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSignupSchema = new Schema({
	id : Number,
    name: String,
    email: String,
    password: String,
    emailHash: String,
    isValidated: Boolean
});

var resetPasswordSchema = new Schema({
	id: Number,
	email: String,
	emailHash: String,
	resetRequestTime: Number,
	timeout: Number

});

module.exports = {

	users: mongoose.model('users', userSignupSchema),
	resetLinks: mongoose.model('resetPassword', resetPasswordSchema)	
};