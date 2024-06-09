

  $(document).ready(function() {

	//SOURCE TEST START

	const visited = sessionStorage.getItem('visited');
	if(!visited) {
	  const referrer = document.referrer;
	  sessionStorage.setItem('referrer', referrer);
	  sessionStorage.setItem('visited', true);
	}
	
	const referrer = sessionStorage.getItem('referrer');
	if(referrer) {
	  
	  //add a hidden intput to everyform with the referrer value	  
	  $('form').each((index, $form) => {

		const input = `<input type="hidden" />`;
		$(input)
		.attr('value', referrer)
		.attr('name', 'referrer')
		.appendTo($form);
	
	  });
	  
	}

	//SOURCE TEST END

	//MAIN NAV
	setNavSpacing();

	$(window).resize(function(){
	  setNavSpacing();
	});

	function setNavSpacing() {
	  const internetSpace = $('.internet-nav').offset().left;
	  const videoSpace = $('.video-nav').offset().left;
	  const voiceSpace = $('.voice-nav').offset().left;

	  $('.internet-sub-nav').css('padding-left', internetSpace + 'px');
	  $('.video-sub-nav').css('padding-left', videoSpace + 'px');
	  $('.voice-sub-nav').css('padding-left', voiceSpace + 'px');
	}

	//FOOTER NAV
	//set height and vertical position of footer subnav bg element
	$('#f-nav li').mouseenter(function() {
	  const ulHeight = $(this).find('ul').height();
	  $('#it-works').css('height', ulHeight + 'px');
	  $('#it-works').css('top', '-' + ulHeight + 'px');
	  $('#it-works').css('display', 'block');
	});

	$('#f-nav').mouseleave(function() {
	  $('#it-works').css('display', 'none');
	});
	//Address Display	
	checkForAddress();	

	function checkForAddress() {	
	  const address = localStorage.getItem('Full_Address');	
	  if(address) {	
		showAddress(address);	
	  } else {	
		$('.address-con').remove();	
	  }	
	}	

	function showAddress(address) {	
	  $('.insert-address').text(address);	
	  $('.clear-button').show();	
	}	

	$('.clear-button').on('click', function() {	
	  //clear location data	
	  localStorage.removeItem('Address_1');	
	  localStorage.removeItem('Address_2');	
	  localStorage.removeItem('Full_Address');	
	  localStorage.removeItem('City');	
	  localStorage.removeItem('State');	
	  localStorage.removeItem('Zip');	
	  localStorage.removeItem('Zone');	

	  //clear shop tool progress	
	  localStorage.removeItem('shopToolProgress');	

	  //reload to show address input	
	  location.reload();	
	});	
  });	
