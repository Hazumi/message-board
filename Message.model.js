var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', 'messageSchema');
