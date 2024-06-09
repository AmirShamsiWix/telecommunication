
  $(function () {
	$('.information-results > article:first').show();
	$('#information-nav a').click(function () {
	  $('.information-results > article').each(function () {
		$(this).hide();
	  });
	  var id = $(this).attr('id');
	  $('#information-nav li').each(function () {
		$(this).removeClass('active');
	  });
	  $(this).parent().addClass('active');
	  $('.information-results .' + id).fadeIn();
	  return false;
	});
  });


  $(function () {
	$('.information-results2 > article:first').show();
	$('#information-nav2 a').click(function () {
	  $('.information-results2 > article').each(function () {
		$(this).hide();
	  });
	  var id = $(this).attr('id');
	  $('#information-nav2 li').each(function () {
		$(this).removeClass('active');
	  });
	  $(this).parent().addClass('active');
	  $('.information-results2 .' + id).fadeIn();
	  return false;
	});
  });


  $(document).ready(function() {

	// Modal form
	$('.js-fancy').fancybox({
	  openEffect: 'elastic',
	  closeEffect: 'elastic',
	  helpers: {
		title: null,
		overlay: {
		  locked: false
		}
	  },
	  wrapCSS: 'contact-form',
	  padding: 20,
	  afterLoad: function() {
		$(document).trigger('updateshadowdom');
	  }
	});

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	let open = urlParams.get('open');

	if(open) {

	  if(open == 'service-form') {
		$('#open-report-form').click();
	  } else if(open == 'general-form') {
		$('#open-general-form').click();
	  }
	}

  });
