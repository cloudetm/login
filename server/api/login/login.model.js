'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSignupSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('users', userSignupSchema);