import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import "../styles_/Aboutus.css";

const About = () => {
  return (

    <>

    
      <section className="about">
      <div className="container">
        <h3 className="heading">ABOUT US</h3>
        <div className="about-row">
         <img src={assets.about_image} className="about-img" alt="" />    
        
        <div className="about-text">
            <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
            <h6>Our Vision</h6>
            <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>  
        </div>  
 



        <h3 className="heading mt-5">WHY CHOOSE US</h3>

        <div className="choose-row">
          <div className="choose-box">
            <h6>EFFICIENCY</h6>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>

          <div className="choose-box">
            <h6>CONVENIENCE</h6>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>

          <div className="choose-box">
            <h6>PERSONALIZATION</h6>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>

      </div>
    </section>

    </>
  
  );
};

export default About;