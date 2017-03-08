// JQUERY - FRONT END JS
$(document).ready( function() {
  // Creating slideshow reel in the background with VEGAS plug-in

  $('.loggedinbackground').vegas({
    preload: false,
    transitionDuration: 3000,
    delay: 10000,
    slides: [
      { src: "../images/loggedin3.jpg" },
      { src: "../images/loggedin2.jpg" },
      { src: "../images/loggedin6.jpg" },
      { src: "../images/loggedin5.jpg" },
      { src: "../images/loggedin4.jpg" },
      { src: "../images/loggedin7.jpg" }
    ],
    animation: 'random',
    overlay: '/images/overlays/05.png'
  });

  var click = 0;
  let userInfo = [];

  // .STEPONECONTENT LOGIC
  $('#buttononejq').on('click', function() {
      $('.steponecontent').fadeOut(500);
      $(this).fadeOut(500);

      setTimeout(function() {
        $('.steptwocontent').fadeIn(500);
      }, 500);
  });
  // --close .STEPONECONTENT LOGIC

  // .STEPTWOCONTENT LOGIC
  let choseGuy = 0;
  let choseGirl = 0;

  $('#buttontwo1').on('click', function () {
    $(this).css('border-color', '#539cfa');
    $('#buttontwo2').css('border-color', 'white');
    choseGuy = 1;
    choseGirl = 0;
    $('#buttontwojq').fadeIn(500);
  });

  $('#buttontwo2').on('click', function () {
    $(this).css('border-color', '#f14497');
    $('#buttontwo1').css('border-color', 'white');
    choseGuy = 0;
    choseGirl = 1;
    $('#buttontwojq').fadeIn(500);
  });

  // pushing to array selection of user
  $('#buttontwojq').on('click', function () {
    $(this).css('pointer-events', 'none');
    if (choseGuy === 1) {
      userInfo.push('guy');
    } else if (choseGirl === 1) {
      userInfo.push('girl');
    }

    //.STEPTWOCONTENT > .STEPTHREECONTENT
    $('.steptwocontent').fadeOut(500);

    setTimeout(function() {
      $('.stepthreecontent').fadeIn(500);
      $('.buttonthreejq').fadeIn(1500);
    }, 500);
  });
  // --closing .STEPTWOCONTENT LOGIC

  // .STEPTHREECONTENT LOGIC
  let weigh = 0;

  $('#checkboxLBS').on('click', function() {
    $('#checkboxKG').attr('checked', false);
  });
  $('#checkboxKG').on('click', function() {
    $('#checkboxLBS ').attr('checked', false);
  });

  // Convert LBS value to KG.
  $('#buttonthreejq').on('click', function () {
    $(this).css('pointer-events', 'none');
    if ($('#checkboxLBS ').prop("checked") === true) {
      weigh = $('.weigh').val() * 0.45359237;
      userInfo.push(weigh);
    } else {
      weigh = $('.weigh').val();
      userInfo.push(weigh);
    }

    //.STEPTWOCONTENT > .STEPTHREECONTENT
    $('.stepthreecontent').fadeOut(500);
    $(this).fadeOut(500);

    setTimeout(function() {
      $('.stepfourcontent').fadeIn(500);
    }, 500);
  });
  // --closing .STEPTHREECONTENT LOGIC

  // .STEPFOURCONTENT LOGIC
  let choseGoal = '';

  $('#buttonfour1').on('click', function () {
    $(this).css('border-color', 'tomato');
    $(this).attr('data-true', '1');
    $('#buttonfour2').attr('data-true', '');
    $('#buttonfour3').attr('data-true', '');
    choseGoal = 'strong';

    $('#buttonfour2').css('border-color', 'white');
    $('#buttonfour3').css('border-color', 'white');
    $('#buttonfourjq').fadeIn(500);
  });

  $('#buttonfour2').on('click', function () {
    $(this).css('border-color', 'lightgreen');
    $(this).attr('data-true', '1');
    $('#buttonfour1').attr('data-true', '');
    $('#buttonfour3').attr('data-true', '');
    choseGoal = 'lean';

    $('#buttonfour1').css('border-color', 'white');
    $('#buttonfour3').css('border-color', 'white');
    $('#buttonfourjq').fadeIn(500);
  });

  $('#buttonfour3').on('click', function () {
    $(this).css('border-color', 'royalblue');
    $(this).attr('data-true', '1');
    $('#buttonfour1').attr('data-true', '');
    $('#buttonfour2').attr('data-true', '');
    choseGoal = 'thin';

    $('#buttonfour1').css('border-color', 'white');
    $('#buttonfour2').css('border-color', 'white');
    $('#buttonfourjq').fadeIn(500);
  });

  $('#buttonfourjq').on('click', function () {
    $(this).css('pointer-events', 'none');
    if ( $('#buttonfour1').attr('data-true') === '1' ) {
      userInfo.push('strong');
    } else if ( $('#buttonfour2').attr('data-true') === '1' ) {
      userInfo.push('lean');
    } else if ( $('#buttonfour3').attr('data-true') === '1' ) {
      userInfo.push('thin');
    }
    console.log(userInfo);

    $('.stepfourcontent').fadeOut(500);
    $(this).fadeOut(500);

    setTimeout(function() {
      $('.stepfivecontent').fadeIn(500);
    }, 500);
  });

  $('#buttonfivejq').on('click', function () {
    $('.loggedinbackground').fadeOut(2000);
  });
});
