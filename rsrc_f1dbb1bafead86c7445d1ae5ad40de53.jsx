
  $(function(){

	$('#c-form').on("submit", (e) => {
	  e.preventDefault();
	  postToGoogleSheet();
	});

	function postToGoogleSheet() {

	  let config = {
		"First Name": $('#fname').val(),
		"Last Name": $('#lname').val(),
		"Email": $('#email').val(),
		'Date': new Date(),
	  };
	  
	  let jqxhr = $.ajax({
		url: 'https://script.google.com/macros/s/AKfycbyo1F2lRlMNJuUMokTz6rlA-wUezGAB150-s2QWQOtCDzdnoOI6bTsIFK4k1movfuaQ/exec',
		method: "GET",
		dataType: "json",
		data: config,
		success: function() {
		  location.href = "/message-sent?m=newsletter";
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });  
	}	 
  });
