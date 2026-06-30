const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  description: String,
  frequency: String,
  createdAt: Date
});

module.exports = mongoose.model('Habit', habitSchema);