var express = require('express');
var router = express.Router();
var petsCtrl = require('../controllers/pets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('./pets/index');
});

router.get('/', petsCtrl.index);
router.get('/new', petsCtrl.new);
router.get('/:id', petsCtrl.show);
router.post('/', petsCtrl.create);

module.exports = router;
