// JQUERY - FRONT END JS
$(document).ready( function() {

  setTimeout(function() {
    $('.error-message').fadeOut(2000);
    $('.success-message').fadeOut(2000);
  }, 3000);

  $('#logintrigger').on('click', function() {
    $('#loginreact').slideToggle('slow');
  });

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

    $('#gendervalue').attr('value', 'male');
    choseGuy = 1;
    choseGirl = 0;
    //push to input girl or guy value.

    $('#buttontwojq').fadeIn(500);
  });

  $('#buttontwo2').on('click', function () {
    $(this).css('border-color', '#f14497');
    $('#buttontwo1').css('border-color', 'white');

    $('#gendervalue').attr('value', 'female');
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
  let weightSupport;

  $('#checkboxLBS').on('click', function() {
    $('#metricvalue').val('0'); //mean he uses LBS as a measuremnt unit.
    $(this).css('pointer-events', 'none');
    $('#checkboxKG').css('pointer-events', 'auto');

    $('#checkboxKG').attr('checked', false);

    //convert KG to LBS.
    weightSupport = $('.weigh').val();
    weigh = Math.floor($('.weigh').val() * 0.45359237);

    $('#weightvalue').val(weigh);
  });

  $('#checkboxKG').on('click', function() {
    $('#metricvalue').val('1');
    $(this).css('pointer-events', 'none');
    $('#checkboxLBS').css('pointer-events', 'auto');

    $('#checkboxLBS ').attr('checked', false);

    weigh = 0;
    $('#weightvalue').val(weightSupport);
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

    $('#goalvalue').val('strong');

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

    $('#goalvalue').val('lean');

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

    $('#goalvalue').val('thin');

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
  // --------- PROFILE BACKGROUND LOGIC --------

  if ($('#showgender').html() === 'male') {
    $('.profilebackgroundimage').css('background', 'url("../images/loggedin2.jpg") no-repeat center center fixed');
    $('.profilebackgroundimage').css('background-size', 'cover');

  }

  if ($('#showgender').html() === 'female') {
    $('.profilebackgroundimage').css('background', 'url("../images/loggedin7.jpg") no-repeat center center fixed');
    $('.profilebackgroundimage').css('background-size', 'cover');
  }


  // -------------- USER INFO LOGIC ------------------
  if ($('#guy').attr('checked')) {
    $('#guy').css('pointer-events', 'none');
    $('#genderinput').val('male');
  }

  if ($('#girl').attr('checked')) {
    $('#girl').css('pointer-events', 'none');
    $('#genderinput').val('female');
  }

  $('#guy').on('click', function() {
    //checkboxes logic
    $('#girl').removeAttr('checked');
    $(this).css('pointer-events', 'none');
    $('#girl').css('pointer-events', 'auto');

    //inputform logic
    $('#genderinput').val('male');
  });

  $('#girl').on('click', function() {
    //checkboxes logic
    $('#guy').removeAttr('checked');
    $(this).css('pointer-events', 'none');
    $('#guy').css('pointer-events', 'auto');

    //inputform logic
    $('#genderinput').val('female');
  });


  // My current goal logic
  if ($('#strong').attr('checked')) {
    $('#strong').css('pointer-events', 'none');
    $('#goalinput').val('strong');
  }

  if ($('#lean').attr('checked')) {
    $('#lean').css('pointer-events', 'none');
    $('#goalinput').val('lean');
  }

  if ($('#thin').attr('checked')) {
    $('#thin').css('pointer-events', 'none');
    $('#goalinput').val('thin');
  }

  $('#strong').on('click', function() {
    //checkboxes logic
    $('#lean').removeAttr('checked');
    $('#thin').removeAttr('checked');
    $(this).css('pointer-events', 'none');
    $('#lean').css('pointer-events', 'auto');
    $('#thin').css('pointer-events', 'auto');

    //inputform logic
    $('#goalinput').val('strong');
  });

  $('#lean').on('click', function() {
    //checkboxes logic
    $('#strong').removeAttr('checked');
    $('#thin').removeAttr('checked');
    $(this).css('pointer-events', 'none');
    $('#strong').css('pointer-events', 'auto');
    $('#thin').css('pointer-events', 'auto');

    //inputform logic
    $('#goalinput').val('lean');
  });

  $('#thin').on('click', function() {
    //checkboxes logic
    $('#strong').removeAttr('checked');
    $('#lean').removeAttr('checked');
    $(this).css('pointer-events', 'none');
    $('#strong').css('pointer-events', 'auto');
    $('#lean').css('pointer-events', 'auto');

    //inputform logic
    $('#goalinput').val('thin');
  });



});
