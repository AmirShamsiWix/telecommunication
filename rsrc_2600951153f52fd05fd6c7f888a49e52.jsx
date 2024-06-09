
  
  $(document).ready(function() {
	const searchBar = $("#hstv-search-bar")
	searchBar.on("input", function() {
	  const query = searchBar.val().trim().toLowerCase();
	  if (query) {
		$(".faq-item").each(function() {
		  if ($(this).find(".faq-b").text().toLowerCase().includes(query)) {
			$(this).show()
		  } else {
			$(this).hide()
		  }
		});
	  } else {
		$(".faq-item").each(function() {
		  $(this).show();
		});
	  }
	});
  });

