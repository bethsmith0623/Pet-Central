var router = require('express').Router();
var usersCtrl = require('../controllers/users');

router.get('/index', isLoggedIn, usersCtrl.index);




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;