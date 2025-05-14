const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  folderName: {
    type: String,
    required: true,
  },
  userId: { //nowosc
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
