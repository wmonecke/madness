//********************** CENTRAL WIRING CENTER *********************

//-------------------------- REQUIRES -------------------- npm packages
const express = require('express');              // The middle man. (e.x.: app.use())
const path = require('path');                    // enables path.join method ?!?!?!?
const favicon = require('serve-favicon');        // Favicon - little tab image
const logger = require('morgan');                // Shows extra information like stylesheet requests in Terminal
const cookieParser = require('cookie-parser');   // Parses our cookies
const bodyParser = require('body-parser');       // Parses our POST-requests
const layouts = require('express-ejs-layouts');  // Lets us create a main layout!
const mongoose = require('mongoose');            // Talks to mongodb for us
const session = require('express-session');      // Create the cookie and establish session - mongo connect is used for SAVING the session
const passport = require('passport');            // Passport packages
const bcrypt = require('bcrypt');                // Encrypting password
const flash = require('connect-flash');          // Flash message - controlling what to display! Relevant when we want to redirect the user somewhere else.
const fbStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const dotenv = require('dotenv');

const User = require('./models/user-model.js');  // Requiring the user-model (which actually is the collection)
//----------------------------------------------------------

// mongodb://localhost/passport-app is different depending if I am in development (then this would be ok) or in deployment (then the heroku DB would be the one I want).
// These kind of variables are called ENVIRONMENT VARIABLES!!
dotenv.config();
mongoose.connect(process.env.MONGODB_URI); //Connecting to the passport-app Database. Remember the db is created once I save something, which is done in authRoutes.

const app = express();



//---------------------- MIDDLEWARE ------------------------
// VIEWS setup - engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Madness';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
// !!Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);


// ** SESSION setup ** Gives browser command to create cookie and maintain session
app.use(session({
  secret: "my lil' madness",
  resave: true,
  saveUninitialized: true
//store: command to connect mongo-connect, which saves the session in the database!
}));


// ** PASSPORT & FLASH setup **
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// ----------------------------- SERIALIZE AND DESERIALIZE ------------------------------
passport.serializeUser((user, cb) => {
  if (user.provider) {
    cb(null, user);
  } else {
    cb(null, user._id);
  }
});

passport.deserializeUser((id, cb) => {
  if (id.provider) {
    cb(null, id);
    return;
  }
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Facebook Strategy Setup
passport.use(new fbStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.HOST_ADDRESS + "/auth/facebook/callback"
}, saveSocialUser));

// // Google Strategy Setup
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.HOST_ADDRESS + "/auth/google/callback"
// }, (accessToken, refreshToken, profile, next) => {
//   //Save user here because if not youll have to do cases like: "Is user in db? if yes: do this || if not: do that"
//   return next(null, profile);
// }));
//
// Serialized and Deserialized, to minimize session information in db
//----------------------------------------------------------

function saveSocialUser (accessToken, refreshToken, profile, done) {
  // See if there's a user from the provider with the given id.
  User.findOne(
    { provider: profile.provider, providerId: profile.id },
    (err, userDocument) => {
      // If there's an error or a user was retrieved, notify Passport by calling "done()".
      if (err || userDocument) {
        done(err, userDocument);
        return;
      }

      // Otherwise attempt to save a new user (no username or password).
      const names = profile.displayName.split(' ');
      const theUser = new User({
        firstName: names[0],
        lastName: names.slice(1).join(' '),
        provider: profile.provider,
        providerId: profile.id
      });

      theUser.save((err, userDocument) => {
        // Notify Passport about the result by calling "done()".
        done(err, userDocument);
      });
    }
  );
}



// Send logged-in user info into every view
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }

  next();
});


//--------------- ROUTES GO HERE ---------------------------
const index = require('./routes/index');
const loggedIn = require('./routes/loggedin-routes');
// const authRoutes = require('./routes/auth-routes');
// const protectedRoutes = require('./routes/protected-routes');
// const roomRoutes = require('./routes/room-routes');
app.use('/', index);
app.use('/', loggedIn);
// app.use('/', authRoutes);
// app.use('/', protectedRoutes);
// app.use('/', roomRoutes);
//----------------------------------------------------------


//-------------------- ERROR -------------------------------
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
//-------------------------------------------------------


module.exports = app;
