const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    patientMobile: {
      type: String,
      default: "",
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    doctorImage: {
      type: String,
      required: true,
    },

    speciality: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate booking
// Same doctor + same date + same time = only ONE appointment
appointmentSchema.index(
  {
    doctorId: 1,
    date: 1,
    time: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);