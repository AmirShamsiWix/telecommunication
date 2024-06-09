
  $(document).ready(function() {
	return false;

	const options = {
	  threshold: 0.5
	};
	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add("swooshBg")
		}
	  });
	}, options);
	observer.observe(document.querySelector("#easy-tool"));
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

