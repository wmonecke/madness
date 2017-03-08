// JS for the Profile page and other related pages.
$(document).ready(function () {
  $('.profilebackground').fadeIn(2200);
  $('.signupwrapper').fadeIn(2200);

  // Slide animation
  $('#slidertrigger').on('click', function() {
    $('#sliderresponse').animate({width:'toggle'},500);
  });

  // Configuring date
  n =  new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  switch (m) {
    case 1:
      m = 'January';
      break;
    case 2:
      m = 'February';
      break;
    case 3:
      m = 'March';
      break;
    case 4:
      m = 'April';
      break;
    case 5:
      m = 'May';
      break;
    case 6:
      m = 'June';
      break;
    case 7:
      m = 'July';
      break;
    case 8:
      m = 'August';
      break;
    case 9:
      m = 'September';
      break;
    case 10:
      m = 'October';
      break;
    case 11:
      m = 'November';
      break;
    case 12:
      m = 'December';
      break;
  }
  d = n.getDate();
  document.getElementById("date").innerHTML = m + "  &nbsp" + d + ",  &nbsp" + y;
});
