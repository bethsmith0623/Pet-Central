var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('/pets/index', { title: 'Pet Central' });
});

module.exports = router;
