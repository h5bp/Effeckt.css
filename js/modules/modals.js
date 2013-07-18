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
var Modals = {

  overlay: $('#effeckt-overlay'),
  modalWrap: $("#effeckt-modal-wrap"),
  modal: $("#effeckt-modal"),
  modalStyle: "",

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    $(".modal2-button").on("click", function() {
      Modals.openModal(this);
    });

    $(".effeckt-modal-close").on("click", function() {
      Modals.closeModal(this);
    });

    $(".effeckt-overlay").on("click", function() {
      Modals.closeModal();
    });

    $(window).on("keyup", function(e) {
      if ( e.keyCode === 27 ) Modals.closeModal();
    });

  },

  openModal: function(el) {

    var button = $(el);

    Modals.modalWrap.show();

    Modals.modalStyle = "md-effect-" + button.data("modal-type").replace(/[^0-9]/g, '');

    Modals.modalWrap.addClass(Modals.modalStyle);

    if (button.data("needs-perspective")) {
      $("html").addClass("md-perspective");
    }
    if (button.data("hide-class")) {
      Modals.modalWrap.data("hide-class",true);
    }
    Modals.modalWrap.data("hide-class", button.data("hide-class"));

    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName;
    Modals.overlay.on(evt, function () {
      Modals.modalWrap.addClass("effeckt-show");
      Modals.overlay.off(evt);
    });

    Modals.showOverlay();

  },

  closeModal: function(el) {
    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName;

    Modals.modalWrap.on(evt, function () {
      Modals.modalWrap.removeClass("effeckt-show effeckt-hide " + Modals.modalStyle);
      $("html").removeClass("md-perspective");
      Modals.modalWrap.hide().off(evt);
    });

    Modals.hideOverlay();
    //Not the cleanest way
    Modals.modalWrap.removeClass("effeckt-show");

    if( Modals.modalWrap.data("hide-class") ){
      Modals.modalWrap.addClass("effeckt-hide");
    }
  },

  showOverlay: function() {
    Modals.overlay.addClass("effeckt-show");
  },

  hideOverlay: function() {
    Modals.overlay.removeClass("effeckt-show");
  }

};

Modals.init();
