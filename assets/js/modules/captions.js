/*!
 * captions.js
 *
 * author: Dennis Gaebel (@gryghostvisuals)
 *
 * Licensed under the MIT license
 */

var Captions = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    //keep a reference to this (Captions) object.
    var self = this;

    $('[data-effeckt-type]').on(Effeckt.buttonPressedEvent, function(event) {

      self.activateCaptions(this);

      event.preventDefault();

    });

  },

  activateCaptions: function(el) {

    var activeClass = 'active';

    // classList detection
    if (document.documentElement.classList) {

      el.classList.toggle(activeClass);

    } else {

      // classList Fallback using jQuery
      var $caption = $(el);

      $caption.toggleClass(activeClass);

    }
  }
};

Captions.init();
