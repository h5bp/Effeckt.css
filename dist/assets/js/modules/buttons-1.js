// TODO: Standardize with our jQuery / Module-pattern-esque thing.

var buttons = document.querySelectorAll( '.ladda-button' );

Array.prototype.slice.call( buttons ).forEach( function( button ) {

  var resetTimeout;

  button.addEventListener( 'click', function() {
    
    if( typeof button.getAttribute( 'data-loading' ) === 'string' ) {
      button.removeAttribute( 'data-loading' );
    }
    else {
      button.setAttribute( 'data-loading', '' );
    }

    clearTimeout( resetTimeout );
    resetTimeout = setTimeout( function() {
      button.removeAttribute( 'data-loading' );     
    }, 2000 );

  }, false );

} );