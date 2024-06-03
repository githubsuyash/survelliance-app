import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceID = 'service_zxzq7zb';
    const templateID = 'template_jkpv0xd';
    const publicKey = '7vxBxQZXleccAfwi-';

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Message sent successfully!');
        // Reset form data
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Error sending message.');
      });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
      
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required value={formData.message} onChange={handleChange}></textarea>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
