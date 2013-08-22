var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this;

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on("click", function() {
      var type = $(this).data("effeckt-type");
      var threedee = $(this).data("threedee");
      self.toggleNav(type, threedee);
    });

  },

  toggleNav: function(type, threedee) {

    var self = this;

    // Show
    if (!this.nav.hasClass("effeckt-off-screen-nav-show")) {

      this.nav.addClass(type);
      this.closeButton.data("effeckt-type", type);

      if (threedee) {
        $("html").addClass("md-perspective");
      }

      setTimeout(function() {
        self.nav.addClass("effeckt-off-screen-nav-show");
      }, 500);

    // Hide
    } else {

      this.nav.removeClass("effeckt-off-screen-nav-show");

      setTimeout(function() {

        self.nav.removeClass(self.closeButton.data("effeckt-type"));

        // WEIRD BUG
        // Have to trigger redraw or it sometimes leaves
        // behind a black box (Chrome 27.0.1453.116)
        self.nav.hide();
        var blah = self.nav.width();
       	self.nav.show();

        $("html").removeClass("md-perspective");

      }, 500);

    }    

  }

};

EffecktOffScreenNav.init();
