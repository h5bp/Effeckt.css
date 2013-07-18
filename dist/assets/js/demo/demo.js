var EffecktDemos = {

  init: function() {

    $(window).load(function() {
      $(".no-transitions").removeClass("no-transitions");
      EffecktDemos.transitionEndEventName = EffecktDemos.transitionEndEventNames[Modernizr.prefixed('transition')];
      EffecktDemos.animationEndEventName = EffecktDemos.animationEndEventNames[Modernizr.prefixed('animation')];
    });
  },

  animationEndEventNames: {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },

  transitionEndEventNames: {
    'WebkitTransition' : 'webkitTransitionEnd',
    'OTransition' : 'oTransitionEnd',
    'msTransition' : 'MSTransitionEnd',
    'transition' : 'transitionend'
  },

}

EffecktDemos.init();
