var Tooltip = {

	$tooltip: $('.effeckt-tooltip'),

  isTouchDevice: !!( 'ontouchstart' in window ),

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this,
        evtIn  = 'mouseover',
        evtOut = 'mouseleave';

    if ( this.isTouchDevice ) {
      evtIn = 'click touchstart';
      evtOut= 'touchend';
    }

    this.$tooltip.on(evtIn, function(e){
      e.preventDefault();
      self.show(this);
    });

    this.$tooltip.on(evtOut, function(e){
      e.preventDefault();
      self.hide(this);
    })

  },

  show: function(el) {
    var $el = $(el),
        effect = $el.data('effeckt-tooltip-type'),
        self = this;

    // Close it if it already shown
    if ( $el.hasClass('show') )
      this.hide( $el );
    else
      $el.addClass('show');

    // If is a touch device let autoclose it after 5seconds
    if ( this.isTouchDevice ) {
      setTimeout(function(){
        self.hide();
      }, 5000);
    }
  },

  hide: function(el){
    var $el = $(el);

    $el.removeClass('show');
  }

};

Tooltip.init();
