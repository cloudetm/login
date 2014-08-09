var nodemailer    = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "test10891089@gmail.com",
        pass: "XXX"
    }
});

module.exports = smtpTransport;