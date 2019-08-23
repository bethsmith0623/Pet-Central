var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({
  name: String,
  email: String,
  googleId: String,
  pets: [],
  providers: [],
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);