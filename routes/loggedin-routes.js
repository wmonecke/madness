const express    = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");

// User model
const User       = require("../models/user-model");

//--------------- WELCOME ROUTE -----------------------
router.get('/welcome', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  res.render('loggedin/welcome.ejs', {
    firstName: req.user.firstName
  });
});

//------------- NORMAL LOGGIN -------------------------
router.get('/profile', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  res.render('loggedin/profile.ejs', {
    successMessage: req.flash('success'),
    userInfo: req.user
  });
});

//------------- REGISTRATION --------------------------
router.post('/profile', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  let userId = req.user._id;

  const userUpdate = {
    gender: req.body.gender,
    weight: req.body.weight,
    metric: req.body.metric,
    goal:   req.body.goal
  };

  User.findByIdAndUpdate(userId, userUpdate, (err, prodDoc) => {
    if (err) {
      next (err);
      return;
    }
    res.redirect('/profile');
  });
});


// ------------------------ USER INFORMATION PAGE ---------------------------
router.get('/userinfo', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  res.render('loggedin/userinfo.ejs', {
    user: req.user
  });
});

router.post('/userinfoupdate', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  let userId = req.user._id;

  const userUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    goal:   req.body.goal,
    weight: req.body.weight
  };

  User.findByIdAndUpdate(userId, userUpdate, (err, prodDoc) => {
    if (err) {
      next (err);
      return;
    }
    res.redirect('/profile');
  });

});

// ------------------------------ LOG OUT ------------------------------------
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out.'); //Actually sending the ('success')ball to a catcher waiting for a success ball. In this case the .get('/') is awaiting a success ball.
  res.redirect('/');
});



module.exports = router;
