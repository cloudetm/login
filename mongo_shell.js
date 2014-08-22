'use strict';

var config = {
	mongo: {
		uri: 'mongodb://localhost/login',
		mongo: {
		    options: {
		      db: {
		        safe: true
		      }
		    }
  		}
	}
};

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect(config.mongo.uri, config.mongo.options);

var userSignupSchema = new Schema({
	id : Number,
    name: String,
    email: String,
    password: String,
    emailHash: String,
    isValidated: false
});

var resetPasswordSchema = new Schema({
	id: Number,
	email: String,
	emailHash: String,
	resetRequestTime: Number,
	timeout: Number

});

var users =  mongoose.model('users', userSignupSchema);
var resetLinks =  mongoose.model('resetPassword', resetPasswordSchema);


// module.exports = {

// 	users: mongoose.model('users', userSignupSchema),
// 	resetLinks: mongoose.model('resetPassword', resetPasswordSchema)	
// };

// var removeAll = function() {
// 	users.remove({}, function(err, docs){
// 		console.log(docs);
// 	});
// };

var findAll = function() {
	users.find({}, function(err, docs){
		console.log(docs);
	});
};

findAll();

// users.remove({email: 'tarun.kumar@housing.com'}, function(err, docs){
//  		console.log(docs);
// });

// users.findOneAndUpdate({email: 'test@test.com'}, {isValidated: false}, function(err, doc){
// 	console.log(doc);
// 	console.log("**********************");

// });

// findAll();




