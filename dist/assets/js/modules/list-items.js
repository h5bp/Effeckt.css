var EffecktListItems = {

  isTouchDevice: Modernizr.touch,

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this,
        evt  = ( this.isTouchDevice ) ? 'touchstart' : 'click';

    $(".effeckt-list-wrap button.add").on(evt, function() {
      self.addListItem(this);
    });

    $(".effeckt-list-wrap button.remove").on(evt, function() {
      self.removeListItem(this);
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

EffecktListItems.init();
