
  window.addEventListener('DOMContentLoaded', function() {
	Vue.createApp({
	  data() {
		return {
		  devices: "0",
		  uses: [false, false, false, false, false, false],
		  showDevices: true,
		  calculate: false,
		}
	  },

	  methods: {
		setDevices(s) {
		  this.devices = s;
		  this.toggleShowDevices();
		},

		toggleUse(n) {
		  this.uses[n] = !this.uses[n];
		},

		isDevicesSelected(s) {
		  return this.devices === s ? "selected" : "";
		},

		isUseSelected(n) {
		  return this.uses[n] ? "selected" : "";
		},

		toggleShowDevices() {
		  this.showDevices = !this.showDevices;
		},

		highlight(s) {
		  if (s === 300) {
			return this.bandwidth <= 300 && this.bandwidth > 0 ? "highlighted" : "hidden";
		  } else if (s === 500) {
			return this.bandwidth <= 500 && this.bandwidth > 300 ? "highlighted" : "hidden";
		  } else if (s === 1000) {
			return this.bandwidth > 500 ? "highlighted" : "hidden";
		  }

		  //return s === this.bandwidth ? "highlighted" : "";
		},

		doCalculate() {
		  //if number of devices aren't set, just pick the middle one
		  if (this.devices == "0") {
			this.devices = "6-11";
		  }
		  this.calculate = true;
		},

		restart() {
		  this.devices = "0";
		  this.uses = [false, false, false, false, false, false];
		  this.showDevices = true;
		  this.calculate = false;
		}
	  },

	  computed: {
		devicesClass() {
		  return this.showDevices ? "" : "hidden";
		},

		usesClass() {
		  return this.showDevices ? "hidden" : "";
		},

		bandwidth() {
		  //calculation logic
		  let b = 0;
		  let multiplier = 0;

		  //if max devices are chosen or gaming is chosen, set bandwidth to max
		  if (this.devices === "12+" || this.uses[2]) {
			return 1000

		  } else if (this.devices === "6-11") {
			b = 250;
			multiplier = 200;

		  } else if (this.devices === "1-5") {
			b = 100;
			multiplier = 100

		  } else {
			return 0;
		  }

		  //add multiplier to bandwidth for each usage selected
		  const numberSelected = this.uses.filter(e => e === true).length;
		  b += numberSelected * multiplier;

		  //limit to max speed available
		  return Math.min(b, 1000);
		},
	  },
	}).mount("#bandwidth-estimator-2022");
  });
