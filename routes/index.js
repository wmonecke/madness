const express    = require("express");
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const LocalStrategy = require('passport-local').Strategy; // Specific passport startegy. Local.
const router = express.Router();
// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
// User model
const User       = require("../models/user-model");

// ----------------------- HOME PAGE ------------------------------------
router.get('/', ensureLogin.ensureLoggedOut('/profile'), (req, res, next) => {
  res.render('index', {
      message: req.flash('error'),
      messageTwo: req.flash('success')
  });
});

// ------------------------ SIGN UP -------------------------------------
router.get('/signup', (req, res, next) => {
  res.render('signup.ejs', { message: req.flash('error') });
});

router.post("/signup", (req, res, next) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;


  if (firstName.length < 1) {
    res.render("signup", { message: "We need to know your first name." });
    return;
  }

  if (lastName.length < 1) {
    res.render("signup", { message: "Sorry, but we need to know your last name." });
    return;
  }

  if (username === "" || password === "") {
    res.render("signup", { message: "Please indicate an username and a password." });
    return;
  }

  if (username.length < 4) {
    res.render("signup", { message: "Your username has to be at least 4 characters long." });
    return;
  }

  if(password.length < 5) {
    res.render("signup", { message: "Sorry, your password needs\nto be at least 5 characters long." });
    return;
  }

  User.findOne({ username: username }, "username", (err, user) => { //"username" means: just display the username field.
    if (user !== null) {
      res.render("signup", { message: "Sorry, the username already exists!" });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      encryptedPassword: hashPass
    });


    newUser.save((err) => {
      if (err) {
        res.render("signup", { message: "Something went wrong" });

      } else {
        req.login(newUser, function(err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/welcome');

        });

      }
    });

  });
});
// ------------------------CLOSE: SIGN UP -------------------------------------

// --------------------------- LOG IN: LOCAL -----------------------------------------
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Sorry, incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.encryptedPassword)) {
      return next(null, false, { message: "Sorry, incorrect password" });
    }
    // If you want to do some extra logic, do it here and not in authRoutes
    return next(null, user);
  });
}));

router.post("/login", passport.authenticate("local", {
  successReturnToOrRedirect: "/profile", //If i try to access kgb-files(which are protected), then its going to direct me to login. If I log In successfully, it will directly redirect me to kgb-files!!
  failureRedirect: "/",
  failureFlash: 'Incorrect username or password',
  successFlash: 'Successful Log In!',
  passReqToCallback: true
}));
// --------------------------- closing LOG IN: LOCAL -----------------------------------------

// --------------------------- LOG IN: FACEBOOK -----------------------------------------
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback",
  passport.authenticate('facebook', {failureRedirect: "/" }, (req, res, next) => {

    if (req.user.isProfileNew === true) {
      res.redirect('/welcome');
    }

    if (req.user.isProfileNew === false) {
      res.redirect('/profile');
    }

  }));

module.exports = router;
