// Page Transition does not work right now
// Figuring out a better way to fix issue #167
var EffecktPageTransitions = {

  fromPage: '',
  toPage: '',
  isAnimating: false,
  transitionInEffect: '',
  transitionOutEffect: '',

  init: function() {

    this.initPages();
    this.bindUIActions();

  },

  initPages: function(){

    var $pages = $('[data-effeckt-page]');

    $pages.hide();
    this.fromPage = $pages.first().addClass('effeckt-page-active');
    this.fromPage.show();

  },

  bindUIActions: function() {

    var self = this;
    $('.effeckt-page-transition-button').on('click',function(e){

      e.preventDefault();

      // Disable event until issue 167 is fixed
      // return false;

      var transitionInEffect  = $(this).data('effeckt-transition-in'),
          transitionOutEffect = $(this).data('effeckt-transition-out')
          transitionPage      = $(this).data('effeckt-transition-page');

      self.transitionPage( transitionPage, transitionInEffect, transitionOutEffect );

    });
  },

  transitionPage: function( transitionPage, transitionInEffect, transitionOutEffect ) {

    if ( this.isAnimating ) {

      return false;

    }

    this.isAnimating = true;
    this.transitionInEffect = transitionInEffect;
    this.transitionOutEffect= transitionOutEffect;

    // Get Pages
    this.fromPage = $('.effeckt-page-active');
    this.toPage   = $('[data-effeckt-page="' + transitionPage + '"]');

    // Add this class to prevent scroll to be displayed
    this.toPage.addClass('effeckt-page-animating');
    this.fromPage.addClass('effeckt-page-animating');

    // Set Transition Class
    // Maybe this array class could be made using and array
    // Relationating the In Effect with the Out effect.
    this.toPage.show().addClass('effeckt-page-active');
    this.toPage.addClass(this.transitionInEffect);
    this.fromPage.addClass(this.transitionOutEffect);

    
    //event trigger after animation/transition end.
    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
        self= this;

    // Let just wait for the new page to finish its animation
    this.toPage.on(evt, function () {

      self.isAnimating = false;
      self.fromPage.removeClass('effeckt-page-animating');
      self.fromPage.removeClass('effeckt-page-active');
      self.toPage.removeClass('effeckt-page-animating');

      self.fromPage.hide();
      self.fromPage.removeClass(self.transitionOutEffect);

      self.toPage.removeClass(self.transitionInEffect);

    });

  },

};

EffecktPageTransitions.init();
