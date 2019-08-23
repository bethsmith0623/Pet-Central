var mongoose = require('mongoose');

var providerSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true},
  type: {
    type: ['Vet', 'Groomer', 'Trainer', 'Sitter', 'Walker', 'Boarder', 'Store', 'Other'],
    required: true},
  services: {
    type: [],
    required: true},
},{
  timestamps: true
});

module.exports = mongoose.model('Provider', providerSchema);