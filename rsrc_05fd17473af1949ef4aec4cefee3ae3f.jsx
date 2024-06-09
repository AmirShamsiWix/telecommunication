
  $(document).ready(function() {
	
	//assign player for starting and pausing later
	const playerElement = document.getElementById('player');
	let player = new Vimeo.Player(playerElement);
	
	$('#playbtn').on('click', function() {
	  
	  //show player modal
	  $('#myModal').show();
	  
	  //start playing video
	  player.play();

	});
	
	$('#myModal').on('click', function() {
	  
	  //pause video
	  player.pause();
	  
	  //reset to beginning for next time
	  player.setCurrentTime(0);
	  
	  //hide the player modal
	  $('#myModal').hide();
	});
	
	
	
  });
