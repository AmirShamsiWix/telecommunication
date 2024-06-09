
  $(document).ready(function() {
	$(".jump-bubble").click(function() {
	  const jumpTo = $(this).data("jump");
	  const navbarHeight = $("header").first().height();
	  const y = $(jumpTo).position().top - navbarHeight;
	  window.scrollTo(0, y);
	});
	
  });
