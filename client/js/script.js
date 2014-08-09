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

	$('#signup-container :button[type="submit"]').click(function(){
		var signup = $('#signup-container');
		var name = signup.find('input[type="text"]').val();
		var email = signup.find('input[type="email"]').val();
		var password = signup.find('input[type="password"]').val();
		var data = {
			name: name,
			email: email,
			password: password
		};
		var ajaxHandle = $.ajax({
			url: '/signup',
			method: 'POST',
			data: data
		});

		ajaxHandle.success(function(data){
			if (data.status === 'error') {
				if (data.errorCode === 'ALREADY_EXISTS'){
					console.log("email id already exists");
				} 
				else if (data.errorCode === 'WRONG_FORMAT') {
					console.log("wrong format");
				}
			} else {
				window.location.replace('/home');
			}
		});

		ajaxHandle.fail(function(status){
			console.log("error");
		});
	});

	$('#login-container :button[type="submit"]').click(function(){
		var login = $('#login-container');
		var email = login.find('input[type="email"]').val();
		var password = login.find('input[type="password"]').val();
		var data = {
			email: email,
			password: password
		};
		var ajaxHandle = $.ajax({
			url: '/login',
			method: 'POST',
			data: data
		});

		ajaxHandle.success(function(status){
			window.location.replace('/home');
		});

		ajaxHandle.fail(function(status){
			console.log("error");
		});
	});
}