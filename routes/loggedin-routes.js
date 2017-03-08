const express = require('express');
const router  = express.Router();

router.get('/loggedin', (req, res, next) => {
  res.render('loggedin/welcome.ejs');
});

router.get('/profile', (req, res, next) => {
  res.render('loggedin/profile.ejs');
});

module.exports = router;
