// Import React and the 'useState' hook from the 'react' library
import React, { useState } from 'react';

// Import the 'Navbar' component and the custom styles from 'navbar.jsx' and 'contact-page.css'
import Navbar from './navbar.jsx';
import './contact-page.css';

// Define the 'ContactPage' functional component
const ContactPage = () => {
    // State variables to manage form input values
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Event handler for form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Create an object containing the form data
        const messageData = {
            subject,
            email,
            content: message,
        };

        try {
            // Send a POST request to the server with the form data
            const response = await fetch('http://localhost:5000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            // Check if the response is successful (status code 2xx)
            if (response.ok) {
                console.log('Message sent successfully:', messageData);
            } else {
                // Log an error if the response status is not successful
                console.error('Error sending message:', response.statusText);
            }
        } catch (error) {
            // Log an error if there is an exception during the fetch operation
            console.error('Error sending message:', error.message);
        }
    };

    // Render the component JSX
    return (
        <>
            {/* Include the Navbar component */}
            <Navbar />
            
            {/* Main container for the contact page */}
            <div className="contact-container">
                <h2>Contact Us</h2>
                
                {/* Form for user input */}
                <form onSubmit={handleSubmit} className="contact-form">
                    {/* Input field for the subject */}
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />

                    {/* Input field for the email address */}
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Textarea for the message content */}
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    {/* Submit button for the form */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

// Export the ContactPage component as the default export
export default ContactPage;
