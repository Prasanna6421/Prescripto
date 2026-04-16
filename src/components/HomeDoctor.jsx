import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import "../styles_/HomeDoctor.css";

const HomeDoctor = ({ limit = 4 }) => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  const displayedDoctors = doctors.slice(0, limit);

  return (
    <section className="home-doctor-section">
      <div className="home-doctor-container">
        <div className="home-doctor-header">
          <h2>Our Top Doctors</h2>
          <p>Book appointments with trusted medical professionals</p>
        </div>

        <div className="home-doctor-grid">
          {displayedDoctors.map((doc) => (
            <div
              className="home-doctor-card"
              key={doc._id}
              onClick={() => navigate(`/doctors/${doc._id}`)}
            >
              <div className="home-doctor-img-wrapper">
                <img src={assets[doc.image]} alt={doc.name} />
              </div>
              <div className="home-doctor-info">
                <p className="home-status">
                  <span className="home-dot"></span>Available
                </p>
                <h3>{doc.name}</h3>
                <p>{doc.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="home-doctor-button-wrapper">
          <button 
            className="home-show-more-btn"
            onClick={() => navigate("/doctors")}
          >
            Show More Doctors
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeDoctor;