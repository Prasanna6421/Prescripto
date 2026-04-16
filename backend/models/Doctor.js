const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  image: String,
  speciality: String,
  degree: String,
  experience: String,
  about: String,
  fees: Number,
  address: {
    line1: String,
    line2: String
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);