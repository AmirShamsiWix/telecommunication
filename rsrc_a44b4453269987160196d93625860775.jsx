
  document.addEventListener("DOMContentLoaded", function() { 
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
		'.cfg.sendSubject': 'Streaming Rewards',
		'First Name': $('#fname').val(),
		'Last Name': $('#lname').val(),
		'Speed': $('#speed').val(),
		'Phone': $('#phone').val(),
		'Email': $('#email').val(),
		'Address': $('#address').val(),
		'City': $('#city').val(),
		'State': $('#state').val(),
		'ZIP': $('#zip').val()
	  };

	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function() {
		  location.href = "/message-sent?m=message"
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });

	});
  }); 
