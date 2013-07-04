var Buttons1 = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $('.ladda-button').on( 'click', function(){
      Buttons1.showLoader(this);
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

Buttons1.init();