import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { assets } from "../assets/assets_frontend/assets";
import "../styles_/MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const loadAppointments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments/user/${currentUser.uid}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();

        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Appointments error:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadAppointments();

    const interval = setInterval(loadAppointments, 3000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const handlePayOnline = (appointment) => {
    alert(
      `Payment for ${appointment.doctorName} - Amount: $${appointment.fee}`
    );
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel appointment"
        );
      }

      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id)
      );

      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Cancel appointment error:", error);
      alert(error.message || "Unable to cancel appointment");
    }
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  if (appointments.length === 0) {
    return (
      <div className="no-appointments">
        <h2>No Appointments Found</h2>

        <p>
          You haven't booked any appointments yet.
        </p>

        <button
          onClick={() => navigate("/doctors")}
          className="book-now-btn"
        >
          Book Your First Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="my-appointments-container">
      <h1 className="page-title">
        My Appointments
      </h1>

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="appointment-card"
          >
            <div className="appointment-left">
              <img
                src={assets[appointment.doctorImage]}
                alt={appointment.doctorName}
                className="doctor-avatar"
              />
            </div>

            <div className="appointment-middle">
              <h3 className="doctor-name">
                {appointment.doctorName}
              </h3>

              <p className="doctor-speciality">
                {appointment.speciality}
              </p>

              <div className="appointment-address">
                <strong>Address:</strong>
                <p>{appointment.address}</p>
              </div>

              <div className="appointment-datetime">
                <strong>Date & Time:</strong>
                <p>
                  {appointment.date} | {appointment.time}
                </p>
              </div>
            </div>

            <div className="appointment-right">
              <button
                className="pay-btn"
                onClick={() =>
                  handlePayOnline(appointment)
                }
              >
                Pay Online
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  handleCancelAppointment(appointment._id)
                }
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