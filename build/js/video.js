'use strict';
var VideoFeature = {

  jsonObj: {},

  settings: {

  },
  init: function() {
    this.getData();
    this.bindUIActions();
  },
  getData: function() {
    $.getJSON( './data.json', {
      format: 'json'
      }).done(function(data) {
        VideoFeature.jsonObj = data;
        VideoFeature.addVideo();
        $('.btn-skip-video').addClass('fade');
    });
  },
  addVideo: function(){
    var container = $('.video-container');
    container.append('<video id="bunnyvideo" ' +
      'width="100%" height="100%">' +
      '<source src=' + VideoFeature.jsonObj.video + ' type="video/ogg">' +
      'Your browser does not support the video tag.' +
      '</video>');
    $('#bunnyvideo').get(0).play();
    container.append('<button class="btn-skip-video fade">skip video</button>');
  },
  bindUIActions: function(){
    // skip video button event
    $('.video-container').on('click', '.btn-skip-video', function() {
      VideoFeature.displayContent($(this));
    });

    // when video ends show content
    $('video').on('ended', function() {
      VideoFeature.displayContent($(this));
    });
  },
  displayContent: function(button){
    var self = VideoFeature;
    $('body').css('background-image','url(' + self.jsonObj.background + ')');
    button.parent().empty().append(
      '<div id="content">'+
      '<h1>'+ self.jsonObj.header +'</h1>'+
      '<p>'+ self.jsonObj.description +'</p>'+
      '<button class="btn-audio">play audio</button></div>')
      .addClass('fade');
  }

};

(function() {
  VideoFeature.init();
})();