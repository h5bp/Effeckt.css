var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  isTouchDevice: Modernizr.touch,


  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this,
        evt = 'click';

    if (this.isTouchDevice) {
      evt += ' touchstart';
    }

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on(evt, function() {
      self.toggleNav(this);
    });

  },

  toggleNav: function(el) {

    var button = $(el),
        type = button.data("effeckt-type"),
        threedee = button.data("threedee"),
        self = this;

    // Show
    if (!this.nav.hasClass("effeckt-off-screen-nav-show")) {

      this.nav.addClass(type);
      this.closeButton.data("effeckt-type", type);

      if (threedee) {
        $("html").addClass("md-perspective");
      }

      if (button.data("effeckt-hide")) {
        this.nav.data("effeckt-hide", button.data("effeckt-hide"));
      }

      setTimeout(function() {

        self.nav.addClass("effeckt-off-screen-nav-show");
      }, 500);

    // Hide
    } else {
      
      var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
          self = this;

      this.nav.on( evt, function () {
        self.nav.off( evt );
        self.hideNav();
      });

      this.nav.removeClass("effeckt-off-screen-nav-show");
      
      if( this.nav.data("effeckt-hide") ){
        this.nav.addClass("effeckt-off-screen-nav-hide");
      }

    }    

  },

  hideNav: function() {

    var self = this;

    self.nav.removeClass(self.closeButton.data("effeckt-type"));
    self.nav.removeClass("effeckt-off-screen-nav-hide");
    self.nav.removeData("effeckt-hide");

    // WEIRD BUG
    // Have to trigger redraw or it sometimes leaves
    // behind a black box (Chrome 27.0.1453.116)
    self.nav.hide();
    var blah = self.nav.width();
    self.nav.show();

    $("html").removeClass("md-perspective");
  }

};

EffecktOffScreenNav.init();
