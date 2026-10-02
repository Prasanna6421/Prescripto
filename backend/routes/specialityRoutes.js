const express = require("express");
const router = express.Router();
const Speciality = require("../models/Speciality");

router.get("/", async (req, res) => {
  try {
    const specialities = await Speciality.find().sort({ speciality: 1 });

    res.status(200).json(specialities);
  } catch (error) {
    console.error("Get specialities error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch specialities",
    });
  }
});

module.exports = router;