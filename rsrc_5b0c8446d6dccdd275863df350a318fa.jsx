
  $(function() {

	$('#management-submit').on('click', (e) => {
	  e.preventDefault();

	  isValid();  
	});
	
	function isValid() {

	  let form = document.getElementById('management-form');
	  if( form.reportValidity() ) {
		sendEmail();
	  } else {
		return false;
	  }
	  
	}
	
	function sendEmail() {
	  
	  let date = new Date();
	  
	  let config = {
		'.cfg.sendTo': 'caoimhe.zett@hometelco.com',
		'.cfg.sendFrom': 'noreply@hometelco.com',
		'.cfg.sendSubject': 'HomeSC Email Management Contact Form Filled Out',
		'First Name': $('#fname').val(),
		'Last Name': $('#lname').val(),
		'Email': $('#email').val(),
		'Phone': $('#phone').val(),
		'Address': $('#address').val(),
		'City': $('#city').val(),
		'State': $('#state').val(),
		'Zip': $('#zip').val(),
		'Comments': $('#comments').val(),
		'Date': date
	  }
	  
	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function (data) {
		  
		  if(data.Success) {
			postToGoogleSheet()
		  } else {
			alert(data.Message);
		  }
		  
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });
	  
	}//end sendEmail()

	function postToGoogleSheet() {


	  let config = {
		'excel_tab': "Management",
		'First Name': $('#fname').val(),
		'Last Name': $('#lname').val(),
		'Phone': $('#phone').val(),
		'Email': $('#email').val(),
		'Address': $('#address').val(),
		'City': $('#city').val(),
		'State': $('#state').val(),
		'Zip': $('#zip').val(),
		'Comments': $('#comments').val(),
		'Date': new Date()
	  }

	  let jqxhr = $.ajax({

		//Posts to sheet "Management"
		url: 'https://hooks.zapier.com/hooks/catch/2576766/38djj4e/',

		method: "GET",
		dataType: "json",
		data: config,
		success: function(resp) {
		  console.dir(resp);
		  location.href = '/message-sent';
		},
		error: function() {
		  alert('Something went wrong. Please try again later');
		 
		}
	  })  
	  }	  

  });
