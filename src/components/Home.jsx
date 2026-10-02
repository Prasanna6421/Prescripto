import { assets } from "../assets/assets_frontend/assets";
import "../styles_/Home.css";
import HomeDoctor from "../components/HomeDoctor";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header Banner */}
      <section className="header-banner">
        <div className="container bg-primary rounded-3 mt-3 mt-md-3 mt-lg-0 px-0">
          <div className="row align-items-center banner-box">
            <div className="col-md-6 text-white p-4 p-lg-0 ps-lg-5">
              <h1 className="heading">
                Book Appointment With Trusted Doctors
              </h1>
              <p>
                Simply browse through our extensive list of trusted doctors,
                <br />
                schedule your appointment hassle-free.
              </p>
              <button 
                className="btn btn-light rounded-pill mt-3 px-4"
                onClick={() => navigate("/doctors")}  // Navigate to doctors page
              >
                Book appointment
              </button>
            </div>

            <div className="col-md-6">
              <img
                src={assets.header_img}
                alt=""
                className="img-fluid banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeDoctor limit={4} />

      {/* Bottom Banner */}
      <section className="banner">
        <div className="container bg-primary rounded-3 mt-4 px-0">
          <div className="row align-items-center banner-box">
            <div className="col-md-6 text-white content p-4 p-lg-0 ps-lg-5">
              <h1 className="heading">
                Book Appointment With 100+ Trusted Doctors
              </h1>
              <button 
                className="btn btn-light rounded-pill mt-3 px-4 w-50"
                onClick={() => navigate("/auth")}  
              >
                Create Account
              </button>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={assets.appointment_img}
                alt="doctor"
                className="img-fluid banner-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;