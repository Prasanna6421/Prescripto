import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import '../styles_/DoctorDetails.css';
import Calendar from "./Calender";

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0]
        });
-        localStorage.setItem('currentUser', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0]
        }));
      } else {

        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor:", error));
  }, [id]);

  const timeSlots = ["11:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"];

  const handleBookAppointment = () => {

    if (!auth.currentUser) {
      alert("Please login first to book an appointment");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }

    const user = auth.currentUser;
    
    const newAppointment = {
      id: Date.now(),
      userId: user.uid,
      userEmail: user.email,
      doctorId: doctor._id,
      doctorName: doctor.name,
      doctorImage: doctor.image,
      speciality: doctor.speciality,
      date: `${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`,
      time: selectedTime,
      address: "27th Cross, Richmond Circle, Ring Road, London",
      fee: doctor.fees,
      bookedOn: new Date().toISOString()
    };

    const existingAppointments = JSON.parse(localStorage.getItem(`appointments_${user.uid}`) || '[]');
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem(`appointments_${user.uid}`, JSON.stringify(updatedAppointments));
    
    alert("Appointment booked successfully!");
    navigate("/my-appointments");
  };

  if (isCheckingAuth || !doctor) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="doctor-detail-container">
      <img 
        className="doctor-image" 
        src={assets[doctor.image]} 
        alt={doctor.name} 
      />

      <div className="doc-right">
        <div className="doc-content">
          <h1 className="doctor-name">{doctor.name}</h1>
          <div className="doctor-details">
            <span className="doctor-degree">{doctor.degree}</span>
            <span className="doctor-experience">{doctor.experience}</span>
          </div>
          <h3 className="about-title">About</h3>
          <p className="about-text">{doctor.about}</p>
          <p className="fee-text">Appointment fee: ${doctor.fees}</p>
        </div>

        <Calendar 
          onDateSelect={setSelectedDate} 
          selectedDate={selectedDate}
        />

        <div className="time d-flex gap-4 m-3">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-outline-dark'} rounded-pill p-2`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <button className="appointment-btn" onClick={handleBookAppointment}>
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorDetail;