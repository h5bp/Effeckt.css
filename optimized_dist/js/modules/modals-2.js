/**
 * modalEffects.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var Modals2 = {

  overlay: $('#effeckt-overlay'),
  modal: $("#effeckt-modal"),
  modalStyle: "",

  init: function() {

    this.bindUIActions();

  }, 

  bindUIActions: function() {

    $(".modal2-button").on("click", function() {
      Modals2.openModal(this);
    });

    // Is this a weird double binding problem with Modals1?
    $(".effeckt-modal-close").on("click", function() {
      Modals2.closeModal(this);
    })

  },

  openModal: function(el) {

    // TODO: do the 'md-perspective' stuff for the demos that need it.
    // See: http://tympanus.net/Development/ModalWindowEffects/
    //      http://tympanus.net/Development/ModalWindowEffects/js/modalEffects.js

    var button = $(el);

    Modals2.modalStyle = "md-effect-" + button.data("modal-type").replace(/[^0-9]/g, '');

    Modals2.modal.addClass(Modals2.modalStyle);

    console.log(button.data("needs-perspective"));

    if (button.data("needs-perspective")) {
      $("html").addClass("md-perspective");
    }

    // Using timeout so we can set style first, then show it so animations/transitions work. You normally wouldn't need to do this.
    setTimeout(function() {
      Modals2.modal.addClass("effeckt-show");
    }, 300);

    Modals2.showOverlay();

  },

  closeModal: function(el) {

    Modals2.modal.removeClass("effeckt-show");
    setTimeout(function() {
      Modals2.modal.removeClass(Modals2.modalStyle);
      $("html").removeClass("md-perspective");
    }, 300);

    Modals2.hideOverlay();

  },

  showOverlay: function() {
    Modals2.overlay.addClass("effeckt-show");
  },

  hideOverlay: function() {
    Modals2.overlay.removeClass("effeckt-show");
  }

}

Modals2.init();