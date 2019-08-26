var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema ({
  name: String,
  email: String,
  googleId: String,
  pets: [String],
  providers: [String],
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);