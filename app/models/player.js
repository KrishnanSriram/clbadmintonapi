const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  first_name:{ type: String, required: true },
  last_name:{ type: String, required: true },
  email:{ type: String, required: true },
  mobile:{ type: String, required: true },
  description:{ type: String, required: true },
  league:{ type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true }
});

module.exports = mongoose.model('Player', playerSchema);