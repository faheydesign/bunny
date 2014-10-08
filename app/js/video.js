'use strict';
var VideoFeature = {

  jsonObj: {},
  sound:{},
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
      '<source src=' + VideoFeature.jsonObj.video.webm + ' type="video/webm; codecs=vp8,vorbis">' +
      '<source src=' + VideoFeature.jsonObj.video.mp4 + ' type="video/mp4; codecs=avc1.42E01E,mp4a.40.2">' +
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
    $('body').hide().css('background-image','url(' + self.jsonObj.background + ')');
    button.parent().empty().append(
      '<div id="content">'+
      '<img class="logo" src='+ self.jsonObj.header.img +' alt='+ self.jsonObj.header.alt +'>'+
      '<p>'+ self.jsonObj.description +'</p>'+
      '<audio id="sound" preload="auto" src='+ self.jsonObj.audio + '></audio>'+
      '<button class="btn-audio">play audio</button></div>')
      .addClass('fade');
    $('body').show();
    this.bindAudio();
  },
  bindAudio: function(){
    $('#content').on('click', '.btn-audio', function() {
      $('#sound').get(0).play();
    });
  }

};

(function() {
  VideoFeature.init();
})();
