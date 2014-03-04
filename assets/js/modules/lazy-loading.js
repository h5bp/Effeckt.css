var EffecktLazyLoading = {

  init: function() {

    var self = this;

    this.elements = $('.effeckt-lazy-loading-element');
    this.needsPerspective = $('.effeckt-lazy-loading').data('effeckt-needs-perspective')?true:false;

    this.viewportHeight = Effeckt.getViewportHeight();

    this.elements.each( function( i, el ) {

      if ( self.isElementVisible( el ) ) {
        $(el).addClass('shown');
      }
    });

  },

};

EffecktLazyLoading.init();