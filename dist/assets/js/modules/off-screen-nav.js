var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  isTouchDevice: Modernizr.touch,

  effeckt_type: '',
  threedee: false,

  _checkForMore: {
    'effeckt-off-screen-nav-card-deck-top': {
      'showMethod': '_showCardDeckTop',
      'hideMethod': '_hideCardDeckTop',
      'initMethod': '_initCardDeckTop',
      'endMethod': '_endCardDeck'
    },
    'effeckt-off-screen-nav-card-deck-bottom': {
      'showMethod': '_showCardDeckBottom',
      'hideMethod': '_hideCardDeckBottom',
      'initMethod': '_initCardDeckBottom',
      'endMethod': '_endCardDeck'
    }
  },


  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this,
        evt  = ( this.isTouchDevice ) ? 'touchstart' : 'click';

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on(evt, function() {
      self.toggleNav(this);
    });

  },

  toggleNav: function(el) {

    var button = $(el),
        self = this;

    this.effeckt_type = button.data("effeckt-type");
    this.threedee = button.data("threedee");

    // Show
    if (!this.nav.hasClass("effeckt-show")) {

      this.nav.addClass(this.effeckt_type);
      this.closeButton.data("effeckt-type", this.effeckt_type);

      if (this.threedee) {
        $("html").addClass("md-perspective");
      }

      if (button.data("effeckt-needs-hide-class")) {
        this.nav.data("effeckt-needs-hide-class", button.data("effeckt-needs-hide-class"));
      }

      setTimeout(function() {

        self.nav.addClass("effeckt-show");
      }, 500);

      // check if need more coding done
      // to make the effect works
      // beyond css
      this._checkForMoreOnShow()

    // Hide
    } else {
      
      var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
          self = this;

      this.nav.on( evt, function () {
        self.nav.off( evt );
        self.hideNav();
      });

      this.nav.removeClass("effeckt-show");
      
      if( this.nav.data("effeckt-needs-hide-class") ){
        this.nav.addClass("effeckt-hide");
      }

      // check if need more coding done
      // to make the effect works
      // beyond css
      this._checkForMoreOnHide()

    }    

  },

  hideNav: function() {

    var self = this;

    self.nav.removeClass(self.closeButton.data("effeckt-type"));
    self.nav.removeClass("effeckt-hide");
    self.nav.removeData("effeckt-needs-hide-class");

    // WEIRD BUG
    // Have to trigger redraw or it sometimes leaves
    // behind a black box (Chrome 27.0.1453.116)
    self.nav.hide();
    var blah = self.nav.width();
    self.nav.show();

    $("html").removeClass("md-perspective");
  },

  // Check for more thing to do using javascript
  // that is beyond CSS
  _checkForMoreOnShow: function() {

    // Iterate each effeckt_type declared before
    // which need more thing do to
    for ( effeckt_type in this._checkForMore ) {

      if ( effeckt_type !== this.effeckt_type ) {
        continue;
      }

      var hideMethod = this._checkForMore[effeckt_type]['hideMethod'],
          initMethod = this._checkForMore[effeckt_type]['initMethod'];

      this._callThisMethod(hideMethod);
      this._callThisMethod(initMethod);

      // Break on first match
      // because we are only working with only one effect at time
      break;

    }
  },

  _checkForMoreOnHide: function() {

    for ( effeckt_type in this._checkForMore ) {

      if ( effeckt_type !== this.effeckt_type ) {
        continue;
      }

      var hideMethod = this._checkForMore[effeckt_type]['hideMethod'],
          endMethod = this._checkForMore[effeckt_type]['endMethod'];

      this._callThisMethod(hideMethod);
      this._callThisMethod(endMethod);

      // Break on first match
      // because we are only working with only one effect at time
      break;

    }
  },

  //--------------------------------
  // Methods for Card Deck From Top
  //--------------------------------
  _initCardDeckTop: function() {

    var self = this;

    this.nav.find('h4').on('click', function(e){
      e.preventDefault();

      if ( self.nav.hasClass('shown') ) {
        self._hideCardDeckTop();
      } else {
        self._showCardDeckTop();
      }

    });
  },

  _hideCardDeckTop: function() {
    var li = this.nav.find('li');

    li.removeAttr('style');
    this.nav.removeClass('shown');
      
    li.each(function(index){
      $(this).css(Modernizr.prefixed('transform'), 'translateY(' + (index*2) + 'px)')
        .css('z-index', li.length - index)
        .css("width" , (100 - index/2)+'%')
        .css("margin-left" , index/4+'%');
    });
  },

  _showCardDeckTop: function() {
    var li = this.nav.find('li');
    li.removeAttr('style');
    this.nav.addClass('shown');

    li.each(function(index){
      var height = $(this).height();

      $(this).css(Modernizr.prefixed('transform'), 'translateY(' + (index+1) * height + 'px)')
        .css("width" , '100%');
    });
  },

  //--------------------------------
  // Methods for Card Deck From Bottom
  //--------------------------------
  _initCardDeckBottom: function() {

    var self = this;

    this.nav.find('h4').on('click', function(e){
      e.preventDefault();

      if ( self.nav.hasClass('shown') ) {
        self._hideCardDeckBottom();
      } else {
        self._showCardDeckBottom();
      }

    });
  },

  _hideCardDeckBottom: function() {
    var li = this.nav.find('li');

    li.removeAttr('style');
    this.nav.removeClass('shown');
      
    li.each(function(index){
      $(this).css(Modernizr.prefixed('transform'), 'translateY(-' + (index*2) + 'px)')
        .css('z-index', li.length - index)
        .css("width" , (100 - index/2)+'%')
        .css("margin-left" , index/4+'%');
    });
  },

  _showCardDeckBottom: function() {
    var li = this.nav.find('li');
    li.removeAttr('style');
    this.nav.addClass('shown');

    li.each(function(index){
      var height = $(this).height();

      $(this).css(Modernizr.prefixed('transform'), 'translateY(-' + (index+1) * height + 'px)')
        .css("width" , '100%');
    });
  },

  // Card Deck
  // unbind on click event
  // after we closed the nav
  _endCardDeck: function() {
    var li = this.nav.find('li');
    li.removeAttr('style');
    this.nav.find('h4').off('click');
  },

  // This check if the method exists first
  // before call it
  _callThisMethod: function(methodName){
    // TODO: check if is an existing method
    if ( typeof methodName !== 'undefined' ) {
      this[methodName]();  
    }
  }

};

EffecktOffScreenNav.init();
