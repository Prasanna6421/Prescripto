import React, { useEffect, useState } from "react";
import "../styles_/Doctors.css";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Doctors = ({ showFilter = true, limit }) => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selected, setSelected] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [doctorResponse, specialityResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/doctors`),
          fetch(`${import.meta.env.VITE_API_URL}/specialities`),
        ]);

        if (!doctorResponse.ok) {
          throw new Error("Failed to fetch doctors");
        }

        if (!specialityResponse.ok) {
          throw new Error("Failed to fetch specialities");
        }

        const doctorData = await doctorResponse.json();
        const specialityData = await specialityResponse.json();

        setDoctors(Array.isArray(doctorData) ? doctorData : []);
        setSpecialities(
          Array.isArray(specialityData) ? specialityData : []
        );
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Unable to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDoctors =
    selected === "All"
      ? doctors
      : doctors.filter((doc) => doc.speciality === selected);

  const displayedDoctors = limit
    ? filteredDoctors.slice(0, limit)
    : filteredDoctors;

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  if (error) {
    return <div className="loading">{error}</div>;
  }

  return (
    <div className="doctors-container">
      {showFilter && (
        <div className="sidebar">
          <h3>Browse through the doctors specialist.</h3>

          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="filter-btn"
          >
            Filter
          </button>

          <div
            className={`speciality-list ${
              showFilterMenu ? "show" : ""
            }`}
          >
            <button
              className={selected === "All" ? "active" : ""}
              onClick={() => setSelected("All")}
            >
              ALL
            </button>

            {specialities.map((spec) => (
              <button
                key={spec._id}
                className={
                  spec.speciality === selected ? "active" : ""
                }
                onClick={() => setSelected(spec.speciality)}
              >
                {spec.speciality}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="doctor-grid">
        {displayedDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          displayedDoctors.map((doc) => (
            <div
              className="doctor-card"
              key={doc._id}
              onClick={() => navigate(`/doctors/${doc._id}`)}
            >
              <img
                src={assets[doc.image]}
                alt={doc.name}
              />

              <div className="doctor-info">
                <p className="status">
                  <span className="dot"></span>
                  Available
                </p>

                <h3>{doc.name}</h3>
                <p>{doc.speciality}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctors;