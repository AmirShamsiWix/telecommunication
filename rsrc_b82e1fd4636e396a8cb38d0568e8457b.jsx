$(function(){var a=$(".faq-b").next("div");$(".faq-b").click(function(){$(".faq-b").children().addClass("fa-chevron-down");$(".faq-b").children().removeClass("fa-chevron-up");$this=$(this);$target=$this.next("div");$(".faq-b").removeClass("minus");if($target.is(":hidden")){a.not(this).slideUp();$target.slideDown();$(this).addClass("minus");$(this).children().addClass("fa-chevron-up");$(this).children().removeClass("fa-chevron-down")}else{a.not(this).slideUp();$target.slideUp();$(".faq-b").removeClass("minus")}return false})});