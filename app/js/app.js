'use strict';
var $ = require('jquery');

$(document).ready(function(){

  var obj = {};

  $.getJSON( './data.json', {
    format: "json"
    }).done(function(data) {
        obj = data;
        $('.video-container').append('<video id="bunnyvideo" width="100%" height="100%">' +
          '<source src=' + obj.video + ' type="video/ogg">' +
          'Your browser does not support the video tag.' +
          '</video>');
        $('#bunnyvideo').get(0).play();



        var snd = new Audio(obj.audio);


        $('#content').on('click', '.btn-audio', function() {
          snd.play();
        });
    });

  $('.video-container').on('click', '.btn-skip-video', function() {
    displayContent($(this));
  });

  $('video').on('ended', function() {
    displayContent($(this));
  });

  function displayContent (self) {
    self.parent().empty();
    $('#content').addClass('fade');
  }




});

