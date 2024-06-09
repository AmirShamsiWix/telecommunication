
  $(document).ready(function() {

	$('#submit-community-form-btn').on('click', function(e) {
	  e.preventDefault();
	  //disable submit button to prevent multiple submits while processing
	  $('#submit-community-form-btn').prop('disabled', true);

	  validateForm();
	});

	function validateForm() {
	  const form = document.getElementById('c-form');
	  if( form.reportValidity() ) {
		checkForUpload();
	  } else {
		//enable submit button if form not valid
		$('#submit-community-form-btn').prop('disabled', false);
	  }
	}

	function checkForUpload() {
	  //if no file...
	  if ($('input[type="file"]').val() == '') {
		//just submit the form
		$('#c-form').submit();
	  } else {
		//upload file first
		$("#uploadImage").uploadifive('upload');
	  }
	}	  

	let folder = '/Images/HomeSC/2023/community-engagement-requests/';

	$("#uploadImage").uploadifive({
	  'uploadScript': '/CommonAssets/BTMUploader.aspx',
	  'fileSizeLimit': '10MB',
	  'multi': false,
	  'queueSizeLimit': 1,
	  'auto': false,
	  'onUploadFile' : function(file) {

		let newfn = file.name;
		newfn = newfn.replace(/\s/g, '_');
		let chars = "abcdefghijklmnopqrstuvwxtz0123456789";
		let string_length = 50;
		let myrnd = [], pos;
		while (string_length--) {
		  pos = Math.floor(Math.random() * chars.length);
		  myrnd.push(chars.substr(pos, 1));
		}
		let ext = newfn.substr( newfn.lastIndexOf(".") + 1);
		let fn = newfn.substr(0, newfn.lastIndexOf(".") );

		newfn = myrnd.join('') + "." + ext;	  	

		let newFilePath = folder + newfn;

		$(this).data('uploadifive').settings.formData = { 'folder' : folder, 'newfilename': newfn };

		let newInput = `<input name="File" type="hidden" value="https://homesc.com${newFilePath}" />`
		$("#all-file-paths").append(newInput);

	  },
	  'onQueueComplete': function() {
		//file has uploaded, let's submit the form
		$('#c-form').submit();
	  }
	});

  });
