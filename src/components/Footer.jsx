import logo from "../assets/assets_frontend/logo.svg";
import "../styles_/footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div className="logo-content">
          <img src={logo} alt="Prescripto logo" className="logo" />
          <p>
            Prescripto connects patients with trusted doctors through a simple,
            intuitive appointment platform. Browse specialists, check
            availability, and book consultations seamlessly across devices.
          </p>
        </div>

        <div className="company-content">
          <h6>COMPANY</h6>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="contact-content">
          <h6>GET IN TOUCH</h6>
          <ul>
            <li>+91 12340 12340</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;