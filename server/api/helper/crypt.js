var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
module.exports = {
	encrypt: function(str){
		var hash = bcrypt.hashSync(str, salt);
		return hash;
	}
};
