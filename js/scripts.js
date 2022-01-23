$(document).ready(function(){
	// validating & submitting form
	var valid = $('#main-form').validate({
		rules:{
			name:{
				required: true,
				minlength: 2
			},
			email:{
				email: true,
				required: true
			},
			phone:{
				required: true,
				minlength: 14
			},
		},
		
		messages: {
			name:{
				minlength: "Please enter more than 2 characters",
				required: "Name is required."
			},
			email:{
				email: "Enter valid email address",
				required: "Email address is required."
			},
			phone:{
				minlength: "Please enter valid phone number",
				required: "Phone number is required."
			},
		},
		
		submitHandler: function(form){
			var form = $('#main-form');
			$.ajax({
				type: "POST",
				url: "https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar",
				data: $(form).serialize(),
				success: function () {
					// normally the requirements below would go here but URL is timing out so never actually successful
				}
			});	
			// on successful submission ^
			$('#name, #city, #state, #phone, #email').val('');
			$('#submit').text('Submitted').attr('disabled', 'disabled');
			

			return false;	
		}
	});

	// phone can only accept numbers
	$('#phone').keypress(function (e) {    
		var charCode = (e.which) ? e.which : event.keyCode    
		if (String.fromCharCode(charCode).match(/[^0-9]/g))    
		return false;                        
	});

	// add input mask & validate field again after it adds the mask
	$('#phone').blur(function(e){
		if ( $(this).val().length >= 10){
			var X = $(this).val().replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
			$(this).val('(' + X[1] + ') ' + X[2] + '-' + X[3]);
			valid.element('#phone');
		}
	});
	
	

	// truncating to make sure page won't break if text changes in this area
	var summary = $('.more-savings p span');
	var truncate = summary.text().trim().substring(0, 125).split(" ").slice(0, -1).join(" ") + "...";
	summary.text(truncate);
});
