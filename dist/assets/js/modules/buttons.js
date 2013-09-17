var EffecktButtons = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this;

    $('.effeckt-button').on( Effeckt.buttonPressedEvent, function(){
      self.showLoader(this);
    });

  },

  showLoader: function(el) {

    var button = $(el),
        resetTimeout;

    if(button.attr( 'data-loading' )){

      button.removeAttr( 'data-loading' );

    } else {

      button.attr( 'data-loading', true );

    }

    clearTimeout( resetTimeout );
    resetTimeout = setTimeout( function() {
      button.removeAttr( 'data-loading' );
    }, 2000 );

  }

};

EffecktButtons.init();
