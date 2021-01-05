const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  _id: { type: String },
  channel: { type: String },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model('chat', TagSchema);