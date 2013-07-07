var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on("click", function() {
      var type = $(this).data("modalType");

      EffecktOffScreenNav.toggleNav(type);
    });

  },

  toggleNav: function(type) {

    // Show
    if (!EffecktOffScreenNav.nav.hasClass("effeckt-off-screen-nav-show")) {

      EffecktOffScreenNav.nav.addClass(type);
      EffecktOffScreenNav.closeButton.data("modal-type", type);

      setTimeout(function() {
        EffecktOffScreenNav.nav.addClass("effeckt-off-screen-nav-show");
      }, 500);

    // Hide
    } else {

      EffecktOffScreenNav.nav.removeClass("effeckt-off-screen-nav-show");

      setTimeout(function() {
        EffecktOffScreenNav.nav.removeClass(type);

        // WEIRD BUG
        // Have to trigger redraw or it sometimes leaves
        // behind a black box (Chrome 27.0.1453.116)
        EffecktOffScreenNav.nav.hide();
        var blah = EffecktOffScreenNav.nav.width();
        EffecktOffScreenNav.nav.show();

      }, 500);

    }    

  }

};

EffecktOffScreenNav.init();
