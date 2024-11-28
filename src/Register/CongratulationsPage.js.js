import React from 'react';
import { Link } from 'react-router-dom';
const CongratulationsPage = () => {
  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  };

  const cardStyle = {
    textAlign: 'center',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const iconStyle = {
    fontSize: '50px',
    color: 'green',
    backgroundColor: '#98FB98',
    marginBottom: '20px',
    borderRadius: '50%',
    
  };

  const headingStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  };

  const textStyle = {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={iconStyle}>✔</div>
        <h1 style={headingStyle}>Congratulations!</h1>
        <p style={textStyle}>You've completed Registation.</p>
        {/* <p style={textStyle}>
          <a href="#" style={linkStyle}>Sign in</a> .
        </p> */}
        <p>
              <Link className="underline" to="/Sign-In">Please Click here to Sign in</Link>
            </p>
      </div>
    </div>
  );
};

export default CongratulationsPage;
