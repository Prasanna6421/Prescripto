const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const doctorRoutes = require('./routes/doctorRoutes');
const specialityRoutes = require('./routes/specialityRoutes');

const app = express();

app.use(cors({
  origin: "*", // later we can lock this to your Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

app.use('/doctors', doctorRoutes);
app.use('/specialities', specialityRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});