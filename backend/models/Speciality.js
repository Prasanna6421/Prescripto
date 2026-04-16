const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema({
  speciality: String
});

module.exports = mongoose.model('Speciality', specialitySchema);