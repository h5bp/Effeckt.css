/*!
 * Effeckt v1.0.0
 */

if (typeof jQuery === 'undefined') { throw new Error('Effeckt\'s JavaScript requires jQuery') }

var EffecktButtons = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this;

    $('.effeckt-button').on( Effeckt.buttonPressedEvent, function(){
      self.showLoader(this);
    });

  },

  showLoader: function(el) {

    var button = $(el),
        resetTimeout;

    if(button.attr( 'data-loading' )){

      button.removeAttr( 'data-loading' );

    } else {

      button.attr( 'data-loading', true );

    }

    clearTimeout( resetTimeout );
    resetTimeout = setTimeout( function() {
      button.removeAttr( 'data-loading' );
    }, 2000 );

  }

};

EffecktButtons.init();

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
var EffecktListItems = {

  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this;

    $(".effeckt-list-wrap button.add").on( Effeckt.buttonPressedEvent, function() {
      self.addListItem(this);
    });

    $(".effeckt-list-wrap button.remove").on( Effeckt.buttonPressedEvent, function() {
      self.removeListItem(this);
    });

    $("button.remove").hide();
  },

  addListItem: function(el) {

    var insertPoint = $(el).parent().find("li:nth-child(3)");
    $(el).parent().find("button.remove").show();

    $("<li />", {
      'text': "new item",
      'class': "new-item"
    }).insertAfter(insertPoint);

  },

  removeListItem: function(el) {

    var $parent = $(el).parent(),
        self = this;

    var elToRemove = $parent.find("li.new-item").last();
    elToRemove.on( Effeckt.transitionAnimationEndEvent, function () {
      elToRemove.off( Effeckt.transitionAnimationEndEvent );
      elToRemove.remove();
    });

    elToRemove.toggleClass("remove-item new-item");
    if (!$parent.find("li.new-item").length) {
      $parent.find("button.remove").hide();
    }

  }

};

EffecktListItems.init();

/*!
 * stroll.js 1.2 - CSS scroll effects
 * http://lab.hakim.se/scroll-effects
 * MIT licensed
 *
 * Modified to use Modernizer 
 * 
 * Copyright (C) 2012 Hakim El Hattab, http://hakim.se
 */
(function(){

  "use strict";

  // When a list is configured as 'live', this is how frequently 
  // the DOM will be polled for changes
  var LIVE_INTERVAL = 500;

  var IS_TOUCH_DEVICE = Modernizr.touch;

  // All of the lists that are currently bound
  var lists = [];

  // Set to true when there are lists to refresh
  var active = false;

  /**
   * Updates all currently bound lists.
   */
  function refresh() {
    if( active ) {
      requestAnimFrame( refresh );
      
      for( var i = 0, len = lists.length; i < len; i++ ) {
        lists[i].update();
      }
    }
  }

  /**
   * Starts monitoring a list and applies classes to each of 
   * its contained elements based on its position relative to 
   * the list's viewport.
   * 
   * @param {HTMLElement} element 
   * @param {Object} options Additional arguments;
   *  - live; Flags if the DOM should be repeatedly checked for changes
   *      repeatedly. Useful if the list contents is changing. Use 
   *      scarcely as it has an impact on performance.
   */
  function add( element, options ) {
    // Only allow ul/ol
    if( !element.nodeName || /^(ul|li)$/i.test( element.nodeName ) === false ) {
      return false;
    }
    // Delete duplicates (but continue and re-bind this list to get the 
    // latest properties and list items)
    else if( contains( element ) ) {
      remove( element );
    }

    var list = IS_TOUCH_DEVICE ? new TouchList( element ) : new List( element );

    // Handle options
    if( options && options.live ) {
      list.syncInterval = setInterval( function() {
        list.sync.call( list );
      }, LIVE_INTERVAL );
    }

    // Synchronize the list with the DOM
    list.sync();

    // Add this element to the collection
    lists.push( list );

    // Start refreshing if this was the first list to be added
    if( lists.length === 1 ) {
      active = true;
      refresh();
    }
  }

  /**
   * Stops monitoring a list element and removes any classes 
   * that were applied to its list items.
   * 
   * @param {HTMLElement} element 
   */
  function remove( element ) {
    for( var i = 0; i < lists.length; i++ ) {
      var list = lists[i];

      if( list.element == element ) {
        list.destroy();
        lists.splice( i, 1 );
        i--;
      }
    }

    // Stopped refreshing if the last list was removed
    if( lists.length === 0 ) {
      active = false;
    }
  }

  /**
   * Checks if the specified element has already been bound.
   */
  function contains( element ) {
    for( var i = 0, len = lists.length; i < len; i++ ) {
      if( lists[i].element == element ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Calls 'method' for each DOM element discovered in 
   * 'target'.
   * 
   * @param target String selector / array of UL elements / 
   * jQuery object / single UL element
   * @param method A function to call for each element target
   */
  function batch( target, method, options ) {
    var i, len;

    // Selector
    if( typeof target === 'string' ) {
      var targets = document.querySelectorAll( target );

      for( i = 0, len = targets.length; i < len; i++ ) {
        method.call( null, targets[i], options );
      }
    }
    // Array (jQuery)
    else if( typeof target === 'object' && typeof target.length === 'number' ) {
      for( i = 0, len = target.length; i < len; i++ ) {
        method.call( null, target[i], options );
      }
    }
    // Single element
    else if( target.nodeName ) {
      method.call( null, target, options );
    }
    else {
      throw 'Stroll target was of unexpected type.';
    }
  }

  /**
   * Checks if the client is capable of running the library.
   */
  function isCapable() {
    return !!document.body.classList;
  }

  /**
   * The basic type of list; applies past & future classes to 
   * list items based on scroll state.
   */
  function List( element ) {
    this.element = element;
  }

  /** 
   * Fetches the latest properties from the DOM to ensure that 
   * this list is in sync with its contents. 
   */
  List.prototype.sync = function() {
    this.items = Array.prototype.slice.apply( this.element.children );

    // Caching some heights so we don't need to go back to the DOM so much
    this.listHeight = this.element.offsetHeight;

    // One loop to get the offsets from the DOM
    for( var i = 0, len = this.items.length; i < len; i++ ) {
      var item = this.items[i];
      item._offsetHeight = item.offsetHeight;
      item._offsetTop = item.offsetTop;
      item._offsetBottom = item._offsetTop + item._offsetHeight;
      item._state = '';
    }

    // Force an update
    this.update( true );
  }

  /** 
   * Apply past/future classes to list items outside of the viewport
   */
  List.prototype.update = function( force ) {
    var scrollTop = this.element.pageYOffset || this.element.scrollTop,
      scrollBottom = scrollTop + this.listHeight;

    // Quit if nothing changed
    if( scrollTop !== this.lastTop || force ) {
      this.lastTop = scrollTop;

      // One loop to make our changes to the DOM
      for( var i = 0, len = this.items.length; i < len; i++ ) {
        var item = this.items[i];

        // Above list viewport
        if( item._offsetBottom < scrollTop ) {
          // Exclusion via string matching improves performance
          if( item._state !== 'past' ) {
            item._state = 'past';
            item.classList.add( 'past' );
            item.classList.remove( 'future' );
          }
        }
        // Below list viewport
        else if( item._offsetTop > scrollBottom ) {
          // Exclusion via string matching improves performance
          if( item._state !== 'future' ) {
            item._state = 'future';
            item.classList.add( 'future' );
            item.classList.remove( 'past' );
          }
        }
        // Inside of list viewport
        else if( item._state ) {
          if( item._state === 'past' ) item.classList.remove( 'past' );
          if( item._state === 'future' ) item.classList.remove( 'future' );
          item._state = '';
        }
      }
    }
  }

  /**
   * Cleans up after this list and disposes of it.
   */
  List.prototype.destroy = function() {
    clearInterval( this.syncInterval );

    for( var j = 0, len = this.items.length; j < len; j++ ) {
      var item = this.items[j];

      item.classList.remove( 'past' );
      item.classList.remove( 'future' );
    }
  }


  /**
   * A list specifically for touch devices. Simulates the style 
   * of scrolling you'd see on a touch device but does not rely 
   * on webkit-overflow-scrolling since that makes it impossible 
   * to read the up-to-date scroll position.
   */
  function TouchList( element ) {
    this.element = element;
    this.element.style.overflow = 'hidden';

    this.top = {
      value: 0,
      natural: 0
    };

    this.touch = {
      value: 0,
      offset: 0,
      start: 0,
      previous: 0,
      lastMove: Date.now(),
      accellerateTimeout: -1,
      isAccellerating: false,
      isActive: false
    };

    this.velocity = 0;
  }
  TouchList.prototype = new List();

  /** 
   * Fetches the latest properties from the DOM to ensure that 
   * this list is in sync with its contents. This is typically 
   * only used once (per list) at initialization.
   */
  TouchList.prototype.sync = function() {
    this.items = Array.prototype.slice.apply( this.element.children );

    this.listHeight = this.element.offsetHeight;

    var item;

    // One loop to get the properties we need from the DOM
    for( var i = 0, len = this.items.length; i < len; i++ ) {
      item = this.items[i];
      item._offsetHeight = item.offsetHeight;
      item._offsetTop = item.offsetTop;
      item._offsetBottom = item._offsetTop + item._offsetHeight;
      item._state = '';

      // Animating opacity is a MAJOR performance hit on mobile so we can't allow it
      item.style.opacity = 1;
    }

    this.top.natural = this.element.scrollTop;
    this.top.value = this.top.natural;
    this.top.max = item._offsetBottom - this.listHeight;

    // Force an update
    this.update( true );

    this.bind();
  }

  /**
   * Binds the events for this list. References to proxy methods 
   * are kept for unbinding if the list is disposed of.
   */
  TouchList.prototype.bind = function() {
    var scope = this;

    this.touchStartDelegate = function( event ) {
      scope.onTouchStart( event );
    };

    this.touchMoveDelegate = function( event ) {
      scope.onTouchMove( event );
    };

    this.touchEndDelegate = function( event ) {
      scope.onTouchEnd( event );
    };

    this.element.addEventListener( 'touchstart', this.touchStartDelegate, false );
    this.element.addEventListener( 'touchmove', this.touchMoveDelegate, false );
    this.element.addEventListener( 'touchend', this.touchEndDelegate, false );
  }

  TouchList.prototype.onTouchStart = function( event ) {
    event.preventDefault();
    
    if( event.touches.length === 1 ) {
      this.touch.isActive = true;
      this.touch.start = event.touches[0].clientY;
      this.touch.previous = this.touch.start;
      this.touch.value = this.touch.start;
      this.touch.offset = 0;

      if( this.velocity ) {
        this.touch.isAccellerating = true;

        var scope = this;

        this.touch.accellerateTimeout = setTimeout( function() {
          scope.touch.isAccellerating = false;
          scope.velocity = 0;
        }, 500 );
      }
      else {
        this.velocity = 0;
      }
    }
  }

  TouchList.prototype.onTouchMove = function( event ) {
    if( event.touches.length === 1 ) {
      var previous = this.touch.value;

      this.touch.value = event.touches[0].clientY;
      this.touch.lastMove = Date.now();

      var sameDirection = ( this.touch.value > this.touch.previous && this.velocity < 0 )
                || ( this.touch.value < this.touch.previous && this.velocity > 0 );
      
      if( this.touch.isAccellerating && sameDirection ) {
        clearInterval( this.touch.accellerateTimeout );

        // Increase velocity significantly
        this.velocity += ( this.touch.previous - this.touch.value ) / 10;
      }
      else {
        this.velocity = 0;

        this.touch.isAccellerating = false;
        this.touch.offset = Math.round( this.touch.start - this.touch.value );
      }

      this.touch.previous = previous;
    }
  }

  TouchList.prototype.onTouchEnd = function( event ) {
    var distanceMoved = this.touch.start - this.touch.value;

    if( !this.touch.isAccellerating ) {
      // Apply velocity based on the start position of the touch
      this.velocity = ( this.touch.start - this.touch.value ) / 10;
    }

    // Don't apply any velocity if the touch ended in a still state
    if( Date.now() - this.touch.lastMove > 200 || Math.abs( this.touch.previous - this.touch.value ) < 5 ) {
      this.velocity = 0;
    }

    this.top.value += this.touch.offset;

    // Reset the variables used to determne swipe speed
    this.touch.offset = 0;
    this.touch.start = 0;
    this.touch.value = 0;
    this.touch.isActive = false;
    this.touch.isAccellerating = false;

    clearInterval( this.touch.accellerateTimeout );

    // If a swipe was captured, prevent event propagation
    if( Math.abs( this.velocity ) > 4 || Math.abs( distanceMoved ) > 10 ) {
      event.preventDefault();
    }
  };

  /** 
   * Apply past/future classes to list items outside of the viewport
   */
  TouchList.prototype.update = function( force ) {
    // Determine the desired scroll top position
    var scrollTop = this.top.value + this.velocity + this.touch.offset;

    // Only scroll the list if there's input
    if( this.velocity || this.touch.offset ) {
      // Scroll the DOM and add on the offset from touch
      this.element.scrollTop = scrollTop;

      // Keep the scroll value within bounds
      scrollTop = Math.max( 0, Math.min( this.element.scrollTop, this.top.max ) );

      // Cache the currently set scroll top and touch offset
      this.top.value = scrollTop - this.touch.offset;
    }

    // If there is no active touch, decay velocity
    if( !this.touch.isActive || this.touch.isAccellerating ) {
      this.velocity *= 0.95;
    }

    // Cut off early, the last fraction of velocity doesn't have 
    // much impact on movement
    if( Math.abs( this.velocity ) < 0.15 ) {
      this.velocity = 0;
    }

    // Only proceed if the scroll position has changed
    if( scrollTop !== this.top.natural || force ) {
      this.top.natural = scrollTop;
      this.top.value = scrollTop - this.touch.offset;

      var scrollBottom = scrollTop + this.listHeight;
      
      // One loop to make our changes to the DOM
      for( var i = 0, len = this.items.length; i < len; i++ ) {
        var item = this.items[i];

        // Above list viewport
        if( item._offsetBottom < scrollTop ) {
          // Exclusion via string matching improves performance
          if( this.velocity <= 0 && item._state !== 'past' ) {
            item.classList.add( 'past' );
            item._state = 'past';
          }
        }
        // Below list viewport
        else if( item._offsetTop > scrollBottom ) {
          // Exclusion via string matching improves performance
          if( this.velocity >= 0 && item._state !== 'future' ) {
            item.classList.add( 'future' );
            item._state = 'future';
          }
        }
        // Inside of list viewport
        else if( item._state ) {
          if( item._state === 'past' ) item.classList.remove( 'past' );
          if( item._state === 'future' ) item.classList.remove( 'future' );
          item._state = '';
        }
      }
    }
  };

  /**
   * Cleans up after this list and disposes of it.
   */
  TouchList.prototype.destroy = function() {
    List.prototype.destroy.apply( this );

    this.element.removeEventListener( 'touchstart', this.touchStartDelegate, false );
    this.element.removeEventListener( 'touchmove', this.touchMoveDelegate, false );
    this.element.removeEventListener( 'touchend', this.touchEndDelegate, false );
  }


  /**
   * Public API
   */
  window.stroll = {
    /**
     * Binds one or more lists for scroll effects.
     * 
     * @see #add()
     */
    bind: function( target, options ) {
      if( isCapable() ) {
        batch( target, add, options );
      }
    },

    /**
     * Unbinds one or more lists from scroll effects.
     * 
     * @see #remove()
     */
    unbind: function( target ) {
      if( isCapable() ) {
        batch( target, remove );
      }
    }
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
  })()

})();
var EffecktOffScreenNav = {

  nav: $("#effeckt-off-screen-nav"),
  closeButton: $("#effeckt-off-screen-nav-close"),

  effeckt_type: '',
  threedee: false,

  _checkForMore: {
    'effeckt-off-screen-nav-top-card-deck': {
      'showMethod': '_showCardDeckTop',
      'hideMethod': '_hideCardDeckTop',
      'initMethod': '_initCardDeckTop',
      'endMethod': '_endCardDeck'
    },
    'effeckt-off-screen-nav-bottom-card-deck': {
      'showMethod': '_showCardDeckBottom',
      'hideMethod': '_hideCardDeckBottom',
      'initMethod': '_initCardDeckBottom',
      'endMethod': '_endCardDeck'
    }
  },


  init: function() {

    this.bindUIActions();

  },

  bindUIActions: function() {

    var self = this;

    $(".off-screen-nav-button, #effeckt-off-screen-nav-close").on( Effeckt.buttonPressedEvent, function() {
      self.toggleNav(this);
    });

  },

  toggleNav: function(el) {

    var button = $(el),
        self = this;

    this.effeckt_type = button.data("effeckt-type");
    this.threedee = button.data("threedee");

    // Show
    if (!this.nav.hasClass("effeckt-show")) {

      this.nav.addClass(this.effeckt_type);
      this.closeButton.data("effeckt-type", this.effeckt_type);

      if (this.threedee) {
        $("body").addClass("effeckt-perspective");
      }

      if (button.data("effeckt-needs-hide-class")) {
        this.nav.data("effeckt-needs-hide-class", button.data("effeckt-needs-hide-class"));
      }

      this.nav.on( Effeckt.transitionAnimationEndEvent, function () {
        self.nav.off( Effeckt.transitionAnimationEndEvent );
        self.nav.addClass("effeckt-show");

        $('[data-effeckt-page].effeckt-page-active, .effeckt-overlay').on( Effeckt.buttonPressedEvent, self.toggleNav.bind(self));
      });

      // check if need more coding done
      // to make the effect works
      // beyond css
      this._checkForMoreOnShow();

    // Hide
    } else {

      var self = this;

      this.nav.removeClass("effeckt-show");

      this.nav.on( Effeckt.transitionAnimationEndEvent, function () {
        self.nav.off( Effeckt.transitionAnimationEndEvent );
        self.hideNav();

        $('[data-effeckt-page].effeckt-page-active, .effeckt-overlay').off( Effeckt.buttonPressedEvent );
      });

      if( this.nav.data("effeckt-needs-hide-class") ){
        this.nav.addClass("effeckt-hide");
      }

      // check if need more coding done
      // to make the effect works
      // beyond css
      this._checkForMoreOnHide();

    }

  },

  hideNav: function() {

    //var self = this;

    this.nav.removeClass(this.closeButton.data("effeckt-type"));
    this.nav.removeClass("effeckt-hide");
    this.nav.removeData("effeckt-needs-hide-class");

    $("body").removeClass("effeckt-perspective");
  },

  // Check for more thing to do using javascript
  // that is beyond CSS
  _checkForMoreOnShow: function() {

    // Iterate each effeckt_type declared before
    // which need more thing do to
    for ( effeckt_type in this._checkForMore ) {

      if ( effeckt_type !== this.effeckt_type ) {
        continue;
      }

      var hideMethod = this._checkForMore[effeckt_type]['hideMethod'],
          initMethod = this._checkForMore[effeckt_type]['initMethod'];

      this._callThisMethod(hideMethod);
      this._callThisMethod(initMethod);

      // Break on first match
      // because we are only working with only one effect at time
      break;

    }
  },

  _checkForMoreOnHide: function() {

    for ( effeckt_type in this._checkForMore ) {

      if ( effeckt_type !== this.effeckt_type ) {
        continue;
      }

      var hideMethod = this._checkForMore[effeckt_type]['hideMethod'],
          endMethod = this._checkForMore[effeckt_type]['endMethod'];

      this._callThisMethod(hideMethod);
      this._callThisMethod(endMethod);

      // Break on first match
      // because we are only working with only one effect at time
      break;

    }
  },

  //--------------------------------
  // Methods for Card Deck From Top
  //--------------------------------
  _initCardDeckTop: function() {

    var self = this;

    this.nav.find('h4').on( Effeckt.buttonPressedEvent, function(e){
      e.preventDefault();

      if ( self.nav.hasClass('shown') ) {
        self._hideCardDeckTop();
      } else {
        self._showCardDeckTop();
      }

    });
  },

  _hideCardDeckTop: function() {
    var li = this.nav.find('li');

    li.removeAttr('style');
    this.nav.removeClass('shown');

    li.each(function(index){
      $(this).css(Modernizr.prefixed('transform'), 'translateY(' + (index*2) + 'px)')
        .css('z-index', li.length - index)
        .css("width" , (100 - index/2)+'%')
        .css("margin-left" , index/4+'%');
    });
  },

  _showCardDeckTop: function() {
    var li = this.nav.find('li');
    li.removeAttr('style');
    this.nav.addClass('shown');

    li.each(function(index){
      var height = $(this).height();

      $(this).css(Modernizr.prefixed('transform'), 'translateY(' + (index+1) * height + 'px)')
        .css("width" , '100%');
    });
  },

  //--------------------------------
  // Methods for Card Deck From Bottom
  //--------------------------------
  _initCardDeckBottom: function() {

    var self = this;

    this.nav.find('h4').on( Effeckt.buttonPressedEvent, function(e){
      e.preventDefault();

      if ( self.nav.hasClass('shown') ) {
        self._hideCardDeckBottom();
      } else {
        self._showCardDeckBottom();
      }

    });
  },

  _hideCardDeckBottom: function() {
    var li = this.nav.find('li');

    li.removeAttr('style');
    this.nav.removeClass('shown');

    li.each(function(index){
      $(this).css(Modernizr.prefixed('transform'), 'translateY(-' + (index*2) + 'px)')
        .css('z-index', li.length - index)
        .css("width" , (100 - index/2)+'%')
        .css("margin-left" , index/4+'%');
    });
  },

  _showCardDeckBottom: function() {
    var li = this.nav.find('li');
    li.removeAttr('style');
    this.nav.addClass('shown');

    li.each(function(index){
      var height = $(this).height();

      $(this).css(Modernizr.prefixed('transform'), 'translateY(-' + (index+1) * height + 'px)')
        .css("width" , '100%');
    });
  },

  // Card Deck
  // unbind on click event
  // after we closed the nav
  _endCardDeck: function() {
    var li = this.nav.find('li');
    li.removeAttr('style');
    this.nav.find('h4').off( Effeckt.buttonPressedEvent );
  },

  // This check if the method exists first
  // before call it
  _callThisMethod: function(methodName){
    // TODO: check if is an existing method
    if ( typeof methodName !== 'undefined' ) {
      this[methodName]();
    }
  }

};

EffecktOffScreenNav.init();

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
    console.log(modal.width());

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

/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 *
 * Rewritten for effeckts project
 *
 * Licensed under the MIT license
 */
var Tabs = {

  tabsWrapClass:  '.effeckt-tabs-wrap',
  tabsClass:      '.effeckt-tabs a.effeckt-tab',
  tabContentClass:'.effeckt-tab-content',

  init: function() {

    this.initComponent();
    this.bindUIActions();

  },

  initComponent: function() {
    
    //keep a reference to this (Tabs) object.
    var self = this;

    $(this.tabsWrapClass).each(function(){

      var $el             = $(this);
      var effect          = $el.data('effeckt-type');
      var tabContents     = $el.find(self.tabContentClass);
      var firstTabContent = tabContents.first();
      var tabs            = $el.find(self.tabsClass);

      tabs.removeClass('active').first().addClass('active');
      tabContents.not(':eq(0)').addClass('effeckt-hide');

      firstTabContent.addClass('effeckt-show');
      tabContents.parent().height(firstTabContent.height());

    });

  },

  bindUIActions: function() {

    //keep a reference to this (Tabs) object.
    var self = this;

    $(this.tabsClass).on( Effeckt.buttonPressedEvent, function(e) {
      e.preventDefault();
      self.showTab(this);
    });

  },

  showTab: function(el) {

    var tab         = $(el);
    var tabsWrap    = tab.parents(this.tabsWrapClass);
    var tabs        = tabsWrap.find(this.tabsClass);
    var tabContents = tabsWrap.find(this.tabContentClass);
    var effect      = tabsWrap.data('effeckt-type');
    
    //set active to this current clicked tab
    tabs.removeClass('active');
    tab.addClass('active');

    var tabID = tab.attr('href');
    var tabContent = tabContents.filter(tabID);

    tabContents.removeClass('effeckt-show').addClass('effeckt-hide');
    tabContent.addClass('effeckt-show');

    //add parent height, just because of position: absolute;
    tabContents.parent().height(tabContent.height());
  }

};

Tabs.init();
