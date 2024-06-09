
  $(document).ready(function() {
	
	new Vue({
	  el: '#counter-box',  
	  data() {
		return {
		  count: 0,
		  increment: 64,
		}
	  },
	  created() {
		
		setInterval(() => {
		  this.count += this.increment;
		}, 200)

	  },
	  computed: {
		countDisplay: function () {
		  return String(this.count);
		}
	  },

	})//end new VUE
	
  });
