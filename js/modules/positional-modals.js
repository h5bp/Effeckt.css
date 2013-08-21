var EffecktPositionalModals = {

  modalButtonClass: '.effeckt-positional-modal-button',
  modalCloseButtonClass: '.effeckt-positional-modal-close',

  modalWrapClass: 'effeckt-positional-modal-wrap',

  isTouchDevice: !!( 'ontouchstart' in window ),

  modalsList: [],

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this,
        evt  = 'click';
    
    if ( this.isTouchDevice ) {
      evt += ' touchstart';
    }

    $(this.modalButtonClass).on(evt, function(e){
      e.preventDefault();
      self.openModal($(this));
    });

    $(document).on(evt, this.modalCloseButtonClass, function(e){
      e.preventDefault();
      self.close($(this));
    });

  },

  openModal: function($el) {
    var effect = $el.data('effeckt-positional-modal-type'),
        buttonPosition = $el.offset(),
        buttonSize = {'width': $el.width(), 'height': $el.height()};


    if ( this.contains($el) ) {
      return false;
    }
    
    var modal = this.createModal('<p>a modal content</p><p>to test everything out</p>');

    modal.show();
    this.add($el, modal);
    
    modal.css({
      'top': (buttonPosition.top - modal.outerHeight() ),
      'left': buttonPosition.left - (modal.outerWidth()/2) + ($el.outerWidth()/2)
    });

   modal.find('.effeckt-positional-modal').addClass('effeckt-show');

  },

  close: function($el) {
    var evt = EffecktDemos.animationEndEventName + ' ' + EffecktDemos.transitionEndEventName,
        self = this;
        
    var modal = $el.parents('[class~="'+this.modalWrapClass+'"]'),
        sender = this.getSenderButton(modal);

    modal.on(evt, function () {
      modal.find('.effeckt-positional-modal').removeClass("effeckt-show");
      modal.hide().remove();
    });

    this.remove(modal);
    modal.find('.effeckt-positional-modal').removeClass('effeckt-show');

    if( sender && sender.data("effeckt-hide-class") ) {
      modal.addClass("effeckt-hide");
    }
  },


  createModal: function(content) {

    var modalWrap         = $('<div>').addClass('effeckt-positional-modal-wrap');
    var modal             = $('<div>').addClass('effeckt-positional-modal');
    var modalContent      = $('<div>').addClass('effeckt-positional-modal-content');
    var modalCloseButton  = $('<button>').addClass('effeckt-positional-modal-close').html('x');

    modalContent.html( content );
    modalContent.appendTo( modal );
    modalCloseButton.appendTo( modal );
    modal.appendTo(modalWrap);

    return modalWrap;
  },

  getSenderButton: function( modal ) {
    for( var i = 0, len = this.modalsList.length; i < len; i++ ) {
      if ( this.modalsList[i].modal.get(0) == modal.get(0) ) {
        return this.modalsList[i].element;
      }
    }
    return false;
  },

  add: function($el, modal) {
    //add element to DOM
    modal.appendTo("body");

    //add element to modal list
    this.modalsList.push({element: $el, 'modal': modal});
  },

  remove: function(modal){
    console.log(this.modalsList.length);
    for( var i = 0, len = this.modalsList.length; i < len; i++ ) {
      if ( this.modalsList[i].modal.get(0) == modal.get(0) ) {
        this.modalsList.splice( i, 1 );
        return true;
      }
    }
  },

  /**
   * Checks if the specified element has already open a modal window.
   */
  contains: function( $el ) {

    for( var i = 0, len = this.modalsList.length; i < len; i++ ) {
      if ( this.modalsList[i].element.get(0) == $el.get(0) ) {
        return true;
      }
    }
    return false;
  }
};

EffecktPositionalModals.init();
