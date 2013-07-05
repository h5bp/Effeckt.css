var ListItems1 = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".effeckt-list-wrap button.add").on("click", function() {
      ListItems1.addListItem(this);
    });

    $(".effeckt-list-wrap button.remove").on("click", function() {
      ListItems1.removeListItem(this);
    });

    $("button.remove").hide();
  },

  addListItem: function(el) {

    var insertPoint = $(el).parent().find("li:nth-child(3)");
    $(el).parent().find("button.remove").show();

    $("<li />", {
      'text': "new item",
      'class': "new-item"
    }).insertAfter(insertPoint);

  },

  removeListItem: function(el) {

    var $parent = $(el).parent();
    var type = $parent.find("ul").attr("data-type");

    // Having the timing here in JS is kinda not great.
    switch (type) {
      case 'expand-in':
        delay = 200;
        break;
      case 'wobble-in':
        delay = 1200;
        break;
      case 'flip-in':
        delay = 1000;
        break;
      default:
        delay = 500;
    }

    var elToRemove = $parent.find("li.new-item").last();

    elToRemove.toggleClass("remove-item new-item");
    window.setTimeout(function () {
      elToRemove.remove();
    }, delay);

    if (!$parent.find("li.new-item").length) {
      $parent.find("button.remove").hide();
    }

  }

};

ListItems1.init();
