

  $(document).ready(function () {

	$('#su-form').on('submit', function(e) {
	  e.preventDefault();
	  
	  const submit = $("#submit-btn");
	  submit.prop("disabled", true);
	  submit.css("background-color", "grey");
	  submit.css("cursor", "wait");
	  $("body").css("cursor", "wait");

	  // Setup Config.
	  var config = {
		'.cfg.sendTo': 'service@hometelco.com',
		'.cfg.sendFrom': 'noreply@hometelco.com',
		'.cfg.sendSubject': 'Schedule Your Move Form',
		'Name': $('#name').val(),
		'Phone': $('#phone').val(),
		'Email': $('#email').val(),
		'Address': $('#address').val(),
		'ZIP Code': $('#zip-code').val(),
		'Account Number': $('#account').val(),
		//"Confirmation Contact": $("#confirmation-contact").is(":checked"),
		//'ExperienceIQ': document.getElementById("protect-iq").checked,
		'Current Customer': document.getElementById("current").checked,
		'Like to sign up for services': document.getElementById("services-sign").checked
	  };

	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function (data) {
		  if ($("#confirmation-contact").is(":checked")) {
			location.href = "/message-sent?m=order";
		  } else {
			location.href = "/message-sent?m=no-confirmation";
		  }
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });

	});
  }); 
