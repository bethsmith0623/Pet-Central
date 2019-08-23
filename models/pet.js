var mongoose = require('mongoose');

var petSchema = new mongoose.Schema ({
  name: {
    type:String,
    required: true},
  type: {
    type:['Dog', 'Cat', 'Fish', 'Snake', 'Lizard', 'Bird', 'Other'],
    required: true},
  breed: {
    type: String,
    default: 'Unknown'},
  age: {
    type: Number,
    default: 0},
  healthConditions: [],
  medications: [],
  providers: [],
},{
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);