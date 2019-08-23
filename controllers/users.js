const User = require('../models/user');

module.exports = {
 index,
};

function index(req, res) {
  console.log(req.user);
  res.render('index', {
    user: req.user
  });
};