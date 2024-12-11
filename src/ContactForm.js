import React, { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import facebookLogo from './assets/Images/Socialmediaimg/fb.jpeg'; 
import GitLogo from './assets/Images/Socialmediaimg/github.jpeg'; 
import twitterLogo from './assets/Images/Socialmediaimg/twitter.jpeg';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showPopup, setShowPopup] = useState(false); // Popup state
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://geeksarray-001-site5.atempurl.com/api/User/contact', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...formData,
                  from: formData.email // Assuming `from` is the user's email
              }),
          });
  
          if (response.ok) {
              // Clear the form fields
              setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  message: ''
              });
              // Show thank you popup on success
              setShowPopup(true);
          } else {
              const errorData = await response.json();
              setError(errorData.Message || 'Error occurred while sending message.');
          }
      } catch (error) {
          setError('Error occurred while sending message.');
      }
  };
  
  

    return (
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.leftSection}>
                    <h2 style={styles.heading}>Let's Talk</h2>
                    <p style={styles.description}>
                        Have some big idea or brand to develop and need help? Then reach out,
                        we'd love to hear about your project and provide help.
                    </p>
                    <div style={styles.contactDetails}>
                        <h4>Email</h4>
                        <div style={styles.email}>
                            <p>info@example.com</p>
                        </div>
                        <br />
                        <h4>Connect Us</h4>
                        <div style={styles.socialIcons}>
                            <a href="https://www.facebook.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={facebookLogo} alt="Facebook" style={{ width: '30px', height: '30px' }} />
                            </a>
                            <a href="https://github.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={GitLogo} alt="GitHub" style={{ width: '30px', height: '30px' }} />
                            </a>
                            <a href="https://x.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={twitterLogo} alt="Twitter" style={{ width: '30px', height: '30px' }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div style={styles.rightSection}>
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <br></br>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            style={styles.input} 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <br></br>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            style={styles.input} 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <br></br>
                        <input 
                            type="text" 
                            name="subject" 
                            placeholder="Subject" 
                            style={styles.input} 
                            value={formData.subject} 
                            onChange={handleInputChange} 
                        />
                        <br></br>
                        <textarea 
                            name="message" 
                            placeholder="Message" 
                            style={styles.textarea} 
                            value={formData.message} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <br></br>
                        <br></br>
                        <br></br>
                        <button type="submit" style={styles.button}>Send</button>
                    </form>
                </div>
            </div>
            <br></br>

            {showPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <p style={styles.message}>Thank you for contacting us!</p>
                        <button onClick={() => setShowPopup(false)} style={styles.closePopupButton}>Close</button>
                    </div>
                </div>
            )}

            {error && <p style={styles.error}>{error}</p>}
            <Footer />
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        flexDirection: 'row', // Default for larger screens
    },
    leftSection: {
        width: '40%',
    },
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginTop: '100px',
    },
    description: {
        margin: '20px 0',
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    contactDetails: {
        marginTop: '20px',
    },
    email: {
        display: 'flex',
        alignItems: 'center',
    },
    socialIcons: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    rightSection: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60px',
        marginBottom: '60px',
    },
    form: {
        width: '100%',
        maxWidth: '500px',
    },
    input: {
        width: '100%',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
        height: '150px',
    },
    button: {
        width: '25%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#000',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    popupOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    popup: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
    },
    message: {
        margin: '0 0 15px',
        fontSize: '18px',
        color: '#333'
    },
    closePopupButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    },

    // Media queries for responsiveness
    '@media (max-width: 1024px)': {
        container: {
            padding: '20px',
            flexDirection: 'column', // Stack sections vertically on smaller screens
        },
        leftSection: {
            width: '100%',
            marginBottom: '20px', // Space between sections
        },
        rightSection: {
            width: '100%',
        },
        button: {
            width: '100%', // Full width for button on smaller screens
        }
    },

    '@media (max-width: 768px)': {
        heading: {
            fontSize: '1.5rem', // Smaller heading size on tablet
        },
        description: {
            fontSize: '0.9rem', // Adjust description size for readability
        },
        input: {
            padding: '8px', // Reduce input padding on smaller screens
        },
        textarea: {
            height: '80px', // Shorter height on smaller screens
        }
    },

    '@media (max-width: 480px)': {
        heading: {
            fontSize: '1.2rem', // Smaller heading for mobile
        },
        description: {
            fontSize: '0.8rem', // Further reduce description font size
        },
    }
};



export default ContactForm;
