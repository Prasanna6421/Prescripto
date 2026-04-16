import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import '../styles_/MyAppointments.css';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
      alert("Please login to view your appointments");
      navigate("/");
      return;
    }

    if (user.isAdmin) {
      navigate("/admin-panel");
      return;
    }

    setCurrentUser(user);
    const userAppointments = JSON.parse(localStorage.getItem(`appointments_${user.uid}`) || '[]');
    setAppointments(userAppointments);
  }, [navigate]);

  const handlePayOnline = (appointment) => {
    alert(`Payment for ${appointment.doctorName} - Amount: $${appointment.fee}`);
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const updatedAppointments = appointments.filter(app => app.id !== id);
      setAppointments(updatedAppointments);
      localStorage.setItem(`appointments_${currentUser.uid}`, JSON.stringify(updatedAppointments));
      alert("Appointment cancelled successfully!");
    }
  };

  if (!currentUser) {
    return null;
  }

  if (appointments.length === 0) {
    return (
      <div className="no-appointments">
        <h2>No Appointments Found</h2>
        <p>You haven't booked any appointments yet.</p>
        <button onClick={() => navigate('/doctors')} className="book-now-btn">
          Book Your First Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="my-appointments-container">
      <h1 className="page-title">My Appointments</h1>
      
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-left">
              <img 
                src={assets[appointment.doctorImage]} 
                alt={appointment.doctorName}
                className="doctor-avatar"
              />
            </div>
            
            <div className="appointment-middle">
              <h3 className="doctor-name">{appointment.doctorName}</h3>
              <p className="doctor-speciality">{appointment.speciality}</p>
              <div className="appointment-address">
                <strong>Address:</strong>
                <p>{appointment.address}</p>
              </div>
              <div className="appointment-datetime">
                <strong>Date & Time:</strong>
                <p>{appointment.date} | {appointment.time}</p>
              </div>
            </div>
            
            <div className="appointment-right">
              <button 
                className="pay-btn"
                onClick={() => handlePayOnline(appointment)}
              >
                Pay Online
              </button>
              <button 
                className="cancel-btn"
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;