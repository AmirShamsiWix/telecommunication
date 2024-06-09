
  $(document).ready(function() {

	$('.slider').slick({
	  slidesToShow: 3,
	  dots: true,
	  arrows: true,
	  infinite: false,
	  responsive: [
		{
		  breakpoint: 1400,
		  settings: {
			slidesToShow: 1,
			dots: false,
			arrows: true
		  }
		}
	  ]
	});

	$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){

	  const windowWidth = parseInt(window.innerWidth);
	  let slidePositions;

	  if(windowWidth < 1400) {
		slidePositions = 6;
	  } else {
		slidePositions = 4;
	  }

	  //console.log('nextSlide: ' + nextSlide);
	  //console.log('windowWidth: ' + windowWidth);
	  //console.log('slidePositions: ' + slidePositions);

	  if(nextSlide == 0) {
		$('.slick-prev.slick-arrow').css('visibility', 'hidden');
	  } else if(nextSlide == (slidePositions - 1)) {
		$('.slick-next.slick-arrow').css('visibility', 'hidden');
	  } else {
		$('.slick-prev.slick-arrow').css('visibility', 'visible');
		$('.slick-next.slick-arrow').css('visibility', 'visible');
	  }

	});

	//this makes makes slick slider initialize below 1201 px only
	//poor communication on task =(
	//slickMobileOnly(1201);

	function slickMobileOnly(breakpoint) {

	  //check on load
	  const width = $(window).width();
	  slider(width, breakpoint);	

	  //check on resize
	  $(window).on("resize", function () {
		const width = $(window).width();
		slider(width, breakpoint);	
	  });

	}//end slickMobileOnly()

	function slider(width, breakpoint) {

	  if((width < breakpoint) && (!$('.slider').hasClass("slick-initialized"))) {
		$('.slider').slick();
	  } 

	  else if ((width > breakpoint) && ($('.slider').hasClass("slick-initialized"))) {
		$('.slider').slick('unslick');
	  }

	}//end slider()

  });
