var express = require('express');
var router = express.Router();
var providersCtrl = require('../controllers/providers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('./providers/index');
});

router.get('/index', isLoggedIn, providersCtrl.index);
router.get('/new', isLoggedIn, providersCtrl.new);
router.get('/:id', isLoggedIn, providersCtrl.show);
router.post('/', isLoggedIn, providersCtrl.create);
router.delete('/:id', isLoggedIn, providersCtrl.delete);
router.get('/:id/edit', isLoggedIn, providersCtrl.edit);
router.put('/:id', isLoggedIn, providersCtrl.update);
router.post('/pets/:id/providers', isLoggedIn, providersCtrl.addToTeam);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;