

  $(document).ready(function() {

	let url = location.href;
	if( url.indexOf('/homestream-tv#firestick') == -1 ) {
	  console.log('no');
	} else {

	  let form = $('#homestream-tv-form-wrap');  
	  $(form).find('h2').text('Sign Up and Receive a FREE Fire Stick!');
	  $('#form-subject').val('FREE Fire Stick - HomeSC Homestream TV Contact Form Filled Out');
	  $('#homestream-tv-form-wrap').show();
	}

	if( url.indexOf('/homestream-tv#signup') == -1 ) {
	  console.log('no');
	} else {

	  let form = $('#homestream-tv-form-wrap');  
	  $(form).find('h2').text('Sign Up for HomeStream TV!');
	  $('#form-subject').val('HSTV Signup (from iTV Migration)');
	  $('#homestream-tv-form-wrap').show();
	}

	$(".signupbtn-trigger").click(function(){
	  $("#homestream-tv-form-wrap").show();
	});

	$("#close-homestream-form-btn").click(function(){
	  $("#homestream-tv-form-wrap").hide();
	});

	$(".toggle-premium-movies").click(function(){
	  $("#show-premium-movies").show();
	});

	$(".toggle-sports-package").click(function(){
	  $("#show-sports-package").show();
	});

	$(".toggle-cloud-dvr").click(function(){
	  $("#show-cloud-dvr").show();
	});

	$(".toggle-streams").click(function(){
	  $("#show-streams").show();
	});

	$(".toggle-hometv2go").click(function(){
	  $("#show-hometv2go").show();
	});

	$(".close-bttn").click(function(){
	  $(".add-on-pop").hide();
	});

	$(".view-bttn").click(function(){
	  $(".add-on-pop").hide();
	  $('.col-one').removeClass('in');
	  $('.col-two').removeClass('in');
	  $('.col-three').removeClass('in');
	  $('.col-four').toggleClass('in');
	});
	
	/*
	$("#prem-mov-plans").hide();
	$("#prem-mov-check").change(function() {
	  if ($("#prem-mov-check").is(":checked")) {
		$("#prem-mov-plans").slideDown();
	  } else {
		$("#prem-mov-plans").slideUp();
		$('#prem-mov-plans input').prop('checked', false);
	  }
	});
	

	$("#sports-pkg-plans").hide();
	$("#sports-pkg-check").change(function() {
	  if ($("#sports-pkg-check").is(":checked")) {
		$("#sports-pkg-plans").slideDown();
	  } else {
		$("#sports-pkg-plans").slideUp();
	  }
	});
	*/

	$('#add-on-holder').hide();
	$('.trigger-packages').change(function() {
	  if ( $('.trigger-packages').is(':checked') ) {
		$('#add-on-holder').slideDown();
	  } else {
		$('#add-on-holder').slideUp();
	  }
	});

	$('#cloud-dvr-extras').hide();
	$('#cloud-dvr').change(function() {
	  if ( $('#cloud-dvr').is(':checked') ) {
		$('#cloud-dvr-extras').slideDown();
	  } else {
		$('#cloud-dvr-extras').slideUp();
		$('#sign-up-form select[name="DVR Upgrade"]').val('No upgrade');
	  }
	});
	var $addStreams = $('#add-streams');
	var $addStreamsExtras = $('#add-streams-extras');
	$addStreamsExtras.hide();
	$addStreams.change(function() {
	  if( $addStreams.is(':checked') ) {
		$addStreamsExtras.slideDown();
	  } else {
		$addStreamsExtras.slideUp();
		$('#sign-up-form select[name="Additional Streams Upgrade"]').val('No upgrade');
	  }
	});

	$('#sign-up-form').on('submit', function(e){
	  e.preventDefault();
	  const submit = $("#sign-up-form button");
	  submit.prop("disabled", true);
	  submit.css("background-color", "grey");
	  submit.css("cursor", "wait");
	  $("body").css("cursor", "progress");
	  
	  $('#sign-up-submit').prop('disabled', true);
	  setTimeout(function(){ 
		$('#sign-up-submit').prop('disabled', false);
	  }, 3000);

	  let fireStick = 'No';

	  if(location.href.indexOf('/homestream-tv#firestick') != -1 ){
		fireStick = 'Yes';
	  }	

	  let addOns = [];

	  $.each($("#sign-up-form input[name='Premium Movie Plans']:checked"), function(){
		addOns.push($(this).val());
	  });

	  $.each($("#sign-up-form input[name='Sports Package']:checked"), function(){
		addOns.push($(this).val());
	  });

	  $.each($("#sign-up-form input[name='Cloud DVR']:checked"), function(){
		addOns.push($(this).val());
	  });

	  if($("#sign-up-form input[name='Cloud DVR']:checked").val() == "Cloud DVR"){
		addOns.push($("#sign-up-form select[name='DVR Upgrade'] option:selected").val());
	  }

	  if($("#sign-up-form input[name='Additional Streams']:checked").val() == "Yes"){
		addOns.push($("#sign-up-form select[name='Additional Streams Upgrade'] option:selected").val());
	  }

	  let subject = "Homestream TV Form Submitted";


	  if(location.href.indexOf('/homestream-tv#firestick') != -1 ){

		let subject = "Firestick Promo";

		$.ajax({
		  url: "/forms/mail.aspx",
		  method: "POST",
		  dataType: "json",
		  data: {
			".cfg.sendTo": "service@hometelco.com", 
			".cfg.action": "StoreOnly",
			".cfg.sendFrom": "noreply@hometelco.com",
			".cfg.sendSubject": subject,
			"First Name": $("#sign-up-form input[name='First Name']").val(),
			"Last Name": $("#sign-up-form input[name='Last Name']").val(),
			"Phone": $("#sign-up-form input[name='Phone']").val(),
			"Email":	$("#sign-up-form input[name='Email']").val(),
			"Address": $("#sign-up-form input[name='Address']").val(),
			"City": $("#sign-up-form input[name='City']").val(),
			"State": $("#sign-up-form input[name='State']").val(),
			"Zip": $("#sign-up-form input[name='Zip Code']").val(),
			"Package": $("#sign-up-form input[name='Package']:checked").val(),
			"Add-Ons": addOns.join(', ')
		  },
		  success: function(resp){
			location.href="/message-sent?m=order"
		  }
		});	

		/*
		This posted to a google sheet
		const data = {
		  "First Name": $("input[name='First Name']").val(),
		  "Last Name": $("input[name='Last Name']").val(),
		  "Phone": $("input[name='Phone']").val(),
		  "Email":	$("input[name='Email']").val(),
		  "Address": $("input[name='Address']").val(),
		  "City": $("input[name='City']").val(),
		  "State": $("input[name='State']").val(),
		  "Zip": $("input[name='Zip Code']").val(),
		  "Package": $("input[name='Package']:checked").val(),
		  "Add-Ons": addOns.join(', '),
		  "Fire Stick": fireStick
		}

		console.log(data);

		$.ajax({
		  url: 'https://script.google.com/macros/s/AKfycbyWS6hhveRRe95kJWLwNr1rd97Yw1waejknUOWISB0NE7OMgMY/exec',
		  method: "GET",
		  dataType: "json",
		  data: data
		}).success(function(){
		  location.href="/message-sent"
		});
		*/
	  } else {

		let subject = "Homestream TV Form Submitted";

		$.ajax({
		  url: "/forms/mail.aspx",
		  method: "POST",
		  dataType: "json",
		  data: {
			//".cfg.sendTo": "tower@bluetonemedia.com",
			".cfg.sendTo": "service@hometelco.com", 
			".cfg.action": "StoreOnly",
			".cfg.sendFrom": "support@bluetonemedia.com",
			".cfg.sendSubject": subject,
			"First Name": $("#sign-up-form input[name='First Name']").val(),
			"Last Name": $("#sign-up-form input[name='Last Name']").val(),
			"Phone": $("#sign-up-form input[name='Phone']").val(),
			"Email":	$("#sign-up-form input[name='Email']").val(),
			"Address": $("#sign-up-form input[name='Address']").val(),
			"City": $("#sign-up-form input[name='City']").val(),
			"State": $("#sign-up-form input[name='State']").val(),
			"Zip": $("#sign-up-form input[name='Zip Code']").val(),
			"Package": $("#sign-up-form input[name='Package']:checked").val(),
			"Add-Ons": addOns.join(', ')
		  },
		  success: function(resp){
			postToMasterGoogleSheet(subject);
		  }
		});	
	  }


	});

	function postToMasterGoogleSheet(subject) {

	  let date = new Date();

	  //config for google sheets
	  let config = {
		'Name': $("#sign-up-form input[name='First Name']").val() + ' ' + $("#sign-up-form input[name='Last Name']").val(),
		'Address': $("#sign-up-form input[name='Address']").val() + ' ' + $("#sign-up-form input[name='City']").val() + ', ' + $("#sign-up-form input[name='State']").val() + ' ' + $("#sign-up-form input[name='Zip Code']").val(),
		'Phone': $("#sign-up-form input[name='Phone']").val(),
		"Email": $("#sign-up-form input[name='Email']").val(),
		'Subject': subject,
		'Date': date
	  }

	  //Post to google sheets
	  let jqxhr = $.ajax({
		url: 'https://script.google.com/macros/s/AKfycbxJmXsMsQjJ9gadw0wBux1nPhJV3-4ak3MH-tPvF_DZX3IY0Joj/exec',
		method: "GET",
		dataType: "json",
		data: config,
		success: function() {
		  location.href = "/message-sent";
		}
	  })  
	  }//end postToMasterGoogleSheet()
	
  });

