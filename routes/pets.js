var express = require('express');
var router = express.Router();
var petsCtrl = require('../controllers/pets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('./pets/index');
});

router.get('/index', isLoggedIn, petsCtrl.index);
router.get('/new', isLoggedIn, petsCtrl.new);
router.get('/:id', isLoggedIn, petsCtrl.show);
router.post('/', isLoggedIn, petsCtrl.create);
router.delete('/:id', isLoggedIn, petsCtrl.delete);
router.get('/:id/edit', isLoggedIn, petsCtrl.edit);
router.put('/:id', isLoggedIn, petsCtrl.update);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}


module.exports = router;
