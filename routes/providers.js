var express = require('express');
var router = express.Router();
var providersCtrl = require('../controllers/providers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('./providers/index');
});

router.get('/index', providersCtrl.index);
router.get('/new', providersCtrl.new);
router.get('/:id', providersCtrl.show);
router.post('/', providersCtrl.create);
router.delete('/:id', providersCtrl.delete);
router.get('/:id/edit', providersCtrl.edit);
router.put('/:id', providersCtrl.update);

module.exports = router;