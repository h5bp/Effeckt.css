var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on("click", function() {
      var type = $(this).data("effeckt");
      var threedee = $(this).data("threedee");
      EffecktOffScreenNav.toggleNav(type, threedee);
    });

  },

  toggleNav: function(type, threedee) {

    // Show
    if (!EffecktOffScreenNav.nav.hasClass("effeckt-off-screen-nav-show")) {

      EffecktOffScreenNav.nav.addClass(type);
      EffecktOffScreenNav.closeButton.data("effeckt", type);

      if (threedee) {
        $("html").addClass("md-perspective");
      }

      setTimeout(function() {
        EffecktOffScreenNav.nav.addClass("effeckt-off-screen-nav-show");
      }, 500);

    // Hide
    } else {

      EffecktOffScreenNav.nav.removeClass("effeckt-off-screen-nav-show");

      setTimeout(function() {

        EffecktOffScreenNav.nav.removeClass(EffecktOffScreenNav.closeButton.data("effeckt"));

        // WEIRD BUG
        // Have to trigger redraw or it sometimes leaves
        // behind a black box (Chrome 27.0.1453.116)
        EffecktOffScreenNav.nav.hide();
        var blah = EffecktOffScreenNav.nav.width();
        EffecktOffScreenNav.nav.show();

        $("html").removeClass("md-perspective");

      }, 500);

    }    

  }

};

EffecktOffScreenNav.init();
