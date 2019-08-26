var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema ({
  name: String,
  email: String,
  googleId: String,
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pets'
  }],
  providers: [{
    type: Schema.Types.ObjectId, 
    ref: 'Provider'
  }],
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);