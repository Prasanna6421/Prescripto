import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles_/AdminPanel.css';

const AdminPanel = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }

    loadAllData();
  }, [navigate]);

  const loadAllData = () => {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key));
        users.push(userData);
      }
    }
    setAllUsers(users);

    const appointments = [];
    users.forEach(user => {
      const userAppointments = JSON.parse(localStorage.getItem(`appointments_${user.uid}`) || '[]');
      userAppointments.forEach(app => {
        appointments.push({
          ...app,
          patientName: user.name,
          patientEmail: user.email,
          patientMobile: user.mobile
        });
      });
    });
    
    appointments.sort((a, b) => new Date(b.bookedOn) - new Date(a.bookedOn));
    setAllAppointments(appointments);
    setLoading(false);
  };

  const handleCancelAppointment = (appointmentId, userId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const userAppointments = JSON.parse(localStorage.getItem(`appointments_${userId}`) || '[]');
      const updatedAppointments = userAppointments.filter(app => app.id !== appointmentId);
      localStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
      loadAllData();
      alert('Appointment cancelled successfully!');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel-container">
      <h1 className="admin-title">Admin Panel - All Patient Appointments</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p>{allAppointments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{allUsers.length}</p>
        </div>
      </div>

      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Date & Time</th>
              <th>Fee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No appointments found</td>
              </tr>
            ) : (
              allAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.patientMobile}</td>
                  <td>{appointment.patientEmail}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.speciality}</td>
                  <td>{appointment.date} | {appointment.time}</td>
                  <td>${appointment.fee}</td>
                  <td>
                    <button 
                      className="cancel-btn-admin"
                      onClick={() => handleCancelAppointment(appointment.id, appointment.userId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;