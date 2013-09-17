var EffecktDemos = {

  contribURL: 'https://api.github.com/repos/h5bp/Effeckt.css/contributors?callback=?',

  init: function() {

    $(window).load(function() {
      $(".no-transitions").removeClass("no-transitions");
    });

    this.getContributorsData();

  },

  getContributorsData: function() {

    var self = this;

    $.ajax({
      type: 'GET',
      url: this.contribURL,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(data){
        self.listContributors(data.data);
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
