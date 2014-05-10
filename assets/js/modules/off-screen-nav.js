;(function( window ){

  var $nav            = $('#effeckt-off-screen-nav'),
      $pages          = $('[data-effeckt-page]'),
      $closeButton    = $('#effeckt-off-screen-nav-close'),
      $openButtons    = $('.off-screen-nav-button'),
      effecktType     = 'abc',
      threedee        = false,
      Effeckt         = window.Effeckt;


  // Constructor
  var OffScreenNav = function() {
    if ( !(this instanceof OffScreenNav) ) {
      return new obj;
    }

    this.isNavOpen = false;
  };

  // bind all the events
  OffScreenNav.prototype.bindUIActions = function() {
    var self = this;

    $openButtons.on( Effeckt.buttonPressedEvent, this.toggleNav.bind(this) );
    $closeButton.on( Effeckt.buttonPressedEvent, this.toggleNav.bind(this) )
    /*$(".off-screen-nav-button, #effeckt-off-screen-nav-close").on( Effeckt.buttonPressedEvent, function(e) {
      self.toggleNav(this);

      return false;
    });*/
  };

  // Toggle Off-Screen Nav
  OffScreenNav.prototype.toggleNav = function( evt ) {
    var $button = $(evt.target);

    if ( ! this.isNavOpen ) {
      // Effeckt Type and whether it needs perspective
      effecktType = $button.data("effeckt-type");
      threedee    = $button.data("threedee");

      $nav.addClass( effecktType + '-animated effeckt-show' );
    } else {
      $nav.addClass( 'effeckt-hide' );

      $nav.on( Effeckt.transitionAnimationEndEvent, this.clearClasses.bind(this) );
      $pages.on( Effeckt.transitionAnimationEndEvent, this.clearClasses.bind(this) );
    }

    this.isNavOpen = !(this.isNavOpen);
  };

  // Init the Off-Screen Object
  OffScreenNav.prototype.init = function() {
    this.bindUIActions();
  }

  OffScreenNav.prototype.clearClasses = function() {
    $nav.off( Effeckt.transitionAnimationEndEvent );
    $pages.off( Effeckt.transitionAnimationEndEvent );

    $nav.removeClass( effecktType + '-animated effeckt-show effeckt-hide' );
    effecktType = '';
    threedee = false;
  }


  Effeckt.OffScreenNav = new OffScreenNav;
  Effeckt.OffScreenNav.init();

})( this );
