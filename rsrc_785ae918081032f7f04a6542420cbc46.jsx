
  $(function(){

	$('#c-form').on("submit", (e) => {
	  e.preventDefault();
	  const submit = $("#c-form button");
	  submit.prop("disabled", true);
	  submit.css("background-color", "grey");
	  submit.css("cursor", "wait");
	  $("body").css("cursor", "progress");
	  sendEmail();
	});

	function sendEmail() {
	  var config = {
		".cfg.sendTo": "service@hometelco.com", 
		//".cfg.sendTo": "tower@bluetonemedia.com",
		".cfg.sendFrom": "noreply@hometelco.com",
		".cfg.sendSubject": "RedZone Signup Submitted",
		"Name": $('#name').val(),
		"Address": $('#address').val(),
		"Zip": $('#zip').val(),
		"Email": $('#email').val(),
		"Phone": $('#phone').val(),
		"Account Number": $('#account-number').val(),
		"Confirmation Contact": $("#confirmation-contact").is(":checked"),
	  }

	  $.ajax({
		url : '/forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function (data) {
		  postToGoogleSheet(config);
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });
	}

	function postToGoogleSheet(config) {

	  let date = new Date();

	  let jqxhr = $.ajax({
		url: 'https://script.google.com/macros/s/AKfycbxJmXsMsQjJ9gadw0wBux1nPhJV3-4ak3MH-tPvF_DZX3IY0Joj/exec',
		method: "GET",
		dataType: "json",
		data: config,
		success: function() {
		  if ($("#confirmation-contact").is(":checked")) {
			location.href = "/message-sent?m=order";
		  } else {
			location.href = "/message-sent?m=no-confirmation";
		  }
		}
	  })  
	  }	 

  });
