
  $(document).ready(function() {
	$('#new-customer').hide();
	$('#new-customer-button').click(function() {
	  $('#new-customer').show();
	  $('#customer-type').hide();
	});
  });



  $(document).ready(function() {

	let all = [];

	//type ahead is outside of vue instance for now
	shouldWeDoIt();

	//initialized typeahead
	function shouldWeDoIt() {

	  const address = localStorage.getItem('Full_Address');
	  const zone = JSON.parse(localStorage.getItem('Zone'));

	  //if no address entered
	  if(!address) {
		definitely();
	  }

	  //if address entered but not in a zone with service
	  else if(address 
			  && !zone.Fiber_2_Gig
			  && !zone.Fiber
			  && !zone.Cable_Modem) {
		$('#open-no-service-modal').click();
		definitely();
	  }

	  else if (zone) {
		absolutelyNot();
	  }

	}//end shouldWeDoIt

	function absolutelyNot() {  

	  $('#shop-cta').show();

	  $('#form-con').remove();
	  $('#shoptool-intro').remove();
	  $('#shoptool-banner').remove();
	  $('#reliable-solutions').show();
	  $('#loading').show();

	  if(location.href != 'https://www.homesc.com/') {
		$('#do-more-banner').remove();
	  }

	}//end absolutelyNot

	function definitely() {

	  $('#shop-cta').show();

	  $('#form-con').show();
	  $('#do-more-banner').show();
	  $('#shoptool-intro').show();
	  $('#cart-btn').remove();
	  $('#loading').remove();

	  $.typeahead({
		input: '.js-typeahead-address_v1',
		minLength: 1,
		order: "asc",
		offset: true,
		filter: false,
		dynamic: true,
		hint: true,
		source: {
		  address: {
			ajax: {
			  type: "GET",
			  url: "/ApiEP/AddressLookup/get-typeahead/{{query}}",
			  callback: {
				done: function (data) {

				  all = [];

				  data.forEach(item => {
					all.push(item);
				  });

				  return data.map(d => {

					const formatted = Object.entries(d)
					.filter(e => e[0] !== 'entries' && e[1] !== '' && e[0] !== 'Zone' && e[0] !== 'Full_Address')
					.map(e => e[1])
					.join(' ')


					return formatted;

				  })

				}
			  }
			}
		  }
		},
		callback: {
		  onChange: (item) => {
			console.log('maybe');
		  },
		  onClick: (node, a, item, event) => {
			console.log('here');
			//turn arrow green
			$("#address-search-bttn span").css("color", "#70b840")
		  },
		  onSubmit: (node, form, item, event) => {
			event.preventDefault();

			//if no suggested results
			if(all.length == 0) {

			  //get first two "words" from search input - hopefully a house number + street name
			  const entered = $('#address-lookup-input').val();
			  let test = entered.split(' ');
			  test = test[0] + ' ' + test[1];

			  //try searching for that
			  $.ajax({
				type: 'get',
				url: `/ApiEP/AddressLookup/get-suggested-addresses/${test}`,
				success: data => {

				  //if no results then one more try
				  if(data.length == 0) {
					lastTry(test, entered);
				  } else {
					all = data;
					maybeModal(entered);
				  }

				}
			  });

			  return false;

			}

			else if(all.length > 0 && !item) {
			  alert('Please enter your address and select a result from the dropdown. If your address does not appear, please contact us at 888-746-4482 for more information.');
			  return false
			}

			allGood(all, item);

		  }
		}
	  });
	}//end definitely()

	function lastTry(test, entered) {

	  test = test.split(' ');
	  const first = test[0];
	  const second = test[1].charAt(0);
	  const queryString = first + ' ' + second;

	  //try searching for that
	  $.ajax({
		type: 'get',
		url: `/ApiEP/AddressLookup/get-suggested-addresses/${queryString}`,
		success: data => {

		  if(data.length == 0) {
			notFound();
		  } else {
			all = data;
			maybeModal(entered);
		  }

		}
	  });

	}//end lastTry

	function maybeModal(entered) {

	  console.log('maybeModal()');
	  //empty addresses in case they had a previous search
	  $('#maybe-modal .addresses').empty();

	  //add an element for each suggested address
	  all.forEach(item => {
		$('#maybe-modal .addresses').append(`<p class="suggestion">${item.Full_Address}</p>`);

		console.dir(item);
	  });

	  //bind click event to new elements
	  $('.suggestion').on('click', function() {
		//close address suggestion modal
		$('#toggle-maybe-modal').click();

		const address = $(this).text();
		doThing(address);
	  });

	  //show the modal
	  $('#toggle-maybe-modal').click();

	}//end maybeModal()

	function doThing(address) {

	  let match;

	  all.forEach(item => {

		if(address == item.Full_Address) {
		  match = item;
		}

	  });

	  storeResults(match, address);

	}//end doThing()

	function allGood(all, item) {

	  console.log('allGood()');

	  $('#search-wrap button').css('visibility', 'hidden');
	  $('.typeahead__cancel-button').css('visibility', 'hidden');
	  $('#loader-wrap').show();

	  let match;

	  all.forEach(d => {

		const formatted = Object.entries(d)
		.filter(e => e[0] !== 'entries' 
				&& e[1] !== '' 
				&& e[0] !== 'Zone' 
				&& e[0] !== 'Full_Address')
		.map(e => e[1])
		.join(' ')


		if(formatted == item.display) {
		  match = d;
		}

	  })

	  storeResults(match, item.display);

	}//end allGood()

	function notFound() {

	  console.log('notFound()');

	  const entered = $('#address-lookup-input').val();

	  pushToGoogleSheet(entered, 'Not Found');
	  showPop('not found');
	  $('#search-wrap button').css('visibility', 'visible');
	  $('.typeahead__cancel-button').css('visibility', 'visible');
	  $('#loader-wrap').hide();

	}//end notFound()

	function storeResults(match, display) {

	  localStorage.setItem('Address_1', match.Address_1);
	  localStorage.setItem('Address_2', match.Address_2);
	  localStorage.setItem('Full_Address', match.Full_Address);
	  localStorage.setItem('City', match.City);
	  localStorage.setItem('State', match.State);
	  localStorage.setItem('Zip', match.Zip);

	  //this wipes the dsl, cable and fiber values we briefly pulled from the address
	  //now it's pulled from the zone as originally intended
	  //localStorage.setItem('DSL', match.DSL);
	  //localStorage.setItem('Cable', match.Cable);
	  //localStorage.setItem('Fiber', match.Fiber);

	  setZone(match);

	}//end storeResults

	function setZone(match) {

	  $.ajax({
		type: 'get',
		url: '/ApiEP/AddressLookup/get-zone/' + match.Zone,
		success: data => {

		  //this section could be simplified
		  const zoneData = data[0];

		  localStorage.setItem('Zone', JSON.stringify(zoneData));

		  if(zoneData.HOA) {
			pushToGoogleSheet(match.Full_Address, 'HOA', zoneData);
			showPop('hoa');
			$('#search-wrap button').css('visibility', 'visible');
			$('.typeahead__cancel-button').css('visibility', 'visible');
			$('#loader-wrap').hide();
			return false;
		  }

		  //set highest tech type
		  let highestTechType;

		  if(zoneData.Fiber_2_Gig) {
			highestTechType = 'fiber 2 gig';
		  }

		  else if(zoneData.Fiber) {
			highestTechType = 'fiber';
		  }

		  else if(zoneData.Cable_Modem) {
			highestTechType = 'cable modem';
		  }

		  else if(zoneData.DSL) {
			highestTechType = 'dsl';
		  }

		  //do something
		  if(highestTechType == 'dsl') {
			pushToGoogleSheet(match.Full_Address, 'DSL', zoneData);
			showPop('dsl');
			$('#search-wrap button').css('visibility', 'visible');
			$('.typeahead__cancel-button').css('visibility', 'visible');
			$('#loader-wrap').hide();
			return false;
		  }

		  else if(highestTechType == 'cable modem') {
			localStorage.setItem('Zone', JSON.stringify(data[0]));
		  }

		  //2gig in MDU is really just 1gig (fiber)
		  else if(highestTechType == 'fiber 2 gig'
				  && zoneData.MDU) {
			highestTechType = 'fiber';
		  }

		  else if(highestTechType == 'fiber') {
			localStorage.setItem('Zone', JSON.stringify(data[0]));
		  }

		  //this should send an email and then reload on email success
		  //email is temporarily disabled to prevent spam
		  //sendEmail(match);
		  pushToGoogleSheet(match.Full_Address, 'Shop', zoneData);
		}
	  });

	}//end getZone

	function showPop(type) {

	  const $modalTitle = $('#address-entry-modal .modal-title');
	  const $modalBody = $('#address-entry-modal .modal-body');
	  const $modalForm = $("#address-entry-modal form");
	  const $modalInterest = $("#address-entry-modal .modal-interest-form")

	  const showForm = () => {
		$modalForm.show()
		$modalInterest.css("display", "none")
	  }
	  const showInterest = () => {
		$modalForm.hide()
		$modalInterest.css("display", "flex")
	  }

	  if(type == 'dsl') {
		$modalTitle.text('SOME SERVICES MAY NOT BE AVAILABLE IN YOUR AREA');
		$modalBody.text('To ensure you get the best prices and accurate service availabilities, please call 888-746-4482 to discuss the customizable solutions in your area. Or fill out and submit the form with your information and one of our highly qualified customer service representatives will be in touch during normal business hours. Thank you for your interest!');
		showForm()

	  }

	  else if(type == 'hoa') {
		$modalTitle.text('SPECIAL PRICING AVAILABLE FOR YOUR AREA');
		$modalBody.text('Congratulations! You live in a neighborhood with special packages and pricing. Please call 888-746-4482 to discuss the services and pricing available in your area. Or fill out and submit the form with your information and we will contact you during normal business hours. Thank you!');
		showForm()
	  }

	  else if(type == 'not found') {
		$modalTitle.text('Your address is not currently in the Home Telecom service area');
		$modalBody.text('Please contact us at 888-746-4462 to confirm availability or fill out the quick form below. Thank you!');
		showForm()
	  }

	  $('#open-address-entry-modal').click();

	}//end showPop

	function pushToGoogleSheet(address, status, zoneData) {

	  const config = {
		'Address': address,
		'Status': status,
		'Zone': zoneData.Zone,
		'Comp': zoneData.Comp,
		'Build Out': zoneData.Build_Out
	  }

	  //Post to google sheets
	  $.ajax({
		url: 'https://script.google.com/macros/s/AKfycbxXHkbx5hNoe6nIDWLhwXwOHPmt2FNzgnyyJadoeluyUgi1uId1NsoSnjRhLJr_1h-a/exec',
		method: "GET",
		dataType: "json",
		data: config,
		success: (resp) => {

		  if(status == 'Shop') {
			location.href = 'https://www.homesc.com/shop';
		  }

		}
	  })

	}//end pushToGoogleSheet()

	function sendEmail(match) {

	  let config = {
		'.cfg.sendTo': 'support@bluetonemedia.com',
		'.cfg.sendSubject': 'Shop Tool Address Entered',
		'.cfg.sendFrom': 'noreply@homesc.com',
		'.cfg.sendFooter': false,
		'Address': match.Full_Address,	
	  }

	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function (data) {
		  location.href = 'https://www.homesc.com/shop';
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });

	}//end sendEmail


	//modal form submission logic
	$("#submit-button").click(function(e) {
	  e.preventDefault()

	  const config = {
		//'.cfg.sendTo': 'tower@bluetonemedia.com',
		'.cfg.sendTo': 'noreply@bluetonemedia.com',
		'.cfg.sendSubject': 'Shop Tool Popup Form Filled',
		'.cfg.sendFrom': 'noreply@homesc.com',
		'.cfg.sendFooter': false,
		'Address': localStorage.getItem("Full_Address"),	
		"Name": $("#name-input").val(),
		"User Email": $("#email-input").val(),
		"Phone": $("#phone-input").val(),
		"Address": $("#address-input").val(),
		"City": $("#city-input").val()
	  }

	  $.ajax({
		url : 'forms/mail.aspx',
		type: "post",
		dataType: 'json',
		data: config,
		success: function (data) {
		  alert("Your message has been sent!")
		  location.href = 'https://www.homesc.com/shop';
		},
		error: function (jXHR, textStatus, errorThrown) {
		  alert(errorThrown);
		}
	  });
	})

  });
