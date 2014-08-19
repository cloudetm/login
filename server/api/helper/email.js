var nodemailer    = require("nodemailer");
var common = require('./common');
var config = common.config;


var smtpTransport = nodemailer.createTransport({
	    service: "Gmail",
	    auth: {
	        user: config.email.user,
	        pass: config.email.pass
	    }
	});

module.exports = {
	send: function(mailOptions, callback) {
		smtpTransport.sendMail(mailOptions, function(error, response){
		   callback(error, response);
		});

	}

};