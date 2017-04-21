$(document).ready(function() {
  "use strict";

  var _width = $(window).width();
  $('body').attr('data-resolution', _width + 'px');
  $('body').attr('data-touch', Modernizr.touchevents);
  //$('body').animate({opacity:1},{duration:600, always:function(){$('body').css({'opacity':1})}});

  // SVG to PNG fallback
  if(!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
          return $(this).attr('src').replace('.svg', '.png');
      });
  } else {
    /*  Replace all SVG images with inline SVG */
    $('img.svg').each(function(){
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
         //Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');
         //Add replaced image\'s ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
         //Add replaced image\'s classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
         //Remove any invalid XML tags as per http:validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
         //Replace image with new SVG
        $img.replaceWith($svg);
      });
    });
  }

  $(document).foundation();

  /*$('.banner.owl-carousel').owlCarousel({
    items: 1
  });*/
  $('.gallery.owl-carousel').owlCarousel({
    items: 3,
    smartSpeed: 500,
    nav: true,
    navText: ['<img class="svg" src="assets/img/prev-portfolio.svg" />','<img class="svg" src="assets/img/next-portfolio.svg" />'],
    dots: false,
    dotsEach: true,
    responsive: {
      0:{
        items: 1,
        nav: false,
        dots: true
      },
      567:{
        items: 2,
        nav: true,
        dots: true
      },
      1199:{
        nav: true
      }
    },
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,
  });
  $('.interior.owl-carousel').owlCarousel({
    items: 1,
    smartSpeed: 500,
    nav: true,
    navText: ['<img class="svg" src="assets/img/prev-portfolio.svg" />','<img class="svg" src="assets/img/next-portfolio.svg" />'],
    dots: false,
    dotsEach: true,
    responsive: {
      0:{
        items: 1,
        nav: false,
        dots: true
      },
      567:{
        items: 1,
        nav: true,
        dots: true
      },
      1199:{
        nav: true
      }
    },
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,
  });

  $('.saccordion').on('down.zf.accordion', function(e){
    $.smoothScroll({
      scrollTarget: $(this).find('.is-active')
    });
    return false;
  });

  // ajax request form
  var options = { 
    success: showThankyou,
    clearForm: true,
    resetForm: true
  };
  $("#ContactForm_Form").submit(function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    console.log('submit via ajax');
    if (validator.form()) $(this).ajaxSubmit(options);
    return false;
  });

  var validator = $("#ContactForm_Form").validate({
    ignore: ".ignore",
    rules: {
      Name: {
        required: function() {
          if ($("#Name").val()) {
             return false;
          } else {
             return true;
          }
        }
      },
      Email: {
        required: function() {
          if ($("#Email").val()) {
           return false;
          } else {
           return true;
          }
        },
        email: true
      },
      Message: {
        required: true
      },
      hiddenRecaptcha: {
        required: function() {
          if(grecaptcha.getResponse() == '') {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  });
  
  function recaptchaCallback() {
    $('#hiddenRecaptcha').valid();
  };
  
  function showThankyou(responseText, statusText, xhr, $form) {
    $('#ContactForm_Form').replaceWith(responseText);
  }

});
