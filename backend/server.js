const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const doctorRoutes = require("./routes/doctorRoutes");
const specialityRoutes = require("./routes/specialityRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Prescripto Backend API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/doctors", doctorRoutes);
app.use("/specialities", specialityRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error(
        "MONGO_URL is missing in environment variables"
      );
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();