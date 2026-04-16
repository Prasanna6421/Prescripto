const express = require('express');
const router = express.Router();
const Speciality = require('../models/Speciality');

router.get('/', async (req, res) => {
  try {
    const data = await Speciality.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;