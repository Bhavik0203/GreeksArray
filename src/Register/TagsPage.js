import React from 'react';

const TagsPage = () => {
  const tags = [
    'Architect', 'CEO', 'Consultant', 'DBA', 'Developer', 'President',
    'Project Lead', 'Project Manager', 'Student', 'Systems Engineer',
    'Trainer/Mentor', 'Tech Lead', 'Web Designer', 'Programmer',
    'Executive/Business', 'Marketing', 'Influencer', 'Others'
  ];

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    height: '100vh',
  };

  const headerStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const tagContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '10px',
    width: '80%',
    marginBottom: '20px',
  };

  const tagStyle = {
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  const tagHoverStyle = {
    ...tagStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff7f27',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#e6691d',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Please, tell us who you are?</h1>
      <div style={tagContainerStyle}>
        {tags.map((tag, index) => (
          <div
            key={index}
            style={tagStyle}
            onMouseOver={(e) => (e.target.style = tagHoverStyle)}
            onMouseOut={(e) => (e.target.style = tagStyle)}
          >
            {tag}
          </div>
        ))}
      </div>
       
    </div>
  );
};

export default TagsPage;
