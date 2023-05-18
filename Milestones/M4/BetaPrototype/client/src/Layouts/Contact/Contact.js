import React from "react";
import "./styling.css";

function ContactUs() {
  return (
    <html>
      <div class="about-section">
        <h1>How Can We Help You?</h1>
        <p>If you have any questions regarding our website or services contact our team members!</p>
        <p>We are available 24/7</p>
      </div>
      <h3 className="team-header">Our Team</h3>
      <div className="contact-us-container">
        <div class="contact-card">
          <h3 className="contact-header">Emily Padilla</h3>
          <p class="title">Team Lead</p>
          <p>Contact me anytime without any hesitation</p>
          <p className="email-style">emily@example.com</p>
          <p><a className="button" href="mailto:someone@yoursite.com">Contact</a></p>
        </div>

        <div class="contact-card">
          <h3 className="contact-header">Jijieong Lee</h3>
          <p class="title">Front-End Lead</p>
          <p>Contact me anytime without any hesitation</p>
          <p className="email-style">jijieong@example.com</p>
          <p><a className="button" href="mailto:someone@yoursite.com">Contact</a></p>
        </div>

        <div class="contact-card">
          <h3 className="contact-header">Cristobal Padilla</h3>
          <p class="title">Backend Master</p>
          <p>Contact me anytime without any hesitation</p>
          <p className="email-style">cris@example.com</p>
          <p><a className="button" href="mailto:someone@yoursite.com">Contact</a></p>
        </div>
      </div>  
    </html>
  );
}

export default ContactUs;
