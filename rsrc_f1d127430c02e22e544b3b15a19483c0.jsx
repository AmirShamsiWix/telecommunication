
  $(document).ready(function () {

	$("#internet").click(function(){
	});


	$("#streams").change(function() {
	  if(document.getElementById('streams').checked){
		$('#add-streams-extras').show();
	  }else{
		$('#add-streams-extras').hide();
		document.getElementById("streamForm").selectedIndex = "0";
	  }
	});


	$("#cloud").change(function() {
	  if(document.getElementById('cloud').checked){
		$('#cloud-dvr-extras').show();
	  }else{
		$('#cloud-dvr-extras').hide();
		document.getElementById("cloudForm").selectedIndex = "0";
	  }
	});


	$("#internet").change(function() {
	  if(document.getElementById('internet').checked){
		$('.internetForm').show();
	  }else{
		$('.internetForm').hide();
		$('#fastest').prop( "checked", false );
		$('#midRange').prop( "checked", false );
		$('#minimum').prop( "checked", false );
		$('#mywifi').prop( "checked", false );
	  }
	});


	$("#video").change(function() {
	  if(document.getElementById('video').checked){
		$('.videoForm').show();
	  }else{
		$('.videoForm').hide();
		$('#basic').prop( "checked", false );
		$('#essential').prop( "checked", false );
		$('#sports').prop( "checked", false );
		$('#cloud').prop( "checked", false );
		$('#streams').prop( "checked", false );
		$('#pMovies').prop( "checked", false );
		document.getElementById("streamForm").selectedIndex = "0";
		document.getElementById("cloudForm").selectedIndex = "0";
		$('#add-streams-extras').hide();
		$('#cloud-dvr-extras').hide();
	  }

	  if(document.getElementById('pMovies').checked){
		$('.premiumMovies').show();
	  }else{
		$('.premiumMovies').hide();
		$('#hbo').prop( "checked", false );
		$('#showtime').prop( "checked", false );
		$('#starz').prop( "checked", false );
		$('#cinemax').prop( "checked", false );
	  }
	});


	$("#pMovies").change(function() {
	  if(document.getElementById('pMovies').checked){
		$('.premiumMovies').show();
	  }else{
		$('.premiumMovies').hide();
		$('#hbo').prop( "checked", false );
		$('#showtime').prop( "checked", false );
		$('#starz').prop( "checked", false );
		$('#cinemax').prop( "checked", false );
	  }
	});


	//Profiles Logic
	$('#zoomButton').click(function(){
	  $('#zoomDiv').addClass('active');
	  $('#cordDiv').removeClass('active');
	  $('#ultraDiv').removeClass('active');

	  $('#su-form')[0].reset();

	  $('#cloud-dvr-extras').hide();
	  document.getElementById("cloudForm").selectedIndex = "0";  
	  $('#add-streams-extras').hide();
	  document.getElementById("streamForm").selectedIndex = "0";

	  $('.premiumMovies').hide();

	  $( "#internet" ).click();

	  $('#midRange').prop( "checked", true );
	  $('#mywifi').prop( "checked", true );
	  $('#security').prop( "checked", true );
	  //$('#homeAutomation').prop( "checked", true );
	});


	$('#ultraButton').click(function(){
	  $('#ultraDiv').addClass('active');
	  $('#cordDiv').removeClass('active');
	  $('#zoomDiv').removeClass('active');

	  $('#su-form')[0].reset();

	  $('#cloud-dvr-extras').hide();
	  document.getElementById("cloudForm").selectedIndex = "0";  
	  $('#add-streams-extras').hide();
	  document.getElementById("streamForm").selectedIndex = "0";

	  $('.premiumMovies').hide();
	  $("#internet").click();
	  $('#fastest').prop( "checked", true );
	  $('#mywifi').prop( "checked", true );
	});


	$('#cordButton').click(function(){
	  $('#cordDiv').addClass('active');
	  $('#zoomDiv').removeClass('active');
	  $('#ultraDiv').removeClass('active');

	  $('#su-form')[0].reset();

	  $('#cloud-dvr-extras').hide();
	  document.getElementById("cloudForm").selectedIndex = "0";  
	  $('#add-streams-extras').hide();
	  document.getElementById("streamForm").selectedIndex = "0";

	  $('.premiumMovies').hide();

	  $( "#internet" ).click();
	  $( "#video" ).click();
	  $('#midRange').prop( "checked", true );
	  $('#mywifi').prop( "checked", true );
	  $('#basic').prop( "checked", true );
	});

  });


  $(document).ready(function () {
	$('#su-form').on('submit', function(e) {
	  e.preventDefault();

	  //quick check for valid email format (anything more is likely going overboard)
	  const email = $('#email').val()
	  if (!email.includes("@") || !email.includes(".")) {
		alert("Please enter a valid email address.");
		$('#email').val("");
		return false;
	  }

	  const submit = $("#submit-btn");
	  submit.prop("disabled", true);
	  submit.css("background-color", "grey");
	  submit.css("cursor", "wait");
	  $("body").css("cursor", "wait");

	  // Setup Config.
	  var config = {
		'.cfg.sendTo': 'service@hometelco.com',
		'.cfg.action': 'StoreOnly',
		'.cfg.sendFrom': 'noreply@hometelco.com',
		'.cfg.sendSubject': 'Bundles Form',
		'First Name': $('#name').val(),
		'Last Name': $('#lname').val(),
		'Phone': $('#phone').val(),
		'Email': email,
		'Address': $('#address').val(),
		'ZIP Code': $('#zip-code').val(),
		'City': $('#city').val(),
		'State': $('#state').val(),
		'Internet': $('#internet').is(":checked"),
		'Fastest Internet': $('#fastest').is(":checked"),
		'Mid-Range Internet': $('#midRange').is(":checked"),
		'Minimum Internet': $('#minimum').is(":checked"),
		'Video': $('#video').is(":checked"),
		'Limited Basic ': false,
		'Basic': $('#basic').is(":checked"),
		'Essential': $('#essential').is(":checked"),
		'Premium Movies': $('#pMovies').is(":checked"),
		'HBO': $('#hbo').is(":checked"),
		'Showtime': $('#showtime').is(":checked"),
		'Starz': $('#starz').is(":checked"),
		'Cinemax': $('#cinemax').is(":checked"),
		'NFL RedZone': $('#sports').is(":checked"),
		'Cloud DVR': $('#cloud').is(":checked"),
		'DVR Option': $('#cloudForm').val(),
		'Additional Streams': $('#streams').is(":checked"),
		'Stream Option': $('#streamForm').val(),
		'Voice': $('#voice').is(":checked"),
		'Security': $('#security').is(":checked"),
		'Home Automation': $('#homeAutomation').is(":checked"),
		"Confirmation Contact": $("#confirmation-contact").is(":checked"),
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
