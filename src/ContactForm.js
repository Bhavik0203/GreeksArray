import React from 'react'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import facebookLogo from './assets/Images/Socialmediaimg/fb.jpeg'; 
import GitLogo from './assets/Images/Socialmediaimg/github.jpeg'; 
import twitterLogo from './assets/Images/Socialmediaimg/twitter.jpeg';

const ContactForm = () => {
    return (
<>
<Header/>

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
              {/* <span>📧</span> */}
              <p>info@example.com</p>
            </div>
  <br/>
            <h4>Connect Us</h4>
            <div style={styles.socialIcons}>
          
            <a href="https://www.facebook.com/geeksarray" target="_blank" rel="noopener noreferrer">
              <img src={facebookLogo} alt="Facebook" style={{width:'30px', height:'30px'}}/>
            </a>
            <a href="https://github.com/geeksarray" target="_blank" rel="noopener noreferrer">
              <img src={GitLogo} alt="GitHub" style={{width:'30px', height:'30px'}} />
            </a>
            <a href="https://x.com/geeksarray" target="_blank" rel="noopener noreferrer">
              <img src={twitterLogo} alt="Twitter" style={{width:'30px', height:'30px'}} />
            </a>
          </div>
       
          </div>
        </div>
  
        <div style={styles.rightSection}>
          <form style={styles.form}>
            <input type="text" placeholder="Name" style={styles.input} />
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="text" placeholder="Subject" style={styles.input} />
            <textarea placeholder="Message" style={styles.textarea}></textarea>
            <button type="submit" style={styles.button}>Send</button>
          </form>
        </div>
      </div>

<Footer/>
</>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
    },
    leftSection: {
      width: '40%',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
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
    socialIcon: {
      fontSize: '2rem',
    },
    rightSection: {
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      maxWidth: '500px',
    },
    input: {
      width: '100%',
      padding: '10px',
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
      height: '100px',
    },
    button: {
        alignItems:'center',
      width: '25%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#000',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
    },
  };
  

export default ContactForm