var NAME_REGX = /^[a-zA-Z ]+$/;
// var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var isValid = function(str, type) {
	var str = str.trim();
	var msg = "";

	if (type === undefined) {
		type = 'name';
	}

	switch (type) {
		case "name": 
			if (str.length === 0) {
				msg = "Name is required";
				break;
			}

			if (!NAME_REGX.test(str)) {
				msg = "Name can contain only alphabets";
				break;
			}
			break;

		case "email":
			if (str.length === 0) {
				msg = "Email is required";
				break;
			}

			if (!EMAIL_REGEX.test(str)) {
				msg = "Email format is wrong";
				break;
			}
			break;

		case "password":
			if (str.length === 0) {
				msg = "password is required";
				break;
			}

			if (str.length < 6) {
				msg = "There should be atleast 6 characters in password";
				break;
			}
			break;

	}
	if (msg.length === 0) {
		return "valid";
	}

	return msg;
}