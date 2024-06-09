
  $(document).ready(function() {

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	//Almost nothing here is done programmatically
	//Lots of room for improvement here
	new Vue({
	  el: '#shoptool',  
	  data() {

		return {

		  cartProgressID: urlParams.get('id'),
		  switchActivation: urlParams.get('switch'),

		  //just here to prevent the error until I get to it
		  tb: '',

		  showCartToggle: true,

		  //emails get sent here
		  sendTo: 'service@hometelco.com',

		  //track users first landing on each page
		  firstVideo: true,
		  firstVoice: true,
		  firstSecurity: true,
		  firstContact: true,

		  //2nd page of final form
		  firstPreferred: true,

		  fullAddress: localStorage.getItem('Full_Address'),
		  zone: JSON.parse(localStorage.getItem('Zone')),

		  internetItemsReady: false,
		  videoItemsready: false,
		  voiceItemsReady: false,
		  homeSmartItemsReady: false,
		  pages: ['shop-internet', 
				  'shop-video', 
				  'shop-voice', 
				  'shop-security',
				  'contact-info'],
		  pagesHomeStream: ['shop-internet', 
							'shop-video', 
							'homestream-1', 
							'homestream-2', 
							'shop-voice', 
							'shop-security',
							'contact-info'],
		  pageIndex: 0,
		  finalFormPage: 'one',
		  allPriceItems: null,

		  eBillOptOut: false,
		  eBillOptOutIncrease: 5,

		  supplyOwnRouter: false,
		  interestedSixFree: false,

		  showSummary: true,

		  //INTERNET
		  selectedInternetItemString: null,

		  item300Mbps: null,
		  item500Mbps: null,
		  item1Gbps: null,
		  item2Gbps: null,

		  //VIDEO
		  selectedVideoItem: 'MyBundle',
		  selectedHomeStreamPackageString: 'Limited Basic',

		  itemLimitedBasicPackage: null,
		  itemBasicPackage: null,
		  itemEssentialPackage: null,

		  hboMax: null,
		  hboMaxSelected: false,
		  showtime: null,
		  showtimeSelected: false,
		  starzEncore: null,
		  starzEncoreSelected: false,
		  cinemax: null,
		  cinemaxSelected: false,
		  nflRedzone: null,
		  nflRedzoneSelected: false,

		  cloudDVR: null,
		  cloudDVRSelected: 0,
		  hoursPerCloudDVR: 25,

		  additionalStreams: null,
		  additionalStreamsSelected: 0,

		  noVideoAddOns: false,

		  //VOICE
		  unlimitedVoice: null,
		  unlimitedVoiceSelected: false,

		  noVoice: true,

		  voiceMailSelected: false,
		  callerIdSelected: false,
		  callWaitingSelected: false,
		  callerReturnSelected: false,
		  callerForwardingSelected: false,

		  //HOMESMART
		  selectedSecurityItemString: 'false',

		  security: null,
		  homeAutomation: null,

		  indoorCamera: null,
		  indoorCameraSelected: false,
		  outdoorCamera: null,
		  outdoorCameraSelected: false,
		  smartDoorbellCamera: null,
		  smartDoorbellCameraSelected: false,
		  maintenancePackage: null,
		  maintenancePackageSelected: false,

		  attackPackSelectedString: 'false',

		  attackPackSingle: null,
		  attackPack12Month: null,
		  attackPack24Month: null,

		  //CONTACT INFO
		  contactInfo: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			contactMethod: 'No Preferrence',
			contactTime: '',
			appt: 'First Available'
		  },

		  //we can use determine when it's safe for a thank you page redirect
		  submitEmailSent: false,
		  submitPostedToGoogleSheet: false
		}

	  },//end data
	  computed: {

		submitRedirect: function() {

		  let processesComplete = false;

		  if(this.submitPostedToGoogleSheet
			 && this.submitEmailSent) {
			processesComplete = true;
		  }

		  return processesComplete;

		},// end submitRedirect

		userType: function() {

		  if(this.zone.Fiber_2_Gig) {
			return 'Fiber_2_Gig';
		  }

		  else if(this.zone.Fiber) {
			return 'Fiber';
		  }

		  else if(this.zone.Cable_Modem) {
			return 'Cable_Modem';
		  }

		},//end userType

		allPriceItemsReady: function() {

		  if(this.internetItemsReady
			 && this.videoItemsReady
			 && this.voiceItemsReady
			 && this.homeSmartItemsReady) {
			return true;
		  } else {
			return false;
		  }

		},//end allPriceItemsReady

		pageID: function() {

		  if(this.selectedVideoItem == 'MyBundle'
			 || this.selectedVideoItem == 'false') {	
			return this.pages[this.pageIndex];
		  }

		  else if(this.selectedVideoItem == 'HomestreamTV') {
			return this.pagesHomeStream[this.pageIndex];
		  }

		},//end pageID

		selectedInternetItem: function() {

		  return this.allPriceItems.find(item => {
			return item.Name == this.selectedInternetItemString;
		  });

		},//end selectedInternetItem

		selectedHomeStreamPackage: function() {

		  return this.allPriceItems.find(item => {
			return item.Name == this.selectedHomeStreamPackageString;
		  });

		},//end selectedHomeStreamPackage

		selectedSecurityItem: function() {

		  return this.allPriceItems.find(item => {
			return item.Name == this.selectedSecurityItemString;
		  });

		},//end selectedSecurityItem

		selectedAttackPack: function() {

		  return this.allPriceItems.find(item => {
			return item.Name == this.attackPackSelectedString;
		  });

		},//end selectedAttackPack

		subtotal: function() {

		  amount = 0;

		  //INTERNET - BEFORE PROMO UPDATE
		  /*
			if(this.eBillOptOut) {
			  amount += parseFloat(this.selectedInternetItem[this.userType + '_Increase']);
			}

			else {
			  amount += parseFloat(this.selectedInternetItem[this.userType]);
			}*/

		  if(this.eBillOptOut && this.zone.Promo) {
			amount += parseFloat(this.selectedInternetItem[this.userType + '_Promo_Increase']);
		  } 

		  else if(this.eBillOptOut && !this.zone.Promo) {
			amount += parseFloat(this.selectedInternetItem[this.userType + '_Increase']);
		  }

		  else if(this.zone.Promo) {
			amount += parseFloat(this.selectedInternetItem[this.userType + '_Promo']);
		  }

		  else {
			amount += parseFloat(this.selectedInternetItem[this.userType]);
		  }


		  //HOMESTREAM(VIDEO)
		  //only add to the subtotal if HomestreamTV is selected and on or after HomestreamPage
		  if(this.selectedVideoItem == 'HomestreamTV' && !this.firstVideo) {

			if(this.selectedHomeStreamPackage) {
			  amount += parseFloat(this.selectedHomeStreamPackage[this.userType]);
			}

			if(this.hboMaxSelected) {
			  amount += parseFloat(this.hboMax[this.userType]);
			}

			if(this.showtimeSelected) {
			  amount += parseFloat(this.showtime[this.userType]);
			}

			if(this.starzEncoreSelected) {
			  amount += parseFloat(this.starzEncore[this.userType]);
			}

			if(this.cinemaxSelected) {
			  amount += parseFloat(this.cinemax[this.userType]);
			}

			if(this.nflRedzoneSelected) {
			  amount += parseFloat(this.nflRedzone[this.userType]);
			}

			if(this.cloudDVRSelected > 0) {
			  amount += parseFloat(this.cloudDVR[this.userType]) * this.cloudDVRSelected;
			}

			if(this.additionalStreamsSelected > 0) {
			  amount += parseFloat(this.additionalStreams[this.userType]) * this.additionalStreamsSelected;
			}

		  }//END HOMESTREAM(VIDEO)

		  //VOICE
		  if(this.unlimitedVoiceSelected && !this.firstVoice) {
			amount += parseFloat(this.unlimitedVoice[this.userType]);
		  }

		  //only add to the subtotal if on or past the security page
		  if(this.selectedSecurityItem && !this.firstSecurity) {

			//SECURITY	PACKAGE
			if(this.selectedSecurityItem) {
			  amount += parseFloat(this.selectedSecurityItem[this.userType]);
			}

			if(this.selectedAttackPack 
			   && this.attackPackSelectedString != 'Attack Pack Single Payment') {	 

			  amount += parseFloat(this.selectedAttackPack[this.userType]);	  

			}
		  }
		  //END SECURITY

		  return amount;

		},//end subtotal

		totalVoiceAddOnsSelected() {

		  const voiceAddOns = ['voiceMailSelected', 
							   'callerIdSelected', 
							   'callWaitingSelected', 
							   'callerReturnSelected', 
							   'callerForwardingSelected'];
		  let count = 0;

		  voiceAddOns.forEach(addOn => {
			if(this[addOn]) { count++ }
		  });

		  return count;

		},//end totalVoiceAddOnsSelected()

	  },//end computed
	  watch: {
		//once everything is loaded check for saved form state
		allPriceItemsReady: function(value) {
		  if(value) { 
			$('#loading').fadeOut();
			this.checkForInProgress();
			this.dropOffPost('internet');
		  }
		},

		submitRedirect: function(value) {
		  if(value) { location.href = '/order-sent' }
		},

		//if noVideoAddOns is selected
		//then deselect all video add ons
		noVideoAddOns: function(value) {
		  if(value) {
			this.updateSelection('hboMaxSelected', false);
			this.updateSelection('showtimeSelected', false);
			this.updateSelection('starzEncoreSelected', false);
			this.updateSelection('cinemaxSelected', false);
			this.updateSelection('nflRedzoneSelected', false);

			this.updateSelection('cloudDVRSelected', '0');
			this.updateSelection('additionalStreamsSelected', '0');
		  }
		},

		//if Essential homestream package is not selected
		//then deselect unavailable premium channels
		selectedHomeStreamPackageString: function(value) {
		  if(value != 'Essential') {
			this.updateSelection('showtimeSelected', false);
			this.updateSelection('starzEncoreSelected', false);
			this.updateSelection('cinemaxSelected', false);
			this.updateSelection('nflRedzoneSelected', false);
		  }
		},

		//if any video add on is selected
		//then deselect noVideoAddOns
		hboMaxSelected: function(value) {
		  if(value) { this.updateSelection('noVideoAddOns', false) }
		},
		showtimeSelected: function(value) {
		  if(value) { this.updateSelection('noVideoAddOns', false) }
		},
		starzEncoreSelected: function(value) {
		  if(value) { this.updateSelection('noVideoAddOns', false) }
		},
		cinemaxSelected: function(value) {
		  if(value) { this.updateSelection('noVideoAddOns', false) }
		},
		nflRedzoneSelected: function(value) {
		  if(value) { this.updateSelection('noVideoAddOns', false) }
		},
		cloudDVRSelected: function(value) {
		  if(value != '0') { this.updateSelection('noVideoAddOns', false) }
		},
		additionalStreamsSelected: function(value) {
		  if(value != '0') { this.updateSelection('noVideoAddOns', false) }
		},

		//if any voice add on is selected
		//then select voice
		voiceMailSelected: function(value) {
		  if(value) { 
			this.updateSelection('unlimitedVoiceSelected', true);
		  }
		},
		callerIdSelected: function(value) {
		  if(value) { 
			this.updateSelection('unlimitedVoiceSelected', true);
		  }
		},
		callWaitingSelected: function(value) {
		  if(value) { 
			this.updateSelection('unlimitedVoiceSelected', true);
		  }
		},
		callerReturnSelected: function(value) {
		  if(value) { 
			this.updateSelection('unlimitedVoiceSelected', true);
		  }
		},
		callerForwardingSelected: function(value) {
		  if(value) { 
			this.updateSelection('unlimitedVoiceSelected', true);
		  }
		},

		totalVoiceAddOnsSelected: function(value) {
		  if(value > 3) {
			alert('Please choose 3 calling features');
		  }
		},

		//if voice is deselected
		//then deselect all voice add ons
		unlimitedVoiceSelected: function(value) {
		  if(value) {
			this.updateSelection('noVoice', false);
		  }

		  else {
			this.updateSelection('voiceMailSelected', false);
			this.updateSelection('callerIdSelected', false);
			this.updateSelection('callWaitingSelected', false);
			this.updateSelection('callerReturnSelected', false);
			this.updateSelection('callerForwardingSelected', false);
		  }
		},

		//if noVoice is selected
		//then deselect voice and all voice add ons
		noVoice: function(value) {
		  if(value) {
			this.updateSelection('unlimitedVoiceSelected', false);
			this.updateSelection('voiceMailSelected', false);
			this.updateSelection('callerIdSelected', false);
			this.updateSelection('callWaitingSelected', false);
			this.updateSelection('callerReturnSelected', false);
			this.updateSelection('callerForwardingSelected', false);
		  }
		},


		selectedSecurityItemString: function(value) {

		  //if no Security item is selected
		  //then deselect all security add ons
		  if(value == 'false') {
			this.updateSelection('attackPackSelectedString', null);

			this.updateSelection('indoorCameraSelected', false);
			this.updateSelection('outdoorCameraSelected', false);
			this.updateSelection('smartDoorbellCameraSelected', false);
			this.updateSelection('maintenancePackageSelected', false);
		  }

		  //if Home Automation is not selected
		  //then deselect indoor and outdoor cameras
		  else if(value != 'Home Automation Package') {
			this.updateSelection('indoorCameraSelected', false);
			this.updateSelection('outdoorCameraSelected', false);
		  }
		},

	  },//end watch
	  created() {
		
		console.log('switch code: ' + this.switchActivation);

		localStorage.setItem('item300Mbps', true);

		if(this.zone) {
		  this.getAllPriceItems();
		  this.checkForInProgress();
		} 

		const pageCheck = parseInt(urlParams.get('page'));
		if(pageCheck) {
		  this.pageIndex = pageCheck;
		}

		//window.addEventListener('scroll', this.isShopToolVisible);

	  },//end created()
	  methods: {

		isOkieDokie(e) {

		  //discovered rabbit hole
		  //abort mission
		  //for now...

		  console.log(this.totalVoiceAddOnsSelected);
		  if(this.totalVoiceAddOnsSelected > 3) {
			//e.preventDefault();
		  }

		},

		isShopToolVisible() {

		  var element = document.querySelector('#shoptool');
		  var position = element.getBoundingClientRect();

		  // checking for partial visibility
		  if(position.top + 300 < window.innerHeight && position.bottom >= 0) {
			this.showCartToggle = true;
		  }

		  else {
			this.showCartToggle = false;
		  }

		},//end isShopToolVisible()

		updateSelection(item, newValue) {

		  this[item] = newValue;

		},//end updateSelection

		changePage(pageString) {

		  if(this.selectedVideoItem == 'MyBundle'
			 || this.selectedVideoItem == 'false') {	
			this.pageIndex = this.pages.indexOf(pageString);
		  }

		  else if(this.selectedVideoItem == 'HomestreamTV') {
			this.pageIndex = this.pagesHomeStream.indexOf(pageString);
		  }

		},//end changePage

		clearLocationData() {

		  localStorage.removeItem('Address_1');
		  localStorage.removeItem('Address_2');
		  localStorage.removeItem('Full_Address');
		  localStorage.removeItem('City');
		  localStorage.removeItem('State');
		  localStorage.removeItem('Zip');
		  localStorage.removeItem('Zone');

		  localStorage.removeItem('DSL');
		  localStorage.removeItem('Cable');
		  localStorage.removeItem('Fiber');

		  //prevent autoscroll to previous position after reload
		  history.scrollRestoration = 'manual';

		  location.reload();

		},//end clearLocationData()

		clearShopToolProgress() {

		  localStorage.removeItem('shopToolProgress');

		  location.reload();

		},//end clearShopToolProgress()

		checkForInProgress() {

		  if(this.cartProgressID) {
			this.getInProgress();
			return false;
		  }

		  const inProgress = JSON.parse(localStorage.getItem('shopToolProgress'));

		  if(!inProgress) { return false };

		  for (const [key, value] of Object.entries(inProgress)) {
			this[key] = value;
		  }

		},//end checkForInProgress()
		getInProgress() {

		  $.ajax({
			type: 'get',
			url: `/ApiEP/ShopState/get-shop-state/${this.cartProgressID}`,
			success: resp => {

			  let inProgress = resp[0].State_String;
			  inProgress = JSON.parse(inProgress);

			  for (const [key, value] of Object.entries(inProgress)) {
				this[key] = value;
			  }

			}
		  });

		},//end getInProgress()
		saveInProgress() {

		  let shopToolProgress = {
			selectedInternetItemString: this.selectedInternetItemString,
			eBillOptOut: this.eBillOptOut,
			supplyOwnRouter: this.supplyOwnRouter,
			interestedSixFree: this.interestedSixFree,

			selectedVideoItem: this.selectedVideoItem,
			selectedHomeStreamPackageString: this.selectedHomeStreamPackageString,

			hboMaxSelected: this.hboMaxSelected,
			showtimeSelected: this.showtimeSelected,
			starzEncoreSelected: this.starzEncoreSelected,
			cinemaxSelected: this.cinemaxSelected,
			nflRedzoneSelected: this.nflRedzoneSelected,

			noVideoAddOns: this.noVideoAddOns,

			cloudDVRSelected: this.cloudDVRSelected,
			additionalStreamsSelected: this.additionalStreamsSelected,

			unlimitedVoiceSelected: this.unlimitedVoiceSelected,
			noVoice: this.noVoice,

			voiceMailSelected: this.voiceMailSelected,
			callerIdSelected: this.callerIdSelected,
			callWaitingSelected: this.callWaitingSelected,
			callerReturnSelected: this.callerReturnSelected,
			callerForwardingSelected: this.callerForwardingSelected,

			selectedSecurityItemString: this.selectedSecurityItemString,

			indoorCameraSelected: this.indoorCameraSelected,
			outdoorCameraSelected: this.outdoorCameraSelected,
			smartDoorbellCameraSelected: this.smartDoorbellCameraSelected,
			maintenancePackageSelected: this.maintenancePackageSelected,

			attackPackSelectedString: this.attackPackSelectedString,

		  }

		  localStorage.setItem('shopToolProgress', JSON.stringify(shopToolProgress));

		  const requestObject = {
			'TableName': 'Shop_Tool_State',
			'OP': 20,
			'Pairlets': [
			  { 'Name': 'State_String', 'Value': JSON.stringify(shopToolProgress) },
			]
		  }

		  $.ajax({
			type: 'POST',
			url: '/API/BTMCustom/',
			dataType: 'json',
			data: JSON.stringify(requestObject),
			success: resp => {
			  console.dir(resp);
			  console.log('state stored succesfully');
			}
		  });

		},//end saveInProgress()

		getAllPriceItems() {

		  //WHERE DOES THIS ONE LIVE?
		  //THIS SHOULD BE USED
		  //https://docs.google.com/spreadsheets/d/e/2PACX-1vSwima4Q9DCiuqP6kBTxdUb0UJ2D3oIBE_QVVrPp37UL9WGrcg3dTQTkd93HcA4wzyGcS-aboTM7bne/pub?gid=1849590771&single=true&output=csv

		  //FROM MY ACCOUNT
		  //HomeSC Shop Tool Temp Pricing
		  //https://docs.google.com/spreadsheets/d/e/2PACX-1vTSCWnkBwGA6X8ny72Ua3qy-c5FFvLWT0gJX21CAWW_veVQwjIQdy1h22UU-ORCCaNjlfNthcn18hYc/pub?output=csv

		  $.ajax({
			type: 'GET',  
			url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSCWnkBwGA6X8ny72Ua3qy-c5FFvLWT0gJX21CAWW_veVQwjIQdy1h22UU-ORCCaNjlfNthcn18hYc/pub?output=csv',
			dataType: 'text',       
			success: (response) => {

			  //converst csv response to JS object and assign
			  this.allPriceItems = $.csv.toObjects(response);	  
			  this.setIncreasedPrices();

			}
		  })

		},//end getAllPriceItems()

		setIncreasedPrices() {

		  this.allPriceItems.forEach(item => {
			if(item.Category == 'internet' && item.Sub_Category == 'main') {
			  const cmPrice = item.Cable_Modem;
			  const fiberPrice = item.Fiber;
			  const fiberPrice2g = item.Fiber_2_Gig;

			  item.Cable_Modem_Increase = this.getIncreasedAmount(cmPrice);
			  item.Fiber_Increase = this.getIncreasedAmount(fiberPrice);
			  item.Fiber_2_Gig_Increase = this.getIncreasedAmount(fiberPrice2g);

			  const cmPricePromo = item.Cable_Modem_Promo;
			  const fiberPricePromo = item.Fiber_Promo;
			  const fiberPrice2gPromo = item.Fiber_2_Gig_Promo;

			  item.Cable_Modem_Promo_Increase = this.getIncreasedAmount(cmPricePromo);
			  item.Fiber_Promo_Increase = this.getIncreasedAmount(fiberPricePromo);
			  item.Fiber_2_Gig_Promo_Increase = this.getIncreasedAmount(fiberPrice2gPromo); 

			};
		  });

		  this.assignInternetItems();
		  this.assignVideoItems();
		  this.assignVoiceItems();
		  this.assignHomeSmartItems();

		},//end setIncreasedPrices()

		assignInternetItems() {

		  //MAIN ITEMS
		  this.item300Mbps = this.allPriceItems.find(item => {
			return item.Name == '300 Mbps';
		  });	  

		  this.item500Mbps = this.allPriceItems.find(item => {
			return item.Name == '500 Mbps';
		  });

		  this.item1Gbps = this.allPriceItems.find(item => {
			return item.Name == '1 Gbps';
		  });

		  this.item2Gbps = this.allPriceItems.find(item => {
			return item.Name == '2 Gbps';
		  });

		  this.setDefaultSelectedInternetItemString();

		},//end assignInternetItems()

		setDefaultSelectedInternetItemString() {

		  if(this.zone.Fiber_2_Gig) {
			this.selectedInternetItemString = '2 Gbps';
		  }

		  else {
			this.selectedInternetItemString = '1 Gbps';
		  }

		  this.internetItemsReady = true;

		},//end setDefaultSelectedInternetItemString()

		assignVideoItems() {

		  //PACKAGES
		  this.itemLimitedBasicPackage = this.allPriceItems.find(item => {
			return item.Name == 'Limited Basic';
		  });

		  this.itemBasicPackage = this.allPriceItems.find(item => {
			return item.Name == 'Basic';
		  });

		  this.itemEssentialPackage = this.allPriceItems.find(item => {
			return item.Name == 'Essential';
		  });

		  //ADD ONS
		  this.hboMax = this.allPriceItems.find(item => {
			return item.Name == 'Max';
		  });

		  this.showtime = this.allPriceItems.find(item => {
			return item.Name == 'Showtime';
		  });

		  this.starzEncore = this.allPriceItems.find(item => {
			return item.Name == 'Starz/Encore';
		  });

		  this.cinemax = this.allPriceItems.find(item => {
			return item.Name == 'Cinemax';
		  });

		  this.nflRedzone = this.allPriceItems.find(item => {
			return item.Name == 'NFL Redzone';
		  });

		  //SELECT ADD ONS
		  this.cloudDVR = this.allPriceItems.find(item => {
			return item.Name == 'Cloud DVR';
		  });

		  this.additionalStreams = this.allPriceItems.find(item => {
			return item.Name == 'Additional Streams';
		  });

		  this.videoItemsReady = true;

		},//end assignVideoItems()

		assignVoiceItems() {

		  this.unlimitedVoice = this.allPriceItems.find(item => {
			return item.Name == 'Unlimited Voice';
		  });

		  this.voiceItemsReady = true;

		},//end assignVoiceItems

		assignHomeSmartItems() {

		  //PACKAGES
		  this.security = this.allPriceItems.find(item => {
			return item.Name == 'Security Package';
		  });

		  this.homeAutomation = this.allPriceItems.find(item => {
			return item.Name == 'Home Automation Package';
		  }); 

		  //ADD ONS
		  this.indoorCamera = this.allPriceItems.find(item => {
			return item.Name == 'Indoor Camera';
		  });

		  this.outdoorCamera = this.allPriceItems.find(item => {
			return item.Name == 'Outdoor Camera';
		  });

		  this.smartDoorbellCamera = this.allPriceItems.find(item => {
			return item.Name == 'Smart Doorbell Camera';
		  });

		  this.maintenancePackage = this.allPriceItems.find(item => {
			return item.Name == 'Maintenance Package';
		  });

		  //ATTACK PACK
		  this.attackPackSingle = this.allPriceItems.find(item => {
			return item.Name == 'Attack Pack Single Payment';
		  });

		  this.attackPack12Month = this.allPriceItems.find(item => {
			return item.Name == 'Attack Pack 12-Month Plan';
		  });

		  this.attackPack24Month = this.allPriceItems.find(item => {
			return item.Name == 'Attack Pack 24-Month Plan';
		  });

		  this.homeSmartItemsReady = true;

		},//end assignHomeSmartItems()

		getIncreasedAmount(raw) {

		  const split = raw.split('.');

		  const increasedDollars = parseInt(split[0]) + this.eBillOptOutIncrease;

		  return increasedDollars + '.' + split[1];  

		},//end getIncreasedAmount()

		postOrderDetailsToGoogleSheet(final, url) {

		  let config = {
			'Address': this.fullAddress
		  }

		  config['Comp'] = this.zone.Comp;
		  config['Zone'] = this.zone.Zone;
		  config['Build Out'] = this.zone.Build_Out;

		  config['Selected internet'] = this.selectedInternetItemString;
		  config['E-Bill Opt Out'] = this.eBillOptOut;
		  config['Supply Own Router'] = this.supplyOwnRouter;
		  config['Includes $10 off for 6 months towards YouTube TV, Sling TV, or Hulu + Live TV'] = this.interestedSixFree;

		  config['Selected Video'] = this.selectedVideoItem;

		  if(this.selectedVideoItem == 'HomestreamTV') {
			config['Selected HomeStreamTV Package'] = this.selectedHomeStreamPackageString;

			config['HBO Max'] = this.hboMaxSelected;
			config['Showtime'] = this.showtimeSelected;
			config['Starz/Encore'] = this.starzEncoreSelected;
			config['Cinemax'] = this.cinemaxSelected;
			config['NFL RedZone'] = this.nflRedzoneSelected;

			//Cloud DVR
			let cloudDvrDisplayString;
			if(this.cloudDVRSelected == '0'){
			  cloudDvrDisplayString = 'No additional hours';
			}  
			else {
			  const additionalHours = this.hoursPerCloudDVR * parseInt(this.cloudDVRSelected);
			  cloudDvrDisplayString = `+${additionalHours} hours per month`;
			}
			config['Cloud DVR Storage'] = cloudDvrDisplayString;

			//Additional Streams
			let additionalStreamsDisplayString;
			if(this.additionalStreamsSelected == '0'){
			  additionalStreamsDisplayString = 'No additional streams';
			}  
			else {
			  additionalStreamsDisplayString = `+${this.additionalStreamsSelected} streams per month`;
			}
			config['Additional Streams'] = additionalStreamsDisplayString;
		  }

		  config['Unlimited Voice'] = this.unlimitedVoiceSelected;
		  if(this.unlimitedVoiceSelected) {
			config['Voicemail'] = this.voiceMailSelected;
			config['Caller ID'] = this.callerIdSelected;
			config['Caller Waiting'] = this.callWaitingSelected;
			config['Caller Return'] = this.callerReturnSelected;
			config['Caller Forwarding'] = this.callerForwardingSelected;
		  }

		  config['Security Package'] = this.selectedSecurityItemString;

		  if(this.selectedAttackPack) {
			config['Attack Pack'] = this.selectedAttackPack.Name;
		  }

		  config['Indoor Camera'] = this.indoorCameraSelected;
		  config['Outdoor Camera'] = this.outdoorCameraSelected;
		  config['Smart Doorbell Camera'] = this.smartDoorbellCameraSelected;
		  config['Maintenance Package'] = this.maintenancePackageSelected;

		  if(this.pageID == 'contact-info' && !final) {

			config['First Name'] = this.contactInfo.firstName;
			config['Last Name'] = this.contactInfo.lastName;
			config['Email'] = this.contactInfo.email;
			config['Phone'] = this.contactInfo.phone;

		  } else if(final) {
			config['First Name'] = this.contactInfo.firstName;
			config['Last Name'] = this.contactInfo.lastName;
			config['Email'] = this.contactInfo.email;
			config['Phone'] = this.contactInfo.phone;

			config['Preferred Contact Method'] = this.contactInfo.contactMethod;
			config['Preferred Contact Time'] = this.contactInfo.contactTime

			config['Preferred Appointment Time'] = this.contactInfo.appt;

			config['Subtotal'] = this.subtotal;
		  }

		  if(this.cartProgressID) {
			config['Progress ID'] = this.cartProgressID;
		  }

		  //Post to google sheets
		  $.ajax({
			url: url,
			method: "GET",
			dataType: "json",
			data: config,
			success: () => {

			console.log('final: ' + final);

			//final is true on the final Submit
			if(final) {
			this.submitPostedToGoogleSheet = true;
		  }

				 }
				 })

		},//end postOrderDetailsToGoogleSheet()

		tester() {

		  let subject = 'New Customer Order Form';

		  if(this.selectedInternetItemString == '2 Gbps' 
			 || this.selectedInternetItemString == '1 Gbps') {
			subject = subject +  ' w/ Streaming Deal';
		  } 

		  if(this.switchActivation == '16xcab4acn6bm7koup8y') {
			subject = subject +  ' - FREE Activation';
		  }

		  console.log(subject);

		},

		sendShopToolEmail() {

		  //validate form
		  const form = document.getElementById('final-form');
		  if( !form.reportValidity() ) { 
			document.getElementById('final-form-submit').disabled = false;
			return false 
		  }

		  //this sheet			//https://docs.google.com/spreadsheets/d/1XTKIOav33ZxM9W5znZ6degPZp8K1f0D4INOpuc931gU/edit#gid=56450912
		  //const url = 'https://script.google.com/macros/s/AKfycbw8t51wsVswcch_hwvB5onhg9wo-uHsAhx2Kgb4zVM_b-8KOT2U7xOMErGJIeZ5Lb5Z/exec';
		  //And Preferred
		  const url = 'https://script.google.com/macros/s/AKfycbyEikgTqSBQEa2ucLo7QxXYkj1WQ4d6Wd5M1LGASx_b5tP7pr7bJgCLgVTiRDja-CX_/exec';
		  this.postOrderDetailsToGoogleSheet(true, url);

		  let config = {
			'.cfg.sendTo': this.sendTo,
			'.cfg.sendFrom': 'noreply@homesc.com',
			'.cfg.sendFooter': false,	
		  }

		  config.Address = this.fullAddress;  

		  /*
			all internet used to get the deal
			if(this.selectedInternetItemString == 'false') {
			  config['.cfg.sendSubject'] = 'New Customer Order Form';
			} else {
			  config['.cfg.sendSubject'] = 'New Customer Order Form w/ Streaming Deal';
			}*/

		  /* now only 1 and 2 Gbps get it */
		  
		  let subject = 'New Customer Order Form';

		  if(this.selectedInternetItemString == '2 Gbps' 
			 || this.selectedInternetItemString == '1 Gbps') {
			subject = subject +  ' w/ Streaming Deal';
		  } 

		  if(this.switchActivation == '16xcab4acn6bm7koup8y') {
			subject = subject +  ' - FREE Activation';
		  }
		  
		  config['.cfg.sendSubject'] = subject;

		  config['Selected internet'] = this.selectedInternetItemString;
		  config['Auto-bank Draft Opt Out'] = this.eBillOptOut;
		  config['Supply Own Router'] = this.supplyOwnRouter;
		  config['Includes $10 off for 6 months towards YouTube TV, Sling TV, or Hulu + Live TV'] = this.interestedSixFree;

		  config['Selected Video'] = this.selectedVideoItem;

		  if(this.selectedVideoItem == 'HomestreamTV') {
			config['Selected HomeStreamTV Package'] = this.selectedHomeStreamPackageString;

			config['Max'] = this.hboMaxSelected;
			config['Showtime'] = this.showtimeSelected;
			config['Starz/Encore'] = this.starzEncoreSelected;
			config['Cinemax'] = this.cinemaxSelected;
			config['NFL RedZone'] = this.nflRedzoneSelected;

			//Cloud DVR
			let cloudDvrDisplayString;
			if(this.cloudDVRSelected == '0'){
			  cloudDvrDisplayString = 'No additional hours';
			}  
			else {
			  const additionalHours = this.hoursPerCloudDVR * parseInt(this.cloudDVRSelected);
			  cloudDvrDisplayString = `+${additionalHours} hours per month`;
			}
			config['Cloud DVR Storage'] = cloudDvrDisplayString;

			//Additional Streams
			let additionalStreamsDisplayString;
			if(this.additionalStreamsSelected == '0'){
			  additionalStreamsDisplayString = 'No additional streams';
			}  
			else {
			  additionalStreamsDisplayString = `+${this.additionalStreamsSelected} streams per month`;
			}
			config['Additional Streams'] = additionalStreamsDisplayString;
		  }

		  config['Unlimited Voice'] = this.unlimitedVoiceSelected;
		  if(this.unlimitedVoiceSelected) {
			config['Voicemail'] = this.voiceMailSelected;
			config['Caller ID'] = this.callerIdSelected;
			config['Caller Waiting'] = this.callWaitingSelected;
			config['Caller Return'] = this.callerReturnSelected;
			config['Caller Forwarding'] = this.callerForwardingSelected;
		  }

		  config['Security Package'] = this.selectedSecurityItemString;

		  if(this.selectedAttackPack) {
			config['Attack Pack'] = this.selectedAttackPack.Name;
		  }

		  config['Indoor Camera'] = this.indoorCameraSelected;
		  config['Outdoor Camera'] = this.outdoorCameraSelected;
		  config['Smart Doorbell Camera'] = this.smartDoorbellCameraSelected;
		  config['Maintenance Package'] = this.maintenancePackageSelected;

		  if(this.contactInfo) {
			config['First Name'] = this.contactInfo.firstName;
			config['Last Name'] = this.contactInfo.lastName;
			config['Email'] = this.contactInfo.email;
			config['Phone'] = this.contactInfo.phone;
			config['Preferred Contact Method'] = this.contactInfo.contactMethod;
			config['Preferred Contact Time'] = this.contactInfo.contactTime
			config['Preferred Appointment Time'] = this.contactInfo.appt;
		  }

		  $.ajax({
			url : 'forms/mail.aspx',
			type: "post",
			dataType: 'json',
			data: config,
			success: () => {
			  this.submitEmailSent = true;
			},
			error: function (jXHR, textStatus, errorThrown) {
			  alert(errorThrown);
			}
		  });

		},//end sendShopToolEmail()

		nextPage() {	

		  let pageCount;

		  if(this.selectedVideoItem == 'MyBundle') {
			pageCount = this.pages.length;
		  } 

		  else if(this.selectedVideoItem == 'HomestreamTV') {	
			pageCount = this.pagesHomeStream.length;
		  }

		  if(this.pageIndex + 1 == pageCount) { return false }

		  if(!this.validateNextPage()) { return false }

		  else { 
			this.pageIndex++;
			this.scrollShoptool();
			this.saveInProgress();
		  }

		  if(this.pageID == 'shop-video'
			 && this.firstVideo) {
			this.firstVideo = false;
			this.dropOffPost('video');
		  }

		  else if(this.pageID == 'shop-voice'
				  && this.firstVoice) {
			this.firstVoice = false;
			this.dropOffPost('voice');
		  }

		  else if(this.pageID == 'shop-security'
				  && this.firstSecurity) {
			this.firstSecurity = false;
			this.dropOffPost('security');
		  }

		  else if(this.pageID == 'contact-info') {

			this.showCartToggle = true;
			this.showSummary = false;

			if(this.firstContact) {
			  //set this to false so the page turn email and sheets post only happens once
			  this.firstContact = false;

			  this.dropOffPost('contact-info')

			  //Address and Order Details and Contact Info
			  //const url = 'https://script.google.com/macros/s/AKfycbw8t51wsVswcch_hwvB5onhg9wo-uHsAhx2Kgb4zVM_b-8KOT2U7xOMErGJIeZ5Lb5Z/exec';

			  //Address and Order Details
			  const url = 'https://script.google.com/macros/s/AKfycbzI3U-OTKP3WEBvEE85Psg9KFH18A3pi28hEa4TsJk7aps4D29kLbqd687e-5jHf3F3/exec';

			  this.postOrderDetailsToGoogleSheet(null, url);
			}
		  }

		},//end nextPage()

		changeFinalFormPage(page) {
		  
		  //validate first 1/2 of form
		  let firstNameValid = $('#shop-tool-first-name').checkValidity();
		  let lastNameValid = $('#shop-tool-last-name').checkValidity();
		  let emailValid = $('#shop-tool-email').checkValidity();
		  let phoneValid = $('#shop-tool-phone').checkValidity();

		  if(page == 'two' && (
			!firstNameValid
			|| !lastNameValid
			|| !emailValid
			|| !phoneValid
		  )) {
			return false;
		  }

		  this.finalFormPage = page;

		  if(this.finalFormPage == 'two'
			 && this.firstPreferred) {
			this.firstPreferred = false;
			this.dropOffPost('final-form');
		  }

		},//end changeFinalFormPage()

		dropOffPost(type) {

		  const internetURL = 'https://script.google.com/macros/s/AKfycby9EsaWYOWuOGTDnepg6Cm9mOHEDFJNPjemMmmGytiueN_1TbIthUI6X5qgzqxV7ixR/exec';

		  const videoURL = 'https://script.google.com/macros/s/AKfycbx5pkIr1ulJThITl86RK9xV1gPO6xndXAeBDA0at1Lrbnik-EsZ7n0WHrg-GS-_1PK-/exec';

		  const voiceURL = 'https://script.google.com/macros/s/AKfycbxfgPlHNzXICyYILoOWT8X-Tu7sypdoi4M12H_tb8FZUmC4USm_89od5w3IuVULVkCR/exec';

		  const securityURL = 'https://script.google.com/macros/s/AKfycbyAoHwfWU8pRsUjW4B5WSfcyCZ2C3dkhFVPbXtHRu5Z4Je-RllwqmN57GzsIEVpoWQ/exec';

		  // THIS URL IS INCORRECT
		  //T HIS POSTS TO A + OD + CI + Preffered
		  // SHOULD POST TO Address and Order Details and Contact Info
		  const finalFormURL = 'https://script.google.com/macros/s/AKfycbw8t51wsVswcch_hwvB5onhg9wo-uHsAhx2Kgb4zVM_b-8KOT2U7xOMErGJIeZ5Lb5Z/exec';

		  let url;
		  //when they hit a new page, send last page's information
		  if(type == 'video') {
			url = internetURL;
		  } else if(type == 'voice') {
			url = videoURL;
		  } else if(type == 'security') {
			url = voiceURL;
		  } else if(type == 'contact-info') {
			url = securityURL;
		  } else if(type == 'final-form') {
			url = finalFormURL;
		  }

		  this.postOrderDetailsToGoogleSheet(null, url);

		},//end dropOffPost

		validateNextPage() {

		  valid = true;

		  //validate voice page
		  if(this.pageID == 'shop-voice') {

			//if unlimited voice is selected
			//then enforce choosing 3 voice features
			if(this.unlimitedVoiceSelected
			   && this.totalVoiceAddOnsSelected != 3) {
			  alert('Please choose 3 calling features');
			  valid = false;
			}

		  }

		  //validate security page
		  else if(this.pageID == 'shop-security') {


			if(this.selectedSecurityItemString != 'false'
			   && this.attackPackSelectedString == 'false') {
			  alert('Please choose an Attack Pack payment plan');
			  valid = false;
			}

		  }

		  return valid;

		},//end validateNextPage()

		previousPage() {

		  if(this.pageIndex == 0) { return false }

		  else { 
			this.pageIndex--
			this.scrollShoptool();
		  }

		},//end previousPage()

		scrollShoptool() {

		  const shopTool = document.getElementById("scroll-to-shop-tool");
		  shopTool.scrollIntoView({
			behavior: 'smooth',
		  });

		},//end scrollShoptool()

	  },//end methods

	  filters: {

		dollars: function(raw) {

		  const split = raw.split('.');
		  return split[0];

		},

		cents: function(raw) {

		  const split = raw.split('.');

		  let cents = split[1];

		  if(cents === undefined
			 || cents === 'undefined') {
			return '00';
		  }

		  else if(cents.length == 1) {
			return cents + '0';
		  }

		  else {
			return cents;
		  }

		},

		currency: function (amount) {
		  const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2
		  })
		  return formatter.format(parseFloat(amount));
		},//end currency

	  },//end filters

	})//end new VUE

  });
