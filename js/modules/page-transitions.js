//To Do: Add a better way to handle resetting transitions
var EffecktPageTransitions = {

  mainPage: $('#page-wrap'),
  secondaryPage: $('#effeckt-page-transition'),
  isAnimating: false,

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $('.page-transition-button').on('click',function(){
      var transitionIn = $(this).data('transition-in'),
          transitionOut = $(this).data('transition-out');
          EffecktPageTransitions.transitionPage( transitionIn, transitionOut );
    });

    $('.page-transition-reset-button').on('click',function(){
          EffecktPageTransitions.resetTransition();
    });

  },

  transitionPage: function(transitionIn,transitionOut) {

    if(EffecktPageTransitions.isAnimating){
      return false;
    }
    EffecktPageTransitions.isAnimating = true;

    EffecktPageTransitions.mainPage.addClass(transitionOut);
    EffecktPageTransitions.secondaryPage.addClass(transitionIn + ' effeckt-page-transition-animating');

  },
  resetTransition: function() {
    EffecktPageTransitions.isAnimating = false;
    EffecktPageTransitions.mainPage.removeClass().addClass('page-wrap');
    EffecktPageTransitions.secondaryPage.removeClass().addClass('effeckt-page-transition');
  }

};

EffecktPageTransitions.init();
