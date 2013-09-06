var EffecktPositionalModals = {

  modalButtonClass: '.effeckt-positional-modal-button',
  modalCloseButtonClass: '.effeckt-modal-close',
  modalWrapClass: 'effeckt-positional-modal-wrap',

  isTouchDevice: Modernizr.touch,

  modalsList: [],

  init: function() {
    this.bindUIActions();
  },

  bindUIActions: function() {
    var self = this,
        evt  = ( this.isTouchDevice ) ? 'touchstart' : 'click';

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
        style = $el.data('effeckt-type'),
        position = $el.data('effeckt-positional-modal-position'),
        buttonPosition = $el.offset(),
        buttonSize = {
          'width': $el.outerWidth(),
          'height': $el.outerHeight()
        },
        scrollTop = $('.effeckt-page-active').scrollTop();

    // don't open if already open
    if (this.contains($el)) {
      return false;
    }
    
    var modal = this.createModal($("#effeckt-modal-wrap").html(), style, position);

    modal.show();

    // append to dom, add to list
    this.add($el, modal);
    
    // change based on position
    if (position == 'above') {
      modal.css({
        'top': (buttonPosition.top - modal.outerHeight() + scrollTop ),
        'left': buttonPosition.left - (modal.outerWidth()/2) + ($el.outerWidth()/2)
      });
    } else if (position == 'below') {
      modal.css({
        'top': (buttonPosition.top + buttonSize.height + scrollTop),
        'left': buttonPosition.left - (modal.outerWidth()/2) + ($el.outerWidth()/2)
      });
    }

    

    // todo: ensure is on top here.

    // ghetto, should fix
    setTimeout(function() {

      // apply effect
      modal.addClass('effeckt-show');

    }, 50);

  },

  close: function($el) {

    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
        self = this;

    var modal = $el.parents('[class~="'+this.modalWrapClass+'"]'),
        sender = this.getSenderButton(modal);

    modal.removeClass("effeckt-show");

    modal.on(evt, function() {
      modal.hide().remove();
    });

    this.remove(modal);
    modal.find('.effeckt-positional-modal').removeClass('effeckt-show');

    if (sender && sender.data("effeckt-hide-class")) {
      modal.addClass("effeckt-hide");
    }

  },

  createModal: function(content, style, position) {
    var modalWrap = 
      $('<div>')
        .addClass('effeckt-positional-modal-wrap ' + style)
        .attr('data-effeckt-positional-modal-type', position);

    modalWrap.html(content);

    return modalWrap;
  },

  getSenderButton: function(modal) {
    var i;
    for (var i = 0, len = this.modalsList.length; i < len; i++) {
      if ( this.modalsList[i].modal.get(0) == modal.get(0) ) {
        return this.modalsList[i].element;
      }
    }
    return false;
  },

  add: function($el, modal) {
    // add element to dom
    // on the active page wrap
    $('.effeckt-page-active').append(modal);

    // add element to modal list
    this.modalsList.push({ 
      element: $el, 
      'modal': modal
    });
  },

  remove: function(modal){
    var i;
    for (var i = 0, len = this.modalsList.length; i < len; i++) {
      if ( this.modalsList[i].modal.get(0) == modal.get(0) ) {
        this.modalsList.splice( i, 1 );
        return true;
      }
    }
  },

  // check if already has modal open
  contains: function($el) {
    var i;
    for (var i = 0, len = this.modalsList.length; i < len; i++) {
      if ( this.modalsList[i].element.get(0) == $el.get(0) ) {
        return true;
      }
    }
    return false;
  }
};

EffecktPositionalModals.init();
