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
      'text': "New Item",
      'class': "new-item"
    }).insertAfter(insertPoint);

  },

  removeListItem: function(el) {

    var $parent = $(el).parent();
    var type = $parent.find("ul").attr("data-type");
    var delay = type === "expand-in" ? 200: type === "flip-in" ? 1200: 500;
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