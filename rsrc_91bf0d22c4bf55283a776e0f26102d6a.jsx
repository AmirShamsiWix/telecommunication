

  $(document).ready(function() {

	// hacky way of stopping vimeo embed when the modal is closed
	$("#videoModal").on('hide.bs.modal', function(){
	  let src = $('#videoModal iframe').attr('src');
	  $('#videoModal iframe').attr('src', '');
	  $('#videoModal iframe').attr('src', src);
	});

	$(".fa-search").click(function(){
	  if ($("#text-search").val().length > 0) {
		$("#search-button").click();
	  } else {
		$("#search-drop").toggle('slow');
		//on mobile, also hide #my-services and #pay-bill
		if (screen.width < 400) {
		  $("#my-services").toggle(400);
		  $("#pay-bill").toggle(400);
		}
	  }
	});

	$('#mobile-nav-btn').sidr({
	  name: 'sidr',
	  side: 'left'
	});
	$('#close-mobile-nav-btn').sidr({
	  name: "sidr",
	  side: "left"
	});



	$('#sidr ul li.dropdown ul').show();
	var allPanels = $('#sidr ul li.dropdown').next('ul');
	$('.dropdown > a + ul').css('display', 'none')
	$('#close-mobile-nav-btn').css('display', 'block')
	$('#sidr ul li.dropdown > a').click(function() {

	  $('.dropdown > a + ul').slideUp();

	  $this = $(this);
	  $target = $this.next('ul');
	  $('#sidr ul li').removeClass('closed');

	  if ($target.is(':hidden')) {
		allPanels.not(this).slideUp();
		$target.slideDown();
		$(this).parent().addClass('closed');
	  } else {
		allPanels.not(this).slideUp();
		$target.slideUp();
		$('#sidr ul li.dropdown').removeClass('closed');
	  }
	  return false;
	});



	// LIVE CHAT
	/*
	$.post( "https://w3.homesc.com/e/ChatAvailabilityServlet", function(data, status) {
	  console.log('data', typeof data);
	  console.log('status', status);
	  var $chat = $('#chat');
	  if(status != 'success') {
		$chat.hide();
		console.log('Cannot load chat');
	  } else {

		var chatImgURL;
		if(data == 'true') {
		  chatImgURL = '/Images/HomeSC/images/chat/chat-online.png';
		} else {
		  chatImgURL = '/Images/HomeSC/images/chat/chat-offline-gray.png';
		}
		var chatHTML = `<img alt="Chat" id="chat-img" src="${chatImgURL}" style="width: 204px">`;
		$chat.html(chatHTML);
		$('#chat-img').on('click', function() {
		  var url = 'https://w3.homesc.com/e/ChatAvailabilityServlet';
		  window.open(url, '_blank', 'width=500, height=380');
		});
	  }
	});*/

  });

  $(document).ready(function() {
	var url = window.location.pathname.split("/");
	var page = '/' + url[1];
	var side = window.location.pathname;

	$('#management-nav ul li').each(function() {
	  var active = $(this).attr('href');
	  if (active == side) {
		$(this).addClass('active');
	  }
	});
  });


  //Nav
  $(".inset-nav li, #min-nav li").hover(
	function() {
	  $(".subnav", this).fadeIn(100);
	},
	function() {
	  $(".subnav", this).fadeOut(180);
	}
  );


  $(document).ready(function(){
	var d = new Date();
	var n = d.getHours();

	let $toggler = $('.fa-sun-o');

	if (n > 24 || n < 4) {
	  // If time is after 5PM or before 4AM
	  toEvening();
	} else if (n > 12 && n < 17) {
	  // If time is between 12PM – 5PM 
	  toAfternoon();
	} else {
	  // Else use ‘day’ theme 4AM - 12PM
	  toMorning();
	}

	$toggler.on('click', function() {
	  let currentState = $toggler.attr('current-state');
	  if(currentState == 'morning') {
		toAfternoon();
	  } else if(currentState == 'afternoon') {
		toEvening();
	  } else if(currentState == 'evening') {
		toMorning();
	  } 
	});

	function toMorning() {
	  $toggler.attr('current-state', 'morning');
	  $toggler.css('color', '#CCCCCC');

	  $('body > header').addClass('morning-4-12');
	  $('body > header').removeClass('evening-17-4');
	}

	function toAfternoon() {
	  $toggler.attr('current-state', 'afternoon');
	  $toggler.css('color', '#999999');

	  $('body > header').addClass('afternoon-12-17');
	  $('body > header').removeClass('morning-4-12');
	}

	function toEvening() {
	  $toggler.attr('current-state', 'evening');
	  $toggler.css('color', '#000000');

	  $('body > header').addClass('evening-17-4');
	  $('body > header').removeClass('afternoon-12-17');
	}

  });

