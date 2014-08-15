'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
	mongo: {
		uri: 'mongodb://localhost/login'
	},

	redis : {
		host: '127.0.0.1',
		port: 6379
	},


	session : {
		secret: "login",
		key: "sid"
	},

	email: {
	    user: "test10891089@gmail.com",
	    pass: "testing@gmail"
  	},

  seedDB: true
};
