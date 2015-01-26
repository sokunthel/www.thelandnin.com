// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function main() {

(function () {
   'use strict';

    
  $(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
      $('.row-offcanvas').toggleClass('active')
    });
  });

 $(function() {
      $('a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 140
            }, 1000);
            return false;
          }
        }
      });
    });

  // When we click on the LI
  $(".list-group a").click(function(){
    // If this isn't already active
    if (!$(this).hasClass("active")) {
      // Remove the class from anything that is active
      $(".list-group a.active").removeClass("active");
      // And make this active
      $(this).addClass("active");
    }
  });

 $('.selectpicker').selectpicker({
      style: 'btn-info',
      size: 4
  });



}());


}
main();