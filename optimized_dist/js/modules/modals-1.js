var Modals1 = {
 
  init: function() {
    
    // Was appending modal to DOM here... 
    // moving to markup
    
    this.bindUIActions();
  },
  
  bindUIActions: function() {
    $(".modal-button, .effeckt-modal-close").on("click", function() {
      Modals1.toggleModal(this);
    });   
  },
  
  toggleModal: function(button) {
   
    var modal = $(".effeckt-modal");
                      
    if (modal.hasClass("effeckt-show")) {

      modal.removeClass("effeckt-show")
      setTimeout(function() {
        modal
          .removeClass()
          .addClass("effeckt-modal");
      }, 100);

    } else {

      modal
        .removeClass()
        .addClass("effeckt-modal " + $(button).data("modal-type"));
      setTimeout(function() {
        modal.addClass("effeckt-show");
      }, 100);
      
    }
    
  }
  
}

Modals1.init();