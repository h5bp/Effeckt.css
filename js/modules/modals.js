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
    $(".modal2-button").on("click", function() {
      self.openModal(this);
    });

    $(".effeckt-modal-close").on("click", function() {
      self.closeModal(this);
    });

    $(".effeckt-overlay").on("click", function() {
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

    this.modalStyle = "md-effect-" + button.data("effeckt-modal-type").replace(/[^0-9]/g, '');

    this.modalWrap.addClass(this.modalStyle);

    if (button.data("effeckt-needs-perspective")) {
      setTimeout(function () {
        $("html").addClass("md-perspective");
      }, 50);
    }
    if (button.data("effeckt-hide-class")) {
      this.modalWrap.data("effeckt-hide-class",true);
    }
    this.modalWrap.data("effeckt-hide-class", button.data("effeckt-hide-class"));

    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName;
    this.overlay.on(evt, function () {
      self.modalWrap.addClass("effeckt-show");
      self.overlay.off(evt);
    });

    this.showOverlay();

  },

  closeModal: function(el) {
    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
        self = this;

    this.modalWrap.on(evt, function () {
      self.modalWrap.removeClass("effeckt-show effeckt-hide " + self.modalStyle);
      $("html").removeClass("md-perspective");
      self.modalWrap.hide().off(evt);
    });

    this.hideOverlay();
    //Not the cleanest way
    this.modalWrap.removeClass("effeckt-show");

    if( this.modalWrap.data("effeckt-hide-class") ){
      this.modalWrap.addClass("effeckt-hide");
    }
  },

  showOverlay: function() {
    this.overlay.addClass("effeckt-show");
  },

  hideOverlay: function() {
    this.overlay.removeClass("effeckt-show");
  }

};

EffecktModals.init();
