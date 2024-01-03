// ContactPage.jsx
import React, { useState } from 'react';
import Navbar from './navbar.jsx';
import './contact-page.css';

const ContactPage = () => {
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the message data in JSON format
        const messageData = {
            subject,
            email,
            content: message,
        };

        try {
            // Send a POST request to store the message
            const response = await fetch('http://localhost:5000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                console.log('Message sent successfully:', messageData);
                // You can add additional logic here if needed
            } else {
                console.error('Error sending message:', response.statusText);
                // Handle the error appropriately
            }
        } catch (error) {
            console.error('Error sending message:', error.message);
            // Handle the error appropriately
        }
    };

    return (
        <>
            <Navbar />
            <div className="contact-container">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>

    );
};

export default ContactPage;
