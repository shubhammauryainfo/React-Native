const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
});

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    players: [PlayerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', TeamSchema);
