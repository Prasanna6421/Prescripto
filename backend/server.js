const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const doctorRoutes = require('./routes/doctorRoutes');
const specialityRoutes = require('./routes/specialityRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// DB CONNECT
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ROUTES
app.use('/doctors', doctorRoutes);
app.use('/specialities', specialityRoutes);

app.get('/', (req, res) => {
  res.send('Backend API Working 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});