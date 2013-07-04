var ListItems1 = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".effeckt-list-wrap button").on("click", function() {
      ListItems1.addListItem(this);
    });

  },

  addListItem: function(el) {

    var insertPoint = $(el).parent().find("li:nth-child(3)");
      
    $("<li />", {
      'text': "New Item",
      'class': "new-item"
    }).insertAfter(insertPoint);

  }

};

ListItems1.init();