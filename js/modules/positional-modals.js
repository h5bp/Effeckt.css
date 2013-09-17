var EffecktPositionalModals = {

  modalButtonClass: '.effeckt-positional-modal-button',
  modalCloseButtonClass: '.effeckt-modal-close',
  modalWrapClass: 'effeckt-positional-modal-wrap',

  modalsList: [],

  init: function() {
    this.bindUIActions();
  },

  bindUIActions: function() {
    var self = this;

    $(this.modalButtonClass).on( Effeckt.buttonPressedEvent, function(e) {
      e.preventDefault();
      self.openModal($(this));
    });

    $(document).on( Effeckt.buttonPressedEvent, this.modalCloseButtonClass, function(e) {
      e.preventDefault();
      self.close($(this));
    });
  },

  openModal: function($el) {

    var self = this,
        style = $el.data('effeckt-type'),
        position = $el.data('effeckt-position'),
        buttonPosition = $el.offset(),
        buttonSize = {
          'width': $el.outerWidth(),
          'height': $el.outerHeight()
        },
        // This only work with page transition
        scrollTop = $('.effeckt-page-active').scrollTop();

    // don't open if already open
    if (this.contains($el)) {
      return false;
    }
    
    var modal = this.createModal($("#effeckt-modal-wrap").html(), style, position);

    modal.show();

    // append to dom, add to list
    this.add($el, modal);

    // TODO: check if modal window is outside the view.
    // If it's outside switch position
    
    // change based on position
    switch ( position ) {

      case 'below':
        modal.css({
          'top': buttonPosition.top + buttonSize.height + scrollTop,
          'left': buttonPosition.left - (modal.outerWidth()/2) + buttonSize.width/2
        });
        break;

      case 'right':
        modal.css({
          'top': buttonPosition.top - (modal.outerHeight()/2) + scrollTop + (buttonSize.height/2),
          'left': buttonPosition.left + buttonSize.width
        });
        break;

      case 'left':
        modal.css({
          'top': buttonPosition.top - (modal.outerHeight()/2) + scrollTop + (buttonSize.height/2),
          'left': buttonPosition.left - (modal.outerWidth())
        });
        break;

      default:
      case 'above':
        modal.css({
          'top': buttonPosition.top - modal.outerHeight() + scrollTop,
          'left': buttonPosition.left - (modal.outerWidth()/2) + (buttonSize.width/2)
        });
        break;
    }

    // todo: ensure is on top here.
    // apply effect
    modal.addClass('effeckt-show');

  },

  close: function($el) {

    var self = this;

    var modal = $el.parents('[class~="'+this.modalWrapClass+'"]'),
        sender = this.getSenderButton(modal);

    modal.removeClass("effeckt-show");

    modal.on( Effeckt.transitionAnimationEndEvent, function() {
      modal.off( Effeckt.transitionAnimationEndEvent );
      modal.hide().remove();
    });

    this.remove(modal);
    modal.find('.effeckt-positional-modal').removeClass('effeckt-show');

    if (sender && sender.data("effeckt-needs-hide-class")) {
      modal.addClass("effeckt-hide");
    }

  },

  createModal: function(content, style, position) {
    var modalWrap = 
      $('<div>')
        .addClass('effeckt-positional-modal-wrap ' + style)
        .attr('data-effeckt-position', position);

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
