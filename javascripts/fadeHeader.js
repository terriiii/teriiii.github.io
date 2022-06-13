//Fade away header
  $(window).scroll(function() {
      var scrollTop = $(this).scrollTop();
  
          $('h1').css({
          opacity: function() {
              var elementHeight = $(this).height(),
              opacity = ((elementHeight - scrollTop) / elementHeight);
              return opacity;
          }
      });
  });
