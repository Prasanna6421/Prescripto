import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles_/AdminPanel.css";

const AdminPanel = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadAppointments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      setAllAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Admin appointments error:", error);
      setAllAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser || !currentUser.isAdmin) {
      navigate("/");
      return;
    }

    setLoading(true);
    loadAppointments();

    const interval = setInterval(loadAppointments, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleCancelAppointment = async (appointmentId) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this appointment?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`,
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

      await loadAppointments();

      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Cancel appointment error:", error);
      alert(
        error.message || "Unable to cancel appointment"
      );
    }
  };

  const totalPatients = new Set(
    allAppointments.map(
      (appointment) => appointment.userId
    )
  ).size;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel-container">
      <h1 className="admin-title">
        Admin Panel - All Patient Appointments
      </h1>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p>{allAppointments.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{totalPatients}</p>
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
                <td
                  colSpan="8"
                  style={{ textAlign: "center" }}
                >
                  No appointments found
                </td>
              </tr>
            ) : (
              allAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patientName}</td>

                  <td>
                    {appointment.patientMobile || "-"}
                  </td>

                  <td>{appointment.userEmail}</td>

                  <td>{appointment.doctorName}</td>

                  <td>{appointment.speciality}</td>

                  <td>
                    {appointment.date} |{" "}
                    {appointment.time}
                  </td>

                  <td>${appointment.fee}</td>

                  <td>
                    <button
                      className="cancel-btn-admin"
                      onClick={() =>
                        handleCancelAppointment(
                          appointment._id
                        )
                      }
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