$(document).ready(function(){

	bindEvents();
	init();
});

function bindEvents(){
	$('input').on('click', function(){
		$('.error').addClass('hide');
	});
}

function init(){

	// navbar elements binding to show login and signup
	var reset = $('#reset-container');
	var forgot = $('#forgot-container');

	if (reset.length > 0){
		var url = window.location.href;
		var emailHash = url.split('?')[1];

		$("#reset-container button[type='submit']").click(function(e){
			e.preventDefault();
			var oldPassword = reset.find('input[name="oldpassword"]').val();
			var newPassword1 = reset.find('input[name="newpassword1"]').val();
			var newPassword2 = reset.find('input[name="newpassword2"]').val();
			var el = $(reset.find('label[for="passwordUpdate"]'));
			
			if (newPassword1 !== newPassword2) {
				el.text("New passwords don't match. Please retype new passwords");
				el.removeClass('hide');
				return;
			}

			var data = {
				oldpassword: oldPassword,
				newpassword1: newPassword1,
				newpassword2: newPassword2
			};
			var ajaxHandle = $.ajax({
				url: '/signup/reset?' + emailHash,
				method: 'POST',
				data: data
			});

	

			ajaxHandle.success(function(data){
				if (data.success){
					window.location.replace('/signup/passwordupdated');
				} 
				else {
					el.text(data.msg);
					el.removeClass('hide');
					return;
				}

			});

			ajaxHandle.fail(function(status){
				console.log("error");
			});
		});
	}
	
	if (forgot.length > 0){
		$("#forgot-container button[type='submit']").click(function(e){
			e.preventDefault();
			var email = forgot.find('input[type="email"]').val();
			var data = {
				email: email
			};
			var ajaxHandle = $.ajax({
				url: '/signup/forgot',
				method: 'POST',
				data: data
			});

			ajaxHandle.success(function(data){
				if (data.success){
					window.location.replace('/signup/forgot/requestreply');
				} 
				else {
					console.log("")
					return;
				}

			});

			ajaxHandle.fail(function(status){
				console.log("error");
			});
		});
	}
}