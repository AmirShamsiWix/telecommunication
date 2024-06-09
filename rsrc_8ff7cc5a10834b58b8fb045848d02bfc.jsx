

  $(function () {
	$('.preview').fancybox({
	  openEffect: 'elastic',
	  closeEffect: 'elastic',
	  helpers: {
		title: null,
		overlay: {
		  'speedIn': 600,
		  'speedOut': 200
		}
	  },
	  scrolling: 'yes',
	  padding: 20
	});

	$('#loa').submit(function (e) {
	  e.preventDefault();

	  if ($('input[type="file"]').val() !== '') {
		$("#uploadImage").uploadifive('upload');
	  } else {
		$('#loa').unbind('submit').submit();
	  }
	});

	let folder = '/Images/HomeSC/bills/';
	let uploadCount = 0;

	$("#uploadImage").uploadifive({
	  'uploadScript': '/CommonAssets/BTMUploader.aspx',
	  'fileSizeLimit': '10MB',
	  'multi': false,
	  'queueSizeLimit': 3,
	  'auto': false,
	  'onUploadFile' : function(file) {
		let newfn = file.name;
		newfn = newfn.replace(/\s/g, '_');
		let chars = "abcdefghijklmnopqrstuvwxtz0123456789";
		let string_length = 50;
		let myrnd = [], pos;
		uploadCount++;
		while (string_length--) {
		  pos = Math.floor(Math.random() * chars.length);
		  myrnd.push(chars.substr(pos, 1));
		}
		let ext = newfn.substr( newfn.lastIndexOf(".") + 1);
		let fn = newfn.substr(0, newfn.lastIndexOf(".") );

		newfn = myrnd.join('') + "." + ext;	  

		$(this).data('uploadifive').settings.formData = { 'folder' : folder, 'newfilename': newfn };

		newfn = newfn
		let newFilePath = folder + newfn;

		let newInput = `<input name="Image${uploadCount}" type="hidden" value="https://www.homesc.com${newFilePath}" />`
		$("#all-file-paths").append(newInput);

	  },
	  'onQueueComplete': function() {
		$('#loa').unbind('submit').submit();
	  }
	});

  });
