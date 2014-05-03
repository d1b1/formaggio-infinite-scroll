!function(window, document, $, Board) {
  var ListView = infinity.ListView,
      ListItem = infinity.ListItem,
      _ = require('underscore'),
      currentColumn = 0;

  var cheeseTpl = _.template($('#cheese-tpl').html());

  var columns = $('.list-view'),
      cheeseCount = 0;

  if(Board.config.infinityOn) {
    columns.each(function() {
      var listView = new ListView($(this), {
        lazy: function() {
          $(this).find('.curd').each(function() {
            var $ref = $(this);
            $ref.attr('src', $ref.attr('data-original'));
          });
        }
      });
      $(this).data('listView', listView);
    });
  }

  function build(data) {
    cheeseCount++;
    return cheeseTpl({ cheese: data });
  }

  function add(cheeseData) {
    cheeseData.main_image || (cheeseData.main_image = {});
    if (!cheeseData.main_image.large) return

    var col = $(columns[currentColumn]);

    if(Board.config.infinityOn) col.data('listView').append(build(cheeseData));
    else col.append(build);

    // Move the current Column Pointer.
    (currentColumn == (columns.length-1)) ? (currentColumn = 0) : currentColumn++;
  }

  Board.addCheese = add;
  Board.count = function() { return cheeseCount; };
}(window, document, jQuery, Board);
