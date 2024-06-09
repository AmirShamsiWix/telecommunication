
  $(document).ready(function () {
	let state = {
	  speed: '',
	  type: 'photo'
	}	

	let speeds = {
	  "10": {
		"movie": {
		  "time": 1000000,
		  "label": "16 minutes 40 seconds"
		},
		"game": {
		  "time": 3000000,
		  "label": "50 minutes"
		},
		"video": {
		  "time": 100000,
		  "label": "1 minutes 40 seconds "
		},
		"music": {
		  "time": 40000,
		  "label": "40 seconds"
		},
		"photo": {
		  "time": 25000,
		  "label": "25 seconds"
		}
	  },
	  "50": {
		"movie": {
		  "time": 200000,
		  "label": "3 minutes 20 seconds"
		},
		"game": {
		  "time": 600000,
		  "label": "10 minutes"
		},
		"video": {
		  "time": 20000,
		  "label": "20 seconds"
		},
		"music": {
		  "time": 8000,
		  "label": "8 seconds"
		},
		"photo": {
		  "time": 5000,
		  "label": "5 seconds"
		}
	  },
	  "100": {
		"movie": {
		  "time": 100000,
		  "label": "1 minutes 40 seconds"
		},
		"game": {
		  "time": 300000,
		  "label": "5 minute"
		},
		"video": {
		  "time": 10000,
		  "label": "10 seconds"
		},
		"music": {
		  "time": 4000,
		  "label": "4 seconds"
		},
		"photo": {
		  "time": 2500,
		  "label": "2.5 seconds"
		}
	  },
	  "300": {
		"movie": {
		  "time": 33000,
		  "label": "33 seconds"
		},
		"game": {
		  "time": 100000,
		  "label": "1 minute 40 seconds"
		},
		"video": {
		  "time": 3300,
		  "label": "&lt; 4 seconds"
		},
		"music": {
		  "time": 1300,
		  "label": "&lt; 2 second"
		},
		"photo": {
		  "time": 825,
		  "label": "&lt; 1 second"
		}
	  },
	  "500": {
		"movie": {
		  "time": 20000,
		  "label": "20 seconds"
		},
		"game": {
		  "time": 60000,
		  "label": "60 seconds"
		},
		"video": {
		  "time": 2000,
		  "label": "2 seconds"
		},
		"music": {
		  "time": 800,
		  "label": "&lt; 1 second"
		},
		"photo": {
		  "time": 500,
		  "label": "&lt; 1 second"
		}
	  },
	  "1G": {
		"movie": {
		  "time": 10000,
		  "label": "10 seconds"
		},
		"game": {
		  "time": 30000,
		  "label": "30 seconds"
		},
		"video": {
		  "time": 1000,
		  "label": "1 seconds"
		},
		"music": {
		  "time": 400,
		  "label": "&lt; 1 second"
		},
		"photo": {
		  "time": 250,
		  "label": "&lt; 1 second"
		}
	  }
	}

	jQuery.fx.interval = 30;

	$('.reset').click(function () {
	  state.type = $(this).data('desc');

	  $('.reset').removeClass('active');
	  $('.' + state.type).addClass('active');


	  if(state.type !== '' && state.speed !== ''){
		runAnimation();
	  }
	  return false;
	});

	$('#speed-select').on("change", function() {
	  state.speed = $(this).val();

	  console.log(state.speed);

	  if(state.type !== '' && state.speed !== ''){
		runAnimation();
	  }
	  return false;
	});

	function runAnimation(){
	  $("#bar-label").html(speeds[state.speed][state.type].label);

	  let length = $('.progressContainer').width();

	  $('#speed-bar').stop().width(0);

	  $('#speed-bar').width(1).animate({
		'width': length
	  }, speeds[state.speed][state.type].time, "linear");
	}

	let oldWidth = 0;

	$(".total-in").on("change", function(){
	  let variables = {
		'smartTVs': 75,
		'smartPhones': 100,
		'laptops': 150,
		'gamingConsoles': 150,
		'smartDevices': 50,
		'musicPlayers': 50
	  }

	  let total = parseInt($("input[name=device]:checked").val());
	  console.log(total);
	  let length = $('.progressContainer').width();  
	  let percent = total / 1000;


	  if (total > 0 && total <= 10) {
		$('.bandwidth-slider').text(total + 'Mbps (DSL)');
	  } else if (total > 10 && total <= 100) {
		$('.bandwidth-slider').text(total + 'Mbps (Cable or Fiber)');
	  } else if (total > 100 && total < 1000) {
		$('.bandwidth-slider').text(total + ' Mbps (Fiber)');
	  } else if (total >= 1000) {
		$('.bandwidth-slider').text('1+ Gbps (Fiber)');
	  } else {
		$('.bandwidth-slider').text('0 Mbps');
	  }

	  length *= percent;


	  $('#total-bar').width(0).animate({
		'width': length
	  }, $('.bandwidth-slider').width() * 2, "linear");

	  oldWidth = length;
	});

	$("#laptops-img").on('click', function(){
	  $("#laptops").click();
	});

	$("#music-img").on('click', function(){
	  $("#music-players").click();
	});

	$("#gaming-img").on('click', function(){
	  $("#gaming-consoles").click();
	});

	$("#smart-devices-img").on('click', function(){
	  $("#smart-devices").click();
	});

	$("#smartphones-img").on('click', function(){
	  $("#smartphones").click();
	});

	$("#smart-tvs-img").on('click', function(){
	  $("#smart-tvs").click();
	});
  });

