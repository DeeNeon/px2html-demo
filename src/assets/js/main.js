/**
 * Pixel2HTML - px2html/px2html-demo
 */

$(function() {
  'use strict';

  $('img.svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      var $svg = $(data).find('svg');

      if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      $svg = $svg.removeAttr('xmlns:a');
      $img.replaceWith($svg);

    }, 'xml');

  });

  var docElem = document.documentElement,
      header = $('.header'),
      didScroll = false,
      changeHeaderOn = 300;

  $(document).on('scroll', function() {
    if( !didScroll ) {
      didScroll = true;
      setTimeout( scrollPage, 250);
    }

  });

  var $window = $(window);

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

  function check_if_in_view() {
    if($window.width() < 768) {
      $('.body-wrapper').addClass('container');
    } else {
      $('.body-wrapper').removeClass('container');
    }

    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($('.features li, .sliderWrapper, .button-container, .pricing center, .portfolio center, .brands, footer .col-sm-3'), function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('animated fadeIn');
      }
    });
  }

  function scrollPage() {
    var sy = scrollY();
    if ( sy >= changeHeaderOn ) {
      header.addClass('header-shrink');
    }
    else {
      header.removeClass('header-shrink');
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  var slider = $('.slider');

  slider.unslider({
    speed: 400,
    delay: 3000,
    autoplay: false,
    keys: true,
    dots: true,
    fluid: false
  });

  $('.unslider-arrow.next').text('').addClass('glyphicon glyphicon-menu-right');
  $('.unslider-arrow.prev').text('').addClass('glyphicon glyphicon-menu-left');

  $('.plan:nth-child(3)').addClass('suggested');

  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  if(is_safari) {
    $('.portfolio').css('padding-top','3em');
  }
});
