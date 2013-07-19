var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  init: function() {
    
    this.bindUIActions();
    
  },

  bindUIActions: function() {

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on("click", function() {
      
      if (!EffecktOffScreenNav.nav.hasClass("effeckt-off-screen-nav-show")) {

        // an attempt to address issue #108.
        // don't set 'type' and 'threedee' vars if nav is currently shown;
        // opening the hidden nav and clicking on other effeckt nav buttons
        // causes unexpected behavior.
        
        // alternatively, we can also prevent (or ignore) clicks (on nav toggles)
        // from setting 'type' and 'threedee' vars while the nav bar is shown.
        
        var type = $(this).data("effeckt");
        var threedee = $(this).data("threedee");

        EffecktOffScreenNav.show(type, threedee)

      } else {

        EffecktOffScreenNav.hide(type, threedee)

      }

    });

  },

  // creating seperate show() and hide() methods allows for better modularity
  show: function(type, threedee) {

      EffecktOffScreenNav.nav.addClass(type);
      EffecktOffScreenNav.closeButton.data("effeckt", type);

      if (threedee) {
        $("html").addClass("md-perspective");
      }
    
      setTimeout(function() {
        EffecktOffScreenNav.nav.addClass("effeckt-off-screen-nav-show");
      }, 500);

  },

  hide: function(type, threedee) {

      EffecktOffScreenNav.nav.removeClass("effeckt-off-screen-nav-show");

      setTimeout(function() {

        EffecktOffScreenNav.nav.removeClass(EffecktOffScreenNav.closeButton.data("effeckt"));

        // WEIRD BUG
        // Have to trigger redraw or it sometimes leaves
        // behind a black box (Chrome 27.0.1453.116)
        EffecktOffScreenNav.nav.hide();
        var blah = EffecktOffScreenNav.nav.width();
        EffecktOffScreenNav.nav.show();

        if (threedee) {
          $("html").removeClass("md-perspective");
        }
        
      }, 500);

    }    
};

EffecktOffScreenNav.init();
