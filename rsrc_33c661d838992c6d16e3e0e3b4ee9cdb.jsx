
  $(document).ready(function() {
	$(".faq-question").click(function(){
	  $(this).find('.fa').toggleClass("down");
	});

	$('.faq-answer').hide();
	var allPanels = $('.faq-question').next('.faq-answer');

	$('.faq-question').click(function () {
	  $this = $(this);
	  $target = $this.next('.faq-answer');
	  $('.faq-question').removeClass('minus');
	  if ($target.is(':hidden')) {
		allPanels.not(this).slideUp();
		$target.slideDown();
		$(this).addClass('minus');
	  } else {
		allPanels.not(this).slideUp();
		$target.slideUp();
		$('.faq-question').removeClass('minus');
	  }
	  return false;
	});



	$('#acp-form-submit').on('click', function() {

	  //disable submit button
	  $('#acp-form-submit').attr('disabled', true);

	  //check form validity before doing anything
	  let form = document.getElementById('acp-form')
	  if( form.reportValidity() ) {
		sendEmail();
	  } else {
		$('#acp-form-submit').attr('disabled', false);
	  }

	});

	$("#acp-form").hide();
	$("#form-toggle-button, #sign-up-text").click(function() {
	  $("#acp-form").toggle();
	});

	function sendEmail() {

	  //adds inputs to config
	  let config = $('#acp-form').serializeArray();
	  config = objectifyForm(config);

	  let p = [];
	  $("#eligibility input:checked").each(function() {
		p.push($(this).val());
	  });
	  const programs = p.join(",");

	  config['.cfg.sendTo'] = 'service@hometelco.com';
	  //config['.cfg.sendTo'] = 'tower@bluetonemedia.com';
	  config['.cfg.sendSubject'] = 'ACP Form Submitted';
	  config['.cfg.sendFrom'] = 'noreply@hometelco.com';
	  config["All Eligibility Programs"] = programs;

	  //Renaming some fields to match the new sheet
	  config["Last 4 #'s of SS"] = config["SSN"];
	  config["Dependent SS# (last 4 digits only)"] = config["Dependent SSN"];
	  config["Application ID"] = config["NVA ID"];
	  config["Contact Number (NO DASH)"] = config["Phone"].replace(/\D/g,'');

	  config["Application ID"] = $("#application-id").val()
	  
	  //Post to google sheets
	  //requested to be disabled on 7/7/2022
	  //$.ajax({
	  //	url: 'https://script.google.com/macros/s/AKfycbwAjmjPDb1-r644H-leMP9Vd_oEqQz5D34K3ohiOhDaEIoS2_ansP6Rgtu38gvkdM60/exec',
	  //	//url: 'https://script.google.com/macros/s/AKfycbwyVP8YcO8jTR_vQn_m4mCQd6CJ-syofhNgnKdnwXGjxQ4PwUh1/exec',  <-- old sheet
	  //	method: "GET",
	  //	dataType: "json",
	  //	data: config,
	  //	success: function(resp) {
	  //basically nothing
	  //	}
	  //})

	  //actually send
	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function (data) {
		  if(data.Success) {
			if ($("#confirmation-contact").is(":checked")) {
			  location.href = "/message-sent?m=order";
			} else {
			  location.href = "/message-sent?m=no-confirmation";
			}
		  } else {
			alert(data.Message);
			$('#acp-form-submit').attr('disabled', false);
		  }
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });

	}//end sendEmail()

	function objectifyForm(formArray) {
	  let returnArray = {};
	  for (let i = 0; i < formArray.length; i++){

		//filters out empty fields
		if(formArray[i]['value'] != '') {
		  returnArray[formArray[i]['name']] = formArray[i]['value'];
		}
	  }
	  return returnArray;
	}//end objectifyForm()


	//dependent section logic, added 3/30/2022 by tower
	//note 8/8/2022: not exclusively for dependents anymore
	function updateDependentSection() {
	  if ($("#qualifyingPerson")[0].checked && !$("#qualifyingPersonAbove")[0].checked) {
		$("#dependent-section").show();
	  } else {
		//hide but also clear out the values so they don't accidentally still get sent if the user put in info then unchecked the box
		$("#dependent-section").hide();
		$("#dependent-section input").each(function() {
		  $(this).val("");
		});
	  }
	}
	updateDependentSection();
	$("#qualifyingPerson").change(updateDependentSection);
	$("#qualifyingPersonAbove").change(updateDependentSection);




	$("p.faq-question").click(function(){
	  $(this).find('.fa').toggleClass("down");
	});

	var allPanels = $('p.faq-question').next('.faq-answer');

	$('p.faq-question').click(function () {
	  $this = $(this);
	  $target = $this.next('.faq-answer');
	  $('p.faq-question').removeClass('minus');
	  if ($target.is(':hidden')) {
		allPanels.not(this).slideUp();
		$target.slideDown();
		$(this).addClass('minus');
	  } else {
		allPanels.not(this).slideUp();
		$target.slideUp();
		$('p.faq-question').removeClass('minus');
	  }
	  return false;
	});

	$("#alreadyCustomer").change(function() {	  
	  // If checked
	  if ($("#alreadyCustomer").is(":checked")) {
		//show the hidden div
		$("#acctNum").slideDown();
		$("#acctNum input").prop('required',true);
	  } else {
		//otherwise, hide it
		$("#acctNum").slideUp();
		$("#acctNum input").prop('required',false);
	  }
	});

	$("#mailingAddress").change(function() {	  
	  // If checked
	  if ($("#mailingAddress").is(":checked")) {
		//show the hidden div
		$("#mailingAddressInfo").slideUp();
		$("#mailingAddressInfo input").prop('required',false);
	  } else {
		//otherwise, hide it
		$("#mailingAddressInfo").slideDown();
		$("#mailingAddressInfo input").prop('required',true);
	  }
	});

	//school district
	$("#SchoolLunchProgram").change(function() {
	  if ($("#SchoolLunchProgram").is(":checked")) {
		$("#SchoolLunchProgramDistrict").slideDown();
		$("#SchoolLunchProgramDistrict").prop("required", true);
	  } else {
		$("#SchoolLunchProgramDistrict").slideUp();
		$("#SchoolLunchProgramDistrict").prop("required", false);
	  }
	});
  });
