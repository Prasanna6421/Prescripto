const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      patientName,
      patientMobile,
      doctorId,
      doctorName,
      doctorImage,
      speciality,
      date,
      time,
      address,
      fee,
    } = req.body;

    if (
      !userId ||
      !userEmail ||
      !patientName ||
      !doctorId ||
      !doctorName ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message: "Required appointment details are missing",
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      userId,
      userEmail,
      patientName,
      patientMobile: patientMobile || "",
      doctorId,
      doctorName,
      doctorImage,
      speciality,
      date,
      time,
      address,
      fee,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Get user appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user appointments",
    });
  }
});

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Get doctor appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor appointments",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Delete appointment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
    });
  }
});

module.exports = router;