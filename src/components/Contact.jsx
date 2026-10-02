import { assets } from "../assets/assets_frontend/assets";
import '../styles_/Contact.css'

function Contact(){
    return(
        <>
        <section className="contact"> 
            <h3 className="text-center mt-5 fw-medium text-muted">CONTACT <span className="fw-bold">US</span></h3>

               <div className="contact-container">
                <img src={assets.contact_image}  alt="" />


              <div className="content">
                <h3 className="h2 office fw-medium text-muted pb-2">OUR OFFICE</h3>
                <p className="address text-muted">2,Birds-Road,Trichy-06, TamilNadu</p>
                <p className="tele text-muted"><a  href="tel:+919990879636" className="text-decoration-none ">+91 9990 879 636</a></p>
                <p className="email text-muted"><a  href="mailTo:Prescripto@gmail.com" className="text-decoration-none ">Prescripto@gmail.com</a></p>
                <h3 className="h2 fw-medium text-secondary">CAREERS AT PRESCRIPTO</h3>
                <p className="content text-muted">Learn more about our teams and job openings</p>
                <button className="btn btn-outline-dark w-50 p-2 fs-5 rounded-0">Explore Jobs</button>
              </div>
             


               </div>

        </section>
        
        </>
    )
}

export default Contact;