
  $(document).ready(function() {

	let $window = $(window);
	let fromTop = 1580;

	$window.scroll(function() {

	  //console.log( $window.scrollTop() + ' | ' + fromTop );	  

	  $('.sticky-divs').toggleClass('sticky', $window.scrollTop() > fromTop);
	});

	$('#community-collapse-toggle').on('click', function() {

	  let state = $(this).attr('aria-expanded');

	  //if state == 'false' we are expanding the element
	  if(state == 'false') {

		//so lets scroll it into view
		//selecting an element a little higher so it doesn't get hid behind the nav
		const element = document.getElementById('scroll-here');
		element.scrollIntoView();
	  }

	});

	$('#accordion').on('shown.bs.collapse', function () {

	  var panel = $(this).find('.in');

	  $('html, body').animate({
		scrollTop: panel.offset().top
	  }, 500);

	});

  });

  window.addEventListener("hashchange", function () {
	window.scrollTo(window.scrollX, window.scrollY - 200);
  });

  var limLineup = document.querySelector("#collapseOne");
  var basicLineup = document.querySelector("#collapseTwo");
  var essentialLineup = document.querySelector("#collapseThree");
  var premiumLineup = document.querySelector("#collapseFour");
  
  function closeChannels() {
	document.getElementById("close-channels").style.display = 'none';
	$('.col-one').removeClass('in');
	$('.col-two').removeClass('in');
	$('.col-three').removeClass('in');
	$('.col-four').removeClass('in');	
  };

  function limBasicOpen() {
	document.getElementById("close-channels").style.display = 'block';
	$('.col-one').addClass('in');
	$('.col-two').removeClass('in');
	$('.col-three').removeClass('in');
	$('.col-four').removeClass('in');
	//document.getElementById("close-channels").setAttribute('onclick','limBasicOpen()')
	$("#channel-anchor")[0].scrollIntoView();
  }

  function basicOpen() {
	document.getElementById("close-channels").style.display = 'block';
	$('.col-one').removeClass('in');
	$('.col-two').addClass('in');
	$('.col-three').removeClass('in');
	$('.col-four').removeClass('in');
	//document.getElementById("close-channels").setAttribute('onclick','basicOpen()')
	$("#channel-anchor")[0].scrollIntoView();
  }

  function essentialOpen() {
	document.getElementById("close-channels").style.display = 'block';
	$('.col-one').removeClass('in');
	$('.col-two').removeClass('in');
	$('.col-three').addClass('in');
	$('.col-four').removeClass('in');
	//document.getElementById("close-channels").setAttribute('onclick','essentialOpen()')
	$("#channel-anchor")[0].scrollIntoView();
  }

  function premiumOpen() {
	document.getElementById("close-channels").style.display = 'block';
	$('.col-one').removeClass('in');
	$('.col-two').removeClass('in');
	$('.col-three').removeClass('in');
	$('.col-four').addClass('in');
	//document.getElementById("close-channels").setAttribute('onclick','premiumOpen()')
	window.location.href="#anchor";
  }


  function myAddons() {
	var elmnt = document.getElementById("addons-wrap");
	elmnt.scrollIntoView();
  }

