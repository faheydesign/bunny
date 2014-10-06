'use strict';

  // $.ajax({
  //   dataType: "json",
  //   url: './data.json',
  //   success: function(data) {
  //     console.log(data);
  //   }
  // });

  $.getJSON( './data.json', {
    format: "json"
    }).done(function(data) {
        console.log(data);
    });



  $('.video-container').on('click', '.btn-skip-video', function() {
    $(this).parent().empty();
    $('#content').addClass('fade');
  });

  $('video').on('ended', function() {
    $(this).parent().empty();
    $('#content').addClass('fade');
  });




  var snd = new Audio("./media/aperfectday.mp3"); // buffers automatically when created


  $('#content').on('click', '.btn-audio', function() {
    snd.play();
    console.log(snd);
  });
