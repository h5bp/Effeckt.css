var EffecktDemos = {

  contribURL: 'https://api.github.com/repos/h5bp/Effeckt.css/contributors?callback=?',

  init: function() {

    $(window).load(function() {
      $(".no-transitions").removeClass("no-transitions");
    });

    EffecktDemos.transitionEndEventName = EffecktDemos.transitionEndEventNames[Modernizr.prefixed('transition')];
    EffecktDemos.animationEndEventName = EffecktDemos.animationEndEventNames[Modernizr.prefixed('animation')];

    this.getContributorsData();

  },

  animationEndEventNames: {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },

  transitionEndEventNames: {
    'WebkitTransition' : 'webkitTransitionEnd',
    'OTransition' : 'oTransitionEnd',
    'msTransition' : 'MSTransitionEnd',
    'transition' : 'transitionend'
  },

  getContributorsData: function() {
    $.ajax({
      type: 'GET',
      url: EffecktDemos.contribURL,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(data){
        EffecktDemos.listContributors(data.data);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  },

  listContributors: function(data) {

    var html = '';

    $(data).each(function(i, user){
      html += '<li><a href="'+ user.url.replace('api.','').replace('users/','') +'"><img src="'+ user.avatar_url +'" alt="'+ user.login +'" class="contributor-avatar"></a></li>';
    });

    $(html).appendTo('#contributors-list');

  }

}

EffecktDemos.init();
