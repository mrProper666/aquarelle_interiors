$(document).ready(function(e) {
	$('a.fancybox').fancybox({
		'openSpeed': 400, 
		'closeSpeed': 400,
		'overlayOpacity': 0.6,
		'titleShow': false,
		'cyclic': true,
		'nextSpeed' : 400,
		'prevSpeed': 400,
		'padding': 20,
		'minWidth': 10,
		'minHeight': 10,
		helpers:  {
			title:  null,
			overlay: {
				locked: false
			}
		}
	});

  $("a.open-contact-form").on('click', function() {
  	var data = $(this).data('app');
  	$.fancybox.open(
  		$("#ContactForm"),
	  	{
				maxWidth	: 800,
				maxHeight	: 650,
				fitToView	: true,
				//width		: '75%',
				//height		: '75%',
				autoSize	: true,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none',
		    beforeClose	: function() {
		      $("#ContactForm").hide();
		    },
		    beforeShow	: function() {
		    	$("#ContactForm").find('#app').val(data);
		    },
				helpers:  {
					overlay: {
						locked: false
					}
				}
			});
  	return false;
	});

 //  $("a.open-contact-form").fancybox({
	// 	maxWidth	: 800,
	// 	maxHeight	: 650,
	// 	fitToView	: true,
	// 	//width		: '75%',
	// 	//height		: '75%',
	// 	autoSize	: true,
	// 	closeClick	: false,
	// 	openEffect	: 'none',
	// 	closeEffect	: 'none',
 //    beforeClose	: function() {
 //      $("#ContactForm").hide();
 //    },
 //    beforeLoad	: function() {
 //    	console.log($(this)[0]);
 //    },
 //    beforeShow	: function() {
 //    	//console.log($(this)[0].content.find('#ActionSubmit')[0]);
 //    	var app = $(this).data('app');
 //    	//console.log(app);
 //    	$("#ContactForm").find('#app').val(app);
 //    },
	// 	helpers:  {
	// 		overlay: {
	// 			locked: false
	// 		}
	// 	}
	// });

});