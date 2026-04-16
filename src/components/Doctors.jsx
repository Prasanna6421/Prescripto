import React, { useEffect, useState } from "react";
import "../styles_/Doctors.css";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Doctors = ({ showFilter = true, limit }) => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selected, setSeleted] = useState("All");
  const [showfilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/specialities`)
      .then((res) => res.json())
      .then((data) => setSpecialities(data));
  }, []);

  const filterDoctor =
    selected === "All"
      ? doctors
      : doctors.filter((doc) => doc.speciality === selected);

  const displayedDoctors = limit ? filterDoctor.slice(0, limit) : filterDoctor;

  return (
    <>
      <div className="doctors-container">
        {showFilter && (
          <div className="sidebar">
            <h3>Browse through the doctors specialist.</h3>
            <button
              onClick={() => setShowFilter(!showfilter)}
              className="filter-btn"
            >
              Filter
            </button>

            <div className={`speciality-list ${showfilter ? "show" : ""}`}>
              <button
                className={selected === "All" ? "active" : ""}
                onClick={() => setSeleted("All")}
              >
                ALL
              </button>

              {specialities.map((spec, index) => (
                <button
                  key={index}
                  className={spec.speciality === selected ? "active" : ""}
                  onClick={() => setSeleted(spec.speciality)}
                >
                  {spec.speciality}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="doctor-grid">
          {displayedDoctors.map((doc, index) => (
            <div
              className="doctor-card"
              key={doc._id}
              onClick={() => navigate(`/doctors/${doc._id}`)}
            >
              <img src={assets[doc.image]} alt={doc.name} />

              <div className="doctor-info">
                <p className="status">
                  <span className="dot"></span>Available
                </p>
                <h3>{doc.name}</h3>
                <p>{doc.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;