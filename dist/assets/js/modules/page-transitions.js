//To Do: Add a better way to handle resetting transitions
var EffecktPageTransitions = {

  mainPage: $('#page-wrap'),
  secondaryPage: $('#effeckt-page-transition'),
  isAnimating: false,

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this;

    $('.page-transition-button').on('click',function(){
      var transitionIn = $(this).data('effeckt-transition-in'),
          transitionOut = $(this).data('effeckt-transition-out');
          self.transitionPage( transitionIn, transitionOut );
    });

    $('.page-transition-reset-button').on('click',function(){
          self.resetTransition();
    });

  },

  transitionPage: function(transitionIn,transitionOut) {

    if(this.isAnimating){
      return false;
    }
    this.isAnimating = true;

    this.mainPage.addClass(transitionOut);
    this.secondaryPage.addClass(transitionIn + ' effeckt-page-transition-animating');

  },
  resetTransition: function() {
    this.isAnimating = false;
    this.mainPage.removeClass().addClass('page-wrap');
    this.secondaryPage.removeClass().addClass('effeckt-page-transition');
  }

};

EffecktPageTransitions.init();
