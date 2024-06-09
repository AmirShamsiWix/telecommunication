
  $(function() {
	
	$('#blog-search').submit(function(e) {
	  e.preventDefault();
      location.href = "/post-search-results?item=" + $('input#search', $('#blog-search')).val();
	})
	
	$('.article-select').on('change', function() {  
	  let selectedVal = $(this).val();
	  if( selectedVal != 'choose' ) {
		location.href = selectedVal;
	  }  
	});
	
  })
