// This is on Demo to reminds you all that most of this are demo interactions
// For me the only thing here that is necessary for animation is perspective
// because it's change according to the scroll
var EffecktLazyLoading = {

  init: function() {

    var self = this;

    this.bindUIActions();

    this.elements = $('.effeckt-lazy-loading-element');
    this.wrapper = $('.effeckt-lazy-loading');
    this.needsPerspective = this.wrapper.data('effeckt-needs-perspective')?true:false;

    this.viewportHeight = this.getViewportHeight();

    this.elements.each( function( i, el ) {

      if ( self.isElementVisible( el ) ) {
        $(el).addClass('shown');
      }
    });

  },

  bindUIActions: function() {

    var self = this;

    $('.effeckt-page-active').on( 'scroll', function(){
      self._onScrollMethod();
    });

    $(window).on( 'resize', function() {
      self.viewportHeight = self.getViewportHeight();
    });

    $('.effeckt-lazy-loading-options input[type=radio]').on( 'click', function(){
      self.wrapper.attr('data-effeckt-type', $(this).val());
    });

  },

  _scrollPage: function() {

    var self = this;
    
    this.didScroll = false;

    if ( self.needsPerspective ) {
      // This only work with page transition
      var perspectiveY = $('.effeckt-page-active').scrollTop() + self.viewportHeight / 2;
      $('.effeckt-lazy-loading').css(Modernizr.prefixed('perspectiveOrigin'), '50% ' + perspectiveY + 'px');
    }

    this.elements.each( function( i, el ) {
      if( !$(el).hasClass( 'shown' ) && !$(el).hasClass( 'animating' ) && self.isElementVisible( el ) ) {

        $(el).on( Effeckt.transitionAnimationEndEvent, function() {
          $(el).off( Effeckt.transitionAnimationEndEvent );
          $(el).removeClass( 'animating' );
        });

        $(el).addClass( 'shown animating' );
      }
    });
  },

  isElementVisible: function( el ) {

    var elHeight = el.offsetHeight,
      // This only work with page transition
      scrolled = $('.effeckt-page-active').scrollTop(),
      viewed = scrolled + this.viewportHeight,
      elTop = $(el).offset().top,
      elBottom = elTop + elHeight,
      // if 0, the element is considered in the viewport as soon as it enters.
      // if 1, the element is considered in the viewport only when it's fully inside
      // value in percentage (1 >= h >= 0)
      h = 0.75;
    return (elTop + (elHeight * h) + scrolled) <= viewed;
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

  _onScrollMethod : function() {

    var self = this;

    if( !this.didScroll ) {
      this.didScroll = true;

      setTimeout(function(){
        self._scrollPage();
      }, 1000 / 60);
    }
  },

};

EffecktLazyLoading.init();