'use strict';
var videoFeature = {

  jsonObj: {},

  settings: {

  },
  init: function() {
    this.getData();
    this.bindUIActions();
  },
  getData: function() {
    $.getJSON( './data.json', {
      format: "json"
      }).done(function(data) {
        this.jsonObj = data;
        this.addVideo();
    });
  },
  addVideo: function(){
    $('.video-container').append('<video id="bunnyvideo" ' +
      'width="100%" height="100%">' +
      '<source src=' + this.jsonObj.video + ' type="video/ogg">' +
      'Your browser does not support the video tag.' +
      '</video>');
    $('#bunnyvideo').get(0).play();
  },
  bindUIActions: function(){
    // skip video button event
    $('.video-container').on('click', '.btn-skip-video', function() {
      this.displayContent($(this));
    });

    // when video ends show content
    $('video').on('ended', function() {
      this.displayContent($(this));
    });
  },
  displayContent: function(self){
    $('body').css("background-url",this.jsonObj.background);
    self.parent().empty().append(
      '<div id="content">'+
      '<h1>'+ this.jsonObj.header +'</h1>'+
      '<p>'+ this.jsonObj.description +'</p>'+
      '<button class="btn-audio">play audio</button></div>')
      .addClass('fade');
  }


};
