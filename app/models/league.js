const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  group:{ type: String, required: true },
  description:{ type: String, required: true },
  location:{ type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }
});

module.exports = mongoose.model('League', leagueSchema);