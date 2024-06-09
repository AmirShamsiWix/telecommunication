
  $(document).ready(function() {
	let params = new URLSearchParams(document.location.search);
	let src = params.get("src");
	$("#main").attr("src", src);
  });
