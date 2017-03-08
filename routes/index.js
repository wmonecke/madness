const express = require('express');
const router  = express.Router();

// GET Home Page.
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup.ejs');
});

module.exports = router;
