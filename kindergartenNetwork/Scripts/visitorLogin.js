var Login = function () {

	var handleLogin = function() {
		$('#loginForm').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                Email: {
	                    required: true
	                },
	                Password: {
	                    required: true
	                },
	                Language: {
	                    required: true
	                },
	                Remember: {
	                    required: false
	                }
	            },

	            messages: {
	                Email: {
                        required: "البريد الإلكتروني مطلوب."

	                },
	                Language: {
	                    required: "Language is required."
	                },
	                Password: {
	                    required: "كلمة المرور مطلوبة."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('#loginForm')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                //form.submit();
	                login();
	            }
	        });

	        $('#loginForm input').keypress(function (e) {
	            if (e.which === 13) {
	                if ($('#loginForm').validate().form()) {
	                    $('#loginForm').submit();
	                }
	                return false;
	            }
	        });
	}
	var login = function () {
	    var postData = $("#loginForm").serializeArray();
	    var formUrl = $("#loginForm").attr("action");
	    $.ajax({
	        type: "POST",
	        cache: false,
	        url: formUrl,
	        data: postData,
	        dataType: "json",
	        success: function (data) {
	            if (data.cStatus === "success") {
	                if (data.isRedirect) {
	                    window.location.href = data.redirectUrl;
	                }
	                $(".alert-danger").css("display", "none");
					$(".alert-success").html(" <button class='close' data-close='alert'></button>" + data.cMsg);
	                $(".alert-success").css("display", "block");
	                //gsNotifyMsg(data.cMsg, data.cStatus);
	            } else {
	                $(".alert-success").css("display", "none");
	                $(".alert-danger").html(" <button class='close' data-close='alert'></button>" + data.cMsg);
	                $(".alert-danger").css("display", "block");
	            }
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	        }
	    });
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "الإيميل مطلوب."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('#loginForm').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('#loginForm').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {
		$('#RegistrationForm').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: false, // do not focus the last invalid input
			rules: {
				Email: {
					required: true
				},
				Pass: {
					required: true
				},
				Name: {
					required: true
				}
			},

			messages: {
				Email: {
					required: "البريد الإلكتروني مطلوب."

				},
				Name: {
					required: "الاسم مطلوي."
				},
				Password: {
					required: "كلمة المرور مطلوبة."
				}
			},

			invalidHandler: function (event, validator) { //display error alert on form submit   
				$('.alert-danger', $('#loginForm')).show();
			},

			highlight: function (element) { // hightlight error inputs
				$(element)
					.closest('.form-group').addClass('has-error'); // set error class to the control group
			},

			success: function (label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			errorPlacement: function (error, element) {
				error.insertAfter(element.closest('.input-icon'));
			},

			submitHandler: function (form) {
				//form.submit();
                register();
			}
		});

		$('#RegistrationForm input').keypress(function (e) {
			if (e.which === 13) {
				if ($('#RegistrationForm').validate().form()) {
					$('#RegistrationForm').submit();
				}
				return false;
			}
		});
    }
    var register = function() {
        var postData = $("#RegistrationForm").serializeArray();
        var formUrl = $("#RegistrationForm").attr("action");
        $.ajax({
            type: "POST",
            cache: false,
            url: formUrl,
            data: postData,
            dataType: "json",
            success: function(data) {
                if (data.cStatus === "success") {
                    window.location.href = "/Home/Index";
                    $(".alert-danger").css("display", "none");
                    $(".alert-success").html(" <button class='close' data-close='alert'></button>" + data.cMsg);
                    $(".alert-success").css("display", "block");
                    //gsNotifyMsg(data.cMsg, data.cStatus);
                } else {
                    $(".alert-success").css("display", "none");
                    $(".alert-danger").html(" <button class='close' data-close='alert'></button>" + data.cMsg);
                    $(".alert-danger").css("display", "block");
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
            }
        });
	}


    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            handleForgetPassword();
            handleRegister();    

        }
    };

}();
