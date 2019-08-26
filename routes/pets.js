var express = require('express');
var router = express.Router();
var petsCtrl = require('../controllers/pets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('./pets/index');
});

router.get('/index', petsCtrl.index);
router.get('/new', petsCtrl.new);
router.get('/:id', petsCtrl.show);
router.post('/', petsCtrl.create);
router.delete('/:id', petsCtrl.delete);
// router.get('/:id/edit', petsCtrl.edit);
// router.put('/:id', petsCtrl.update);

module.exports = router;
