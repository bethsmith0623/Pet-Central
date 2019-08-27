var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var providerSchema = new Schema ({
  name: {
    type: String,
    required: true},
  type: {
    type: ['Vet', 'Groomer', 'Trainer', 'Sitter', 'Walker', 'Boarder', 'Store', 'Other'],
    required: true},
  services: {
    type: [String],
    required: true},
},{
  timestamps: true
});

module.exports = mongoose.model('Provider', providerSchema, 'providers');