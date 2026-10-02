const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    speciality: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Speciality", specialitySchema);