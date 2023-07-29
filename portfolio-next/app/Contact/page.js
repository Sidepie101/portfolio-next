"use client"

import React, { useState } from 'react';
import '/styles/Contact.css';

export default function Contact ()  {
  const [state, setState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previousState) => ({ ...previousState, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let isValid = true;
  
    const nameRegex = /^[A-Za-z\s'.,-]*$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneNumberRegex = /^\+?\d{10,14}$/;
    const messageMinLength = 10;
  
    const newErrors = {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    };
  
    if (state.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!nameRegex.test(state.name)) {
      newErrors.name = 'Invalid name';
      isValid = false;
    } else if (state.name.trim().length < 5) {
      newErrors.name = 'Name must be at least 5 characters long';
      isValid = false;
    }
  
    if (state.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(state.email)) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }
  
    if (state.phoneNumber.trim() !== '') {
      if (!phoneNumberRegex.test(state.phoneNumber)) {
        newErrors.phoneNumber = 'Invalid phone number';
        isValid = false;
      }
    }
  
    if (state.message.trim() === '') {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (state.message.trim().length < messageMinLength) {
      newErrors.message = `Message must be at least ${messageMinLength} characters long`;
      isValid = false;
    }
  
    setErrors(newErrors);
  
    if (isValid) {
alert('Your message has been sent successfully!')    }
  };
  
  return (
      <div className="contact-container">
        <h1 className="contact-title">Feel free to reach out!</h1>
        <p className="contact-subtitle">
          Quick Chat? DM me on &nbsp;
          <span>
            <a
              href="https://www.linkedin.com/in/taha-moukhlisse/"
              className="linkedin-text"
              target="_blank"
              rel="noopener noreferrer"
            >
            LinkedIn
            </a>
          </span>
        </p>
        <div className="contact-form">
          <h2 className="form-title">Leave a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={state.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                placeholder="Phone number"
                value={state.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                value={state.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            <button type="submit" className="submit-button">
              <span className="submit-text">SUBMIT</span>
            </button>
          </form>
        </div>
      </div>
  );
};

//export default Contact;
