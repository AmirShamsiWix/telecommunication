
  $(document).ready(function() {
	
	$("#form-toggle-button, #sign-up-text").click(function() {
	  $("#acp-form").slideToggle();
	});
	
	$('#acp-form-submit').on('click', function(e) {
	  e.preventDefault();

	  $('#acp-form-submit').attr('disabled', true);

	  //check form validity before doing anything
	  let form = document.getElementById('acp-form')
	  if( form.reportValidity() ) {
		isUploadRequired();
	  } else {
		$('#acp-form-submit').attr('disabled', false);
	  }

	});

	function isUploadRequired() {
	  //if any are checked then upload is required
	  const checked = $("#eligibility input:checked").length;
	  
	  //we check if required or not since it's always an option to upload
	  if(checked > 0) {
		checkForUpload(true);
	  } else {
		checkForUpload(false);
	  }
	  
	}//end isUploadRequired()
	
	function checkForUpload(required) {

	  let files = $('.filename').length;
	  
	  //if any files upload them
	  if(files > 0) {
		$("#uploadFile").uploadifive('upload');
	  } 
	  
	  //if no files but a file is required 
	  else if(required) {
		alert('Please select a file for upload to continue.');
		$('#acp-form-submit').attr('disabled', false);
	  }
	  
	  //if no files but not required continue with the email
	  else {
		sendEmail();
	  }
	
	}//end checkForUpload()
	

	//FILE UPLOAD START
	let folder = '/Images/HomeSC/uploads/community-connect/';

	$("#uploadFile").uploadifive({
	  'uploadScript': '/CommonAssets/BTMUploader.aspx',
	  'fileSizeLimit': '10MB',
	  'multi': false,
	  'queueSizeLimit': 1,
	  'auto': false,
	  'onUploadFile' : function(file) {

		
		let newfn = file.name;
		
		//generate random file name
		newfn = newfn.replace(/\s/g, '_');
		let chars = "abcdefghijklmnopqrstuvwxtz0123456789";
		let string_length = 30;
		let myrnd = [], pos;
		while (string_length--) {
		  pos = Math.floor(Math.random() * chars.length);
		  myrnd.push(chars.substr(pos, 1));
		}
		let ext = newfn.substr( newfn.lastIndexOf(".") + 1);
		let fn = newfn.substr(0, newfn.lastIndexOf(".") );

		newfn = myrnd.join('') + "." + ext;	  
	
		
		let newFilePath = folder + newfn;
		let fullpath = `https://www.homesc.com${newFilePath}`;
		$(this).data('uploadifive').settings.formData = { 'folder' : folder, 'newfilename': newfn };

		//this is so objectifyForm() can grab the path to include in the email
		let newInput = `<input class="file" name="File" type="hidden" value="${fullpath}" />`
		$("#all-file-paths").append(newInput);
		

	  },
	  'onQueueComplete': () => {
		//file has been uploaded
		sendEmail();
	  }
	});
	//FILE UPLOAD END

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
	  config['.cfg.sendSubject'] = 'Community Connect Form Submitted';
	  config['.cfg.sendFrom'] = 'noreply@hometelco.com';
	  config["All Eligibility Programs"] = programs;

	  //Renaming some fields to match the new sheet
	  //we can probably skip this since it doesn't post to a sheet anymore
	  config["Last 4 #'s of SS"] = config["SSN"];
	  config["Dependent SS# (last 4 digits only)"] = config["Dependent SSN"];
	  config["Application ID"] = config["NVA ID"];
	  config["Contact Number (NO DASH)"] = config["Phone"].replace(/\D/g,'');
	  
	  console.dir(config);
	  
	  //actually send
	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: (resp) => {
		  
		  if(resp.Success) {
			if ($("#confirmation-contact").is(":checked")) {
			  location.href = "/message-sent?m=order";
			} else {
			  location.href = "/message-sent?m=no-confirmation";
			}
		  } else {
			alert(resp.Message);
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
