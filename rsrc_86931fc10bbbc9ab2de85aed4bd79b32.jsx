
  $(document).ready(function () {

	/*
	document.querySelectorAll("#service-categories li").forEach(n => {
	  n.addEventListener("click", () => n.classList.toggle("active"))
	})
	*/

	$("#service-categories li").click(function() {
	  $(this).toggleClass("active")
	})

	$('#c-form').on('submit', function(e) {
	  e.preventDefault();

	  var config = {
		'.cfg.sendTo': 'service@hometelco.com',
		'.cfg.sendFrom': 'noreply@hometelco.com',
		'.cfg.sendSubject': 'Existing Customer Upgrade Order Form',
		'First Name': $('#fname').val(),
		'Last Name': $('#lname').val(),
		'Email': $('#email').val(),
		'Phone': $('#phone').val(),
		'Address': $('#address').val(),
		'City': $('#city').val(),
		'State': $('#state').val(),
		'Zip': $('#zip').val(),
	  }

	  let services = []
	  $("#service-categories li.active").each(function() {
		services.push($(this).text().trim())
	  })
	  config["Interested Services"] = services.join(", ")

	  $.ajax({
		url : "forms/mail.aspx",
		type: "post",
		dataType: "json",
		data: config,
		success: function (data) {
		  location.href="/message-sent";
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });

	});
  }); 
