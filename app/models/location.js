const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name:{ type: String, required: true },
  address:{ type: String, required: true },
  website:{ type: String, required: true },
  contact: {type: String, required: true }
});

module.exports = mongoose.model('Location', locationSchema);