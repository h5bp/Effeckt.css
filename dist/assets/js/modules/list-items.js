var ListItems = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".effeckt-list-wrap button.add").on("click", function() {
      ListItems.addListItem(this);
    });

    $(".effeckt-list-wrap button.remove").on("click", function() {
      ListItems.removeListItem(this);
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

    var elToRemove = $parent.find("li.new-item").last();
    elToRemove.on(EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName , function () {
      elToRemove.remove();
    });

    elToRemove.toggleClass("remove-item new-item");
    if (!$parent.find("li.new-item").length) {
      $parent.find("button.remove").hide();
    }

  }

};

ListItems.init();
