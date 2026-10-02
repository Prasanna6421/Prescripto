const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ name: 1 });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Get doctor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
    });
  }
});

module.exports = router;