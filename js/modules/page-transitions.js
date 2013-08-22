var EffecktPageTransitions = {

  fromPage: '',
  toPage: '',
  isAnimating: false,

  init: function() {

    this.initPages();
    this.bindUIActions();

  },

  initPages: function(){

    var $pages = $('[data-effeckt-page]');

    this.fromPage = $pages.first().addClass('effeckt-page-active');

  },

  bindUIActions: function() {

    var self = this;
    $('.effeckt-page-transition-button').on('click',function(e){

      e.preventDefault();

      var transitionEffect  = $(this).data('effeckt-transition'),
          transitionPage    = $(this).data('effeckt-transition-page');

      self.transitionPage( transitionPage, transitionEffect );

    });
  },

  transitionPage: function( transitionPage, transitionEffect ) {

    if ( this.isAnimating ) {

      return false;

    }

    this.isAnimating = true;

    // Get Pages
    this.fromPage = $('.effeckt-page-active');
    this.toPage   = $('[data-effeckt-page="' + transitionPage + '"]');

    // Set Transition Class
    // Maybe this array class could be made using and array
    // Relationating the In Effect with the Out effect.
    this.toPage.addClass('effeckt-page-active');
    this.toPage.addClass(transitionEffect + '-in');
    this.fromPage.addClass(transitionEffect + '-out');

    // Add this class to prevent scroll to be displayed
    this.toPage.addClass('effeckt-page-animating');
    this.fromPage.addClass('effeckt-page-animating');

    
    //event trigger after animation/transition end.
    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
        self= this;

    this.toPage.on(evt, function () {

      self.isAnimating = false;
      self.fromPage.removeClass(transitionEffect + '-out');
      self.fromPage.removeClass('effeckt-page-active');
      self.toPage.removeClass(transitionEffect + '-in');

      self.toPage.addClass('effeckt-page-animating');
      self.fromPage.addClass('effeckt-page-animating');

    });

  },
  resetTransition: function() {
    this.isAnimating = false;
    this.mainPage.removeClass().addClass('page-wrap');
    this.secondaryPage.removeClass().addClass('effeckt-page-transition');
  }

};

EffecktPageTransitions.init();
