
  $(document).ready(function(){

	let url = location.href;
	if(url.indexOf('#feat-1') != -1) {
	  $('#open-vimeo-modal').click();
	}

	var $circControl = $('#control-circle');

	$('#a').on('mouseenter', function() {
	  var img = '<img alt="" class="circle-image" src="/Images/HomeSC/images/home-automation/icons/lockdoors.png"><br>';
	  $circControl.html(img + '<p>Door Locks</p>');
	  $circControl.css('display', 'flex');
	  $circControl.css('background-color', '#eee');
	});

	$('#b').on('mouseenter', function() {
	  var img = '<img alt="" class="circle-image" src="/Images/HomeSC/images/home-automation/icons/thermostats.png"><br>';
	  $circControl.html(img + '<p>Thermostats</p>');
	  $circControl.css('display', 'flex');
	  $circControl.css('background-color', '#eee');
	});

	$('#c').on('mouseenter', function() {
	  var img = '<img alt="" class="circle-image" src="/Images/HomeSC/images/home-automation/icons/lights.png"><br>';
	  $circControl.html(img + '<br><p>Lights</p>');
	  $circControl.css('display', 'flex');
	  $circControl.css('background-color', '#eee');
	});

	$('#d').on('mouseenter', function() {
	  var img = '<img alt="" class="circle-image" src="/Images/HomeSC/images/home-automation/icons/appliances.png"><br>';
	  $circControl.html(img + '<p>Appliances</p>');
	  $circControl.css('display', 'flex');
	  $circControl.css('background-color', '#eee');
	});

	$('#e').on('mouseenter', function() {
	  var img = '<img alt="" class="circle-image" src="/Images/HomeSC/images/home-automation/icons/garagedoor.png"><br>';
	  $circControl.html(img + '<p>Garage Door</p>');
	  $circControl.css('display', 'flex');	
	  $circControl.css('background-color', '#eee');
	});

	$('#a, #b, #c, #d, #e').on('mouseleave', function() {
	  $circControl.hide();
	});



	$(".add-on-btn").click(function(){
	  $("#addon-menu").show('slow');
	  $("#hub-menu").hide('slow');
	  $("#olsys-menu").hide('slow');
	});
	$("p.closebtn").click(function(){
	  $("#addon-menu").hide('slow');
	});

	$(".hub-menu").click(function(){
	  $("#hub-menu").show('slow');
	  $("#addon-menu").hide('slow');
	  $("#olsys-menu").hide('slow');
	});
	$("p.closebtn").click(function(){
	  $("#hub-menu").hide('slow');
	});

	$(".olsys-menu").click(function(){
	  $("#olsys-menu").show('slow');
	  $("#hub-menu").hide('slow');
	  $("#addon-menu").hide('slow');
	});
	$("p.closebtn").click(function(){
	  $("#olsys-menu").hide('slow');
	});


	$('.match_height_cols').matchHeight();
  });


