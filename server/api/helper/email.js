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
	send: function(userDetails, senderEmail) {
		var receiverEmail = userDetails.email;
		var emailHash = userDetails.emailHash;
		var linkToSend = "http://localhost:9000/signup/validate?h=" + emailHash;
		var senderEmail = senderEmail || "test10891089@gmail.com";
		var message = "Welcome to login demo.\n please click the following link to validate your email." + linkToSend+ "\n\n Thanks.";
		var mailOptions = {
		    from: senderEmail,
		    to: receiverEmail,
		    subject: "Validate your email ",
		    text: message
		}
		smtpTransport.sendMail(mailOptions, function(error, response){
		    if(error) console.log(error);
		});

	}

};