var EffecktPositionalModals = {

  modalButtonClass: '.effeckt-positional-modal-button',
  modalCloseButtonClass: '.effeckt-modal-close',

  modalWrapClass: 'effeckt-positional-modal-wrap',

  isTouchDevice: !!('ontouchstart' in window),

  modalsList: [],

  init: function() {
    this.bindUIActions();
  },

  bindUIActions: function() {
    var self = this,
        evt  = 'click';
    
    if (this.isTouchDevice) {
      evt += ' touchstart';
    }

    $(this.modalButtonClass).on(evt, function(e) {
      e.preventDefault();
      self.openModal($(this));
    });

    $(document).on(evt, this.modalCloseButtonClass, function(e) {
      e.preventDefault();
      self.close($(this));
    });
  },

  openModal: function($el) {
    var self = this,
        effect = $el.data('effeckt-positional-modal-type'),
        style = $el.attr('data-effeckt-modal-style'),
        buttonPosition = $el.offset(),
        buttonSize = { 'width': $el.width(), 'height': $el.height() };

    // if (this.contains($el)) {
    //   return false;
    // }
    
    var modal = this.createModal(
      $("#effeckt-modal-wrap").html(),
      style
    );

    modal.show();
    this.add($el, modal);
    
    // This will depend on data-effeckt-positional-modal-type
    // above / below / left / right
    // ideally some edge detection as well
    modal.css({
      'top': (buttonPosition.top - modal.outerHeight()) - 15,
      'left': buttonPosition.left - (modal.outerWidth()/2) + ($el.outerWidth()/2)
    });

    // add event to show bubble on front if you click on it
    var evt  = 'click';
    if (this.isTouchDevice) {
      evt += ' touchstart';
    }

    modal.on(evt, function(e){
      var allModals = $('[class~="'+self.modalWrapClass+'"]');
      allModals.removeClass('effeckt-front');
      modal.addClass('effeckt-front');
    });

    modal.find('.effeckt-positional-modal').addClass('effeckt-show');
  },

  close: function() {
    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
      modal = $('.effeckt-positional-modal-wrap').removeClass("effeckt-show");

    modal.on(evt, function() {
      modal.remove();
    });
  },

  createModal: function(content, style) {
    var modalWrap         = $('<div>').addClass('effeckt-positional-modal-wrap').addClass(style).addClass("effeckt-show");
    var modal             = $('<div>').addClass('effeckt-positional-modal');
    var modalContent      = $('<div>').addClass('effeckt-positional-modal-content');

    modalContent.html(content);
    modalContent.appendTo(modal);
    modal.appendTo(modalWrap);

    return modalWrap;
  },

  getSenderButton: function( modal ) {
    var i;
    for (i = 0, len = this.modalsList.length; i < len; i++) {
      if (this.modalsList[i].modal.get(0) == modal.get(0)) {
        return this.modalsList[i].element;
      }
    }
    return false;
  },

  add: function($el, modal) {
    // add element to DOM
    modal.appendTo("body");

    // add element to modal list
    this.modalsList.push({ element: $el, 'modal': modal });
  },

  remove: function(modal) {
    var i;
    for (i = 0, len = this.modalsList.length; i < len; i++) {
      if (this.modalsList[i].modal.get(0) == modal.get(0)) {
        this.modalsList.splice( i, 1 );
        return true;
      }
    }
  },

  /**
   * Checks if the specified element has already open a modal window.
   */
  contains: function($el) {
    var i;
    for (i = 0, len = this.modalsList.length; i < len; i++) {
      if (this.modalsList[i].element.get(0) == $el.get(0)) {
        return true;
      }
    }
    return false;
  }
};

EffecktPositionalModals.init();
