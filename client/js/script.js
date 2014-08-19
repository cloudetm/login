$(document).ready(function(){

	bindEvents();
});

function bindEvents(){

	// navbar elements binding to show login and signup
	$("#tab-login").click(function(){
		$("#nav-bar li").removeClass('active');
		$(this).addClass("active");
	});

	$("#tab-signup").click(function(){
		$("#nav-bar li").removeClass('active');
		$(this).addClass("active");
	});

	$('input').on('click', function(){
		$('.error').addClass('hide');
	});

	$('#inputEmailForget').on('click', function(e){
		e.preventDefault();

		var block = $('#block');
		block.removeClass('hide');
		var email = $(this).text();
		$.ajax({
		    url: '/forgotsendmail',
		    type: 'POST',
		    data: email,

		    success: function() {
		    	block.addClass('hide');
		        console.log("email send for password forgot");
	    	},
	    	fail: function (err) {
	    		console.log(err);
	    	}
		});
	});


	$("#tab-logout").click(function(e){
		e.preventDefault();
		$.ajax({
		    url: '/login',
		    type: 'DELETE',
		    success: function() {
		        console.log("logout successfucly");
		        window.location.replace('/login');
	    	},
	    	fail: function (err) {
	    		console.log(err);
	    	}
		});
	});

	$('#signup-container :button[type="submit"]').click(function(e){
		e.preventDefault();
		var signup = $('#signup-container');
		var name = signup.find('input[type="text"]').val();
		var email = signup.find('input[type="email"]').val();
		var password = signup.find('input[type="password"]').val();
		var block = $('#block');

		/* validation*/
		var NameMsg = isValid(name, "name");
		if (NameMsg != "valid") {
			var el = $(signup.find('label[for="nameError"]'));
			el.text(NameMsg);
			el.removeClass('hide');
			return;
		}

		var EmailMsg = isValid(email, "email");
		if (EmailMsg != "valid") {
			var el = $(signup.find('label[for="emailError"]'));
			el.text(EmailMsg);
			el.removeClass('hide');
			return;
		}

		var PassMsg = isValid(password, "password");
		if (PassMsg != "valid") {
			var el = $(signup.find('label[for="passwordError"]'));
			el.text(PassMsg);
			el.removeClass('hide');
			return;
		}

		


		var data = {
			name: name,
			email: email,
			password: password
		};

		block.removeClass('hide');
		var ajaxHandle = $.ajax({
			url: '/signup',
			method: 'POST',
			data: data
		});

		ajaxHandle.success(function(data){
			block.addClass('hide');
			if (data.status === 'error') {
				if (data.errorCode === 'ALREADY_EXISTS'){
					var el = $(signup.find('label[for="emailError"]'));
					el.text(data.msg);
					el.removeClass('hide');
					return;
				} 
				else if (data.errorCode === 'WRONG_FORMAT') {
					console.log("wrong format");
				}
			} else {
				signup.html("<div class='message'>An email has been sent to <b>" + email + " </b>. Please open your email and click the verification link.</div>")
				// window.location.replace('/home');
			}
		});

		ajaxHandle.fail(function(status){
			console.log("error");
		});
	});

	$('#login-container :button[type="submit"]').click(function(e){
		e.preventDefault();
		var login = $('#login-container');
		var email = login.find('input[type="email"]').val();
		var password = login.find('input[type="password"]').val();
		var rememberMe = login.find('input[type="checkbox"]').is(':checked');
		var data = {
			email: email,
			password: password
		};
		var ajaxHandle = $.ajax({
			url: '/login',
			method: 'POST',
			data: data
		});

		

		ajaxHandle.success(function(data){
			if (data.success){
				window.location.replace('/home');
			} 
			else {
				var el = $(login.find('label[for="credentailsError"]'));
				el.text(data.msg);
				el.removeClass('hide');
				return;
			}

		});

		ajaxHandle.fail(function(status){
			console.log("error", status);
		});
	});
}