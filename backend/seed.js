const mongoose = require('mongoose');
require('dotenv').config();

const Doctor = require('./models/Doctor');
const Speciality = require('./models/Speciality');
const { doctors, specialityData } = require('./data'); 

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

const seedDB = async () => {
  try {
    await Doctor.deleteMany({});
    await Speciality.deleteMany({});

    await Speciality.insertMany(specialityData);
    await Doctor.insertMany(doctors);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();