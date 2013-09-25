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

  },

  getViewportHeight: function() {

    var docElement = document.documentElement,
      client = docElement['clientHeight'],
      inner = window['innerHeight'];

    if( client < inner )
      return inner;
    else
      return client;
  },
}

Effeckt.init();