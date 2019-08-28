var express = require('express');
var router = express.Router();
var providersCtrl = require('../controllers/providers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('./providers/index');
});

router.get('/providers/index', isLoggedIn, providersCtrl.index);
router.get('/providers/new', isLoggedIn, providersCtrl.new);
router.get('/providers/:id', isLoggedIn, providersCtrl.show);
router.post('/providers', isLoggedIn, providersCtrl.create);
router.delete('/providers/:id', isLoggedIn, providersCtrl.delete);
router.get('/providers/:id/edit', isLoggedIn, providersCtrl.edit);
router.put('/providers/:id', isLoggedIn, providersCtrl.update);
router.post('/pets/:id/providers', isLoggedIn, providersCtrl.addToTeam);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;