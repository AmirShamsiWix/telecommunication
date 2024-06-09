

  $(document).ready(function () {

	var $infoFooter = $('.info-footer');
	var $infoForm = $('#footer-form');
	var $infoArrows = $('.footer-arrows');

	$infoFooter.removeClass('info-expanded');
	$infoForm.hide();
	$infoArrows.removeClass('fa-angle-down').addClass('fa-angle-up');

	$('.info-top').on('click', function() {

	  var expanded = $infoFooter.hasClass('info-expanded');

	  if(expanded) {
		$infoFooter.removeClass('info-expanded');
		$infoForm.hide();
		$infoArrows.removeClass('fa-angle-down').addClass('fa-angle-up');
	  } else {
		$infoFooter.addClass('info-expanded');
		$infoForm.fadeIn();
		$infoArrows.removeClass('fa-angle-up').addClass('fa-angle-down');
	  }

	});

	$('#footer-form').on('submit', function(e) {
	  e.preventDefault();
	  
	  const submit = $("#footer-form button");
	  submit.prop("disabled", true);
	  submit.css("background-color", "grey");
	  submit.css("cursor", "wait");
	  $("body").css("cursor", "wait");

	  $.ajax({
		url : 'formprocess.aspx?id=##',
		type: "post",
		data: $(this).serialize(),
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

