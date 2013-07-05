var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".off-screen-nav-button").on("click", function() {
      var type = $(this).data("modalType");

      EffecktOffScreenNav.toggleNav(type);
    });

  },

  toggleNav: function(type) {

    // Show
    if (!EffecktOffScreenNav.nav.hasClass("effeckt-off-screen-nav-show")) {

      EffecktOffScreenNav.nav.addClass(type);

      setTimeout(function() {
        EffecktOffScreenNav.nav.addClass("effeckt-off-screen-nav-show");
      }, 500);

    // Hide
    } else {

      EffecktOffScreenNav.nav.removeClass("effeckt-off-screen-nav-show");

      setTimeout(function() {
        EffecktOffScreenNav.nav.removeClass(type);
      }, 500);

    }    

  }

};

EffecktOffScreenNav.init();
