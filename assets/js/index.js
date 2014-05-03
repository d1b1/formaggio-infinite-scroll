!function(window, $, infinity, Board) {
  var _ = require('underscore')
      , pageCount = 0
      , spinnerTemplate = _.template($('#spinner-tpl').html());

  infinity.config.PAGE_TO_SCREEN_RATIO = 3;
  infinity.config.SCROLL_THROTTLE = 100;

  function APIUrl(size) {
    return 'http://api.formagg.io/cheese/search?size=200&page=' + (pageCount++);
  };

  !function() {
    var spinner = $(spinnerTemplate());
    var updateScheduled = false;

    function onscreen($el) {
      var viewportBottom = $(window).scrollTop() + $(window).height();
      return $el.offset().top <= viewportBottom;
    }

    spinner.insertAfter($('#board').closest('.row'));
    $(window).on('scroll', function() {
      if(!updateScheduled) {
        setTimeout(function() {
          if(onscreen(spinner)) {
            $.getJSON( APIUrl(), function( data ) {
              $.each(data.results, function( key, val ) {
                Board.addCheese(val);
              });
            });
          }
          updateScheduled = false;
        }, 500);
        updateScheduled = true;
      }
    });
  }();

  // Initial page load call to the API.
  $.getJSON( APIUrl(), function( data ) {
    $.each( data.results, function( key, obj ) {
      Board.addCheese(obj);
    });
  });

}(window, jQuery, infinity, Board);
