/*!
 * captions.js
 *
 * author: Effeckt.css
 *
 * Licensed under the MIT license
 */

var effecktCaptions = {

  init: function() {
    this.bindUIActions();
  },

  bindUIActions: function() {
    var self = this; //keep a reference to this (Captions) object.

    $('[data-effeckt-type]').on(Effeckt.buttonPressedEvent, function(event) {
      self.activateCaptions(this);
      event.preventDefault();
    });
  },

  activateCaptions: function(el) {
    var activeClass = 'active';

    if (document.documentElement.classList) {
      el.classList.toggle(activeClass);
    } else {
      var $caption = $(el);
      $caption.toggleClass(activeClass);
    }
  }
};

effecktCaptions.init();