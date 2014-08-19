var bcrypt = require('bcrypt');
var crypto = require('crypto') 
var salt = bcrypt.genSaltSync(10);
module.exports = {
	encrypt: function(str){
		var hash = bcrypt.hashSync(str, salt);
		return hash;
	},

	randomHash: function() {
		var randomHash = crypto.randomBytes(20).toString('hex');
		return randomHash;
	}
};
