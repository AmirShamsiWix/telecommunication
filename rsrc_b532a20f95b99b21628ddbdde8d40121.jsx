
  document.addEventListener("DOMContentLoaded", function() { 
	$("#su-form").on('submit', function(e) {
	  e.preventDefault();

	  const config = {
		".cfg.sendTo": "service@hometelco.com",
		".cfg.sendFrom": "noreply@bluetonemedia.com",
		".cfg.sendSubject": "GigUP Certified Signup Form",
		"Name": $("#name").val(),
		"Address": $("#address").val(),
		"Zip Code": $("#zip-code").val(),
		"Phone": $("#phone").val(),
		"Email": $("#email").val(),
	  };

	  $.ajax({
		url: "forms/mail.aspx",
		type: "post",
		dataType: "json",
		data: config,
		success: function(data) {
		  location.href = "/message-sent?m=message";
		},
		error: function(jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });
	});
  });
