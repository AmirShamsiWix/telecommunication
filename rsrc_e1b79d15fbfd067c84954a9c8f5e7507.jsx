$(document).ready(function(){$("#chng_srvc_rqst").submit(function(b){b.preventDefault()});$("#chng_srvc_rqst select").change(function(){if($(this).val()!==""){location.href=$("option:selected",$(this)).data("href")}else{}});var a=$("#srvc_rqst_form");a.submit(function(b){b.preventDefault();if($("#sr-phone").val()===""&&$("#sr-email").val()===""){$.fancybox({content:"<h4>Looks like you forgot something..</h4><p>Please provide a valid phone number or email address before submitting your request.</p>"});return false}else{a.unbind("submit").submit()}})});