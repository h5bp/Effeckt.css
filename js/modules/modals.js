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

  overlay: $('#effeckt-overlay'),
  modalWrap: $("#effeckt-modal-wrap"),
  modal: $("#effeckt-modal"),
  modalStyle: "",

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

    $(".effeckt-overlay").on( Effeckt.buttonPressedEvent, function() {
      self.closeModal();
    });

    $(window).on("keyup", function(e) {
      if ( e.keyCode === 27 ) self.closeModal();
    });

  },

  openModal: function(el) {

    var button = $(el),
        self = this;

    this.modalWrap.show();
    
    this.modalStyle = button.data("effeckt-type");

    this.modalWrap.addClass(this.modalStyle);

    this.modalWrap.data("effeckt-needs-hide-class", button.data("effeckt-needs-hide-class"));

    
    
    this.overlay.on( Effeckt.transitionAnimationEndEvent, function () {
      self.overlay.off( Effeckt.transitionAnimationEndEvent );
      self.modalWrap.addClass("effeckt-show");

      if (button.data("effeckt-needs-perspective")) {
        $("html").addClass("md-perspective");
      }
    });

    this.showOverlay();

  },

  closeModal: function(el) {
    var self = this;

    this.modalWrap.on( Effeckt.transitionAnimationEndEvent, function () {
      self.modalWrap.off( Effeckt.transitionAnimationEndEvent );
      self.hideModal();
    });

    this.hideOverlay();
    //Not the cleanest way
    this.modalWrap.removeClass("effeckt-show");

    if( this.modalWrap.data("effeckt-needs-hide-class") ){
      this.modalWrap.addClass("effeckt-hide");
    }
  },

  showOverlay: function() {
    this.overlay.addClass("effeckt-show");
  },

  hideOverlay: function() {
    this.overlay.removeClass("effeckt-show");
  },

  hideModal: function() {

    // Only remove effeckt-hide class if it's any
    if( this.modalWrap.data("effeckt-needs-hide-class") ){
      this.modalWrap.removeClass("effeckt-hide");
    }

    this.modalWrap.removeClass(this.modalStyle);
    $("html").removeClass("md-perspective");
    this.modalWrap.hide();
  }

};

EffecktModals.init();
