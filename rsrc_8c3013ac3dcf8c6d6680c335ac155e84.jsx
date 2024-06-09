

  $(document).ready(function($) {

	let firstCount = false;
	
	$('.cycle-slideshow').on('cycle-after', function(event, opts) {

	  if(!firstCount) {
		const slide = opts.slideNum;
		if(slide == 2) {
		  firstCount = true;
		  $('.cycle-slide-active .security_item h3.count-number').counterUp({
			time: 2000
		  });
		}
	  }

	});

	/*
	  $( '.cycle-slideshow' ).on( 'cycle-after', function( event, opts ) {

		  $('.cycle-slide-active .security_item h3.count-number').counterUp({
			  delay: 100,
			  time: 2000
		  });
	  });
	  */

  });

  /* $(document).ready(function() {
	  $(window).scroll(function() {
		  var sectionOffset = $('#wifi-xtreme').offset().top;
		  var scrollPosition = $(window).scrollTop();
		  var windowHeight = $(window).height();

		  // Check if the user has scrolled to the section
		  if (scrollPosition + windowHeight >= sectionOffset) {
			  $('.count-number').counterUp({
				  delay: 1000,
				  time: 1500
			  });

			  // Unbind the scroll event to prevent the code from running multiple times
			  $(window).off('scroll');
		  }
	  });
  }); */

