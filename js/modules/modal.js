/**
 * modalEffects.js v1.1.0
 * http://www.codrops.com
 *
 * Rewritten for effeckts project
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;(function(window){

  var Effeckt = window.Effeckt;

  var EffecktModal = function() {
    if ( !(this instanceof EffecktModal) ) {
      return new EffecktModal();
    }

    this.init();
  };

  EffecktModal.version = '0.0.1';

  EffecktModal.prototype.init = function() {
    this.$body                = $('body');
    this.$element             = null;
    this.$overlay             = null;
    this.isShown              = false;
    this.hasPerspective       = false;
    this.modalEffeckt         = '';
    this.modalEffecktOut      = '';
    this.modalEffecktProvided = true; //it's suppose to be provided

    this.bindUIActions();
  };

  EffecktModal.prototype.bindUIActions = function() {
    $(document).on( Effeckt.buttonPressedEvent,
                    '.effeckt-modal-button',
                    $.proxy(this.open, this)
                  );

    $(document).on( Effeckt.buttonPressedEvent,
                    '.effeckt-modal-close, [data-effeckt-dismiss="modal"]',
                    $.proxy(this.close, this)
                  );

    var self = this;
    $(window).on( 'keyup', function( e ) {
      if ( e.keyCode === 27 ) self.close(e);
    });
  };

  EffecktModal.prototype.open = function( e ) {
    e.preventDefault();

    if ( this.isShown ) {
      return;
    }

    var $button = $(e.target);
    var target = $button.data('effeckt-target');

    this.$element = $(target || '#effeckt-modal-wrap');

    if ( !this.$element.length ) return;

    // Modal Effeckt-Type
    this.modalEffeckt     = $button.data( 'effeckt-type' );
    this.modalEffecktOut  = $button.data( 'effeckt-out-type' );

    if ( $button.data( 'effeckt-needs-perspective' ) ) {
      this.$body.addClass( 'effeckt-perspective' );
      this.hasPerspective = true;
    }

    // check if the effeckt class is already added
    if ( this.$element.hasClass( this.modalEffeckt ) || this.modalEffeckt === undefined ) {
      this.showModal();
    } else {
      this.modalEffecktProvided = false;
      this.$element.addClass( this.modalEffeckt );

      this.$element.on( Effeckt.transitionAnimationEndEvent, $.proxy(function() {
        this.$element.off( Effeckt.transitionAnimationEndEvent );
        this.showModal();
      }, this));
    }
  };

  EffecktModal.prototype.close = function( e ) {
    e.preventDefault();

    if ( !this.isShown ) {
      return;
    }

    this.$element.on( Effeckt.transitionAnimationEndEvent, $.proxy(function () {
      this.$element.off( Effeckt.transitionAnimationEndEvent );
      this.hideModal();
    }, this));

    this.$element.removeClass( 'effeckt-show' );
    this.isShown = false;

    if ( this.modalEffecktOut ) {
      this.$element.addClass( this.modalEffecktOut );
    }
  };

  EffecktModal.prototype.showModal = function() {
    this.addOverlay();
    this.$element.addClass( 'effeckt-show' );
    this.isShown = true;
  };

  EffecktModal.prototype.hideModal = function() {
    // Only remove effeckt-hide class if it's any
    if ( this.modalEffecktOut ){
      this.$element.removeClass( this.modalEffecktOut );
      this.modalEffecktOut = '';
    }

    if ( this.hasPerspective ) {
      this.$body.removeClass( 'effeckt-perspective' );
      this.hasPerspective = false;
    }

    this.removeOverlay();
    this.$element.removeClass( this.modalEffeckt );
    this.modalEffeckt = '';
  }

  EffecktModal.prototype.addOverlay = function() {
    // just for fun
    var atts = [];
    atts.push('class="effeckt-overlay effeckt-modal-overlay"');
    atts.push('id="effeckt-modal-overlay"');
    atts.push('data-effeckt-dismiss="modal"')

    this.$overlay = $('<div ' + atts.join(' ') + ' />')
                        .insertAfter( this.$element );

    this.$overlay[0].offsetWidth; // force reflow
  };

  EffecktModal.prototype.removeOverlay = function() {
    this.$overlay.remove();
    this.$overlay = null;
  };

  window.Effeckt.Modal = EffecktModal();

})(this);
