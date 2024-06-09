
  $(document).ready(function() {

	$('.slider').slick({
	  slidesToShow: 1,
	  dots: false,
	  arrows: true,
	  speed: 1000,
	  //autoplay: true,
	  //autoplaySpeed: 10000,
	});

	$('button.ctax').on('click', function() {

	  const which = $(this).data('more');
	  $(this).slideUp();
	  $('.learn-morex.' + which).slideDown();
	});

	$('#boxes .see-more').on('click', function() {

	  //toggle the see more/less buttons
	  $(this).toggle();
	  $(this).next('.see-less').toggle();

	  //hide the short version and slide in the full version
	  $(this).prev().prev('.short').toggle();
	  $(this).prev('.full').slideToggle();

	});

	$('#boxes .see-less').on('click', function() {

	  //toggle the see more/less buttons
	  $(this).toggle();
	  $(this).prev('.see-more').toggle();

	  //hide the short version and slide in the full version
	  $(this).prev().prev().prev('.short').toggle();
	  $(this).prev().prev('.full').slideToggle();
	});

	var allPanels = $('.question').next('.answer');

	$('.question').click(function () {
	  $this = $(this);
	  $target = $this.next('.answer');
	  $('.question').removeClass('active');
	  if ($target.is(':hidden')) {
		allPanels.not(this).slideUp();
		$target.slideDown();
		$(this).addClass('active');
	  } else {
		allPanels.not(this).slideUp();
		$target.slideUp();
		$('.question').removeClass('active');
	  }
	  return false;
	});

  });
