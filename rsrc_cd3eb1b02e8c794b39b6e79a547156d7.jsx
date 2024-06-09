

  $(document).ready(function() {

	$("#football-close-homestream-form-btn").click(function(){
	  $("#football-homestream-tv-form-wrap").hide();
	});

	const $addStreams = $('#football-add-streams');
	const $addStreamsExtras = $('#football-add-streams-extras');
	$addStreamsExtras.hide();
	$addStreams.change(function() {
	  if( $addStreams.is(':checked') ) {
		$addStreamsExtras.slideDown();
	  } else {
		$addStreamsExtras.slideUp();
	  }
	});

	$('#football-cloud-dvr-extras').hide();
	$('#football-cloud-dvr').change(function() {
	  if ( $('#football-cloud-dvr').is(':checked') ) {
		$('#football-cloud-dvr-extras').slideDown();
	  } else {
		$('#football-cloud-dvr-extras').slideUp();
	  }
	});


	$('#football-sign-up-form').on("submit", (e) => {
	  e.preventDefault();
	  const submit = $("#football-sign-up-form button");
	  submit.prop("disabled", true);
	  submit.css("background-color", "grey");
	  submit.css("cursor", "wait");
	  $("body").css("cursor", "progress");
	  sendEmail();
	});

	function sendEmail() {

	  const streamsChecked = $("#football-add-streams").is(":checked");
	  const cloudChecked = $("#football-cloud-dvr").is(":checked");

	  var config = {
		".cfg.sendTo": "service@hometelco.com", 
		//".cfg.sendTo": "tower@bluetonemedia.com",
		".cfg.sendFrom": "noreply@hometelco.com",
		".cfg.sendSubject": "Form 'More Streams - Football' submitted",
		"First Name": $('#football-first-name').val(),
		"Last Name": $('#football-last-name').val(),
		"Address": $('#football-address').val(),
		"Zip": $('#football-zip').val(),
		"Email": $('#football-email').val(),
		"Phone": $('#football-phone').val(),
		"City": $("#football-zip").val(),
		"State": $("#football-state").val(),
		"Account Number": $('#football-account-number').val(),
		"Wants Additional Streams?": streamsChecked,
		"Additional Streams": streamsChecked ? $("#football-add-streams-select").val() : "N/A",
		"Wants Cloud DVR?": cloudChecked,
		"Cloud DVR": cloudChecked ? $("#football-cloud-dvr-select").val() : "N/A"
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
		  location.href = "/message-sent?m=no-confirmation";
		}
	  });
	}

	if (window.location.href.includes("#football")) {
	  $("#football-homestream-tv-form-wrap").show();
	}
  });

