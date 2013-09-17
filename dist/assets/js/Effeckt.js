var Effeckt = {

  isTouchDevice: Modernizr.touch,
  buttonPressedEvent: ( this.isTouchDevice ) ? 'touchstart' : 'click',

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

  init: function() {

    //event trigger after animation/transition end.
    this.transitionEndEventName = this.transitionEndEventNames[Modernizr.prefixed('transition')];
    this.animationEndEventName = this.animationEndEventNames[Modernizr.prefixed('animation')];
    this.transitionAnimationEndEvent = this.animationEndEventName + ' ' + this.transitionEndEventName;

  }
}

Effeckt.init();