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
var EffecktModals = {

  overlay: $('#effeckt-modal-overlay'),
  modalWrap: $("#effeckt-modal-wrap"),
  modal: $("#effeckt-modal"),
  modalEffeckt: "",
  modalEffecktOut: "",

  init: function() {
    this.bindUIActions();
  },

  bindUIActions: function() {

    var self = this;

    $(".effeckt-modal-button").on( Effeckt.buttonPressedEvent, function() {
      self.openModal(this);
    });

    $(".effeckt-modal-close").on( Effeckt.buttonPressedEvent, function() {
      self.closeModal(this);
    });

    $(".effeckt-modal-overlay").on( Effeckt.buttonPressedEvent, function() {
      self.closeModal();
    });

    $(window).on("keyup", function(e) {
      if ( e.keyCode === 27 ) self.closeModal();
    });

  },

  openModal: function(el) {

    var button = $(el),
        self = this;

    // Modal Effeckt-Type
    this.modalEffeckt = button.data( 'effeckt-type' );
    this.modalEffecktOut = button.data( 'effeckt-out-type' );

    if ( button.data( 'effeckt-needs-perspective' ) ) {
      $('body').addClass( 'effeckt-perspective' );
    }

    // check if the effeckt class is already added
    if ( this.modalWrap.hasClass( this.modalEffeckt ) ) {

      this.modalWrap.addClass( 'effeckt-show' );

    } else {

      this.modalWrap.addClass( this.modalEffeckt );

      this.modalWrap.on( Effeckt.transitionAnimationEndEvent, function() {
        self.modalWrap.off( Effeckt.transitionEndEventName );
        self.modalWrap.addClass( 'effeckt-show' );
      });

    }
  },

  closeModal: function(el) {
    var self = this;

    this.modalWrap.on( Effeckt.transitionAnimationEndEvent, function () {
      self.modalWrap.off( Effeckt.transitionAnimationEndEvent );
      self.hideModal();
    });

    this.modalWrap.removeClass( 'effeckt-show' );

    if ( this.modalEffecktOut ) {
      this.modalWrap.addClass( this.modalEffecktOut );
    }
  },

  hideModal: function() {

    // Only remove effeckt-hide class if it's any
    if ( this.modalEffecktOut ){
      this.modalWrap.removeClass( this.modalEffecktOut );
      this.modalEffecktOut = '';
    }

    $('body').removeClass("effeckt-perspective");
    this.modalWrap.removeClass(this.modalEffeckt);
    this.modalEffeckt = '';
  }

};

EffecktModals.init();
