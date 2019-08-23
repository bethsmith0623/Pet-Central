var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user, title: 'Pet Central' });
});

//Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

//Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users/index',
    failureRedirect : '/'
  }
));

//OAuth logout route
router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
