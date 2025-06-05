const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalRepetitions: { type: Number, default: 0 },
  repetitionsByDate: {
    type: Map,
    of: Number, // np. { "2025-05-26": 3 }
    default: {}
  },
  correctAnswers: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Stats', statsSchema);
