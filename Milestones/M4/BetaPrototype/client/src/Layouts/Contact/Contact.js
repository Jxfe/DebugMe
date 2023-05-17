import React, { useState } from 'react';

import Button from "../../Components/Button";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Thank you for your message, ${name}!`); 
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label htmlFor="message">
          Message:
          <textarea 
            id="message" 
            name="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </label>
        <br />
        <Button
            className="default-button"
            content="Send"
            onClickEvent={handleSubmit}
          />
      </form>
    </div>
  );
}

export default ContactUs;
